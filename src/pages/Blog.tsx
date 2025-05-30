
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, TrendingUp } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: "How to Improve Your CECR Score™ by 40% in 30 Days",
      excerpt: "Learn the proven strategies top marketers use to dramatically improve their Creative, Engagement, Conversion, and Revenue performance.",
      date: "2024-03-15",
      readTime: "8 min read",
      author: "Sarah Chen",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    },
    {
      title: "Industry Benchmarks 2024: What Every Marketer Should Know",
      excerpt: "Our comprehensive analysis of 50,000+ campaigns reveals surprising trends across industries and platforms.",
      date: "2024-03-10",
      readTime: "12 min read",
      author: "Marcus Rodriguez",
      category: "Research",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      title: "The Future of Marketing Attribution: Beyond Last-Click",
      excerpt: "Why traditional attribution models are failing and how modern marketers are adapting to cookieless tracking.",
      date: "2024-03-05",
      readTime: "10 min read",
      author: "Jennifer Walsh",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984"
    }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Marketing Insights</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Benchmarketing <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Expert insights, industry trends, and actionable strategies to improve your marketing performance.
            </p>
          </div>

          {/* Featured Posts */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {posts.map((post, index) => (
              <Card key={index} className="feature-card overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-lilac-100 to-aqua-100">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-navy-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-navy-600 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-navy-600 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Stay Updated</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Get the latest marketing insights, benchmark data, and optimization tips delivered to your inbox.
            </p>
            <Button size="lg">Subscribe to Newsletter</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
