
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, ShoppingBag, Sparkles } from 'lucide-react';

export default function PinterestBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "4.8x", change: "+16%", trend: "up" },
    { metric: "Average CPC", value: "$1.15", change: "-8%", trend: "down" },
    { metric: "Average CTR", value: "1.2%", change: "+11%", trend: "up" },
    { metric: "Save Rate", value: "8.5%", change: "+19%", trend: "up" }
  ];

  const topCategories = [
    { category: "Home & Garden", roas: "5.4x", cpc: "$0.95", ctr: "1.8%" },
    { category: "Fashion & Beauty", roas: "4.9x", cpc: "$1.25", ctr: "1.4%" },
    { category: "Food & Drink", roas: "4.2x", cpc: "$0.85", ctr: "2.1%" },
    { category: "Wedding Planning", roas: "6.1x", cpc: "$1.45", ctr: "1.1%" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Pinterest Advertising</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Pinterest Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Pinterest advertising performance benchmarks for lifestyle brands, 
              home decor, fashion, and retail businesses targeting high-intent audiences.
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
                  <Heart className="h-5 w-5" />
                  Pinterest Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">High Purchase Intent</h4>
                  <p className="text-navy-600 text-sm">
                    85% of Pinners use Pinterest to plan purchases and make buying decisions
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Long Content Lifespan</h4>
                  <p className="text-navy-600 text-sm">
                    Pins have a 3.5 month average lifespan vs 24 minutes on Facebook
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Visual Discovery</h4>
                  <p className="text-navy-600 text-sm">
                    98% of Pinners try new things they discover on Pinterest
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Top Performing Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCategories.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.category}</span>
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
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Pinterest Advertising Best Practices
              </CardTitle>
              <CardDescription>
                Strategies to maximize your Pinterest ad performance and reach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Creative Strategy</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Use high-quality, vertical images (2:3 ratio)</li>
                    <li>• Include lifestyle shots and product in use</li>
                    <li>• Add text overlay for context and branding</li>
                    <li>• Test seasonal and trending themes</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Targeting & Campaign Setup</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Use keyword targeting for high intent</li>
                    <li>• Target competitors' profiles and boards</li>
                    <li>• Leverage shopping features for retail</li>
                    <li>• Create seasonal campaigns 45 days early</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Optimize Your Pinterest Ad Strategy
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Discover how your Pinterest campaigns compare to industry benchmarks 
              and unlock new opportunities for visual marketing success.
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
