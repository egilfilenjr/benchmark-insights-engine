
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Users, DollarSign } from 'lucide-react';

export default function MetaBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "4.2x", change: "+12%", trend: "up" },
    { metric: "Average CPC", value: "$1.85", change: "-8%", trend: "down" },
    { metric: "Average CTR", value: "1.8%", change: "+15%", trend: "up" },
    { metric: "Conversion Rate", value: "3.2%", change: "+5%", trend: "up" }
  ];

  const industryBreakdown = [
    { industry: "E-commerce", roas: "5.1x", cpc: "$1.65", ctr: "2.1%" },
    { industry: "SaaS", roas: "3.8x", cpc: "$2.15", ctr: "1.5%" },
    { industry: "Healthcare", roas: "4.5x", cpc: "$2.85", ctr: "1.9%" },
    { industry: "Finance", roas: "3.2x", cpc: "$3.25", ctr: "1.2%" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Meta Advertising</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Meta Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Industry benchmarks for Facebook and Instagram advertising performance. 
              Compare your Meta campaigns against industry standards.
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

          {/* Platform Overview */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Platform Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Advanced Targeting</h4>
                  <p className="text-navy-600 text-sm">
                    Meta's detailed audience targeting capabilities deliver 23% higher conversion rates
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Creative Formats</h4>
                  <p className="text-navy-600 text-sm">
                    Stories and Reels show 35% better engagement than traditional feed posts
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Cross-Platform Reach</h4>
                  <p className="text-navy-600 text-sm">
                    Combined Facebook & Instagram campaigns show 18% lower CPA
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Best Performing Industries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryBreakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.industry}</span>
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
              <CardTitle>Meta Ads Optimization Best Practices</CardTitle>
              <CardDescription>
                Proven strategies to improve your Meta advertising performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Creative Optimization</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Test video vs static creative formats</li>
                    <li>• Use UGC content for 25% better performance</li>
                    <li>• Refresh creative every 7-14 days</li>
                    <li>• Optimize for mobile-first viewing</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Targeting & Bidding</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Use Advantage+ audience for broader reach</li>
                    <li>• Implement conversion-based bidding</li>
                    <li>• Test lookalike audiences at 1-3% similarity</li>
                    <li>• Exclude recent converters from acquisition campaigns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Ready to Benchmark Your Meta Ads?
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Get detailed benchmarks for your specific industry and see how your 
              Meta campaigns compare to top performers.
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
