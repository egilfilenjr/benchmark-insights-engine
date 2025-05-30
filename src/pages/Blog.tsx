
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Blog() {
  const featuredPost = {
    title: "The Ultimate Guide to Marketing Benchmarks in 2024",
    excerpt: "Everything you need to know about using industry benchmarks to improve your marketing performance and stay ahead of the competition.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Best Practices",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    slug: "ultimate-guide-marketing-benchmarks-2024"
  };

  const posts = [
    {
      title: "Benchmark vs Baseline: What's the Difference?",
      excerpt: "Understanding the key differences between benchmarks and baselines for better performance measurement.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      category: "Education",
      readTime: "5 min read",
      date: "Dec 12, 2024",
      slug: "benchmark-vs-baseline"
    },
    {
      title: "How to Compare ROAS Across Different Platforms",
      excerpt: "A comprehensive guide to normalizing and comparing ROAS metrics across Meta, Google, TikTok, and more.",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d",
      category: "Analytics",
      readTime: "6 min read",
      date: "Dec 10, 2024",
      slug: "how-to-compare-roas"
    },
    {
      title: "Top 5 Metrics Every Marketer Should Track",
      excerpt: "The essential KPIs that matter most for measuring and optimizing your marketing performance.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      category: "Best Practices",
      readTime: "4 min read",
      date: "Dec 8, 2024",
      slug: "top-5-metrics-to-track"
    },
    {
      title: "Seasonal Trends in Digital Marketing Performance",
      excerpt: "How seasonal patterns affect your marketing metrics and what to expect throughout the year.",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d",
      category: "Trends",
      readTime: "7 min read",
      date: "Dec 5, 2024",
      slug: "seasonal-trends"
    }
  ];

  const categories = ["All", "Best Practices", "Analytics", "Trends", "Case Studies", "Industry Insights"];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Blog</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Marketing <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Stay ahead with the latest marketing trends, benchmark insights, and best practices 
              from industry experts.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 h-4 w-4" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-16 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4">{featuredPost.category}</Badge>
                <h2 className="text-3xl font-bold text-navy-900 mb-4">{featuredPost.title}</h2>
                <p className="text-navy-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 mb-6 text-sm text-navy-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Button asChild>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4 text-sm text-navy-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mt-16 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Never Miss an Update</h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Get the latest marketing insights, benchmark reports, and industry trends 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
