
import { corsHeaders } from '../../../_shared/cors.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company_id, user_id } = await req.json();

    if (!company_id || !user_id) {
      return new Response(
        JSON.stringify({ error: 'Missing company_id or user_id' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // GA4 OAuth 2.0 parameters
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const redirectUri = `${Deno.env.get('SITE_URL')}/oauth/google_analytics/callback`;
    
    if (!clientId) {
      return new Response(
        JSON.stringify({ error: 'Google OAuth not configured' }),
        { status: 500, headers: corsHeaders }
      );
    }

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

    console.log('Generated GA4 OAuth URL for company:', company_id);

    return new Response(
      JSON.stringify({ auth_url: authUrl.toString() }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('GA4 OAuth start error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate OAuth URL' }),
      { status: 500, headers: corsHeaders }
    );
  }
});
