
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, MessageCircle, Users, Target } from 'lucide-react';

export default function RedditBenchmarks() {
  const keyMetrics = [
    { metric: "Average ROAS", value: "2.8x", change: "+25%", trend: "up" },
    { metric: "Average CPC", value: "$0.75", change: "-15%", trend: "down" },
    { metric: "Average CTR", value: "0.9%", change: "+18%", trend: "up" },
    { metric: "Engagement Rate", value: "4.2%", change: "+22%", trend: "up" }
  ];

  const topSubreddits = [
    { category: "Gaming", roas: "3.4x", cpc: "$0.65", engagement: "6.8%" },
    { category: "Technology", roas: "3.1x", cpc: "$0.85", engagement: "5.2%" },
    { category: "Personal Finance", roas: "2.9x", cpc: "$1.15", engagement: "4.1%" },
    { category: "Fashion", roas: "2.6x", cpc: "$0.95", engagement: "3.8%" }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Reddit Advertising</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Reddit Ads <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Reddit advertising performance benchmarks for reaching engaged communities 
              and niche audiences with authentic, conversation-driven content.
            </p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyMetrics.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardDescription>{item.metric}</CardDescription>
                  <CardTitle className="text-2xl">{item.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center gap-1 text-sm ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    {item.change} vs last quarter
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Platform Insights */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Reddit Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Niche Communities</h4>
                  <p className="text-navy-600 text-sm">
                    130,000+ active communities allow for highly targeted advertising
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Authentic Engagement</h4>
                  <p className="text-navy-600 text-sm">
                    Community-driven discussions lead to 40% higher engagement rates
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-navy-900 mb-2">Cost Efficiency</h4>
                  <p className="text-navy-600 text-sm">
                    Lower competition results in 30% lower CPCs than mainstream platforms
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top Performing Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSubreddits.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.category}</span>
                      <div className="flex gap-3 text-sm">
                        <span>ROAS: {item.roas}</span>
                        <span>CPC: {item.cpc}</span>
                        <span>Eng: {item.engagement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Tips */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Reddit Advertising Best Practices
              </CardTitle>
              <CardDescription>
                Strategies to succeed with Reddit's unique community-focused platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Content Strategy</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Create native, non-promotional content</li>
                    <li>• Participate in community discussions</li>
                    <li>• Use conversation starters and AMAs</li>
                    <li>• Respect subreddit rules and culture</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-navy-900">Targeting & Campaign Setup</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Target relevant subreddits specifically</li>
                    <li>• Use interest and behavioral targeting</li>
                    <li>• Test conversation ads for engagement</li>
                    <li>• Monitor comments and respond actively</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Unlock Reddit's Community Power
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your Reddit campaigns against industry benchmarks and 
              discover how to effectively engage with niche communities.
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
