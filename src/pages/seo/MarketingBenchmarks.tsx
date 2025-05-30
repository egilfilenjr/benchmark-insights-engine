
import MainLayout from '@/components/layout/MainLayout';
import { SeoOptimizer } from '@/components/seo/SeoOptimizer';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { EnhancedAnalyticsDashboard } from '@/components/dashboard/EnhancedAnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { TrendingUp, Target, BarChart3, Users, Zap, Eye, MousePointer, DollarSign } from 'lucide-react';

export default function MarketingBenchmarks() {
  const keyMetrics = [
    { 
      metric: "Average CTR", 
      value: "2.4%", 
      industry: "E-commerce",
      trend: "+0.3%",
      benchmark: "Industry Leading: 3.8%"
    },
    { 
      metric: "Average CVR", 
      value: "3.1%", 
      industry: "SaaS",
      trend: "+0.2%",
      benchmark: "Industry Leading: 4.2%"
    },
    { 
      metric: "Average ROAS", 
      value: "4.2x", 
      industry: "Retail",
      trend: "+0.5x",
      benchmark: "Industry Leading: 6.8x"
    },
    { 
      metric: "Average CPC", 
      value: "$1.85", 
      industry: "B2B Services",
      trend: "-$0.15",
      benchmark: "Industry Leading: $1.25"
    }
  ];

  const platforms = [
    { 
      name: "Google Ads", 
      avgCTR: "3.17%", 
      avgCPC: "$2.69",
      avgCVR: "3.75%",
      volume: "High",
      recommendation: "Best for search intent"
    },
    { 
      name: "Facebook Ads", 
      avgCTR: "1.59%", 
      avgCPC: "$1.72",
      avgCVR: "2.85%",
      volume: "Very High",
      recommendation: "Excellent for targeting"
    },
    { 
      name: "LinkedIn Ads", 
      avgCTR: "0.39%", 
      avgCPC: "$5.26",
      avgCVR: "6.1%",
      volume: "Medium",
      recommendation: "Premium B2B audience"
    },
    { 
      name: "TikTok Ads", 
      avgCTR: "1.5%", 
      avgCPC: "$1.23",
      avgCVR: "2.2%",
      volume: "Growing",
      recommendation: "Best for Gen Z reach"
    }
  ];

  const industries = [
    { name: "E-commerce", averageAECR: 76, growth: "+8%" },
    { name: "SaaS", averageAECR: 82, growth: "+12%" },
    { name: "Healthcare", averageAECR: 71, growth: "+5%" },
    { name: "Finance", averageAECR: 79, growth: "+9%" },
    { name: "Education", averageAECR: 74, growth: "+6%" },
    { name: "Real Estate", averageAECR: 68, growth: "+4%" }
  ];

  const seoData = {
    title: "2024 Marketing Benchmarks by Industry & Platform | Benchmarketing",
    description: "Compare your marketing performance against industry standards. Get the latest benchmarks for CTR, conversion rates, ROAS, and more across all major platforms. Free benchmark analysis included.",
    keywords: "marketing benchmarks 2024, CTR benchmarks, conversion rate benchmarks, ROAS benchmarks, digital marketing performance, industry marketing standards, advertising benchmarks",
    canonicalUrl: "https://benchmarketing.com/marketing-benchmarks",
    ogTitle: "2024 Marketing Benchmarks - Compare Your Performance",
    ogDescription: "Access the most comprehensive marketing benchmark database. Compare your CTR, CVR, ROAS, and CPA against 75,000+ campaigns across all industries and platforms.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "2024 Marketing Benchmarks by Industry & Platform",
      "description": "Comprehensive marketing performance benchmarks across industries and platforms",
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
      
      {/* Enhanced Hero Section */}
      <AnimatedHero
        badge="2024 Marketing Intelligence"
        title="Marketing Benchmarks by"
        subtitle="Industry & Platform"
        description="Compare your marketing performance against industry standards with real-time benchmarks from 75,000+ campaigns. Get actionable insights to improve your CTR, conversion rates, ROAS, and more."
        primaryCta={{
          text: "Get Free Benchmark Report",
          href: "/signup"
        }}
        secondaryCta={{
          text: "Explore All Benchmarks",
          href: "/benchmarks"
        }}
        stats={[
          {
            value: "75,000+",
            label: "Campaigns Analyzed",
            icon: BarChart3
          },
          {
            value: "35+",
            label: "Industries Covered",
            icon: Target
          },
          {
            value: "Real-time",
            label: "Data Updates",
            icon: Zap
          }
        ]}
      />

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Key Metrics Overview */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">2024 Key Marketing Metrics by Industry</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Based on analysis of 75,000+ campaigns across major advertising platforms. Updated daily with the latest performance data.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyMetrics.map((item, index) => (
                <Card key={index} className="feature-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl font-bold gradient-text mb-3">{item.value}</div>
                    <div className="font-semibold text-navy-900 mb-2">{item.metric}</div>
                    <div className="text-sm text-navy-600 mb-3">{item.industry}</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium text-success">{item.trend}</span>
                    </div>
                    <div className="text-xs text-navy-500">{item.benchmark}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Platform Benchmarks */}
          <div className="bg-gradient-to-br from-navy-50 to-lilac-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Platform Performance Benchmarks 2024</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Compare performance metrics across major advertising platforms. Data updated hourly from active campaigns.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {platforms.map((platform, index) => (
                <Card key={index} className="feature-card animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{platform.name}</CardTitle>
                      <Badge variant={platform.volume === 'Very High' ? 'default' : platform.volume === 'High' ? 'secondary' : 'outline'}>
                        {platform.volume} Volume
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{platform.recommendation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-navy-900">{platform.avgCTR}</div>
                        <div className="text-xs text-navy-600">Avg CTR</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-navy-900">{platform.avgCPC}</div>
                        <div className="text-xs text-navy-600">Avg CPC</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-navy-900">{platform.avgCVR}</div>
                        <div className="text-xs text-navy-600">Avg CVR</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry AECR Scores */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Average AECR Scores by Industry</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              See how different industries perform with our proprietary AECR scoring system.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <Card key={index} className="feature-card animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-navy-900">{industry.name}</h3>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium text-success">{industry.growth}</span>
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="text-3xl font-bold gradient-text">{industry.averageAECR}</div>
                      <div className="text-sm text-navy-600">Average AECR Score</div>
                    </div>
                    <Progress value={industry.averageAECR} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Why Benchmarks Matter */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-12 text-center">Why Marketing Benchmarks Matter</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <Card className="feature-card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Target className="h-16 w-16 text-lilac mb-6 mx-auto" />
                  <CardTitle className="text-2xl">Set Realistic Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    Use industry benchmarks to set achievable performance targets and measure success accurately across all your campaigns.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="feature-card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <TrendingUp className="h-16 w-16 text-aqua mb-6 mx-auto" />
                  <CardTitle className="text-2xl">Identify Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    Discover where your campaigns underperform and focus optimization efforts for maximum impact and ROI improvement.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="feature-card text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <BarChart3 className="h-16 w-16 text-lilac mb-6 mx-auto" />
                  <CardTitle className="text-2xl">Smart Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    Make data-driven decisions about budget distribution across platforms and campaigns based on proven performance data.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sample Dashboard Preview */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">See Your Performance vs. Benchmarks</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Connect your marketing accounts and instantly see how your campaigns compare to industry standards.
            </p>
            <EnhancedAnalyticsDashboard />
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">Get Your Personalized Benchmark Analysis</h2>
            <p className="text-xl text-navy-600 mb-10 max-w-3xl mx-auto">
              Connect your marketing accounts and see exactly how your performance compares to industry benchmarks. 
              Get actionable recommendations to improve your AECR Score and campaign performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">Start Free Analysis</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/demo">View Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
