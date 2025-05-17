import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* 1. Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Know how your marketing compares.
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Benchmarketing shows you where you stand, what’s underperforming, and how to fix it.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button size="lg" onClick={() => navigate("/signup")}>
              See Your Score
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/benchmarks")}>
              Explore Benchmarks
            </Button>
          </div>
        </section>

        {/* 2. AECR Score Demo */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-6">AECR Score™ Preview</h2>
          <Card className="max-w-md mx-auto shadow-md">
            <CardContent className="space-y-3 py-6">
              <p className="text-xl font-bold">AECR Score: 78/100</p>
              <p>Your CPA is 14% better than industry average</p>
              <p>ROAS: Top 25% percentile</p>
            </CardContent>
          </Card>
        </section>

        {/* 3. Feature Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Compare Your KPIs",
              desc: "See CPA, ROAS, CTR vs peers across your industry",
            },
            {
              title: "Visualize Your Trends",
              desc: "Understand performance changes over time",
            },
            {
              title: "Fix What’s Not Working",
              desc: "AI tips for campaigns below benchmark",
            },
            {
              title: "Export & Share Results",
              desc: "Branded reports and trend decks in one click",
            },
          ].map((item, i) => (
            <Card key={i} className="h-full">
              <CardContent className="p-4 space-y-2">
                <CardTitle>{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 4. Social Proof */}
        <section className="text-center space-y-4">
          <h2 className="text-xl font-medium">Trusted by marketers at:</h2>
          <div className="flex justify-center flex-wrap gap-6 text-muted-foreground text-sm">
            <span>🧢 Shopify</span>
            <span>💼 HubSpot</span>
            <span>📈 Meta</span>
            <span>📣 LinkedIn</span>
            <span>🎯 Google</span>
          </div>
        </section>

        {/* 5. Integrations Carousel */}
        <section className="text-center space-y-4">
          <h2 className="text-xl font-medium">Works with your stack</h2>
          <div className="flex justify-center flex-wrap gap-6">
            {["Google Ads", "Meta", "TikTok", "LinkedIn", "HubSpot", "Shopify", "GA4"].map((name) => (
              <div key={name} className="border px-4 py-2 rounded text-sm">
                {name}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            Benchmarketing pulls only performance data — never creative or billing.
          </p>
        </section>

        {/* 6. Plan Selector Preview */}
        <section className="text-center space-y-6">
          <h2 className="text-xl font-medium">Pick your plan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { plan: "Free", price: "$0", note: "Benchmarks + demo data" },
              { plan: "Pro", price: "$79/mo", note: "Real data + 1 user" },
              { plan: "Pro+", price: "$119/mo", note: "AI recs + 5 users" },
              { plan: "Agency", price: "$239/mo", note: "White-label + 100 users" },
            ].map((p, i) => (
              <Card key={i} className="h-full">
                <CardContent className="p-4 space-y-2">
                  <CardTitle>{p.plan}</CardTitle>
                  <p className="text-xl font-bold">{p.price}</p>
                  <p className="text-muted-foreground text-sm">{p.note}</p>
                  <Button variant={p.plan === "Free" ? "default" : "secondary"} className="mt-2 w-full">
                    {p.plan === "Free" ? "Start Free" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
