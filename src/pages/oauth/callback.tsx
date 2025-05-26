
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session?.user) {
        console.error("❌ Failed to retrieve user session:", error?.message);
        navigate("/login");
        return;
      }

      const userId = session.user.id;
      const provider = session.user.app_metadata?.provider || "unknown";
      const providerAccessToken = session.provider_token || null;
      const providerRefreshToken = session.provider_refresh_token || null;

      // Try to infer expiration (optional)
      const expiresIn = session.expires_in || null;
      const expiresAt = expiresIn
        ? new Date(Date.now() + expiresIn * 1000).toISOString()
        : null;

      // Get team_id (assuming user has a team)
      const { data: teamData } = await supabase
        .from("team_members")
        .select("team_id")
        .eq("user_id", userId)
        .single();

      const teamId = teamData?.team_id;

      if (!teamId) {
        console.error("❌ No team found for user");
        navigate("/onboarding");
        return;
      }

      // Avoid duplicate inserts
      const { data: existing } = await supabase
        .from("oauth_accounts")
        .select("id")
        .eq("user_id", userId)
        .eq("platform", provider)
        .maybeSingle();

      if (!existing) {
        const { error: insertError } = await supabase.from("oauth_accounts").insert({
          user_id: userId,
          team_id: teamId,
          platform: provider,
          access_token: providerAccessToken,
          refresh_token: providerRefreshToken,
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

      navigate("/onboarding");
    };

    processOAuth();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-muted-foreground">
      Finalizing integration...
    </div>
  );
}
