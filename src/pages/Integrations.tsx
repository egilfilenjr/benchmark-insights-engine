import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import GA4IntegrationPanel from "@/components/integrations/GA4IntegrationPanel";
import AppLayout from "@/components/layout/AppLayout";

interface AccountData {
  id: string;
  name?: string;
  display_name?: string;
  region_code?: string;
  connected_at?: string;
}

interface SyncLog {
  provider: string;
  status: string;
  message: string;
  created_at: string;
}

interface IntegrationState {
  key: string;
  label: string;
  table: string;
  data: AccountData[];
  setData: React.Dispatch<React.SetStateAction<AccountData[]>>;
}

export default function IntegrationsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});
  const [gaAccounts, setGaAccounts] = useState<AccountData[]>([]);
  const [googleAds, setGoogleAds] = useState<AccountData[]>([]);
  const [metaAds, setMetaAds] = useState<AccountData[]>([]);
  const [linkedinAds, setLinkedinAds] = useState<AccountData[]>([]);
  const [tiktokAds, setTiktokAds] = useState<AccountData[]>([]);
  const [oauthMap, setOauthMap] = useState<Record<string, { connected_at: string; expires_at: string | null }>>({});
  const [syncLogMap, setSyncLogMap] = useState<Record<string, SyncLog[]>>({});
  const [showHistory, setShowHistory] = useState<Record<string, boolean>>({});

  const integrations: IntegrationState[] = [
    { key: "google_ads", label: "Google Ads", table: "google_ads_accounts", data: googleAds, setData: setGoogleAds },
    { key: "meta_ads", label: "Meta Ads", table: "meta_ads_accounts", data: metaAds, setData: setMetaAds },
    { key: "linkedin_ads", label: "LinkedIn Ads", table: "linkedin_ads_accounts", data: linkedinAds, setData: setLinkedinAds },
    { key: "tiktok_ads", label: "TikTok Ads", table: "tiktok_ads_accounts", data: tiktokAds, setData: setTiktokAds },
  ];

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);

      // Load sync logs
      const { data: syncLogs } = await supabase
        .from("sync_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const logMap: Record<string, SyncLog[]> = {};
      for (const log of syncLogs || []) {
        if (!logMap[log.provider]) logMap[log.provider] = [];
        logMap[log.provider].push(log);
      }
      setSyncLogMap(logMap);

      // Subscribe to new sync logs
      const channel = supabase
        .channel("realtime-sync-logs")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "sync_logs", filter: `user_id=eq.${user.id}` },
          (payload) => {
            const newLog = payload.new as SyncLog;
            setSyncLogMap((prev) => {
              const updated = [...(prev[newLog.provider] || [])];
              updated.unshift(newLog);
              return { ...prev, [newLog.provider]: updated };
            });
            setSyncing((prev) => ({ ...prev, [newLog.provider]: false }));
          }
        )
        .subscribe();

      // Load auth tokens with correct column names
      const { data: oauths } = await supabase
        .from("oauth_accounts")
        .select("platform, created_at, expires_at")
        .eq("user_id", user.id);

      const oauthMap = oauths?.reduce((acc, row) => {
        acc[row.platform] = {
          connected_at: row.created_at,
          expires_at: row.expires_at,
        };
        return acc;
      }, {} as Record<string, { connected_at: string; expires_at: string | null }>) ?? {};

      setOauthMap(oauthMap);

      // Load account data for existing tables only
      const existingTables = ["ga_accounts"]; // Only load tables that exist
      const validIntegrations = integrations.filter(i => existingTables.includes(i.table));
      
      await Promise.all(
        validIntegrations.map(async (i) => {
          const { data, error } = await supabase
            .from(i.table as "ga_accounts")
            .select("*")
            .eq("user_id", user.id);
          if (error) {
            console.error(`Error loading ${i.label}:`, error.message);
          } else {
            i.setData(data ?? []);
          }
        })
      );

      setLoading(false);

      return () => {
        supabase.removeChannel(channel);
      };
    };

    loadData();
  }, [user]);

  const handleResync = async (provider: string) => {
    setSyncing((prev) => ({ ...prev, [provider]: true }));

    const res = await fetch("/api/sync-integration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user?.id, provider }),
    });

    const text = await res.text();
    toast({
      title: res.ok ? `✅ Sync Started: ${provider.replace("_", " ")}` : `❌ Sync Failed`,
      description: text,
      variant: res.ok ? "default" : "destructive",
    });

    if (!res.ok) {
      setSyncing((prev) => ({ ...prev, [provider]: false }));
    }
  };

  const handleDisconnect = async (provider: string) => {
    const { error } = await supabase
      .from("oauth_accounts")
      .delete()
      .eq("user_id", user?.id)
      .eq("platform", provider);

    if (error) {
      toast({ title: `❌ Disconnect Failed`, description: error.message, variant: "destructive" });
    } else {
      toast({ title: `✅ Disconnected ${provider.replace("_", " ")}` });
      location.reload();
    }
  };

  const renderIntegration = (integration: IntegrationState) => {
    const { key, label, data } = integration;
    const oauth = oauthMap[key];
    const isConnected = !!oauth;
    const isExpired = oauth?.expires_at
      ? new Date(oauth.expires_at).getTime() < Date.now()
      : false;
    const logs = syncLogMap[key] ?? [];
    const latest = logs[0];
    const isSyncing = syncing[key];

    return (
      <Card key={key} className={cn(!isConnected && "opacity-50")}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{label}</CardTitle>
            <div className="flex gap-2">
              {isConnected && !isExpired && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleResync(key)}
                  disabled={isSyncing}
                >
                  {isSyncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  🔄 Re-sync
                </Button>
              )}
              {isConnected && isExpired && (
                <Button variant="default" size="sm">🔁 Reconnect</Button>
              )}
              {isConnected && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDisconnect(key)}
                >
                  ❌ Disconnect
                </Button>
              )}
            </div>
          </div>

          {latest && (
            <div className="mt-2 text-sm text-muted-foreground space-y-1">
              <p><strong>Status:</strong> {latest.status}</p>
              <p><strong>Message:</strong> {latest.message}</p>
              <p><strong>Last Sync:</strong> {new Date(latest.created_at).toLocaleString()}</p>
              {logs.length > 1 && (
                <button
                  className="text-xs text-blue-600 hover:underline"
                  onClick={() =>
                    setShowHistory((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                >
                  {showHistory[key] ? "Hide Sync History" : "Show Sync History"}
                </button>
              )}
            </div>
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

          {showHistory[key] && (
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground border-t pt-3">
              {logs.slice(1).map((log, idx) => (
                <li key={idx}>
                  <strong>{new Date(log.created_at).toLocaleString()}:</strong>{" "}
                  {log.status} — {log.message}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    );
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Please log in to view integrations.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
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
          <div className="space-y-6">
            {/* GA4 Integration - Featured */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Website Analytics</h2>
              <GA4IntegrationPanel />
            </div>

            {/* Other Integrations */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Advertising Platforms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integration) => renderIntegration(integration))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
