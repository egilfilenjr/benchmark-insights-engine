
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Video, Target, Clock } from 'lucide-react';

export default function YouTubeBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "3.6x", change: "+10%", trend: "up" },
    { metric: "Average CPC", value: "$0.65", change: "-5%", trend: "down" },
    { metric: "Average CTR", value: "1.8%", change: "+14%", trend: "up" },
    { metric: "View Rate", value: "32%", change: "+7%", trend: "up" }
  ];

  const videoFormats = [
    { format: "YouTube Shorts", roas: "4.2x", cpc: "$0.45", viewRate: "45%" },
    { format: "In-Stream Skippable", roas: "3.8x", cpc: "$0.75", viewRate: "28%" },
    { format: "In-Stream Non-Skippable", roas: "3.4x", cpc: "$1.25", viewRate: "95%" },
    { format: "Discovery Ads", roas: "3.1x", cpc: "$0.55", viewRate: "38%" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">YouTube Advertising</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              YouTube Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Comprehensive YouTube advertising benchmarks across Shorts, in-stream, 
              and discovery ad formats for maximum video marketing impact.
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

          {/* Video Format Performance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Performance by Video Format
              </CardTitle>
              <CardDescription>
                Compare performance metrics across different YouTube ad formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Format</th>
                      <th className="text-left py-3 px-4 font-semibold">ROAS</th>
                      <th className="text-left py-3 px-4 font-semibold">CPC</th>
                      <th className="text-left py-3 px-4 font-semibold">View Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoFormats.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{item.format}</td>
                        <td className="py-3 px-4">{item.roas}</td>
                        <td className="py-3 px-4">{item.cpc}</td>
                        <td className="py-3 px-4">{item.viewRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Platform Insights */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  YouTube Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Massive Reach</h4>
                  <p className="text-navy-600 text-sm">
                    2+ billion logged-in monthly users with detailed targeting options
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Intent-Based Targeting</h4>
                  <p className="text-navy-600 text-sm">
                    Search-based audience targeting delivers 25% higher conversion rates
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Long-Form Content</h4>
                  <p className="text-navy-600 text-sm">
                    Perfect for educational content and complex product demonstrations
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Video Creation</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Hook viewers in first 5 seconds</li>
                      <li>• Use clear, compelling thumbnails</li>
                      <li>• Include strong call-to-actions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Targeting Strategy</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Layer demographics with interests</li>
                      <li>• Use custom intent audiences</li>
                      <li>• Test similar audiences</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Campaign Optimization</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Start with video reach campaigns</li>
                      <li>• Use frequency capping</li>
                      <li>• Test different ad lengths</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Maximize Your YouTube Ad Performance
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your YouTube campaigns against industry benchmarks and 
              unlock new opportunities for video marketing success.
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
