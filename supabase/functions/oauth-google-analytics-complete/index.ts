import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Helper function to save OAuth account
async function saveOAuthAccount(supabase: any, user_id: string, team_id: string, tokens: any, propertyId: string, propertyName: string, allProperties: any[]) {
  const oauthData = {
    user_id,
    team_id,
    provider: 'google_analytics',
    platform: 'google_analytics',
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: tokens.expires_in ? new Date(Date.now() + tokens.expires_in * 1000).toISOString() : null,
    status: 'active',
    connected_at: new Date().toISOString(),
    account_id: propertyId,
    account_name: propertyName,
    scope_json: { 
      properties: allProperties.map((p: any) => ({ 
        id: p.property, 
        displayName: p.displayName 
      })),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
      selected_property: propertyId
    }
  };

  const { error } = await supabase
    .from('oauth_accounts')
    .upsert(oauthData, {
      onConflict: 'user_id,provider'
    });

  return { error };
}

Deno.serve(async (req) => {
  console.log('🔄 GA4 OAuth completion function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { user_id, team_id, property_id, property_name, access_token, refresh_token, expires_in, all_properties } = requestData;

    console.log('📝 Completing GA4 OAuth with property:', { property_id, property_name });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Save the OAuth account with selected property
    const tokens = { access_token, refresh_token, expires_in };
    const { error } = await saveOAuthAccount(supabase, user_id, team_id, tokens, property_id, property_name, all_properties);

    if (error) {
      console.error('❌ Failed to save OAuth account:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save property selection' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('✅ GA4 OAuth completed with property:', property_name);

    // Trigger initial GA4 sync
    try {
      await supabase.functions.invoke('jobs/sync_ga4', {
        body: { 
          user_id, 
          property_id,
          job_type: 'full_sync',
          date_range: 'last_30_days'
        }
      });
      console.log('✅ Initial GA4 sync triggered');
    } catch (syncError) {
      console.warn('⚠️ Initial sync failed, but OAuth connection was successful:', syncError);
    }

    return new Response(
      JSON.stringify({ success: true, property_name }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('❌ GA4 OAuth completion error:', error);
    return new Response(
      JSON.stringify({ error: 'OAuth completion failed' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});