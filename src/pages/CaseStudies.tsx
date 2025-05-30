
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    company: "EcoBeauty Co.",
    industry: "Beauty & Personal Care",
    challenge: "Struggling with high CAC and declining ROAS across multiple channels",
    solution: "Used Benchmarketing to identify underperforming audiences and optimize creative rotation",
    results: {
      roas: "+187%",
      cac: "-42%",
      revenue: "+$2.3M"
    },
    metrics: ["ROAS: 2.1x → 6.0x", "CAC: $85 → $49", "Monthly Revenue: +$2.3M"],
    testimonial: "Benchmarketing helped us identify exactly where we were losing money and gave us the data to fix it.",
    author: "Sarah Chen, Head of Growth"
  },
  {
    company: "TechStart Solutions",
    industry: "B2B SaaS",
    challenge: "Needed to scale lead generation while maintaining quality",
    solution: "Leveraged industry benchmarks to optimize funnel performance and budget allocation",
    results: {
      leads: "+340%",
      cost: "-28%",
      quality: "+65%"
    },
    metrics: ["Lead Volume: +340%", "Cost per Lead: -28%", "Lead Quality Score: +65%"],
    testimonial: "The benchmark data gave us confidence to scale aggressively while staying efficient.",
    author: "Michael Rodriguez, VP Marketing"
  },
  {
    company: "Urban Threads",
    industry: "Fashion & Apparel",
    challenge: "Seasonal performance fluctuations affecting profitability",
    solution: "Used historical benchmark trends to optimize seasonal campaigns and inventory",
    results: {
      profit: "+156%",
      inventory: "-23%",
      customer: "+89%"
    },
    metrics: ["Profit Margin: +156%", "Inventory Turnover: +23%", "Customer LTV: +89%"],
    testimonial: "Understanding seasonal benchmarks transformed how we plan and execute campaigns.",
    author: "Jessica Park, Founder & CEO"
  }
];

export default function CaseStudies() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how leading brands use Benchmarketing to drive measurable growth
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{study.company}</CardTitle>
                    <Badge variant="secondary" className="mt-2">{study.industry}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{study.results.roas || study.results.leads || study.results.profit}</div>
                      <div className="text-xs text-muted-foreground">Primary KPI</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{study.results.cac || study.results.cost || study.results.inventory}</div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{study.results.revenue || study.results.quality || study.results.customer}</div>
                      <div className="text-xs text-muted-foreground">Growth</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Challenge:</h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Solution:</h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Results:</h4>
                      <ul className="space-y-1">
                        {study.metrics.map((metric, idx) => (
                          <li key={idx} className="text-sm bg-muted p-2 rounded">{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-6">
                    <blockquote className="text-lg italic mb-4">
                      "{study.testimonial}"
                    </blockquote>
                    <cite className="text-sm text-muted-foreground">— {study.author}</cite>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Ready to Write Your Success Story?</h2>
            <p className="text-muted-foreground mb-6">
              Join hundreds of brands achieving breakthrough performance with data-driven insights
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
