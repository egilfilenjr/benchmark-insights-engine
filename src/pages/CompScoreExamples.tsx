
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function CompScoreExamples() {
  const examples = [
    {
      company: "DTC Fashion Brand",
      industry: "Apparel & Accessories",
      platform: "Meta Ads",
      score: 92,
      status: "Exceptional",
      color: "text-green-600",
      bgColor: "bg-green-50",
      metrics: {
        roas: { value: "4.2x", percentile: 95, trend: "up" },
        ctr: { value: "2.8%", percentile: 88, trend: "up" },
        cpa: { value: "$18", percentile: 92, trend: "down" },
        cvr: { value: "3.1%", percentile: 89, trend: "up" }
      },
      insight: "Exceptional performance across all metrics. Strong creative resonance with target audience."
    },
    {
      company: "B2B SaaS Startup",
      industry: "B2B Software",
      platform: "Google Ads",
      score: 67,
      status: "Average",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      metrics: {
        roas: { value: "2.1x", percentile: 65, trend: "down" },
        ctr: { value: "1.2%", percentile: 72, trend: "up" },
        cpa: { value: "$89", percentile: 58, trend: "up" },
        cvr: { value: "4.2%", percentile: 78, trend: "up" }
      },
      insight: "Strong conversion rates but ROAS needs improvement. Consider optimizing targeting and bid strategy."
    },
    {
      company: "Local Restaurant Chain",
      industry: "Food & Beverage",
      platform: "TikTok Ads",
      score: 43,
      status: "Below Average",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      metrics: {
        roas: { value: "1.8x", percentile: 35, trend: "down" },
        ctr: { value: "0.9%", percentile: 28, trend: "down" },
        cpa: { value: "$12", percentile: 67, trend: "stable" },
        cvr: { value: "1.8%", percentile: 42, trend: "up" }
      },
      insight: "Low engagement suggests creative and targeting optimization needed. CPA is competitive for industry."
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Real Examples</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              CompScore <span className="gradient-text">Use Cases</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              See how different companies across various industries and platforms 
              use CompScore to understand and improve their marketing performance.
            </p>
            <Button size="lg" asChild>
              <Link to="/compscore-overview">Learn About CompScore</Link>
            </Button>
          </div>

          {/* Examples */}
          <div className="space-y-8 mb-16">
            {examples.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className={`${example.bgColor} border-b`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-navy-900">{example.company}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {example.industry} • {example.platform}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-4xl font-bold ${example.color}`}>{example.score}</div>
                        <div className="text-sm font-semibold text-navy-700">CompScore</div>
                      </div>
                      <Badge variant="outline" className={`${example.color} border-current`}>
                        {example.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 mb-6">
                    {Object.entries(example.metrics).map(([key, metric]) => (
                      <div key={key} className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-2xl font-bold text-navy-900">{metric.value}</span>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="text-sm font-semibold text-navy-700 uppercase">{key}</div>
                        <div className="text-xs text-navy-500">{metric.percentile}th percentile</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy-900 mb-2">Key Insight</h4>
                    <p className="text-navy-600">{example.insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Industry Breakdown */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">CompScore by Industry</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">78</div>
                  <div className="font-semibold text-navy-900">E-commerce Average</div>
                  <div className="text-sm text-navy-600 mt-2">Strong performance in conversion metrics</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">65</div>
                  <div className="font-semibold text-navy-900">B2B SaaS Average</div>
                  <div className="text-sm text-navy-600 mt-2">Higher CPAs but strong lifetime value</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">71</div>
                  <div className="font-semibold text-navy-900">Local Services Average</div>
                  <div className="text-sm text-navy-600 mt-2">High engagement, location-focused</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How to Improve */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">How to Improve Your CompScore</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Score 0-50: Focus on Fundamentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Refine audience targeting</li>
                    <li>• Test new creative formats</li>
                    <li>• Optimize landing pages</li>
                    <li>• Review campaign objectives</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Score 50-80: Fine-tune Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-navy-600">
                    <li>• A/B test ad copy variations</li>
                    <li>• Optimize bidding strategies</li>
                    <li>• Expand high-performing audiences</li>
                    <li>• Implement advanced tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to Calculate Your CompScore?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              See exactly how your campaigns compare to these examples and get personalized 
              recommendations to improve your performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Get My CompScore</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/AECRscore/algorithm">Learn the Algorithm <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
