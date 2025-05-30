
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Play, Users, Zap } from 'lucide-react';

export default function TikTokBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "3.2x", change: "+18%", trend: "up" },
    { metric: "Average CPC", value: "$0.95", change: "-12%", trend: "down" },
    { metric: "Average CTR", value: "2.8%", change: "+22%", trend: "up" },
    { metric: "Video Completion Rate", value: "58%", change: "+8%", trend: "up" }
  ];

  const contentTypes = [
    { type: "UGC Videos", roas: "4.1x", cpc: "$0.75", ctr: "3.2%" },
    { type: "Product Demos", roas: "3.8x", cpc: "$0.85", ctr: "2.9%" },
    { type: "Trending Sounds", roas: "3.5x", cpc: "$0.65", ctr: "3.8%" },
    { type: "Behind the Scenes", roas: "2.9x", cpc: "$0.95", ctr: "2.4%" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">TikTok Advertising</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              TikTok Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Performance benchmarks for TikTok advertising campaigns. 
              Understand Gen Z engagement and video-first advertising metrics.
            </p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyMetrics.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardDescription>{item.metric}</CardDescription>
                  <CardTitle className="text-2xl">{item.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center gap-1 text-sm ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    {item.change} vs last quarter
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Platform Insights */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  TikTok Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Gen Z Reach</h4>
                  <p className="text-navy-600 text-sm">
                    60% of TikTok users are aged 16-24, offering unparalleled Gen Z access
                  </p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Viral Potential</h4>
                  <p className="text-navy-600 text-sm">
                    Algorithm-driven discovery leads to 40% higher organic reach
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Cost Efficiency</h4>
                  <p className="text-navy-600 text-sm">
                    Average CPCs 35% lower than other video platforms
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Top Performing Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentTypes.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.type}</span>
                      <div className="flex gap-3 text-sm">
                        <span>ROAS: {item.roas}</span>
                        <span>CPC: {item.cpc}</span>
                        <span>CTR: {item.ctr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Tips */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>TikTok Advertising Best Practices</CardTitle>
              <CardDescription>
                Proven strategies to maximize your TikTok ad performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Content Strategy</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Hook viewers in the first 3 seconds</li>
                    <li>• Use trending sounds and hashtags</li>
                    <li>• Create authentic, native-feeling content</li>
                    <li>• Leverage user-generated content</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Campaign Optimization</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Test multiple creative variations</li>
                    <li>• Use spark ads for authentic content</li>
                    <li>• Optimize for video view completion</li>
                    <li>• Target lookalike audiences from top performers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Ready to Optimize Your TikTok Ads?
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your TikTok campaign performance against industry benchmarks 
              and discover new opportunities for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/signup">Start Free Analysis</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
