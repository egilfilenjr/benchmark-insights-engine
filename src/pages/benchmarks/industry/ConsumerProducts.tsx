
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, ShoppingCart, Package, Users } from 'lucide-react';

export default function ConsumerProductsBenchmarks() {
  const subCategories = [
    { 
      name: "Food & Beverage", 
      slug: "food-and-beverage",
      roas: "4.8x", 
      cpa: "$35", 
      ctr: "2.3%",
      description: "Restaurant chains, CPG food brands, beverages"
    },
    { 
      name: "Beauty & Personal Care", 
      slug: "beauty-and-personal-care",
      roas: "5.2x", 
      cpa: "$28", 
      ctr: "2.8%",
      description: "Skincare, makeup, personal hygiene products"
    },
    { 
      name: "Apparel & Accessories", 
      slug: "apparel-and-accessories",
      roas: "4.1x", 
      cpa: "$42", 
      ctr: "1.9%",
      description: "Clothing, footwear, jewelry, accessories"
    },
    { 
      name: "Consumer Electronics", 
      slug: "consumer-electronics",
      roas: "3.6x", 
      cpa: "$185", 
      ctr: "1.4%",
      description: "Mobile devices, audio, smart home tech"
    },
    { 
      name: "Home Goods & Lifestyle", 
      slug: "home-goods-and-lifestyle",
      roas: "4.4x", 
      cpa: "$68", 
      ctr: "2.1%",
      description: "Furniture, home decor, kitchenware"
    },
    { 
      name: "Automotive", 
      slug: "automotive",
      roas: "2.8x", 
      cpa: "$425", 
      ctr: "1.1%",
      description: "Auto dealers, parts, accessories, services"
    }
  ];

  const keyInsights = [
    {
      title: "Seasonal Trends",
      description: "Consumer products see 35% higher ROAS during Q4 holiday season",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Mobile Commerce",
      description: "68% of consumer product purchases happen on mobile devices",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      title: "Brand Loyalty",
      description: "Returning customers show 3.2x higher lifetime value",
      icon: <Users className="h-5 w-5" />
    }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Industry Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Consumer Products <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Marketing performance benchmarks for consumer product brands across 
              food & beverage, beauty, apparel, electronics, and more.
            </p>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {keyInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {insight.icon}
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sub-Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Benchmarks by Product Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">{category.roas}</div>
                        <div className="text-sm text-navy-600">ROAS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-lilac">{category.cpa}</div>
                        <div className="text-sm text-navy-600">CPA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-aqua">{category.ctr}</div>
                        <div className="text-sm text-navy-600">CTR</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/benchmarks/industry/consumer-products/${category.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry Trends */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Consumer Products Industry Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Top Performing Strategies</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• User-generated content increases engagement 42%</li>
                    <li>• Video content shows 28% higher conversion rates</li>
                    <li>• Influencer partnerships drive 35% more brand awareness</li>
                    <li>• Subscription models improve customer LTV by 2.8x</li>
                    <li>• Personalized recommendations boost AOV 23%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Platform Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Instagram</span>
                      <Badge>Best for Beauty & Fashion</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>TikTok</span>
                      <Badge>Best for Gen Z Products</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Facebook</span>
                      <Badge>Best for Home & Lifestyle</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Google Shopping</span>
                      <Badge>Best for Electronics</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Benchmark Your Consumer Brand
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              See how your consumer product marketing compares to industry leaders 
              and get actionable insights to improve performance.
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
