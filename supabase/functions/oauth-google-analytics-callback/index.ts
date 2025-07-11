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
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Connection Failed</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-error',
                  message: 'Google Analytics connection failed: ${error}'
                }, '*');
                window.close();
              } else {
                window.location.href = '${Deno.env.get('SITE_URL') || 'https://135dde5f-b7de-4cca-bb37-4a7c8ea5a8e2.lovableproject.com'}/integrations?error=${encodeURIComponent(error)}';
              }
            </script>
            <div style="text-align: center; padding: 50px; font-family: Arial;">
              <h2>❌ Connection Failed</h2>
              <p>This window will close automatically...</p>
            </div>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    if (!code || !state) {
      console.error('❌ Missing code or state parameter');
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Missing Parameters</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-error',
                  message: 'Missing authorization parameters'
                }, '*');
                window.close();
              }
            </script>
            <div style="text-align: center; padding: 50px; font-family: Arial;">
              <h2>❌ Missing Parameters</h2>
              <p>This window will close automatically...</p>
            </div>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Decode state to get company_id and user_id
    const stateData = JSON.parse(atob(state));
    const { company_id, user_id } = stateData;

    console.log('Decoded state:', { company_id, user_id });

    // Get the user's actual team_id from team_members table
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: teamMember, error: teamError } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', user_id)
      .single();

    if (teamError || !teamMember) {
      console.error('❌ Failed to find user team:', teamError);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Team Not Found</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-error',
                  message: 'User team not found'
                }, '*');
                window.close();
              }
            </script>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    const team_id = teamMember.team_id;
    console.log('✅ Found user team_id:', team_id);

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
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Token Exchange Failed</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-error',
                  message: 'Failed to exchange authorization code'
                }, '*');
                window.close();
              }
            </script>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    const tokens = await tokenResponse.json();
    console.log('✅ Tokens received:', { access_token: !!tokens.access_token, refresh_token: !!tokens.refresh_token });

    // Get GA4 properties using the correct API endpoint
    const propertiesResponse = await fetch('https://analyticsadmin.googleapis.com/v1alpha/accountSummaries', {
      headers: {
        'Authorization': `Bearer ${tokens.access_token}`,
      },
    });

    if (!propertiesResponse.ok) {
      const propertiesError = await propertiesResponse.text();
      console.error('❌ Failed to fetch GA4 properties:', propertiesError);
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Properties Fetch Failed</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-error',
                  message: 'Failed to fetch GA4 properties'
                }, '*');
                window.close();
              }
            </script>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    const propertiesData = await propertiesResponse.json();
    console.log('📊 Raw GA4 response:', JSON.stringify(propertiesData, null, 2));
    
    // Google Analytics Admin API returns accountSummaries with propertySummaries
    const accountSummaries = propertiesData.accountSummaries || [];
    const properties = accountSummaries.length > 0 ? accountSummaries[0].propertySummaries || [] : [];
    console.log('✅ GA4 properties fetched:', properties.length);

    // If no properties found, show error
    if (properties.length === 0) {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>No GA4 Properties Found</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
              .error { color: #dc2626; background: #fef2f2; padding: 20px; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="error">
              <h2>❌ No Google Analytics 4 Properties Found</h2>
              <p>We couldn't find any GA4 properties in your Google Analytics account. Please make sure you have:</p>
              <ul>
                <li>Created a GA4 property in your Google Analytics account</li>
                <li>Have the necessary permissions to access the property</li>
              </ul>
              <button onclick="window.close()">Close</button>
            </div>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // If only one property, auto-select it
    if (properties.length === 1) {
      const property = properties[0];
      const propertyId = property.property?.split('/')[1] || 'unknown';
      
      const { error } = await saveOAuthAccount(supabase, user_id, team_id, tokens, propertyId, property.displayName, properties);
      
      if (error) {
        console.error('❌ Failed to save OAuth account:', error);
        const html = `
          <!DOCTYPE html>
          <html>
            <head><title>Storage Failed</title></head>
            <body>
              <script>
                if (window.opener) {
                  window.opener.postMessage({
                    type: 'oauth-error',
                    message: 'Failed to save connection'
                  }, '*');
                  window.close();
                }
              </script>
            </body>
          </html>
        `;
        return new Response(html, { headers: { 'Content-Type': 'text/html' } });
      }
      
      const html = `
        <!DOCTYPE html>
        <html>
          <head><title>Google Analytics Connected</title></head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'oauth-success',
                  provider: 'google_analytics'
                }, '*');
                window.close();
              }
            </script>
            <div style="text-align: center; padding: 50px; font-family: Arial;">
              <h2>✅ Google Analytics Connected!</h2>
              <p>Property: ${property.displayName}</p>
              <p>This window will close automatically...</p>
            </div>
          </body>
        </html>
      `;
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Multiple properties - show selection page
    const propertiesListHtml = properties.map(property => {
      const propertyId = property.property?.split('/')[1] || 'unknown';
      return `
        <div class="property-option" onclick="selectProperty('${propertyId}', '${property.displayName?.replace(/'/g, "\\'")}')">
          <h3>${property.displayName}</h3>
          <p>Property ID: ${propertyId}</p>
        </div>
      `;
    }).join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Select GA4 Property</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px; 
              background: #f9fafb;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .property-option {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              margin: 10px 0;
              cursor: pointer;
              transition: all 0.2s;
            }
            .property-option:hover {
              border-color: #3b82f6;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
            }
            .property-option h3 {
              margin: 0 0 10px 0;
              color: #1f2937;
            }
            .property-option p {
              margin: 0;
              color: #6b7280;
              font-size: 14px;
            }
            .loading {
              display: none;
              text-align: center;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📊 Select Your GA4 Property</h1>
            <p>Choose which Google Analytics property you'd like to connect:</p>
          </div>
          
          <div id="properties">
            ${propertiesListHtml}
          </div>
          
          <div id="loading" class="loading">
            <p>Connecting property...</p>
          </div>

          <script>
            async function selectProperty(propertyId, propertyName) {
              document.getElementById('properties').style.display = 'none';
              document.getElementById('loading').style.display = 'block';
              
              try {
                const response = await fetch('https://wirxvaxlqdbivfhovrnc.supabase.co/functions/v1/oauth-google-analytics-complete', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    user_id: '${user_id}',
                    team_id: '${team_id}',
                    property_id: propertyId,
                    property_name: propertyName,
                    access_token: '${tokens.access_token}',
                    refresh_token: '${tokens.refresh_token}',
                    expires_in: ${tokens.expires_in || 3600},
                    all_properties: ${JSON.stringify(properties).replace(/'/g, "\\'")}
                  })
                });
                
                if (response.ok) {
                  if (window.opener) {
                    window.opener.postMessage({
                      type: 'oauth-success',
                      provider: 'google_analytics'
                    }, '*');
                    window.close();
                  }
                } else {
                  throw new Error('Failed to save property selection');
                }
              } catch (error) {
                alert('Error connecting property: ' + error.message);
                document.getElementById('properties').style.display = 'block';
                document.getElementById('loading').style.display = 'none';
              }
            }
          </script>
        </body>
      </html>
    `;

    return new Response(html, { headers: { 'Content-Type': 'text/html' } });

  } catch (error) {
    console.error('❌ GA4 OAuth callback error:', error);
    const html = `
      <!DOCTYPE html>
      <html>
        <head><title>OAuth Error</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: 'oauth-error',
                message: 'OAuth callback failed'
              }, '*');
              window.close();
            }
          </script>
        </body>
      </html>
    `;
    return new Response(html, { headers: { 'Content-Type': 'text/html' } });
  }
});