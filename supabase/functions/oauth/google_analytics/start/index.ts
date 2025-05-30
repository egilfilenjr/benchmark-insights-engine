
import { corsHeaders } from '../../../_shared/cors.ts';

Deno.serve(async (req) => {
  console.log('🚀 GA4 OAuth start function called');
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('🔄 Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📥 Reading request body...');
    const { company_id, user_id } = await req.json();
    console.log('Request data:', { company_id, user_id });

    if (!company_id || !user_id) {
      console.error('❌ Missing required parameters');
      return new Response(
        JSON.stringify({ error: 'Missing company_id or user_id' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // GA4 OAuth 2.0 parameters
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
    
    console.log('Environment check:', {
      hasClientId: !!clientId,
      hasSiteUrl: !!siteUrl,
      siteUrl
    });
    
    if (!clientId) {
      console.error('❌ GOOGLE_CLIENT_ID not configured');
      return new Response(
        JSON.stringify({ error: 'Google OAuth not configured - missing GOOGLE_CLIENT_ID' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const redirectUri = `${siteUrl}/functions/v1/oauth/google_analytics/callback`;
    console.log('Redirect URI:', redirectUri);

    const scope = 'https://www.googleapis.com/auth/analytics.readonly';
    const state = btoa(JSON.stringify({ company_id, user_id, provider: 'google_analytics' }));
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');

    console.log('✅ Generated GA4 OAuth URL for company:', company_id);
    console.log('Auth URL:', authUrl.toString());

    return new Response(
      JSON.stringify({ auth_url: authUrl.toString() }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('❌ GA4 OAuth start error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate OAuth URL',
        details: error.message 
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
