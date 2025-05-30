
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Filter, Zap } from 'lucide-react';

export default function MidFunnelBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "4.1x", change: "+12%", trend: "up" },
    { metric: "Average CPA", value: "$85", change: "-8%", trend: "down" },
    { metric: "Lead Quality Score", value: "72%", change: "+15%", trend: "up" },
    { metric: "Email Open Rate", value: "24%", change: "+6%", trend: "up" }
  ];

  const campaignTypes = [
    { type: "Retargeting Campaigns", roas: "5.2x", cpa: "$65", quality: "85%" },
    { type: "Lead Nurture Sequences", roas: "3.8x", cpa: "$95", quality: "78%" },
    { type: "Content Engagement", roas: "3.4x", cpa: "$110", quality: "65%" },
    { type: "Webinar Funnels", roas: "4.6x", cpa: "$125", quality: "82%" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Funnel Stage Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Mid-Funnel <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Performance benchmarks for mid-funnel marketing campaigns focused on 
              nurturing leads, building consideration, and moving prospects toward conversion.
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
                    {item.change} vs top-of-funnel
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Campaign Performance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Mid-Funnel Campaign Performance
              </CardTitle>
              <CardDescription>
                Compare performance across different mid-funnel campaign types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Campaign Type</th>
                      <th className="text-left py-3 px-4 font-semibold">ROAS</th>
                      <th className="text-left py-3 px-4 font-semibold">CPA</th>
                      <th className="text-left py-3 px-4 font-semibold">Lead Quality</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignTypes.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{item.type}</td>
                        <td className="py-3 px-4">{item.roas}</td>
                        <td className="py-3 px-4">{item.cpa}</td>
                        <td className="py-3 px-4">{item.quality}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Mid-Funnel Strategies */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Effective Mid-Funnel Tactics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Retargeting Sequences</h4>
                  <p className="text-navy-600 text-sm">
                    Multi-touch retargeting campaigns show 45% higher conversion rates
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Educational Content</h4>
                  <p className="text-navy-600 text-sm">
                    Value-driven content increases email engagement by 38%
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Social Proof</h4>
                  <p className="text-navy-600 text-sm">
                    Case studies and testimonials boost consideration by 52%
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Optimization Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Audience Segmentation</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Segment by engagement level and behavior</li>
                      <li>• Create lookalike audiences from converters</li>
                      <li>• Use dynamic creative optimization</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Content Strategy</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Deliver progressive value in each touchpoint</li>
                      <li>• Use video testimonials and demos</li>
                      <li>• Implement lead scoring systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Channel Mix</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Combine paid social with email marketing</li>
                      <li>• Use cross-platform retargeting</li>
                      <li>• Implement marketing automation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Optimize Your Mid-Funnel Performance
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your mid-funnel campaigns against industry benchmarks and 
              discover strategies to better nurture leads and drive conversions.
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
