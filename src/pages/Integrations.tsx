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

  const renderList = (accounts: AccountData[]) => (
    <ul className="text-sm text-muted-foreground space-y-1">
      {accounts.map((acc) => (
        <li key={acc.id} className="border-b pb-1">
          <strong>{acc.display_name || acc.name || acc.id}</strong>{" "}
          {acc.region_code && <span className="text-xs">({acc.region_code})</span>}
        </li>
      ))}
      {accounts.length === 0 && <li className="text-xs italic">No accounts synced.</li>}
    </ul>
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
          <Card>
            <CardHeader>
              <CardTitle>Google Analytics</CardTitle>
            </CardHeader>
            <CardContent>{renderList(gaAccounts)}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Google Ads</CardTitle>
            </CardHeader>
            <CardContent>{renderList(googleAds)}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta Ads (Facebook)</CardTitle>
            </CardHeader>
            <CardContent>{renderList(metaAds)}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Ads</CardTitle>
            </CardHeader>
            <CardContent>{renderList(linkedinAds)}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TikTok Ads</CardTitle>
            </CardHeader>
            <CardContent>{renderList(tiktokAds)}</CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
