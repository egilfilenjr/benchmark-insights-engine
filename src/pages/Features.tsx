
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CheckCircle, BarChart, Zap, Shield, Users, Lightbulb } from "lucide-react";

const features = [
  {
    icon: BarChart,
    title: "Real-Time Benchmarking",
    description: "Compare your performance against industry standards with live data from thousands of campaigns.",
    benefits: ["Live data updates", "Industry-specific metrics", "Historical trends", "Peer comparison"],
    tier: "All Plans"
  },
  {
    icon: Zap,
    title: "AECR Score Algorithm",
    description: "Our proprietary CompScore algorithm analyzes efficiency, creativity, reach, and audience targeting.",
    benefits: ["Multi-factor analysis", "Predictive insights", "Performance optimization", "Trend detection"],
    tier: "Pro+"
  },
  {
    icon: Shield,
    title: "Data Security & Privacy",
    description: "Enterprise-grade security with SOC 2 compliance and advanced data protection.",
    benefits: ["SOC 2 Type II", "End-to-end encryption", "GDPR compliant", "Regular audits"],
    tier: "All Plans"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share insights, create custom reports, and collaborate with unlimited team members.",
    benefits: ["Unlimited users", "Role-based access", "Custom dashboards", "Shared reports"],
    tier: "Team+"
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Recommendations",
    description: "Get personalized optimization suggestions based on your specific campaigns and goals.",
    benefits: ["Smart recommendations", "Budget optimization", "Creative insights", "Performance forecasting"],
    tier: "Pro+"
  }
];

const integrations = [
  "Google Ads", "Meta Ads", "TikTok Ads", "LinkedIn Ads", "Pinterest Ads", "Snapchat Ads",
  "Google Analytics", "Shopify", "Klaviyo", "HubSpot", "Salesforce", "Mailchimp"
];

export default function Features() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Powerful Features for Modern Marketers</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Everything you need to benchmark, optimize, and scale your marketing performance
          </p>
          <Button asChild size="lg">
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <feature.icon className="w-8 h-8 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{feature.tier}</Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integrations Section */}
        <div className="bg-muted/30 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Connect Your Entire Marketing Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white rounded-lg p-3 text-center shadow-sm">
                <span className="text-sm font-medium">{integration}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link to="/integrations">View All Integrations</Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of marketers who trust Benchmarketing for their performance optimization
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/demo">Request Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
