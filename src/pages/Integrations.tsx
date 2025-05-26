// (You already have the top portion with imports and setup)

  const [oauthMap, setOauthMap] = useState<
    Record<string, { connected_at: string; expires_at: string | null }>
  >({});

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
          toast({ title: `Error loading ${table}`, description: error.message, variant: "destructive" });
          return [];
        }
        return data;
      };

      const { data: oauths } = await supabase
        .from("oauth_accounts")
        .select("provider, connected_at, expires_at")
        .eq("user_id", user.id);

      const map: Record<string, { connected_at: string; expires_at: string | null }> = {};
      for (const row of oauths || []) {
        map[row.provider] = {
          connected_at: row.connected_at,
          expires_at: row.expires_at,
        };
      }
      setOauthMap(map);

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

  const connectGoogleOAuth = async (scopes: string) => {
    const redirectTo = window.location.origin + "/oauth/callback";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes,
        redirectTo,
      },
    });
  };

  const oauthScopes: Record<string, string> = {
    google_analytics: "https://www.googleapis.com/auth/analytics.readonly",
    google_ads: "https://www.googleapis.com/auth/adwords",
  };

  const renderIntegration = (integration: IntegrationState) => {
    const { key, label, data } = integration;
    const oauth = oauthMap[key];
    const isConnected = !!oauth;
    const isExpired = oauth?.expires_at
      ? new Date(oauth.expires_at).getTime() < Date.now()
      : false;

    const lastSync = oauth?.connected_at
      ? new Date(oauth.connected_at).toLocaleString()
      : null;

    return (
      <Card key={key} className={cn(!isConnected && "opacity-50")}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{label}</CardTitle>
            {isConnected && !isExpired && (
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
            {isConnected && isExpired && (
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => connectGoogleOAuth(oauthScopes[key] || "")}
                >
                  🔁 Reconnect
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
              {isExpired && " (Expired)"}
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
