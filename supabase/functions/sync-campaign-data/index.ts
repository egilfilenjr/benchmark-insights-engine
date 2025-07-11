import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("PROJECT_URL")!,
    Deno.env.get("SERVICE_ROLE_KEY")!
  );

  try {
    const { user_id, provider } = await req.json();
    if (!user_id || !provider) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or provider" }), 
        { status: 400, headers: corsHeaders }
      );
    }

    // Get OAuth token and team info
    const { data: oauth, error: tokenError } = await supabase
      .from("oauth_accounts")
      .select("access_token, team_id, account_id")
      .eq("user_id", user_id)
      .eq("provider", provider)
      .single();

    if (tokenError || !oauth?.access_token) {
      await logSync(supabase, user_id, provider, "error", "Missing or invalid OAuth token");
      return new Response(
        JSON.stringify({ error: "Missing or invalid OAuth token" }), 
        { status: 401, headers: corsHeaders }
      );
    }

    // Get user's company industry for benchmark matching
    const { data: companyIndustry } = await supabase
      .from("company_industry")
      .select("*")
      .eq("company_id", user_id)
      .single();

    let campaigns: any[] = [];
    
    switch (provider) {
      case "google_ads":
        campaigns = await fetchGoogleAdsCampaigns(oauth.access_token, oauth.account_id);
        break;
      case "meta_ads":
        campaigns = await fetchMetaAdsCampaigns(oauth.access_token, oauth.account_id);
        break;
      case "linkedin_ads":
        campaigns = await fetchLinkedInAdsCampaigns(oauth.access_token, oauth.account_id);
        break;
      case "tiktok_ads":
        campaigns = await fetchTikTokAdsCampaigns(oauth.access_token, oauth.account_id);
        break;
      default:
        throw new Error("Unsupported provider");
    }

    // Process and store campaigns
    const processedCampaigns = campaigns.map(campaign => ({
      ...campaign,
      oauth_account_id: oauth.id,
      team_id: oauth.team_id,
      platform: provider,
      created_at: new Date().toISOString()
    }));

    // Store campaigns in database
    const { error: insertError } = await supabase
      .from('campaigns')
      .upsert(processedCampaigns, { onConflict: 'campaign_id,platform' });

    if (insertError) {
      await logSync(supabase, user_id, provider, "error", `Failed to store campaigns: ${insertError.message}`);
      throw insertError;
    }

    // Find and store relevant benchmarks
    await findAndStoreBenchmarks(supabase, oauth.team_id, processedCampaigns, companyIndustry);

    // Update last sync time
    await supabase
      .from('oauth_accounts')
      .update({ last_synced_at: new Date().toISOString() })
      .eq('user_id', user_id)
      .eq('provider', provider);

    await logSync(supabase, user_id, provider, "success", `Synced ${campaigns.length} campaigns successfully`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        campaigns_synced: campaigns.length,
        message: "Data synced successfully" 
      }), 
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Sync error:', error);
    await logSync(supabase, "unknown", "unknown", "error", `Unhandled error: ${error.message}`);
    
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: corsHeaders }
    );
  }
});

async function fetchGoogleAdsCampaigns(accessToken: string, customerId: string) {
  const query = `
    SELECT 
      campaign.id,
      campaign.name,
      campaign.status,
      campaign.advertising_channel_type,
      segments.date,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      metrics.ctr,
      metrics.average_cpc
    FROM campaign 
    WHERE segments.date DURING LAST_30_DAYS
  `;

  const response = await fetch(
    `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:searchStream`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'developer-token': Deno.env.get('GOOGLE_ADS_DEVELOPER_TOKEN') || '',
      },
      body: JSON.stringify({ query })
    }
  );

  if (!response.ok) throw new Error(`Google Ads API error: ${response.statusText}`);
  
  const data = await response.json();
  return (data.results || []).map((result: any) => ({
    campaign_id: result.campaign.id,
    campaign_name: result.campaign.name,
    channel: getChannelFromType(result.campaign.advertisingChannelType),
    status: result.campaign.status.toLowerCase(),
    impressions: parseInt(result.metrics.impressions),
    clicks: parseInt(result.metrics.clicks),
    spend: parseInt(result.metrics.costMicros) / 1000000,
    conversions: parseFloat(result.metrics.conversions),
    conversion_value: parseFloat(result.metrics.conversionsValue),
    ctr: parseFloat(result.metrics.ctr) * 100,
    cost_per_click: parseInt(result.metrics.averageCpc) / 1000000,
    cpa: parseInt(result.metrics.costMicros) / 1000000 / Math.max(parseFloat(result.metrics.conversions), 1),
    roas: parseFloat(result.metrics.conversionsValue) / (parseInt(result.metrics.costMicros) / 1000000),
    conversion_rate: (parseFloat(result.metrics.conversions) / Math.max(parseInt(result.metrics.clicks), 1)) * 100
  }));
}

async function fetchMetaAdsCampaigns(accessToken: string, accountId: string) {
  const fields = [
    'id', 'name', 'status', 'objective',
    'impressions', 'clicks', 'spend', 'conversions',
    'conversion_values', 'ctr', 'cpc', 'frequency', 'reach'
  ].join(',');

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${accountId}/campaigns?fields=${fields}&time_range={"since":"30 days ago","until":"today"}`,
    {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  );

  if (!response.ok) throw new Error(`Meta Ads API error: ${response.statusText}`);
  
  const data = await response.json();
  return (data.data || []).map((campaign: any) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    channel: 'Social',
    status: campaign.status.toLowerCase(),
    objective: campaign.objective,
    impressions: parseInt(campaign.impressions || 0),
    clicks: parseInt(campaign.clicks || 0),
    spend: parseFloat(campaign.spend || 0),
    conversions: parseFloat(campaign.conversions || 0),
    conversion_value: parseFloat(campaign.conversion_values || 0),
    ctr: parseFloat(campaign.ctr || 0),
    cost_per_click: parseFloat(campaign.cpc || 0),
    frequency: parseFloat(campaign.frequency || 0),
    reach: parseInt(campaign.reach || 0),
    cpa: parseFloat(campaign.spend || 0) / Math.max(parseFloat(campaign.conversions || 0), 1),
    roas: parseFloat(campaign.conversion_values || 0) / Math.max(parseFloat(campaign.spend || 0), 1),
    conversion_rate: (parseFloat(campaign.conversions || 0) / Math.max(parseInt(campaign.clicks || 0), 1)) * 100
  }));
}

async function fetchLinkedInAdsCampaigns(accessToken: string, accountId: string) {
  const response = await fetch(
    `https://api.linkedin.com/v2/adCampaignsV2?q=search&search.account.values=List(${accountId})`,
    {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  );

  if (!response.ok) throw new Error(`LinkedIn Ads API error: ${response.statusText}`);
  
  const data = await response.json();
  return (data.elements || []).map((campaign: any) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    channel: 'Social',
    status: campaign.status.toLowerCase(),
    objective: campaign.objectiveType,
    // Note: LinkedIn requires additional API calls for metrics
    impressions: 0,
    clicks: 0,
    spend: 0,
    conversions: 0,
    conversion_value: 0,
    ctr: 0,
    cost_per_click: 0,
    cpa: 0,
    roas: 0,
    conversion_rate: 0
  }));
}

async function fetchTikTokAdsCampaigns(accessToken: string, advertiserId: string) {
  const response = await fetch(
    `https://business-api.tiktok.com/open_api/v1.3/campaign/get/?advertiser_id=${advertiserId}`,
    {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  );

  if (!response.ok) throw new Error(`TikTok Ads API error: ${response.statusText}`);
  
  const data = await response.json();
  return (data.data?.list || []).map((campaign: any) => ({
    campaign_id: campaign.campaign_id,
    campaign_name: campaign.campaign_name,
    channel: 'Social',
    status: campaign.operation_status.toLowerCase(),
    objective: campaign.objective_type,
    // Note: TikTok requires additional API calls for detailed metrics
    impressions: 0,
    clicks: 0,
    spend: 0,
    conversions: 0,
    conversion_value: 0,
    ctr: 0,
    cost_per_click: 0,
    cpa: 0,
    roas: 0,
    conversion_rate: 0
  }));
}

async function findAndStoreBenchmarks(
  supabase: any, 
  teamId: string, 
  campaigns: any[], 
  companyIndustry: any
) {
  if (!companyIndustry) return;

  // Build industry filter based on company hierarchy
  const industryFilters: string[] = [];
  if (companyIndustry.domain) industryFilters.push(`industry ILIKE '%${companyIndustry.domain}%'`);
  if (companyIndustry.category) industryFilters.push(`industry ILIKE '%${companyIndustry.category}%'`);
  if (companyIndustry.subcategory) industryFilters.push(`industry ILIKE '%${companyIndustry.subcategory}%'`);

  if (industryFilters.length === 0) return;

  // Find relevant benchmarks
  const { data: benchmarks } = await supabase
    .from('benchmarks')
    .select('*')
    .or(industryFilters.join(','));

  if (!benchmarks || benchmarks.length === 0) return;

  // Create benchmark comparisons for each campaign
  const benchmarkComparisons = [];

  for (const campaign of campaigns) {
    for (const benchmark of benchmarks) {
      // Match platform and calculate performance score
      if (benchmark.platform.toLowerCase() === campaign.platform.toLowerCase()) {
        const userValue = getUserValueForKPI(campaign, benchmark.kpi);
        
        if (userValue !== null && userValue !== undefined) {
          const percentile = calculatePercentile(userValue, benchmark);
          const score = calculatePerformanceScore(userValue, benchmark, benchmark.kpi);
          
          benchmarkComparisons.push({
            team_id: teamId,
            campaign_id: campaign.id,
            benchmark_id: benchmark.id,
            user_value: userValue,
            benchmark_percentile: percentile,
            performance_score: score
          });
        }
      }
    }
  }

  if (benchmarkComparisons.length > 0) {
    await supabase
      .from('campaign_benchmarks')
      .upsert(benchmarkComparisons, { onConflict: 'team_id,campaign_id,benchmark_id' });
  }
}

function getUserValueForKPI(campaign: any, kpi: string): number | null {
  switch (kpi.toLowerCase()) {
    case 'cpa': return campaign.cpa;
    case 'roas': return campaign.roas;
    case 'ctr': return campaign.ctr;
    case 'cpc': return campaign.cost_per_click;
    case 'cpm': return campaign.cost_per_mille;
    case 'cvr': return campaign.conversion_rate;
    default: return null;
  }
}

function calculatePercentile(userValue: number, benchmark: any): number {
  if (userValue <= benchmark.percentile_25) return 25;
  if (userValue <= benchmark.median) return 50;
  if (userValue <= benchmark.percentile_75) return 75;
  return 90;
}

function calculatePerformanceScore(userValue: number, benchmark: any, kpi: string): number {
  // For metrics where lower is better (CPA, CPC, CPM)
  const lowerIsBetter = ['cpa', 'cpc', 'cpm'].includes(kpi.toLowerCase());
  
  let score: number;
  
  if (lowerIsBetter) {
    if (userValue <= benchmark.percentile_25) score = 90;
    else if (userValue <= benchmark.median) score = 70;
    else if (userValue <= benchmark.percentile_75) score = 50;
    else score = 30;
  } else {
    // For metrics where higher is better (ROAS, CTR, CVR)
    if (userValue >= benchmark.percentile_75) score = 90;
    else if (userValue >= benchmark.median) score = 70;
    else if (userValue >= benchmark.percentile_25) score = 50;
    else score = 30;
  }
  
  return Math.max(1, Math.min(100, score));
}

function getChannelFromType(type: string): string {
  switch (type) {
    case 'SEARCH': return 'Search';
    case 'DISPLAY': return 'Display';
    case 'SHOPPING': return 'Shopping';
    case 'VIDEO': return 'Video';
    case 'PERFORMANCE_MAX': return 'Performance Max';
    default: return 'Other';
  }
}

async function logSync(supabase: any, userId: string, provider: string, status: string, message: string) {
  await supabase.from('sync_logs').insert({
    user_id: userId,
    provider,
    status,
    message
  });
}