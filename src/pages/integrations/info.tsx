import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const integrations = [
  {
    name: "Google Ads",
    metrics: ["CPA", "ROAS", "CTR", "Spend", "Conversions"],
    sync: "Every 24h",
  },
  {
    name: "Meta Ads",
    metrics: ["CPA", "ROAS", "CTR", "Spend", "Impressions"],
    sync: "Every 12h",
  },
  {
    name: "TikTok Ads",
    metrics: ["CPA", "CTR", "Spend"],
    sync: "Every 24h",
  },
  {
    name: "LinkedIn Ads",
    metrics: ["Lead CPA", "CTR", "Spend"],
    sync: "Every 48h",
  },
  {
    name: "HubSpot",
    metrics: ["Conversions", "Lifecycle Stage", "Source"],
    sync: "Every 24h",
  },
  {
    name: "Shopify",
    metrics: ["Orders", "Conversion Rate", "Revenue", "LTV"],
    sync: "Real-time (via webhook)",
  },
  {
    name: "GA4",
    metrics: ["Sessions", "Bounce Rate", "Goal Completions"],
    sync: "Every 6h",
  },
];

export default function IntegrationsInfoPage() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Supported Integrations</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Benchmarketing connects directly with your favorite platforms. Read-only. No creative or billing access.
          </p>
          <Button variant="outline" onClick={() => navigate("/integrations")}>
            View My Connected Integrations
          </Button>
        </section>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((i, idx) => (
            <Card key={idx} className="h-full">
              <CardContent className="p-4 space-y-2">
                <CardTitle>{i.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <strong>Metrics:</strong> {i.metrics.join(", ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Sync Frequency:</strong> {i.sync}
                </p>
                <p className="text-xs text-muted-foreground italic mt-2">
                  OAuth-scoped to read-only data. No write or billing permissions.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <section className="text-center mt-16 space-y-3">
          <h2 className="text-xl font-semibold">Privacy & Data Security</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            We never access creative, targeting, or billing data. OAuth is limited to performance metrics. All data is encrypted at rest.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}
