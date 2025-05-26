// src/pages/oauth/callback.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const processOAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session?.user) {
        console.error("❌ Failed to retrieve user session:", error?.message);
        router.push("/login");
        return;
      }

      const userId = session.user.id;
      const provider = session.user.app_metadata?.provider || "unknown";
      const providerAccessToken = session.provider_token || null;
      const providerRefreshToken = session.provider_refresh_token || null;

      // Try to infer scope and expiration (optional)
      const expiresIn = session.expires_in || null;
      const expiresAt = expiresIn
        ? new Date(Date.now() + expiresIn * 1000).toISOString()
        : null;

      // Avoid duplicate inserts
      const { data: existing } = await supabase
        .from("oauth_accounts")
        .select("id")
        .eq("user_id", userId)
        .eq("provider", provider)
        .maybeSingle();

      if (!existing) {
        const { error: insertError } = await supabase.from("oauth_accounts").insert({
          user_id: userId,
          provider,
          access_token: providerAccessToken,
          refresh_token: providerRefreshToken,
          scope: session.scope || null,
          expires_at: expiresAt,
        });

        if (insertError) {
          console.error("❌ Failed to insert into oauth_accounts:", insertError.message);
        } else {
          console.log("✅ Saved new integration:", provider);
        }
      } else {
        console.log("ℹ️ Integration already connected:", provider);
      }

      router.push("/onboarding");
    };

    processOAuth();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center text-muted-foreground">
      Finalizing integration...
    </div>
  );
}
