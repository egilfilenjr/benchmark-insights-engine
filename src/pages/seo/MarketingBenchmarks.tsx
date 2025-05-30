
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, BarChart3, Users } from 'lucide-react';

export default function MarketingBenchmarks() {
  const keyMetrics = [
    { metric: "Average CTR", value: "2.4%", industry: "E-commerce" },
    { metric: "Average CVR", value: "3.1%", industry: "SaaS" },
    { metric: "Average ROAS", value: "4.2x", industry: "Retail" },
    { metric: "Average CPC", value: "$1.85", industry: "B2B Services" }
  ];

  const platforms = [
    { name: "Google Ads", avgCTR: "3.17%", avgCPC: "$2.69" },
    { name: "Facebook Ads", avgCTR: "1.59%", avgCPC: "$1.72" },
    { name: "LinkedIn Ads", avgCTR: "0.39%", avgCPC: "$5.26" },
    { name: "TikTok Ads", avgCTR: "1.5%", avgCPC: "$1.23" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">2024 Marketing Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Marketing Benchmarks by <span className="gradient-text">Industry & Platform</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Compare your marketing performance against industry standards. Get the latest 
              benchmarks for CTR, conversion rates, ROAS, and more across all major platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Get Free Benchmark Report</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/benchmarks">Explore All Benchmarks</Link>
              </Button>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Key Marketing Metrics by Industry</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {keyMetrics.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">{item.value}</div>
                    <div className="font-semibold text-navy-900 mb-1">{item.metric}</div>
                    <div className="text-sm text-navy-600">{item.industry}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Platform Benchmarks */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Platform Performance Benchmarks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-navy-600">Avg CTR:</span>
                        <span className="font-semibold">{platform.avgCTR}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-600">Avg CPC:</span>
                        <span className="font-semibold">{platform.avgCPC}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Benchmarks Matter */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Why Marketing Benchmarks Matter</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Target className="h-12 w-12 text-lilac mb-4" />
                  <CardTitle>Set Realistic Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Use industry benchmarks to set achievable performance targets and measure success accurately.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-aqua mb-4" />
                  <CardTitle>Identify Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Discover where your campaigns underperform and focus optimization efforts for maximum impact.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <BarChart3 className="h-12 w-12 text-lilac mb-4" />
                  <CardTitle>Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Make data-driven decisions about budget distribution across platforms and campaigns.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Get Personalized Benchmark Analysis</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Connect your marketing accounts and see exactly how your performance compares to industry benchmarks.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">Start Free Analysis</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
