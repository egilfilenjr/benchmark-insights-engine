
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const platforms = [
  {
    name: "Meta (Facebook & Instagram)",
    slug: "meta",
    description: "Advertising benchmarks for Facebook and Instagram campaigns",
    icon: "📱",
    metrics: ["ROAS: 4.2x", "CPC: $1.85", "CTR: 1.8%"]
  },
  {
    name: "Google Ads",
    slug: "google",
    description: "Search and display advertising performance benchmarks",
    icon: "🎯",
    metrics: ["ROAS: 3.8x", "CPC: $2.45", "CTR: 2.1%"]
  },
  {
    name: "TikTok",
    slug: "tiktok",
    description: "Short-form video advertising benchmarks",
    icon: "🎵",
    metrics: ["ROAS: 3.5x", "CPC: $1.95", "CTR: 2.8%"]
  },
  {
    name: "YouTube",
    slug: "youtube",
    description: "Video advertising and YouTube Ads benchmarks",
    icon: "📺",
    metrics: ["ROAS: 3.2x", "CPC: $0.85", "CTR: 1.5%"]
  },
  {
    name: "Pinterest",
    slug: "pinterest",
    description: "Visual discovery platform advertising benchmarks",
    icon: "📌",
    metrics: ["ROAS: 2.8x", "CPC: $1.25", "CTR: 0.9%"]
  },
  {
    name: "Reddit",
    slug: "reddit",
    description: "Community-driven platform advertising benchmarks",
    icon: "🤖",
    metrics: ["ROAS: 2.5x", "CPC: $0.95", "CTR: 1.2%"]
  }
];

export default function BenchmarksPlatform() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Platform Benchmarks</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare your advertising performance across different platforms with industry-specific benchmarks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform) => (
            <Card key={platform.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{platform.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {platform.metrics.map((metric, index) => (
                    <div key={index} className="text-sm bg-muted p-2 rounded">
                      {metric}
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/benchmarks/platform/${platform.slug}`}>
                    View Detailed Benchmarks
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
