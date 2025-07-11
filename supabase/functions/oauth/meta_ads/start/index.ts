import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user_id, company_id } = await req.json();
    
    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "Missing user_id" }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientId = Deno.env.get('META_APP_ID');
    const redirectUri = `${Deno.env.get('PROJECT_URL')}/functions/v1/oauth/meta_ads/callback`;
    
    if (!clientId) {
      return new Response(
        JSON.stringify({ error: "Meta OAuth not configured" }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const scope = 'ads_management,ads_read,business_management';
    const state = btoa(JSON.stringify({ user_id, company_id, provider: 'meta_ads' }));
    
    const authUrl = new URL('https://www.facebook.com/dialog/oauth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('state', state);

    return new Response(
      JSON.stringify({ auth_url: authUrl.toString() }), 
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('OAuth start error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});