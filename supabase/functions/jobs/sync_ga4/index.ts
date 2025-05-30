
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../../_shared/cors.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

interface GA4SyncJob {
  user_id: string;
  company_id: string;
  job_type: 'initial_backfill' | 'daily_delta';
  days_back?: number;
  target_date?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const job: GA4SyncJob = await req.json();
    const { user_id, company_id, job_type, days_back = 1, target_date } = job;

    console.log(`Starting GA4 sync job: ${job_type} for user ${user_id}`);

    // Log sync start
    const { data: syncLog } = await supabase
      .from('sync_logs')
      .insert({
        user_id,
        provider: 'google_analytics',
        status: 'running',
        message: `Started ${job_type} sync`
      })
      .select()
      .single();

    try {
      // Get OAuth tokens
      const { data: oauthAccount, error: oauthError } = await supabase
        .from('oauth_accounts')
        .select('*')
        .eq('user_id', user_id)
        .eq('provider', 'google_analytics')
        .eq('status', 'active')
        .single();

      if (oauthError || !oauthAccount) {
        throw new Error('No active GA4 OAuth account found');
      }

      // Check if token needs refresh
      let accessToken = oauthAccount.access_token;
      if (new Date(oauthAccount.expires_at) <= new Date()) {
        accessToken = await refreshToken(oauthAccount.refresh_token, user_id);
      }

      // Get company industry metadata
      const { data: company } = await supabase
        .from('company_profiles')
        .select('industry')
        .eq('id', company_id)
        .single();

      const industryData = {
        industry_domain: company?.industry || 'Other',
        industry_category: 'General',
        industry_subcategory: 'General',
        use_case: 'General'
      };

      // Determine date range
      const dates = job_type === 'initial_backfill' 
        ? getDateRange(days_back)
        : [target_date || getPreviousDay()];

      let totalRecords = 0;

      for (const date of dates) {
        const reportData = await fetchGA4Report(accessToken, oauthAccount.account_id, date);
        
        if (reportData && reportData.rows) {
          // Insert into ga4_daily table
          const rows = reportData.rows.map((row: any) => ({
            company_id,
            property_id: oauthAccount.account_id,
            date,
            sessions: parseInt(row.metricValues[0]?.value || '0'),
            engaged_sessions: parseInt(row.metricValues[1]?.value || '0'),
            total_events: parseInt(row.metricValues[2]?.value || '0'),
            purchases: parseInt(row.metricValues[3]?.value || '0'),
            ecommerce_revenue: parseFloat(row.metricValues[4]?.value || '0'),
            ...industryData,
            inserted_at: new Date().toISOString()
          }));

          if (rows.length > 0) {
            await supabase.from('ga4_daily').upsert(rows, {
              onConflict: 'company_id,property_id,date'
            });
            totalRecords += rows.length;
          }
        }

        // Rate limiting - GA4 has quotas
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Update sync log success
      await supabase
        .from('sync_logs')
        .update({
          status: 'completed',
          message: `Synced ${totalRecords} daily records`
        })
        .eq('id', syncLog?.id);

      console.log(`✅ GA4 sync completed: ${totalRecords} records`);

      return new Response(
        JSON.stringify({ success: true, records_synced: totalRecords }),
        { status: 200, headers: corsHeaders }
      );

    } catch (error) {
      // Update sync log with error
      await supabase
        .from('sync_logs')
        .update({
          status: 'failed',
          message: `Sync failed: ${error.message}`
        })
        .eq('id', syncLog?.id);

      throw error;
    }

  } catch (error) {
    console.error('GA4 sync error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

async function fetchGA4Report(accessToken: string, propertyId: string, date: string) {
  const requestBody = {
    requests: [{
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: date, endDate: date }],
      metrics: [
        { name: 'sessions' },
        { name: 'engagedSessions' },
        { name: 'totalEvents' },
        { name: 'purchases' },
        { name: 'purchaseRevenue' }
      ],
      dimensions: [{ name: 'date' }]
    }]
  };

  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GA4 API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.reports?.[0];
}

async function refreshToken(refreshToken: string, userId: string): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
      client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const tokens = await response.json();
  
  if (!tokens.access_token) {
    throw new Error('Failed to refresh GA4 token');
  }

  // Update stored token
  await supabase
    .from('oauth_accounts')
    .update({
      access_token: tokens.access_token,
      expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
    })
    .eq('user_id', userId)
    .eq('provider', 'google_analytics');

  return tokens.access_token;
}

function getDateRange(daysBack: number): string[] {
  const dates: string[] = [];
  for (let i = daysBack; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

function getPreviousDay(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}
