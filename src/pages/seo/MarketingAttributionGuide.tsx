
import MainLayout from '@/components/layout/MainLayout';
import { SeoOptimizer } from '@/components/seo/SeoOptimizer';
import { AnimatedHero } from '@/components/ui/animated-hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BarChart3, Target, TrendingUp, Zap, Users, MousePointer, Eye } from 'lucide-react';

export default function MarketingAttributionGuide() {
  const attributionModels = [
    {
      name: "First-Touch Attribution",
      description: "Credits 100% of the conversion to the first marketing touchpoint.",
      useCase: "Best for measuring awareness and top-of-funnel performance",
      pros: "Simple to implement and understand",
      cons: "Ignores the customer journey complexity"
    },
    {
      name: "Last-Touch Attribution", 
      description: "Credits 100% of the conversion to the final marketing touchpoint.",
      useCase: "Good for measuring bottom-funnel effectiveness",
      pros: "Easy to track and optimize",
      cons: "Undervalues early touchpoints"
    },
    {
      name: "Multi-Touch Attribution",
      description: "Distributes conversion credit across multiple touchpoints in the customer journey.",
      useCase: "Most accurate for complex, multi-channel campaigns",
      pros: "Provides complete customer journey view",
      cons: "Complex to implement and analyze"
    },
    {
      name: "Data-Driven Attribution",
      description: "Uses machine learning to assign credit based on actual conversion patterns.",
      useCase: "Best for businesses with sufficient data volume",
      pros: "Most accurate attribution model",
      cons: "Requires significant data and expertise"
    }
  ];

  const attributionChallenges = [
    {
      icon: Users,
      title: "Cross-Device Tracking",
      description: "Users switch between devices during their journey, making attribution difficult.",
      solution: "Implement user ID tracking and probabilistic matching"
    },
    {
      icon: Eye,
      title: "View-Through Attribution",
      description: "Measuring the impact of ad impressions that don't result in immediate clicks.",
      solution: "Set appropriate attribution windows and use incrementality testing"
    },
    {
      icon: Target,
      title: "Offline Conversions",
      description: "Connecting online marketing efforts to offline sales and phone conversions.",
      solution: "Use store visit tracking and call tracking integration"
    },
    {
      icon: Zap,
      title: "Privacy Changes",
      description: "iOS 14.5+ and cookie deprecation impact attribution accuracy.",
      solution: "Implement first-party data collection and server-side tracking"
    }
  ];

  const seoData = {
    title: "Marketing Attribution Guide 2024: Models, Strategies & Best Practices | Benchmarketing",
    description: "Complete guide to marketing attribution. Learn about attribution models, cross-device tracking, and how to measure true marketing impact across all channels and touchpoints.",
    keywords: "marketing attribution, attribution models, multi-touch attribution, customer journey tracking, cross-device attribution, marketing measurement, attribution analysis",
    canonicalUrl: "https://benchmarketing.com/marketing-attribution-guide",
    ogTitle: "Marketing Attribution Guide 2024 - Measure True Marketing Impact",
    ogDescription: "Master marketing attribution with proven models and strategies. Learn how to track the complete customer journey and optimize your marketing mix.",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Complete Guide to Marketing Attribution in 2024",
      "description": "Comprehensive guide covering attribution models, tracking strategies, and measurement best practices",
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
        badge="Attribution Mastery"
        title="Marketing Attribution"
        subtitle="Complete Guide"
        description="Master marketing attribution with proven models and strategies. Learn how to track the complete customer journey and accurately measure marketing impact across all touchpoints."
        primaryCta={{
          text: "Analyze Your Attribution",
          href: "/signup"
        }}
        secondaryCta={{
          text: "View Attribution Tools",
          href: "/toolbox"
        }}
        stats={[
          {
            value: "7.2",
            label: "Average Touchpoints",
            icon: MousePointer
          },
          {
            value: "35%",
            label: "Attribution Accuracy Gain",
            icon: Target
          },
          {
            value: "Multi-Touch",
            label: "Recommended Model",
            icon: BarChart3
          }
        ]}
      />

      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Attribution Fundamentals */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">What is Marketing Attribution?</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Marketing attribution is the process of identifying and assigning credit to the marketing touchpoints 
              that contribute to conversions. It helps you understand which channels, campaigns, and content 
              actually drive business results.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="feature-card text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">7.2</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Average Touchpoints</h3>
                  <p className="text-navy-600">Before a B2B customer converts</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">84 days</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Average Sales Cycle</h3>
                  <p className="text-navy-600">Length of typical B2B customer journey</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold gradient-text mb-4">35%</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">Budget Reallocation</h3>
                  <p className="text-navy-600">Average budget shift after implementing proper attribution</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Attribution Models */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Attribution Models Explained</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Choose the right attribution model based on your business goals, sales cycle, and data availability.
            </p>
            
            <div className="grid gap-8">
              {attributionModels.map((model, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{model.name}</CardTitle>
                      <Badge variant="outline">{index === 2 ? "Recommended" : "Basic"}</Badge>
                    </div>
                    <CardDescription className="text-base">{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-navy-900 mb-2">Best For:</h4>
                        <p className="text-sm text-navy-600">{model.useCase}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-success mb-2">Pros:</h4>
                        <p className="text-sm text-navy-600">{model.pros}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                        <p className="text-sm text-navy-600">{model.cons}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Attribution Challenges */}
          <div className="bg-gradient-to-br from-navy-50 to-lilac-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Modern Attribution Challenges</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Navigate today's complex attribution landscape with privacy changes, cross-device tracking, and multi-channel customer journeys.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {attributionChallenges.map((challenge, index) => (
                <Card key={index} className="feature-card">
                  <CardHeader>
                    <challenge.icon className="h-12 w-12 text-lilac mb-4" />
                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    <CardDescription className="text-base">{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-success-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-success-800 mb-2">Solution:</h4>
                      <p className="text-success-700">{challenge.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Attribution Implementation Roadmap</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-lilac text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Audit Current Tracking</h3>
                  <p className="text-sm text-navy-600">Review existing tracking setup and identify gaps</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-aqua text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Choose Attribution Model</h3>
                  <p className="text-sm text-navy-600">Select the model that fits your business needs</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-lilac text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Implement Tracking</h3>
                  <p className="text-sm text-navy-600">Set up comprehensive tracking across all touchpoints</p>
                </CardContent>
              </Card>

              <Card className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-aqua text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                  <h3 className="font-semibold text-navy-900 mb-2">Analyze & Optimize</h3>
                  <p className="text-sm text-navy-600">Use attribution data to optimize marketing mix</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">Master Your Marketing Attribution</h2>
            <p className="text-xl text-navy-600 mb-10 max-w-3xl mx-auto">
              Get expert guidance on implementing proper marketing attribution for your business. 
              Connect your marketing platforms and see the complete customer journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">Start Attribution Analysis</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/demo">View Attribution Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
