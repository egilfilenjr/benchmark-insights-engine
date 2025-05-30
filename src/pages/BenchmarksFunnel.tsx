
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const funnelStages = [
  {
    name: "Top of Funnel",
    slug: "top-of-funnel",
    description: "Brand awareness and reach metrics",
    icon: "🔍",
    metrics: ["CPM: $8.50", "Reach: 85%", "Brand Lift: 12%"],
    kpis: ["Impressions", "Reach", "Brand Awareness", "Video Views"]
  },
  {
    name: "Mid Funnel",
    slug: "mid-funnel", 
    description: "Consideration and engagement metrics",
    icon: "🤔",
    metrics: ["CTR: 2.1%", "Engagement: 4.5%", "Video Completion: 65%"],
    kpis: ["Click-Through Rate", "Engagement Rate", "Add to Cart", "Email Signups"]
  },
  {
    name: "Bottom of Funnel",
    slug: "bottom-of-funnel",
    description: "Conversion and retention metrics", 
    icon: "💰",
    metrics: ["ROAS: 4.2x", "Conversion Rate: 3.8%", "AOV: $95"],
    kpis: ["ROAS", "CPA", "Conversion Rate", "Customer LTV"]
  }
];

export default function BenchmarksFunnel() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Funnel Stage Benchmarks</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand performance expectations at each stage of your marketing funnel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {funnelStages.map((stage) => (
            <Card key={stage.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <span className="text-4xl mb-2 block">{stage.icon}</span>
                <CardTitle className="text-xl">{stage.name}</CardTitle>
                <CardDescription>{stage.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <h4 className="font-semibold text-sm">Key Metrics:</h4>
                  {stage.metrics.map((metric, index) => (
                    <div key={index} className="text-sm bg-muted p-2 rounded">
                      {metric}
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-4">
                  <h4 className="font-semibold text-sm">KPIs to Track:</h4>
                  <div className="flex flex-wrap gap-1">
                    {stage.kpis.map((kpi, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {kpi}
                      </span>
                    ))}
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/benchmarks/funnel/${stage.slug}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/benchmarks">← Back to All Benchmarks</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
