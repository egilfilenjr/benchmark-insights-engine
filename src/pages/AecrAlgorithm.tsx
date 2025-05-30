
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Database, TrendingUp, Zap, BarChart3, Target } from 'lucide-react';

export default function AecrAlgorithm() {
  const algorithmSteps = [
    {
      step: "1",
      title: "Data Collection",
      icon: Database,
      description: "We analyze your campaign performance across ROAS, CTR, CPA, and CVR metrics"
    },
    {
      step: "2", 
      title: "Contextual Matching",
      icon: Target,
      description: "Your data is matched against campaigns with similar industry, platform, and objective"
    },
    {
      step: "3",
      title: "Percentile Calculation", 
      icon: Calculator,
      description: "We calculate where you rank against the benchmark distribution (0-100th percentile)"
    },
    {
      step: "4",
      title: "Weighted Scoring",
      icon: BarChart3,
      description: "Metrics are weighted based on your campaign objective and industry importance"
    },
    {
      step: "5",
      title: "CompScore Generation",
      icon: Zap,
      description: "Your final CompScore (0-100) is generated with actionable insights"
    }
  ];

  const metricWeights = [
    { metric: "ROAS", weight: "35%", description: "Primary indicator of campaign profitability" },
    { metric: "CTR", weight: "25%", description: "Engagement and audience relevance" },
    { metric: "CPA", weight: "25%", description: "Cost efficiency of acquisitions" },
    { metric: "CVR", weight: "15%", description: "Landing page and funnel performance" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Algorithm Deep Dive</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              CompScore <span className="gradient-text">Algorithm</span> Breakdown
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Understand exactly how we calculate your CompScore using advanced statistical methods 
              and industry-specific benchmarks from 50,000+ campaigns.
            </p>
            <Button size="lg" asChild>
              <Link to="/compscore-overview">Back to CompScore Overview</Link>
            </Button>
          </div>

          {/* Algorithm Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">How the Algorithm Works</h2>
            
            <div className="space-y-8">
              {algorithmSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-lilac to-aqua rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <step.icon className="h-8 w-8 text-lilac" />
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{step.description}</CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Weighting */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Metric Weighting System</h2>
            <p className="text-navy-600 text-center mb-8 max-w-3xl mx-auto">
              Different metrics carry different weights in your CompScore calculation, based on their importance 
              for campaign success and your specific objectives.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {metricWeights.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold text-navy-900">{item.metric}</h3>
                      <Badge variant="secondary" className="text-lg px-3 py-1">{item.weight}</Badge>
                    </div>
                    <p className="text-navy-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mathematical Foundation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Mathematical Foundation</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-lilac" />
                    Percentile Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-4">
                    For each metric, we calculate your percentile rank against the benchmark distribution:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    Percentile = (Number of campaigns below your value / Total campaigns) × 100
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-aqua" />
                    Weighted Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-4">
                    Your final CompScore is calculated using weighted averages:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                    CompScore = Σ(Metric Percentile × Weight)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center">Data Sources & Validation</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-lilac mb-2">50,000+</div>
                <div className="text-navy-900 font-semibold">Campaigns Analyzed</div>
                <div className="text-navy-600 text-sm mt-1">Across all major platforms</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-aqua mb-2">25+</div>
                <div className="text-navy-900 font-semibold">Industry Verticals</div>
                <div className="text-navy-600 text-sm mt-1">Comprehensive coverage</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">Daily</div>
                <div className="text-navy-900 font-semibold">Data Updates</div>
                <div className="text-navy-600 text-sm mt-1">Always current benchmarks</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">See the Algorithm in Action</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Connect your campaigns and watch how our algorithm calculates your personalized CompScore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Calculate My CompScore</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/compscore/examples">View Score Examples <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
