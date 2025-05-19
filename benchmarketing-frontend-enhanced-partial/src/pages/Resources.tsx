import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const resources = [
  {
    type: "Blog",
    title: "What is AECR? (And why it matters)",
    description: "Understand the metric behind every Benchmarketing Score™ and how it improves media efficiency.",
    slug: "what-is-aecr",
  },
  {
    type: "Case Study",
    title: "How a DTC brand cut CPA by 32% in 3 weeks",
    description: "See how Benchmarketing helped a fast-growing ecommerce brand restructure their media spend.",
    slug: "dtc-cpa-lift",
  },
  {
    type: "Playbook",
    title: "Fixing Meta campaigns with low ROAS",
    description: "Step-by-step guide to isolate poor-performing ad sets and redirect budget smartly.",
    slug: "meta-roas-playbook",
  },
  {
    type: "Benchmark Report",
    title: "2024 Ecommerce Benchmark Report",
    description: "Download ROAS, CPA, and CTR benchmarks across top retail categories.",
    slug: "ecommerce-benchmark-report",
  },
  {
    type: "Video Demo",
    title: "Using the Benchmark Explorer",
    description: "Watch how marketers use real data overlays and percentile filters inside the app.",
    slug: "benchmark-explorer-demo",
  },
];

export default function Resources() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get smarter about benchmarks, campaigns, and conversion strategies. New resources added weekly.
          </p>
        </section>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <Card key={i} className="h-full hover:shadow transition">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs uppercase text-muted-foreground font-medium">{r.type}</div>
                <CardTitle className="text-base">{r.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{r.description}</p>
                <Button
                  size="sm"
                  variant="link"
                  className="p-0 mt-2"
                  onClick={() => navigate(`/resources/${r.slug}`)}
                >
                  View Resource →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
