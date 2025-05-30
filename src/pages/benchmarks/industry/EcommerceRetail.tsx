
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, ShoppingCart, Store, Package } from 'lucide-react';

export default function EcommerceRetailBenchmarks() {
  const subCategories = [
    { 
      name: "DTC Brands", 
      slug: "dtc-brands",
      roas: "4.2x", 
      cpa: "$45", 
      ctr: "2.1%",
      description: "Direct-to-consumer brands and online retailers"
    },
    { 
      name: "Marketplaces", 
      slug: "marketplaces",
      roas: "3.8x", 
      cpa: "$38", 
      ctr: "1.9%",
      description: "Amazon, eBay, Etsy marketplace sellers"
    },
    { 
      name: "Physical & Omnichannel Retail", 
      slug: "physical-and-omnichannel-retail",
      roas: "3.5x", 
      cpa: "$52", 
      ctr: "1.7%",
      description: "Brick-and-mortar with online presence"
    }
  ];

  const keyInsights = [
    {
      title: "Mobile Commerce",
      description: "Mobile accounts for 72% of ecommerce traffic and 58% of conversions",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      title: "Abandoned Cart Recovery",
      description: "Retargeting abandoned carts recovers 28% of lost sales",
      icon: <Package className="h-5 w-5" />
    },
    {
      title: "Product Reviews",
      description: "Products with reviews convert 42% better than those without",
      icon: <Store className="h-5 w-5" />
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
              Ecommerce & Retail <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Marketing performance benchmarks for ecommerce brands, online retailers, 
              marketplaces, and omnichannel retail businesses.
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
              Benchmarks by Retail Type
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
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
                      <Link to={`/benchmarks/industry/ecommerce-retail/${category.slug}`}>
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
                <TrendingUp className="h-5 w-5" />
                Ecommerce & Retail Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">High-Converting Strategies</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Shopping ads show 45% higher conversion rates</li>
                    <li>• Dynamic product ads increase ROAS by 38%</li>
                    <li>• Email retargeting campaigns boost LTV 52%</li>
                    <li>• Social proof increases conversions 34%</li>
                    <li>• Free shipping offers lift conversion rates 28%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Platform Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Google Shopping</span>
                      <Badge>Best for Product Discovery</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Facebook/Meta</span>
                      <Badge>Best for Retargeting</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Instagram</span>
                      <Badge>Best for Lifestyle Brands</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pinterest</span>
                      <Badge>Best for Home & Fashion</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Scale Your Ecommerce Success
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your ecommerce marketing performance against industry benchmarks 
              and discover proven strategies to increase sales and profitability.
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
