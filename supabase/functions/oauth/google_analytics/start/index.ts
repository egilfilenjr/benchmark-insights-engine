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
    const requestBody = await req.text();
    console.log('Raw request body:', requestBody);
    
    const { company_id, user_id } = JSON.parse(requestBody || '{}');
    console.log('Parsed request data:', { company_id, user_id });

    if (!company_id || !user_id) {
      console.error('❌ Missing required parameters');
      return new Response(
        JSON.stringify({ error: 'Missing company_id or user_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for environment variables
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const siteUrl = Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com';
    
    console.log('Environment check:', {
      hasClientId: !!clientId,
      clientIdLength: clientId?.length || 0,
      siteUrl: siteUrl
    });
    
    if (!clientId) {
      console.error('❌ GOOGLE_CLIENT_ID not configured in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'Google OAuth not configured - missing GOOGLE_CLIENT_ID',
          debug: 'Please add GOOGLE_CLIENT_ID to Supabase Edge Function secrets'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the redirect URI - this needs to match what's configured in Google Cloud Console
    const redirectUri = `https://wirxvaxlqdbivfhovrnc.supabase.co/functions/v1/oauth/google_analytics/callback`;
    console.log('Redirect URI:', redirectUri);

    // Google Analytics scope for read-only access
    const scope = 'https://www.googleapis.com/auth/analytics.readonly';
    const state = btoa(JSON.stringify({ company_id, user_id, provider: 'google_analytics' }));
    
    // Build the Google OAuth URL
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');

    console.log('✅ Generated GA4 OAuth URL successfully');
    console.log('Auth URL (first 100 chars):', authUrl.toString().substring(0, 100) + '...');

    return new Response(
      JSON.stringify({ 
        auth_url: authUrl.toString(),
        debug: 'OAuth URL generated successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ GA4 OAuth start error:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate OAuth URL',
        details: error.message,
        type: error.name
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});