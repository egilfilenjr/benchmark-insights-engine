
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const explorerCategories = [
  {
    title: "Industry Benchmarks",
    slug: "industry",
    description: "Compare performance across different industries",
    icon: "🏭",
    available: true,
    insights: ["500+ industries", "Real-time data", "Peer comparison"]
  },
  {
    title: "Channel Benchmarks", 
    slug: "channels",
    description: "Platform-specific performance benchmarks",
    icon: "📱",
    available: true,
    insights: ["15+ platforms", "Cross-channel analysis", "ROI comparison"]
  },
  {
    title: "Metric Explorer",
    slug: "metrics", 
    description: "Deep dive into specific marketing metrics",
    icon: "📊",
    available: true,
    insights: ["50+ metrics", "Trend analysis", "Correlation insights"]
  },
  {
    title: "Company Type",
    slug: "company-type",
    description: "Benchmarks by company size and type",
    icon: "🏢",
    available: true,
    insights: ["Startup to Enterprise", "B2B vs B2C", "Growth stage analysis"]
  },
  {
    title: "Regional Analysis",
    slug: "region",
    description: "Geographic performance variations",
    icon: "🌍", 
    available: false,
    insights: ["Global markets", "Local optimization", "Cultural insights"]
  }
];

export default function BenchmarkExplorer() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Benchmark Explorer</h1>
          <p className="text-muted-foreground">
            Explore comprehensive marketing benchmarks across industries, channels, and metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explorerCategories.map((category) => (
            <Card key={category.slug} className={`hover:shadow-lg transition-shadow ${!category.available ? 'opacity-75' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  {!category.available && (
                    <Badge variant="secondary">Coming Soon</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Insights:</h4>
                    <ul className="text-sm space-y-1">
                      {category.insights.map((insight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    asChild 
                    variant={category.available ? "default" : "secondary"} 
                    className="w-full"
                    disabled={!category.available}
                  >
                    {category.available ? (
                      <Link to={`/benchmark-explorer/${category.slug}`}>
                        Explore {category.title}
                      </Link>
                    ) : (
                      <span>Coming Soon</span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">💡 How to Use the Explorer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">1. Select Your Category</h4>
              <p className="text-muted-foreground">Choose the type of benchmarks most relevant to your needs</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">2. Filter & Compare</h4>
              <p className="text-muted-foreground">Apply filters to get benchmarks specific to your situation</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">3. Analyze Trends</h4>
              <p className="text-muted-foreground">Review historical data and identify performance patterns</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">4. Apply Insights</h4>
              <p className="text-muted-foreground">Use benchmark data to optimize your marketing strategies</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
