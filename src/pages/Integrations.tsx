import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AccountData {
  id: string;
  name?: string;
  display_name?: string;
  region_code?: string;
}

export default function IntegrationsPage() {
  const user = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [gaAccounts, setGaAccounts] = useState<AccountData[]>([]);
  const [googleAds, setGoogleAds] = useState<AccountData[]>([]);
  const [metaAds, setMetaAds] = useState<AccountData[]>([]);
  const [linkedinAds, setLinkedinAds] = useState<AccountData[]>([]);
  const [tiktokAds, setTiktokAds] = useState<AccountData[]>([]);

  useEffect(() => {
    if (!user) return;

    const loadAccounts = async () => {
      setLoading(true);
      const fetchTable = async (table: string) => {
        const { data, error } = await supabase
          .from(table)
          .select("*")
          .eq("user_id", user.id);
        if (error) {
          console.error(`Error loading ${table}:`, error.message);
          return [];
        }
        return data;
      };

      const [ga, ads, meta, linkedin, tiktok] = await Promise.all([
        fetchTable("ga_accounts"),
        fetchTable("google_ads_accounts"),
        fetchTable("meta_ads_accounts"),
        fetchTable("linkedin_ads_accounts"),
        fetchTable("tiktok_ads_accounts"),
      ]);

      setGaAccounts(ga);
      setGoogleAds(ads);
      setMetaAds(meta);
      setLinkedinAds(linkedin);
      setTiktokAds(tiktok);
      setLoading(false);
    };

    loadAccounts();
  }, [user]);

  const handleResync = async (provider: string) => {
    const res = await fetch("/api/sync-integration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user?.id, provider }),
    });

    const text = await res.text();
    alert(res.ok ? `✅ Synced ${provider.replace("_", " ")}: ${text}` : `❌ ${text}`);
  };

  const renderIntegration = (title: string, data: AccountData[], providerKey: string) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          {data.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleResync(providerKey)}
            >
              🔄 Re-sync
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-muted-foreground space-y-1">
          {data.map((acc) => (
            <li key={acc.id} className="border-b pb-1">
              <strong>{acc.display_name || acc.name || acc.id}</strong>{" "}
              {acc.region_code && <span className="text-xs">({acc.region_code})</span>}
            </li>
          ))}
          {data.length === 0 && (
            <li className="text-xs italic">No accounts synced.</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">🔌 Connected Integrations</h1>
        <Button variant="outline" onClick={() => navigate("/integrations/info")}>
          View Supported Integrations
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading integrations...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderIntegration("Google Analytics", gaAccounts, "google_analytics")}
          {renderIntegration("Google Ads", googleAds, "google_ads")}
          {renderIntegration("Meta Ads", metaAds, "meta_ads")}
          {renderIntegration("LinkedIn Ads", linkedinAds, "linkedin_ads")}
          {renderIntegration("TikTok Ads", tiktokAds, "tiktok_ads")}
        </div>
      )}
    </div>
  );
}
