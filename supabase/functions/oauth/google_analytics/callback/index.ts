
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../../../_shared/cors.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

Deno.serve(async (req) => {
  console.log('🔄 GA4 OAuth callback triggered');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    console.log('📥 Callback params:', { hasCode: !!code, hasState: !!state, error });

    if (error) {
      console.error('❌ GA4 OAuth error:', error);
      const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
      return Response.redirect(`${siteUrl}/integrations?error=${error}`);
    }

    if (!code || !state) {
      console.error('❌ Missing code or state parameters');
      const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
      return Response.redirect(`${siteUrl}/integrations?error=missing_params`);
    }

    // Decode state
    let stateData;
    try {
      stateData = JSON.parse(atob(state));
      console.log('📊 Decoded state:', stateData);
    } catch (err) {
      console.error('❌ Failed to decode state:', err);
      const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
      return Response.redirect(`${siteUrl}/integrations?error=invalid_state`);
    }

    const { company_id, user_id } = stateData;

    // Exchange code for tokens
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const redirectUri = `${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/functions/v1/oauth/google_analytics/callback`;

    console.log('🔄 Exchanging code for tokens...');
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const tokens = await tokenResponse.json();
    console.log('🎫 Token response:', { hasAccessToken: !!tokens.access_token, hasRefreshToken: !!tokens.refresh_token });

    if (!tokens.access_token) {
      console.error('❌ Failed to get access token:', tokens);
      const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
      return Response.redirect(`${siteUrl}/integrations?error=token_exchange_failed`);
    }

    // Get GA4 properties for this user
    console.log('📊 Fetching GA4 properties...');
    const propertiesResponse = await fetch(
      'https://analyticsadmin.googleapis.com/v1alpha/accountSummaries',
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );

    const propertiesData = await propertiesResponse.json();
    console.log('🏢 Properties data:', propertiesData);
    
    const properties = propertiesData.accountSummaries?.[0]?.propertySummaries || [];

    // For now, use the first property or create a placeholder
    const primaryProperty = properties[0] || { property: 'properties/placeholder', displayName: 'Default Property' };
    const propertyId = primaryProperty.property.split('/')[1];

    // Store OAuth tokens
    console.log('💾 Storing OAuth tokens in database...');
    const { error: dbError } = await supabase
      .from('oauth_accounts')
      .upsert({
        user_id,
        team_id: company_id,
        platform: 'google_analytics',
        provider: 'google_analytics',
        account_id: propertyId,
        account_name: primaryProperty.displayName,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + (tokens.expires_in || 3600) * 1000).toISOString(),
        scope_json: { scopes: ['https://www.googleapis.com/auth/analytics.readonly'] },
        status: 'active',
        connected_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,platform'
      });

    if (dbError) {
      console.error('❌ Database error:', dbError);
      const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
      return Response.redirect(`${siteUrl}/integrations?error=database_error`);
    }

    // Trigger initial backfill job
    console.log('🚀 Triggering initial sync job...');
    try {
      await supabase.functions.invoke('jobs/sync_ga4', {
        body: { 
          user_id, 
          company_id, 
          job_type: 'initial_backfill',
          days_back: 30 
        }
      });
    } catch (syncError) {
      console.error('⚠️ Failed to trigger sync job:', syncError);
      // Don't fail the entire flow if sync job fails
    }

    console.log('✅ GA4 OAuth completed for user:', user_id);
    const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
    return Response.redirect(`${siteUrl}/integrations?success=ga4_connected`);

  } catch (error) {
    console.error('❌ GA4 OAuth callback error:', error);
    const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
    return Response.redirect(`${siteUrl}/integrations?error=callback_failed`);
  }
});
