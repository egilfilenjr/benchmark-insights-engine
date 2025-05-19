import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* 1. AECR Score Explainer */}
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">How It Works</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Benchmarketing turns your ad performance into clarity using our AECR Score™ and real industry benchmarks.
          </p>
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">What is AECR?</h2>
          <p className="text-muted-foreground">
            AECR stands for Acquisition Efficiency to Conversion Ratio. It summarizes how efficiently you turn ad spend
            into value — in one score.
          </p>
          <img
            src="/images/aecr-funnel.png"
            alt="AECR Funnel"
            className="mx-auto rounded shadow-md w-full max-w-md"
          />
        </section>

        {/* 2. OAuth Sync Flow */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">How Your Data Flows</h2>
          <p className="text-muted-foreground">
            Connect your ad platforms via secure OAuth. We sync your performance metrics only — never billing or
            creatives.
          </p>
          <div className="flex justify-center flex-wrap gap-4 text-sm">
            {["Connect", "Sync", "Analyze", "Compare", "Recommend", "Export"].map((step) => (
              <span
                key={step}
                className="bg-muted px-4 py-2 rounded-full border border-gray-200 shadow-sm"
              >
                {step}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4 text-muted-foreground text-sm flex-wrap">
            {["Google Ads", "Meta", "LinkedIn", "TikTok", "HubSpot", "Shopify", "GA4"].map((p) => (
              <div
                key={p}
                className="px-3 py-1 border border-gray-200 rounded"
              >
                {p}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Benchmarks Engine */}
        <section className="space-y-6 text-center">
          <h2 className="text-2xl font-semibold">How Benchmarks Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We aggregate anonymized campaign data by industry, channel, platform, and conversion type. No company names. Ever.
          </p>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-lg">Benchmarked KPIs</CardTitle>
              <p>• CPA (Cost Per Acquisition)</p>
              <p>• ROAS (Return on Ad Spend)</p>
              <p>• CTR (Clickthrough Rate)</p>
              <p>• Spend Volume</p>
              <p>• Conversion Value</p>
            </CardContent>
          </Card>
        </section>

        {/* 4. AI Tips Engine */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">AI Recommendations</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Benchmarketing uses weak-signal detection to find campaigns falling behind industry norms and recommends
            fixes by channel, cohort, or budget tier.
          </p>
          <Card className="max-w-lg mx-auto mt-6">
            <CardContent className="p-4 space-y-2">
              <p>• Smart suggestions based on underperformance</p>
              <p>• Filters by KPI, platform, funnel stage</p>
              <p>• Grouped by lift potential</p>
            </CardContent>
          </Card>
        </section>

        {/* 5. Security & Privacy */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Security & Privacy</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We are 100% read-only and encrypted at rest. We never touch your ad creatives, user data, or billing.
          </p>
          <ul className="max-w-md mx-auto text-sm text-left list-disc list-inside text-muted-foreground mt-4">
            <li>OAuth access is limited to performance data</li>
            <li>Data encrypted at rest</li>
            <li>No access to creatives or PII</li>
            <li>Benchmarks are fully anonymized</li>
          </ul>
        </section>

        {/* 6. CTA */}
        <section className="text-center">
          <Button size="lg" onClick={() => navigate("/signup")}>
            Start Free
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
