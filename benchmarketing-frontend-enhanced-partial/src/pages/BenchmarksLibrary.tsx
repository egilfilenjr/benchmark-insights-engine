import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const mockBenchmarks = [
  {
    title: "SaaS – Meta Ads – CPA",
    slug: "saas-meta-cpa",
    metric: "CPA",
    platform: "Meta",
    industry: "SaaS",
    values: {
      median: "$74",
      percentile_25: "$51",
      percentile_75: "$96",
    },
  },
  {
    title: "Ecommerce – Google – ROAS",
    slug: "ecommerce-google-roas",
    metric: "ROAS",
    platform: "Google",
    industry: "Ecommerce",
    values: {
      median: "3.2x",
      percentile_25: "2.1x",
      percentile_75: "4.5x",
    },
  },
  {
    title: "Finance – TikTok – CTR",
    slug: "finance-tiktok-ctr",
    metric: "CTR",
    platform: "TikTok",
    industry: "Finance",
    values: {
      median: "1.9%",
      percentile_25: "1.2%",
      percentile_75: "2.7%",
    },
  },
  {
    title: "Healthcare – LinkedIn – CPA",
    slug: "healthcare-linkedin-cpa",
    metric: "CPA",
    platform: "LinkedIn",
    industry: "Healthcare",
    values: {
      median: "$138",
      percentile_25: "$102",
      percentile_75: "$174",
    },
  },
  {
    title: "Education – Meta – ROAS",
    slug: "education-meta-roas",
    metric: "ROAS",
    platform: "Meta",
    industry: "Education",
    values: {
      median: "2.8x",
      percentile_25: "1.9x",
      percentile_75: "3.6x",
    },
  },
];

export default function BenchmarksLibrary() {
  const [industry, setIndustry] = useState("");
  const [platform, setPlatform] = useState("");
  const [metric, setMetric] = useState("");
  const navigate = useNavigate();

  const filtered = mockBenchmarks.filter((b) => {
    const matchIndustry = !industry || b.industry.toLowerCase().includes(industry.toLowerCase());
    const matchPlatform = !platform || b.platform.toLowerCase().includes(platform.toLowerCase());
    const matchMetric = !metric || b.metric.toLowerCase().includes(metric.toLowerCase());
    return matchIndustry && matchPlatform && matchMetric;
  });

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Benchmarks Library</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            See how your KPIs compare. Filter by industry, platform, or metric.
          </p>
        </section>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Industry</Label>
            <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
          <div>
            <Label>Platform</Label>
            <Input value={platform} onChange={(e) => setPlatform(e.target.value)} />
          </div>
          <div>
            <Label>Metric</Label>
            <Input value={metric} onChange={(e) => setMetric(e.target.value)} />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((bm, i) => (
            <Card key={i} className="hover:shadow-md transition">
              <CardContent className="p-4 space-y-2">
                <CardTitle>{bm.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Median: <strong>{bm.values.median}</strong> • 25th: {bm.values.percentile_25} • 75th: {bm.values.percentile_75}
                </p>
                <Button variant="link" className="p-0 text-sm" onClick={() => navigate(`/signup`)}>
                  Compare Your Own Data →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
