
import MainLayout from '@/components/layout/MainLayout';
import { SeoOptimizer } from '@/components/seo/SeoOptimizer';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingDown, Users, Target, Calculator, BarChart3, Zap } from 'lucide-react';

export default function CustomerAcquisitionCostGuide() {
  const cacOptimizationStrategies = [
    {
      icon: Target,
      title: "Improve Targeting",
      description: "Refine audience targeting to reach higher-intent customers and reduce wasted spend.",
      impact: "20-40% CAC reduction"
    },
    {
      icon: Zap,
      title: "Optimize Landing Pages",
      description: "Improve conversion rates to get more customers from the same traffic volume.",
      impact: "15-30% CAC improvement"
    },
    {
      icon: Users,
      title: "Leverage Referrals",
      description: "Build referral programs to acquire customers at lower costs through word-of-mouth.",
      impact: "50-70% lower CAC"
    },
    {
      icon: BarChart3,
      title: "Multi-Channel Attribution",
      description: "Understand which channels truly drive conversions to optimize budget allocation.",
      impact: "25-35% efficiency gains"
    }
  ];

  const cacBenchmarks = [
    { industry: "SaaS", avgCAC: "$205", ltvCacRatio: "3.2:1" },
    { industry: "E-commerce", avgCAC: "$45", ltvCacRatio: "4.1:1" },
    { industry: "Financial Services", avgCAC: "$175", ltvCacRatio: "2.8:1" },
    { industry: "Healthcare", avgCAC: "$135", ltvCacRatio: "3.5:1" }
  ];

  const seoData = {
    title: "Customer Acquisition Cost (CAC) Guide 2024: Calculate & Optimize CAC | Benchmarketing",
    description: "Complete guide to customer acquisition cost (CAC). Learn how to calculate, benchmark, and optimize your CAC across all marketing channels. Includes industry benchmarks and CAC calculator.",
    keywords: "customer acquisition cost, CAC calculation, CAC optimization, customer acquisition benchmarks, LTV CAC ratio, marketing efficiency, customer acquisition strategy",
    canonicalUrl: "https://benchmarketing.com/customer-acquisition-cost-guide",
    ogTitle: "Customer Acquisition Cost Guide 2024 - Optimize Your CAC",
    ogDescription: "Master customer acquisition cost optimization with proven strategies, industry benchmarks, and our free CAC calculator. Reduce your CAC by 20-40%.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Complete Guide to Customer Acquisition Cost in 2024",
      "description": "Comprehensive guide covering CAC calculation, optimization strategies, and industry benchmarks",
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
        badge="CAC Optimization Guide"
        title="Customer Acquisition Cost"
        subtitle="Optimization Guide"
        description="Learn how to calculate, benchmark, and optimize your customer acquisition cost across all marketing channels. Reduce your CAC and improve marketing efficiency."
        primaryCta={{
          text: "Calculate Your CAC",
          href: "/toolbox/cpa-calculator"
        }}
        secondaryCta={{
          text: "View CAC Benchmarks",
          href: "/marketing-benchmarks"
        }}
        stats={[
          {
            value: "$205",
            label: "Average SaaS CAC",
            icon: DollarSign
          },
          {
            value: "3.2:1",
            label: "Ideal LTV:CAC Ratio",
            icon: Target
          },
          {
            value: "30%",
            label: "Typical CAC Reduction",
            icon: TrendingDown
          }
        ]}
      />

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* CAC Fundamentals */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Understanding Customer Acquisition Cost</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Customer Acquisition Cost (CAC) is the total cost of acquiring a new customer, including all marketing and sales expenses. 
              It's a critical metric for measuring marketing efficiency and business sustainability.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="feature-card">
                <CardHeader>
                  <Calculator className="h-12 w-12 text-lilac mb-4" />
                  <CardTitle className="text-2xl">Basic CAC Formula</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-lg font-mono bg-navy-50 p-4 rounded-lg">
                      CAC = Total Acquisition Costs / New Customers Acquired
                    </div>
                  </div>
                  <p className="text-navy-600">
                    Include all marketing spend, sales salaries, tools, and overhead costs in your calculation 
                    for an accurate CAC measurement.
                  </p>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardHeader>
                  <Target className="h-12 w-12 text-aqua mb-4" />
                  <CardTitle className="text-2xl">LTV:CAC Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-navy-900">Healthy Ratio: 3:1 or higher</h4>
                      <p className="text-navy-600">Customer lifetime value should be at least 3x the acquisition cost</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">Payback Period: 3-12 months</h4>
                      <p className="text-navy-600">Time to recover the initial acquisition investment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CAC Benchmarks */}
          <div className="bg-gradient-to-br from-navy-50 to-lilac-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">CAC Benchmarks by Industry</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Compare your customer acquisition costs against industry standards to identify optimization opportunities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {cacBenchmarks.map((benchmark, index) => (
                <Card key={index} className="feature-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-navy-900">{benchmark.industry}</h3>
                      <Badge variant="outline">Industry Average</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-navy-600">Average CAC</span>
                        <span className="text-2xl font-bold text-navy-900">{benchmark.avgCAC}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-navy-600">LTV:CAC Ratio</span>
                        <span className="text-lg font-semibold text-success">{benchmark.ltvCacRatio}</span>
                      </div>
                      <Progress 
                        value={75} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CAC Optimization Strategies */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Proven CAC Optimization Strategies</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Implement these data-driven strategies to reduce your customer acquisition costs and improve marketing efficiency.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {cacOptimizationStrategies.map((strategy, index) => (
                <Card key={index} className="feature-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <strategy.icon className="h-12 w-12 text-lilac mb-4" />
                    <CardTitle className="text-xl">{strategy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600 mb-4">{strategy.description}</p>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">{strategy.impact}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CAC by Channel */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">CAC by Marketing Channel</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy-900 mb-2">Organic Search</h3>
                  <div className="text-2xl font-bold gradient-text mb-2">$15-25</div>
                  <p className="text-sm text-navy-600">Lowest CAC but requires time investment</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy-900 mb-2">Email Marketing</h3>
                  <div className="text-2xl font-bold gradient-text mb-2">$20-40</div>
                  <p className="text-sm text-navy-600">High ROI for existing audiences</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-navy-900 mb-2">Paid Social</h3>
                  <div className="text-2xl font-bold gradient-text mb-2">$50-200</div>
                  <p className="text-sm text-navy-600">Scalable but requires optimization</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">Calculate and Optimize Your CAC</h2>
            <p className="text-xl text-navy-600 mb-10 max-w-3xl mx-auto">
              Use our free CAC calculator to measure your current customer acquisition costs and get personalized 
              recommendations for reducing your CAC across all marketing channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/toolbox/cpa-calculator">Free CAC Calculator</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">Get CAC Analysis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
