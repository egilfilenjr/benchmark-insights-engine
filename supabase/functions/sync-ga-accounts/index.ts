// supabase/functions/sync-ga-accounts/index.ts

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { user_id } = await req.json();
  if (!user_id) {
    return new Response("Missing user_id", { status: 400 });
  }

  const { data: oauth, error: tokenError } = await supabase
    .from("oauth_accounts")
    .select("access_token")
    .eq("user_id", user_id)
    .eq("provider", "google_analytics")
    .single();

  if (tokenError || !oauth?.access_token) {
    return new Response("Missing Google Analytics token", { status: 401 });
  }

  const gaRes = await fetch("https://analyticsadmin.googleapis.com/v1alpha/accounts", {
    headers: {
      Authorization: `Bearer ${oauth.access_token}`,
    },
  });

  if (!gaRes.ok) {
    const errorText = await gaRes.text();
    return new Response(`Failed to fetch GA accounts: ${errorText}`, { status: 400 });
  }

  const gaData = await gaRes.json();
  const accounts = gaData.accounts || [];

  const formatted = accounts.map((acc: any) => ({
    id: acc.name.replace("accounts/", ""),
    display_name: acc.displayName,
    region_code: acc.regionCode,
    user_id,
  }));

  const { error: insertError } = await supabase.from("ga_accounts").upsert(formatted);

  if (insertError) {
    return new Response(`Failed to save accounts: ${insertError.message}`, { status: 500 });
  }

  return new Response("GA accounts synced successfully", { status: 200 });
});
