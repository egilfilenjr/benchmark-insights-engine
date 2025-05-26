// src/pages/oauth/callback.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const processOAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ OAuth callback error:", error.message);
        router.push("/login");
        return;
      }

      if (!session?.user) {
        console.warn("⚠️ No user session found after OAuth");
        router.push("/login");
        return;
      }

      console.log("✅ OAuth session established:", session.user.email);

      // OPTIONAL: Track recent connection via metadata or Supabase insert

      router.push("/onboarding");
    };

    processOAuth();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center text-muted-foreground">
      Completing OAuth connection...
    </div>
  );
}
