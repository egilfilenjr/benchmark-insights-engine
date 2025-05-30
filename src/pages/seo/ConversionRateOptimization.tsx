
import MainLayout from '@/components/layout/MainLayout';
import { SeoOptimizer } from '@/components/seo/SeoOptimizer';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { Target, Zap, TrendingUp, Users, Eye, MousePointer, BarChart3 } from 'lucide-react';

export default function ConversionRateOptimization() {
  const croTactics = [
    {
      icon: Target,
      title: "A/B Testing",
      description: "Test different versions of pages, buttons, and copy to find what converts best.",
      improvement: "10-30% conversion lift"
    },
    {
      icon: Zap,
      title: "Page Speed Optimization",
      description: "Improve loading times to reduce bounce rates and increase conversions.",
      improvement: "7-15% conversion improvement"
    },
    {
      icon: Users,
      title: "User Experience Improvements",
      description: "Streamline user flows and remove friction from the conversion process.",
      improvement: "15-25% conversion increase"
    },
    {
      icon: Eye,
      title: "Social Proof Integration",
      description: "Add testimonials, reviews, and trust signals to build credibility.",
      improvement: "5-20% conversion boost"
    }
  ];

  const conversionBenchmarks = [
    { industry: "E-commerce", avgCVR: "2.86%", topPerformers: "5.31%" },
    { industry: "SaaS", avgCVR: "3.18%", topPerformers: "6.42%" },
    { industry: "Lead Generation", avgCVR: "4.40%", topPerformers: "11.45%" },
    { industry: "B2B Services", avgCVR: "2.23%", topPerformers: "4.31%" }
  ];

  const seoData = {
    title: "Conversion Rate Optimization Guide 2024: Proven CRO Strategies | Benchmarketing",
    description: "Master conversion rate optimization with proven CRO strategies, A/B testing methods, and industry benchmarks. Increase your website conversions by 15-30%.",
    keywords: "conversion rate optimization, CRO strategies, A/B testing, website conversion, landing page optimization, conversion benchmarks, user experience optimization",
    canonicalUrl: "https://benchmarketing.com/conversion-rate-optimization",
    ogTitle: "Conversion Rate Optimization Guide 2024 - Boost Your Conversions",
    ogDescription: "Learn proven CRO strategies to increase your website conversions. Includes A/B testing methods, optimization tactics, and industry benchmarks.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Complete Guide to Conversion Rate Optimization in 2024",
      "description": "Comprehensive guide covering CRO strategies, A/B testing, and conversion optimization best practices",
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
        badge="CRO Optimization Guide"
        title="Conversion Rate"
        subtitle="Optimization Mastery"
        description="Learn proven strategies to optimize your conversion rates and maximize revenue from existing traffic. Get actionable CRO tactics and industry benchmarks."
        primaryCta={{
          text: "Calculate Conversion Rate",
          href: "/toolbox/conversion-rate-calculator"
        }}
        secondaryCta={{
          text: "View CRO Benchmarks",
          href: "/marketing-benchmarks"
        }}
        stats={[
          {
            value: "3.18%",
            label: "Average CVR",
            icon: Target
          },
          {
            value: "25%",
            label: "Typical CRO Improvement",
            icon: TrendingUp
          },
          {
            value: "50K+",
            label: "Tests Analyzed",
            icon: BarChart3
          }
        ]}
      />

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* CRO Fundamentals */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">What is Conversion Rate Optimization?</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Conversion Rate Optimization (CRO) is the systematic process of increasing the percentage of website visitors 
              who complete a desired action, whether that's making a purchase, signing up, or filling out a form.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="feature-card text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">2.86%</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Average E-commerce CVR</h3>
                  <p className="text-navy-600">Typical conversion rate across e-commerce websites</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">25%</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Average CRO Improvement</h3>
                  <p className="text-navy-600">Typical conversion lift from optimization efforts</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">5x</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">ROI of CRO</h3>
                  <p className="text-navy-600">Return on investment from conversion optimization</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CRO Tactics */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Proven CRO Tactics That Work</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Implement these evidence-based conversion optimization strategies to improve your website performance and increase revenue.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {croTactics.map((tactic, index) => (
                <Card key={index} className="feature-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <tactic.icon className="h-12 w-12 text-lilac mb-4" />
                    <CardTitle className="text-xl">{tactic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-navy-600 mb-4">{tactic.description}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">{tactic.improvement}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Conversion Benchmarks */}
          <div className="bg-gradient-to-br from-navy-50 to-lilac-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Conversion Rate Benchmarks by Industry</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Compare your conversion rates against industry standards to identify optimization opportunities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {conversionBenchmarks.map((benchmark, index) => (
                <Card key={index} className="feature-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-navy-900">{benchmark.industry}</h3>
                      <Badge variant="outline">Industry Average</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-navy-600">Average CVR</span>
                        <span className="text-2xl font-bold text-navy-900">{benchmark.avgCVR}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-navy-600">Top Performers</span>
                        <span className="text-lg font-semibold text-success">{benchmark.topPerformers}</span>
                      </div>
                      <Progress 
                        value={parseFloat(benchmark.avgCVR)} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CRO Process */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">The CRO Process: Step by Step</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-lilac text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Analyze Current Performance</h3>
                  <p className="text-sm text-navy-600">Review analytics and identify conversion bottlenecks</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-aqua text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Form Hypotheses</h3>
                  <p className="text-sm text-navy-600">Create data-driven hypotheses for improvements</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-lilac text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Run A/B Tests</h3>
                  <p className="text-sm text-navy-600">Test variations to validate your hypotheses</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-aqua text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Implement & Iterate</h3>
                  <p className="text-sm text-navy-600">Apply winning variations and continue optimizing</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">Start Optimizing Your Conversions Today</h2>
            <p className="text-xl text-navy-600 mb-10 max-w-3xl mx-auto">
              Use our conversion rate calculator to benchmark your current performance and get personalized 
              recommendations for improving your conversion rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/toolbox/conversion-rate-calculator">Free Conversion Calculator</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">Get CRO Analysis</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
