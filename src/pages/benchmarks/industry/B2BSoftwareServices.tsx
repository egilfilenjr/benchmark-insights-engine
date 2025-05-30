
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Code, Building, Zap } from 'lucide-react';

export default function B2BSoftwareServicesBenchmarks() {
  const subCategories = [
    { 
      name: "B2B SaaS", 
      slug: "b2b-saas",
      roas: "2.8x", 
      cpa: "$385", 
      ctr: "1.4%",
      description: "Software-as-a-Service platforms and tools"
    },
    { 
      name: "B2B Agencies & Services", 
      slug: "b2b-agencies-and-services",
      roas: "3.1x", 
      cpa: "$295", 
      ctr: "1.6%",
      description: "Marketing agencies, consulting, professional services"
    },
    { 
      name: "Enterprise Tools", 
      slug: "enterprise-tools",
      roas: "2.5x", 
      cpa: "$625", 
      ctr: "1.1%",
      description: "Enterprise software, CRM, productivity tools"
    },
    { 
      name: "IT Services", 
      slug: "it-services",
      roas: "2.9x", 
      cpa: "$445", 
      ctr: "1.3%",
      description: "Managed services, cloud solutions, infrastructure"
    }
  ];

  const keyInsights = [
    {
      title: "Long Sales Cycles",
      description: "B2B software sales cycles average 4.2 months requiring nurture campaigns",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Decision Makers",
      description: "Account-based marketing increases conversion rates by 67%",
      icon: <Building className="h-5 w-5" />
    },
    {
      title: "Content Marketing",
      description: "Educational content drives 85% of B2B software leads",
      icon: <Zap className="h-5 w-5" />
    }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Industry Benchmarks</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              B2B Software & Services <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Marketing performance benchmarks for B2B software companies, SaaS platforms, 
              agencies, and enterprise technology providers.
            </p>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {keyInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {insight.icon}
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sub-Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Benchmarks by B2B Category
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {subCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">{category.roas}</div>
                        <div className="text-sm text-navy-600">ROAS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-lilac">{category.cpa}</div>
                        <div className="text-sm text-navy-600">CPA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-aqua">{category.ctr}</div>
                        <div className="text-sm text-navy-600">CTR</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/benchmarks/industry/b2b-software-services/${category.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industry Trends */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                B2B Software & Services Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Effective Strategies</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Free trial campaigns convert 42% better than demos</li>
                    <li>• LinkedIn Ads show 3x higher engagement for B2B</li>
                    <li>• Webinar funnel campaigns increase MQLs by 58%</li>
                    <li>• Case study content drives 73% more conversions</li>
                    <li>• Retargeting reduces acquisition costs by 45%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Channel Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>LinkedIn</span>
                      <Badge>Best for B2B Targeting</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Google Search</span>
                      <Badge>Best for Intent</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>YouTube</span>
                      <Badge>Best for Education</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Display</span>
                      <Badge>Best for Awareness</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Accelerate Your B2B Growth
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your B2B software marketing performance against industry standards 
              and discover proven strategies for enterprise growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/signup">Start Free Analysis</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
