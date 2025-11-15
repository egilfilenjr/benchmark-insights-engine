
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session?.user) {
          console.error("❌ Failed to retrieve user session:", error?.message);
          toast({
            title: "Authentication Error",
            description: "Failed to complete OAuth connection",
            variant: "destructive"
          });
          navigate("/login");
          return;
        }

        const userId = session.user.id;
        const provider = session.user.app_metadata?.provider || "unknown";
        const providerAccessToken = session.provider_token || null;
        const providerRefreshToken = session.provider_refresh_token || null;

        // Calculate expiration time
        const expiresIn = session.expires_in || null;
        const expiresAt = expiresIn
          ? new Date(Date.now() + expiresIn * 1000).toISOString()
          : null;

        console.log("Processing OAuth for provider:", provider);

        // Get team_id (assuming user has a team)
        const { data: teamData } = await supabase
          .from("team_members")
          .select("team_id")
          .eq("user_id", userId)
          .single();

        const teamId = teamData?.team_id || "default-team";

        // Check for existing connection
        const { data: existing } = await supabase
          .from("oauth_accounts")
          .select("id")
          .eq("user_id", userId)
          .eq("provider", provider)
          .maybeSingle();

        if (!existing) {
          const { error: insertError } = await supabase.from("oauth_accounts").insert({
            user_id: userId,
            team_id: teamId,
            platform: provider,
            provider: provider, // Now required by the schema
            access_token: providerAccessToken,
            refresh_token: providerRefreshToken,
            expires_at: expiresAt,
            status: 'active'
          });

          if (insertError) {
            console.error("❌ Failed to insert into oauth_accounts:", insertError.message);
            toast({
              title: "Database Error",
              description: "Failed to save OAuth connection",
              variant: "destructive"
            });
          } else {
            console.log("✅ Saved new integration:", provider);
            toast({
              title: "Integration Connected",
              description: `Successfully connected ${provider}`,
            });
            
            // Trigger initial sync
            setTimeout(() => {
              syncIntegrationData(userId, provider);
            }, 1000);
          }
        } else {
          // Update existing connection
          const { error: updateError } = await supabase
            .from("oauth_accounts")
            .update({
              access_token: providerAccessToken,
              refresh_token: providerRefreshToken,
              expires_at: expiresAt,
              status: 'active'
            })
            .eq("id", existing.id);

          if (updateError) {
            console.error("❌ Failed to update oauth_accounts:", updateError.message);
          } else {
            console.log("✅ Updated existing integration:", provider);
            toast({
              title: "Integration Updated",
              description: `Successfully updated ${provider} connection`,
            });
          }
        }

        navigate("/integrations");
      } catch (error) {
        console.error("❌ OAuth processing error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to process OAuth callback",
          variant: "destructive"
        });
        navigate("/integrations");
      }
    };

    const syncIntegrationData = async (userId: string, provider: string) => {
      try {
        const response = await fetch("/api/sync-integration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, provider }),
        });

        if (response.ok) {
          console.log("✅ Initial sync triggered for", provider);
        }
      } catch (error) {
        console.error("❌ Failed to trigger initial sync:", error);
      }
    };

    processOAuth();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Finalizing integration...</p>
      </div>
    </div>
  );
}
