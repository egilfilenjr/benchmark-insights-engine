
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Zap, CheckCircle } from 'lucide-react';

export default function CompScoreOverview() {
  const benefits = [
    {
      icon: Target,
      title: "Precision Benchmarking",
      description: "Compare your performance against 50,000+ campaigns across your exact industry and platform"
    },
    {
      icon: TrendingUp,
      title: "Performance Insights",
      description: "Understand exactly where you stand in your competitive landscape"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get your CompScore in seconds with real-time benchmark comparisons"
    }
  ];

  const scoreRanges = [
    { range: "90-100", label: "Exceptional", color: "bg-green-500", description: "Top 10% performers" },
    { range: "70-89", label: "Strong", color: "bg-blue-500", description: "Above average performance" },
    { range: "50-69", label: "Average", color: "bg-yellow-500", description: "Industry standard" },
    { range: "30-49", label: "Below Average", color: "bg-orange-500", description: "Needs improvement" },
    { range: "0-29", label: "Poor", color: "bg-red-500", description: "Significant optimization needed" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">CompScore Overview</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              What is <span className="gradient-text">CompScore</span>?
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              CompScore is your marketing performance score from 0-100, showing exactly how your campaigns 
              compare to industry benchmarks across key metrics like ROAS, CTR, and CPA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/demo">See CompScore in Action</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/AECRscore/algorithm">View Algorithm <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Score Visualization */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Your Marketing Performance, Simplified</h2>
              <p className="text-navy-600">One score that tells you everything about your campaign performance</p>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold gradient-text">87</div>
                    <div className="text-navy-600 font-semibold">CompScore</div>
                    <div className="text-sm text-navy-500">Strong Performance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {scoreRanges.map((range) => (
                <Card key={range.range} className="text-center">
                  <CardContent className="p-4">
                    <div className={`w-8 h-8 rounded-full ${range.color} mx-auto mb-2`}></div>
                    <div className="font-bold text-navy-900">{range.range}</div>
                    <div className="text-sm font-semibold text-navy-700">{range.label}</div>
                    <div className="text-xs text-navy-500 mt-1">{range.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy-900 mb-4">How CompScore Works</h2>
              <p className="text-navy-600 max-w-2xl mx-auto">
                CompScore analyzes your campaign performance across multiple dimensions and compares it 
                to our database of 50,000+ campaigns in your industry.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <benefit.icon className="h-12 w-12 text-lilac mb-4" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What CompScore Measures */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">What CompScore Measures</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Core Metrics</h3>
                <div className="space-y-3">
                  {['ROAS (Return on Ad Spend)', 'CTR (Click-Through Rate)', 'CPA (Cost Per Acquisition)', 'CVR (Conversion Rate)'].map((metric) => (
                    <div key={metric} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-success mr-3" />
                      <span className="text-navy-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">Context Factors</h3>
                <div className="space-y-3">
                  {['Industry Vertical', 'Platform & Placement', 'Campaign Objective', 'Audience Type'].map((factor) => (
                    <div key={factor} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-aqua mr-3" />
                      <span className="text-navy-700">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Ready to See Your CompScore?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Connect your marketing accounts and get your CompScore in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Get My CompScore Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/compscore/examples">View Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
