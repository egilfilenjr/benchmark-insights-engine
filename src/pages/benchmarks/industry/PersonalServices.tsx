
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, Calendar, Zap } from 'lucide-react';

export default function PersonalServicesBenchmarks() {
  const subCategories = [
    { 
      name: "Healthcare & Wellness", 
      slug: "healthcare-and-wellness",
      roas: "3.8x", 
      cpa: "$95", 
      ctr: "2.1%",
      description: "Medical practices, wellness centers, therapy"
    },
    { 
      name: "Aesthetic & MedSpa", 
      slug: "aesthetic-and-medspa",
      roas: "4.5x", 
      cpa: "$125", 
      ctr: "2.8%",
      description: "Cosmetic procedures, skincare, beauty treatments"
    },
    { 
      name: "Fitness & Wellness", 
      slug: "fitness-and-wellness",
      roas: "3.2x", 
      cpa: "$68", 
      ctr: "1.9%",
      description: "Gyms, personal training, yoga studios"
    },
    { 
      name: "Education & Learning", 
      slug: "education-and-learning",
      roas: "2.9x", 
      cpa: "$155", 
      ctr: "1.6%",
      description: "Online courses, tutoring, skill development"
    },
    { 
      name: "Travel & Tourism", 
      slug: "travel-and-tourism",
      roas: "4.1x", 
      cpa: "$245", 
      ctr: "2.3%",
      description: "Hotels, tours, travel booking services"
    }
  ];

  const keyInsights = [
    {
      title: "Local Targeting",
      description: "Service businesses see 45% higher conversion rates with local targeting",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Appointment Booking",
      description: "Online booking integration increases lead-to-customer rate by 38%",
      icon: <Zap className="h-5 w-5" />
    },
    {
      title: "Review Social Proof",
      description: "Ads featuring customer reviews show 52% higher CTR",
      icon: <Heart className="h-5 w-5" />
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
              Personal Services <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Marketing performance benchmarks for personal service businesses including 
              healthcare, fitness, education, beauty, and local service providers.
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
              Benchmarks by Service Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <Link to={`/benchmarks/industry/personal-services/${category.slug}`}>
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
                Personal Services Industry Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">High-Impact Strategies</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Before/after content increases engagement 65%</li>
                    <li>• Video testimonials drive 48% more bookings</li>
                    <li>• Local SEO integration improves visibility 42%</li>
                    <li>• Mobile-first booking funnels convert 35% better</li>
                    <li>• Seasonal promotions boost revenue 28%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Platform Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Google Ads</span>
                      <Badge>Best for Local Intent</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Facebook/Meta</span>
                      <Badge>Best for Awareness</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Instagram</span>
                      <Badge>Best for Visual Services</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>YouTube</span>
                      <Badge>Best for Education</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Optimize Your Service Business Marketing
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              See how your personal service marketing compares to industry leaders 
              and discover strategies to attract more clients.
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
