import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AccountData {
  id: string;
  name?: string;
  display_name?: string;
  region_code?: string;
  connected_at?: string;
}

interface IntegrationState {
  key: string;
  label: string;
  table: string;
  data: AccountData[];
  setData: React.Dispatch<React.SetStateAction<AccountData[]>>;
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

  const integrations: IntegrationState[] = [
    { key: "google_analytics", label: "Google Analytics", table: "ga_accounts", data: gaAccounts, setData: setGaAccounts },
    { key: "google_ads", label: "Google Ads", table: "google_ads_accounts", data: googleAds, setData: setGoogleAds },
    { key: "meta_ads", label: "Meta Ads", table: "meta_ads_accounts", data: metaAds, setData: setMetaAds },
    { key: "linkedin_ads", label: "LinkedIn Ads", table: "linkedin_ads_accounts", data: linkedinAds, setData: setLinkedinAds },
    { key: "tiktok_ads", label: "TikTok Ads", table: "tiktok_ads_accounts", data: tiktokAds, setData: setTiktokAds },
  ];

  const [oauthMap, setOauthMap] = useState<Record<string, string | null>>({});

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

      const { data: oauths } = await supabase
        .from("oauth_accounts")
        .select("provider, connected_at")
        .eq("user_id", user.id);

      const oauthMap = oauths?.reduce((acc, row) => {
        acc[row.provider] = row.connected_at;
        return acc;
      }, {} as Record<string, string | null>) || {};

      setOauthMap(oauthMap);

      await Promise.all(
        integrations.map(async (i) => {
          const tableData = await fetchTable(i.table);
          i.setData(tableData);
        })
      );

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

    const msg = await res.text();
    alert(res.ok ? `✅ Synced ${provider.replace("_", " ")}: ${msg}` : `❌ ${msg}`);
  };

  const handleDisconnect = async (provider: string) => {
    const { error } = await supabase
      .from("oauth_accounts")
      .delete()
      .eq("user_id", user?.id)
      .eq("provider", provider);

    if (error) {
      alert(`❌ Failed to disconnect ${provider}: ${error.message}`);
    } else {
      alert(`✅ Disconnected ${provider}`);
      location.reload(); // simple hard refresh
    }
  };

  const renderIntegration = (integration: IntegrationState) => {
    const { key, label, data } = integration;
    const isConnected = !!oauthMap[key];
    const lastSync = oauthMap[key]
      ? new Date(oauthMap[key]!).toLocaleString()
      : null;

    return (
      <Card key={key} className={cn(!isConnected && "opacity-50")}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{label}</CardTitle>
            {isConnected && (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleResync(key)}
                >
                  🔄 Re-sync
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDisconnect(key)}
                >
                  ❌ Disconnect
                </Button>
              </div>
            )}
          </div>
          {isConnected && lastSync && (
            <p className="text-xs text-muted-foreground mt-1">
              Last synced: {lastSync}
            </p>
          )}
          {!isConnected && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              Not connected
            </p>
          )}
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
              <li className="text-xs italic">No synced accounts.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    );
  };

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
          {integrations.map((integration) => renderIntegration(integration))}
        </div>
      )}
    </div>
  );
}
