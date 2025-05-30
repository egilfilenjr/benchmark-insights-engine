
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Activity, Target, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdPerformanceTracker() {
  const trackingFeatures = [
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Track ad performance across all platforms in real-time with automated data collection."
    },
    {
      icon: Target,
      title: "Performance Alerts",
      description: "Get instant notifications when campaigns underperform or exceed targets."
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description: "Identify performance patterns and seasonal trends in your advertising data."
    },
    {
      icon: AlertTriangle,
      title: "Optimization Recommendations",
      description: "Receive AI-powered suggestions to improve campaign performance and ROI."
    }
  ];

  const keyMetrics = [
    { metric: "CTR Tracking", description: "Monitor click-through rates across all campaigns" },
    { metric: "Conversion Tracking", description: "Track conversions and attribution accurately" },
    { metric: "Cost Analysis", description: "Analyze CPC, CPA, and budget efficiency" },
    { metric: "ROI Measurement", description: "Calculate return on investment and ROAS" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Performance Tracking</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Advanced <span className="gradient-text">Ad Performance Tracker</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Monitor, analyze, and optimize your advertising performance across all platforms. 
              Get real-time insights and automated recommendations to maximize your ad spend ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Start Tracking Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">See Live Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Tracking Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Comprehensive Ad Performance Tracking</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {trackingFeatures.map((feature, index) => (
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

          {/* Key Metrics Dashboard */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Track All Key Performance Metrics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {keyMetrics.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-navy-900 mb-2">{item.metric}</h3>
                    <p className="text-navy-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Performance Dashboard Preview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Real-Time Performance Dashboard</h2>
            <div className="bg-white rounded-2xl shadow-lg border border-navy-100 p-6">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2.4%</div>
                    <div className="text-sm font-semibold text-navy-700">Average CTR</div>
                    <div className="text-xs text-green-600">+0.3% vs last month</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">$24.50</div>
                    <div className="text-sm font-semibold text-navy-700">Average CPA</div>
                    <div className="text-xs text-green-600">-12% vs target</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.2x</div>
                    <div className="text-sm font-semibold text-navy-700">Average ROAS</div>
                    <div className="text-xs text-green-600">+0.8x vs industry</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <p className="text-navy-600 mb-4">Live data from your connected advertising accounts</p>
                <Button asChild>
                  <Link to="/signup">Connect Your Accounts</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Why Choose Our Ad Performance Tracker?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-4">50K+</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Campaigns Tracked</h3>
                  <p className="text-navy-600">Benchmark against our extensive database of campaign performance data.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-4">24/7</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Real-Time Updates</h3>
                  <p className="text-navy-600">Never miss important performance changes with continuous monitoring.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold gradient-text mb-4">+25%</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Average ROI Improvement</h3>
                  <p className="text-navy-600">Users see significant performance improvements with our insights.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to Track Your Ad Performance?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Start monitoring your advertising performance across all platforms with our advanced tracking system.
            </p>
            <Button size="lg" asChild>
              <Link to="/signup">Start Free Tracking</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
