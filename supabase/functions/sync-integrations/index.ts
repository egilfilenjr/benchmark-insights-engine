import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("PROJECT_URL")!,
    Deno.env.get("SERVICE_ROLE_KEY")!
  );

  try {
    const { user_id, provider } = await req.json();
    if (!user_id || !provider) {
      return new Response("Missing user_id or provider", { status: 400 });
    }

    // Retrieve OAuth token
    const { data: oauth, error: tokenError } = await supabase
      .from("oauth_accounts")
      .select("access_token")
      .eq("user_id", user_id)
      .eq("provider", provider)
      .single();

    if (tokenError || !oauth?.access_token) {
      await supabase.from("sync_logs").insert({
        user_id,
        provider,
        status: "error",
        message: "Missing or invalid OAuth token",
      });
      return new Response("Missing or invalid OAuth token", { status: 401 });
    }

    let apiUrl = "";
    let tableName = "";
    let processData: (data: any) => any[] = () => [];

    switch (provider) {
      case "google_analytics":
        apiUrl = "https://analyticsadmin.googleapis.com/v1alpha/accounts";
        tableName = "ga_accounts";
        processData = (data) =>
          data.accounts.map((acc: any) => ({
            id: acc.name.replace("accounts/", ""),
            display_name: acc.displayName,
            region_code: acc.regionCode,
            user_id,
          }));
        break;

      case "google_ads":
        apiUrl = "https://googleads.googleapis.com/v14/customers:listAccessibleCustomers";
        tableName = "google_ads_accounts";
        processData = (data) =>
          data.resourceNames.map((name: string) => ({
            id: name.replace("customers/", ""),
            user_id,
          }));
        break;

      case "meta_ads":
        apiUrl = "https://graph.facebook.com/v18.0/me/adaccounts";
        tableName = "meta_ads_accounts";
        processData = (data) =>
          data.data.map((acc: any) => ({
            id: acc.id,
            name: acc.name,
            user_id,
          }));
        break;

      case "linkedin_ads":
        apiUrl = "https://api.linkedin.com/v2/adAccountsV2";
        tableName = "linkedin_ads_accounts";
        processData = (data) =>
          data.elements.map((acc: any) => ({
            id: acc.id,
            name: acc.name,
            user_id,
          }));
        break;

      case "tiktok_ads":
        apiUrl = "https://business-api.tiktok.com/open_api/v1.3/advertiser/info/";
        tableName = "tiktok_ads_accounts";
        processData = (data) =>
          data.data.list.map((acc: any) => ({
            id: acc.advertiser_id,
            name: acc.advertiser_name,
            user_id,
          }));
        break;

      default:
        return new Response("Unsupported provider", { status: 400 });
    }

    // Fetch data from provider API
    const apiRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${oauth.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();

      await supabase.from("sync_logs").insert({
        user_id,
        provider,
        status: "error",
        message: `Failed API fetch: ${errorText}`,
      });

      return new Response(`Failed to fetch data: ${errorText}`, { status: 400 });
    }

    const responseData = await apiRes.json();
    const formattedData = processData(responseData);

    // Insert or update accounts in Supabase
    const { error: insertError } = await supabase
      .from(tableName)
      .upsert(formattedData);

    if (insertError) {
      await supabase.from("sync_logs").insert({
        user_id,
        provider,
        status: "error",
        message: `Database upsert failed: ${insertError.message}`,
      });

      return new Response(`Failed to save accounts: ${insertError.message}`, { status: 500 });
    }

    // Log success
    await supabase.from("sync_logs").insert({
      user_id,
      provider,
      status: "success",
      message: `Synced ${formattedData.length} accounts successfully.`,
    });

    return new Response("Data synced successfully", { status: 200 });
  } catch (error) {
    await supabase.from("sync_logs").insert({
      user_id: "unknown",
      provider: "unknown",
      status: "error",
      message: `Unhandled error: ${error.message}`,
    });

    return new Response(`Error: ${error.message}`, { status: 500 });
  }
});
