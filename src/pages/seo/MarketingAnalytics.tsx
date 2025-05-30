
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BarChart3, PieChart, TrendingUp, Target } from 'lucide-react';

export default function MarketingAnalytics() {
  const analyticsFeatures = [
    {
      icon: BarChart3,
      title: "Performance Benchmarking",
      description: "Compare your metrics against industry standards across all platforms and campaigns."
    },
    {
      icon: TrendingUp, 
      title: "Trend Analysis",
      description: "Track performance changes over time and identify seasonal patterns in your data."
    },
    {
      icon: PieChart,
      title: "Attribution Modeling", 
      description: "Understand the customer journey and assign proper credit to each touchpoint."
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Monitor progress toward your marketing objectives with automated reporting."
    }
  ];

  const platforms = [
    "Google Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads", 
    "TikTok Ads", "Twitter Ads", "Pinterest Ads", "Snapchat Ads"
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Marketing Analytics Platform</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Advanced <span className="gradient-text">Marketing Analytics</span> & Insights
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Transform your marketing data into actionable insights. Get comprehensive analytics, 
              performance benchmarking, and optimization recommendations in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">View Live Demo</Link>
              </Button>
            </div>
          </div>

          {/* Analytics Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Comprehensive Marketing Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {analyticsFeatures.map((feature, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-lilac mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Platform Coverage */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Connect All Your Marketing Platforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {platforms.map((platform, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <span className="text-navy-700 font-medium">{platform}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-navy-600 mb-4">And many more integrations available</p>
              <Button variant="outline" asChild>
                <Link to="/integrations">View All Integrations</Link>
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Track What Matters Most</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Performance Metrics</h3>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Click-Through Rate (CTR)</li>
                    <li>• Conversion Rate (CVR)</li>
                    <li>• Cost Per Acquisition (CPA)</li>
                    <li>• Return on Ad Spend (ROAS)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Engagement Metrics</h3>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Bounce Rate</li>
                    <li>• Time on Page</li>
                    <li>• Page Views per Session</li>
                    <li>• Social Engagement Rate</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-4">Revenue Metrics</h3>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Revenue Attribution</li>
                    <li>• Customer Lifetime Value</li>
                    <li>• Average Order Value</li>
                    <li>• Marketing Qualified Leads</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to Unlock Your Marketing Insights?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Get started with advanced marketing analytics and see how your campaigns really perform.
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
