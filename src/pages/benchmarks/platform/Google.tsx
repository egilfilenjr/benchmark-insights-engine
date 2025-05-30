
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Search, Target, BarChart3 } from 'lucide-react';

export default function GoogleBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "3.8x", change: "+8%", trend: "up" },
    { metric: "Average CPC", value: "$2.45", change: "+5%", trend: "up" },
    { metric: "Average CTR", value: "2.1%", change: "+12%", trend: "up" },
    { metric: "Quality Score", value: "7.2/10", change: "+3%", trend: "up" }
  ];

  const channelBreakdown = [
    { channel: "Search", roas: "4.2x", cpc: "$2.85", ctr: "3.1%", volume: "High" },
    { channel: "Display", roas: "2.8x", cpc: "$1.25", ctr: "0.8%", volume: "Very High" },
    { channel: "Shopping", roas: "5.1x", cpc: "$0.95", ctr: "1.2%", volume: "Medium" },
    { channel: "YouTube", roas: "3.2x", cpc: "$0.45", ctr: "2.8%", volume: "High" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Google Advertising</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Google Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Comprehensive benchmarks for Google Search, Display, Shopping, and YouTube campaigns. 
              Understand industry standards across all Google advertising channels.
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

          {/* Channel Performance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance by Google Ads Channel
              </CardTitle>
              <CardDescription>
                Compare performance metrics across different Google advertising channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Channel</th>
                      <th className="text-left py-3 px-4 font-semibold">ROAS</th>
                      <th className="text-left py-3 px-4 font-semibold">CPC</th>
                      <th className="text-left py-3 px-4 font-semibold">CTR</th>
                      <th className="text-left py-3 px-4 font-semibold">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelBreakdown.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{item.channel}</td>
                        <td className="py-3 px-4">{item.roas}</td>
                        <td className="py-3 px-4">{item.cpc}</td>
                        <td className="py-3 px-4">{item.ctr}</td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            item.volume === 'Very High' ? 'default' :
                            item.volume === 'High' ? 'secondary' : 'outline'
                          }>
                            {item.volume}
                          </Badge>
                        </td>
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
                  <Search className="h-5 w-5" />
                  Search Campaign Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">High-Intent Traffic</h4>
                  <p className="text-navy-600 text-sm">
                    Search ads show 45% higher conversion rates due to user intent
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Quality Score Impact</h4>
                  <p className="text-navy-600 text-sm">
                    Campaigns with QS 8+ show 32% lower CPC and better ad positions
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Mobile Performance</h4>
                  <p className="text-navy-600 text-sm">
                    Mobile search ads account for 65% of clicks with 2.1% avg CTR
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Optimization Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Keyword Strategy</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Focus on long-tail keywords for better QS</li>
                      <li>• Use exact match for high-converting terms</li>
                      <li>• Implement negative keyword lists</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Ad Extensions</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Sitelinks increase CTR by 15-20%</li>
                      <li>• Callouts highlight unique value props</li>
                      <li>• Location extensions for local businesses</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Bidding Strategy</h4>
                    <ul className="space-y-1 text-navy-600 text-sm">
                      <li>• Use Target CPA for conversion optimization</li>
                      <li>• Implement dayparting for better efficiency</li>
                      <li>• Monitor impression share metrics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Optimize Your Google Ads Performance
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your Google Ads performance against industry benchmarks and 
              get personalized recommendations to improve your campaigns.
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
