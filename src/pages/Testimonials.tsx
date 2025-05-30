
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Head of Growth",
      company: "TechFlow SaaS",
      industry: "B2B Software",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1-5c7e25c1b6a4",
      rating: 5,
      quote: "Benchmarketing transformed how we approach our marketing spend. The CompScore helped us identify that our ROAS was actually 40% below industry average, leading to a complete strategy overhaul that increased our performance by 65%.",
      metrics: "Increased ROAS by 65% in 3 months"
    },
    {
      name: "Marcus Rodriguez",
      title: "Performance Marketing Manager", 
      company: "Lifestyle Brands Co.",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      rating: 5,
      quote: "Before Benchmarketing, I was flying blind with our Meta ads. Now I know exactly where we stand against competitors and have clear targets to hit. It's like having a GPS for marketing performance.",
      metrics: "Improved CTR by 45% across campaigns"
    },
    {
      name: "Jennifer Walsh",
      title: "CMO",
      company: "Wellness Studio Chain",
      industry: "Local Services", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      rating: 5,
      quote: "The industry benchmarks are incredibly valuable. We discovered our cost per lead was competitive, but our conversion rate was lagging. Focusing on that one insight doubled our ROI within two quarters.",
      metrics: "Doubled ROI in 6 months"
    },
    {
      name: "David Kim",
      title: "Digital Marketing Director",
      company: "Fashion Forward",
      industry: "Apparel",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      rating: 5,
      quote: "The real-time benchmarking feature is a game changer. I can now make data-driven decisions on campaign optimizations instead of guessing. Our team's confidence and results have both skyrocketed.",
      metrics: "Reduced CPA by 30% while scaling"
    },
    {
      name: "Amanda Foster",
      title: "Founder & CEO",
      company: "EcoHome Products",
      industry: "Consumer Products",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      rating: 5,
      quote: "As a startup founder, every dollar matters. Benchmarketing showed me we were overspending on Google Ads while underinvesting in Meta. Reallocating budget based on their insights improved our overall ROAS by 80%.",
      metrics: "80% improvement in overall ROAS"
    },
    {
      name: "Robert Chen",
      title: "VP of Marketing",
      company: "FinanceFlow",
      industry: "Fintech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      rating: 5,
      quote: "The competitive intelligence aspect is phenomenal. Understanding how our metrics stack up against other fintech companies helps me set realistic goals and identify our biggest opportunities.",
      metrics: "Identified and captured 3x more qualified leads"
    }
  ];

  const stats = [
    { value: "94%", label: "Customer Satisfaction" },
    { value: "67%", label: "Average ROAS Improvement" },
    { value: "8.2/10", label: "NPS Score" },
    { value: "2.3x", label: "Faster Optimization Cycles" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Customer Stories</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              What Our <span className="gradient-text">Customers</span> Say
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Hear from marketing leaders who've transformed their performance using 
              Benchmarketing's industry benchmarks and CompScore insights.
            </p>
            <Button size="lg" asChild>
              <Link to="/case-studies">View Detailed Case Studies</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-navy-700 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-navy-900">{testimonial.name}</h3>
                      <p className="text-navy-600 text-sm">{testimonial.title}</p>
                      <p className="text-navy-500 text-sm">{testimonial.company}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline">{testimonial.industry}</Badge>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <Quote className="h-8 w-8 text-lilac mb-4" />
                  <blockquote className="text-navy-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="bg-navy-50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-navy-900 mb-1">Key Result</div>
                    <div className="text-lilac font-semibold">{testimonial.metrics}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Video Testimonials Section */}
          <div className="bg-navy-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">Video Testimonials</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((video) => (
                <Card key={video} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-lilac-100 to-aqua-100 flex items-center justify-center">
                    <Button variant="outline" size="lg">
                      ▶ Watch Story
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-navy-900">E-commerce Success Story</h3>
                    <p className="text-navy-600 text-sm">3:24 • Fashion Brand Case Study</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Join Thousands of Successful Marketers</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Start benchmarking your marketing performance today and see why our customers 
              achieve an average 67% improvement in ROAS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
