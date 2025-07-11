import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async (req) => {
  console.log('🔄 GA4 OAuth callback function called');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔄 Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    console.log('OAuth callback params:', { code: !!code, state: !!state, error });

    if (error) {
      console.error('❌ OAuth error:', error);
      return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=${encodeURIComponent(error)}`, 302);
    }

    if (!code || !state) {
      console.error('❌ Missing code or state parameter');
      return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=missing_parameters`, 302);
    }

    // Decode state to get company_id and user_id
    const stateData = JSON.parse(atob(state));
    const { company_id, user_id } = stateData;

    console.log('Decoded state:', { company_id, user_id });

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: Deno.env.get('GOOGLE_CLIENT_ID')!,
        client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET')!,
        code,
        redirect_uri: `https://wirxvaxlqdbivfhovrnc.supabase.co/functions/v1/oauth-google-analytics-callback`,
      }),
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.text();
      console.error('❌ Token exchange failed:', tokenError);
      return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=token_exchange_failed`, 302);
    }

    const tokens = await tokenResponse.json();
    console.log('✅ Tokens received:', { access_token: !!tokens.access_token, refresh_token: !!tokens.refresh_token });

    // Get GA4 properties
    const propertiesResponse = await fetch('https://analyticsadmin.googleapis.com/v1alpha/accountSummaries', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });

    if (!propertiesResponse.ok) {
      const propertiesError = await propertiesResponse.text();
      console.error('❌ Failed to fetch GA4 properties:', propertiesError);
      return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=properties_fetch_failed`, 302);
    }

    const propertiesData = await propertiesResponse.json();
    const accountSummaries = propertiesData.accountSummaries || [];
    const properties = accountSummaries.length > 0 ? accountSummaries[0].propertySummaries || [] : [];
    console.log('✅ GA4 properties fetched:', properties.length);

    // Store OAuth account in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // First, delete any existing Google Analytics connection for this user
    const { error: deleteError } = await supabase
      .from('oauth_accounts')
      .delete()
      .eq('user_id', user_id)
      .eq('provider', 'google_analytics');
    
    if (deleteError) {
      console.warn('⚠️ Warning deleting old connection:', deleteError);
    }
    
    // Insert new connection
    const { error: insertError } = await supabase
      .from('oauth_accounts')
      .insert({
        user_id,
        team_id: company_id,
        provider: 'google_analytics',
        platform: 'google_analytics',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000).toISOString() : null,
        status: 'active',
        connected_at: new Date().toISOString(),
        account_id: properties.length > 0 ? properties[0].name : 'unknown',
        account_name: properties.length > 0 ? properties[0].displayName : 'GA4 Property',
        scope_json: { properties: properties.map((p: any) => ({ id: p.name, displayName: p.displayName })) }
      });

    if (insertError) {
      console.error('❌ Failed to store OAuth account:', insertError);
      return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=storage_failed`, 302);
    }

    console.log('✅ OAuth account stored successfully');

    // Trigger initial GA4 sync
    try {
      await supabase.functions.invoke('jobs/sync_ga4', {
        body: { 
          user_id, 
          job_type: 'full_sync',
          date_range: 'last_30_days'
        }
      });
      console.log('✅ Initial GA4 sync triggered');
    } catch (syncError) {
      console.warn('⚠️ Initial sync failed, but OAuth connection was successful:', syncError);
    }

    // Redirect back to integrations page with success
    return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?success=ga4_connected`, 302);

  } catch (error) {
    console.error('❌ GA4 OAuth callback error:', error);
    return Response.redirect(`${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=callback_failed`, 302);
  }
});