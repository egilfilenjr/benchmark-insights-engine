
import MainLayout from '@/components/layout/MainLayout';
import { SeoOptimizer } from '@/components/seo/SeoOptimizer';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, Calculator, DollarSign, BarChart3, Zap } from 'lucide-react';

export default function DigitalMarketingRoiGuide() {
  const roiStrategies = [
    {
      title: "Track Attribution Accurately",
      description: "Implement proper attribution models to understand which channels drive real ROI.",
      impact: "25-40% improvement in budget allocation"
    },
    {
      title: "Optimize for Lifetime Value",
      description: "Focus on customer lifetime value rather than just immediate conversions.",
      impact: "30-50% increase in long-term ROI"
    },
    {
      title: "Test and Iterate Continuously",
      description: "Run systematic A/B tests to improve campaign performance over time.",
      impact: "15-25% ongoing performance gains"
    },
    {
      title: "Benchmark Against Industry",
      description: "Compare your performance against industry standards to identify opportunities.",
      impact: "20-35% improvement in underperforming areas"
    }
  ];

  const roiMetrics = [
    { metric: "ROAS", definition: "Revenue divided by ad spend", benchmark: "4:1 average" },
    { metric: "CPA", definition: "Total cost divided by acquisitions", benchmark: "Varies by industry" },
    { metric: "LTV:CAC", definition: "Lifetime value to customer acquisition cost ratio", benchmark: "3:1 minimum" },
    { metric: "Payback Period", definition: "Time to recover customer acquisition cost", benchmark: "3-12 months" }
  ];

  const seoData = {
    title: "Digital Marketing ROI Guide 2024: How to Measure & Improve Returns | Benchmarketing",
    description: "Complete guide to measuring and improving digital marketing ROI. Learn proven strategies, key metrics, and benchmarks to maximize your marketing returns in 2024.",
    keywords: "digital marketing ROI, marketing ROI calculator, ROAS optimization, marketing attribution, customer acquisition cost, lifetime value, marketing metrics",
    canonicalUrl: "https://benchmarketing.com/digital-marketing-roi-guide",
    ogTitle: "Digital Marketing ROI Guide 2024 - Maximize Your Marketing Returns",
    ogDescription: "Learn how to measure, track, and improve your digital marketing ROI with proven strategies and industry benchmarks. Free ROI calculator included.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Complete Guide to Digital Marketing ROI in 2024",
      "description": "Comprehensive guide covering digital marketing ROI measurement, optimization strategies, and industry benchmarks",
      "author": {
        "@type": "Organization",
        "name": "Benchmarketing"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Benchmarketing"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString()
    }
  };

  return (
    <MainLayout>
      <SeoOptimizer {...seoData} />
      
      <AnimatedHero
        badge="ROI Optimization Guide"
        title="Digital Marketing"
        subtitle="ROI Mastery"
        description="Learn how to measure, track, and optimize your digital marketing ROI with proven strategies and industry benchmarks. Get actionable insights to maximize your marketing returns."
        primaryCta={{
          text: "Calculate Your ROI",
          href: "/toolbox/roi-calculator"
        }}
        secondaryCta={{
          text: "View ROI Benchmarks",
          href: "/marketing-benchmarks"
        }}
        stats={[
          {
            value: "4.2x",
            label: "Average ROAS",
            icon: DollarSign
          },
          {
            value: "35%",
            label: "ROI Improvement",
            icon: TrendingUp
          },
          {
            value: "50K+",
            label: "Campaigns Analyzed",
            icon: BarChart3
          }
        ]}
      />

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* ROI Fundamentals */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Understanding Digital Marketing ROI</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Digital marketing ROI measures the return on investment from your marketing activities. It's the key metric that determines whether your marketing spend is profitable and sustainable.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="feature-card">
                <CardHeader>
                  <Calculator className="h-12 w-12 text-lilac mb-4" />
                  <CardTitle className="text-2xl">Basic ROI Formula</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-lg font-mono bg-navy-50 p-4 rounded-lg">
                      ROI = (Revenue - Cost) / Cost × 100
                    </div>
                  </div>
                  <p className="text-navy-600">
                    This fundamental formula helps you understand the basic return on your marketing investment, 
                    but digital marketing requires more sophisticated attribution models.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardHeader>
                  <Target className="h-12 w-12 text-aqua mb-4" />
                  <CardTitle className="text-2xl">ROAS vs ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-navy-900">ROAS (Return on Ad Spend)</h4>
                      <p className="text-navy-600">Revenue / Ad Spend - Measures immediate returns</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">ROI (Return on Investment)</h4>
                      <p className="text-navy-600">Includes all costs and long-term value</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key ROI Metrics */}
          <div className="bg-gradient-to-br from-navy-50 to-lilac-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Essential ROI Metrics to Track</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Monitor these key metrics to get a complete picture of your marketing ROI and identify optimization opportunities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {roiMetrics.map((metric, index) => (
                <Card key={index} className="feature-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-navy-900">{metric.metric}</h3>
                      <Badge variant="outline">{metric.benchmark}</Badge>
                    </div>
                    <p className="text-navy-600 mb-3">{metric.definition}</p>
                    <div className="text-sm text-navy-500">Industry Benchmark: {metric.benchmark}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ROI Optimization Strategies */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Proven ROI Optimization Strategies</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Implement these data-driven strategies to improve your marketing ROI and maximize returns from your advertising spend.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {roiStrategies.map((strategy, index) => (
                <Card key={index} className="feature-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl">{strategy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600 mb-4">{strategy.description}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">{strategy.impact}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* ROI Calculator CTA */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">Calculate Your Marketing ROI</h2>
            <p className="text-xl text-navy-600 mb-10 max-w-3xl mx-auto">
              Use our free ROI calculator to measure your current performance and identify opportunities for improvement. 
              Get personalized recommendations based on your results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/toolbox/roi-calculator">Free ROI Calculator</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">Get ROI Analysis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
