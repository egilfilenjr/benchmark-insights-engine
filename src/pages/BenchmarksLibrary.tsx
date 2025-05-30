
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Industry, 
  TrendingUp, 
  Target, 
  Building, 
  Globe, 
  Award,
  ArrowRight,
  BarChart3,
  Users,
  MapPin
} from "lucide-react";

const categoryCards = [
  {
    icon: Industry,
    title: "By Industry",
    subtitle: "Deep performance metrics by vertical & subvertical",
    path: "/benchmarks/industry",
    description: "Explore 100+ industries from Consumer Products to B2B SaaS",
    color: "bg-blue-50 border-blue-200 text-blue-700"
  },
  {
    icon: Target,
    title: "By Channel", 
    subtitle: "Benchmarks across every paid and owned channel",
    path: "/benchmarks/channel",
    description: "Compare performance across Google, Meta, TikTok, and more",
    color: "bg-green-50 border-green-200 text-green-700"
  },
  {
    icon: BarChart3,
    title: "By Metric",
    subtitle: "Compare performance by KPI (ROAS, CPA, CTR, etc.)",
    path: "/benchmarks/metric", 
    description: "Deep dive into AECR Score™, ROAS, CPA, and 10+ metrics",
    color: "bg-purple-50 border-purple-200 text-purple-700"
  },
  {
    icon: Building,
    title: "By Company Type",
    subtitle: "Filter by size, model, B2B/B2C, DTC, and more",
    path: "/benchmarks/company",
    description: "Segment by business model, company size, and sales cycle",
    color: "bg-orange-50 border-orange-200 text-orange-700"
  },
  {
    icon: Globe,
    title: "By Region",
    subtitle: "Localized and international benchmarks",
    path: "/benchmarks/region",
    description: "Regional performance data from North America to APAC",
    color: "bg-teal-50 border-teal-200 text-teal-700"
  },
  {
    icon: Award,
    title: "AECR Rankings",
    subtitle: "Highest-performing categories ranked",
    path: "/benchmarks/aecr",
    description: "Top 10 industries and channels by efficiency scores",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700"
  }
];

const featuredBenchmarks = [
  {
    industry: "Consumer Products → Beauty & Personal Care → Skincare → SPF",
    metric: "CPA",
    platform: "Meta Ads",
    median: "$22.40",
    percentile_25: "$15.30",
    percentile_75: "$31.20"
  },
  {
    industry: "B2B Software & Services → B2B SaaS → Marketing → Email Platforms", 
    metric: "CPA",
    platform: "LinkedIn Ads",
    median: "$145.60",
    percentile_25: "$98.20", 
    percentile_75: "$210.40"
  },
  {
    industry: "Personal Services → Healthcare & Wellness → Dental → General Dentistry",
    metric: "CPA", 
    platform: "Google Ads",
    median: "$85.20",
    percentile_25: "$62.50",
    percentile_75: "$125.80"
  },
  {
    industry: "Consumer Products → Food & Beverage → Beverages → Coffee",
    metric: "ROAS",
    platform: "Google Ads", 
    median: "4.2x",
    percentile_25: "3.1x",
    percentile_75: "5.8x"
  }
];

export default function BenchmarksLibrary() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Marketing Benchmarks by Industry, Channel, Metric, and More
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover performance benchmarks across hundreds of industries, marketing channels, business types, and regions. 
              Compare AECR Score™, ROAS, CPA, and CTR with live market data.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")} className="text-lg px-8 py-3">
              Compare Your Data <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/how-it-works")} className="text-lg px-8 py-3">
              How It Works
            </Button>
          </div>
        </section>

        {/* Category Grid */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Explore Benchmarks By Category</h2>
            <p className="text-muted-foreground text-lg">
              Choose your focus area to dive into specific performance data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className={`hover:shadow-lg transition-all duration-200 cursor-pointer group ${category.color}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="h-6 w-6" />
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <p className="text-sm font-medium">{category.subtitle}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm mb-4 opacity-80">{category.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-white/50 transition-colors"
                      onClick={() => navigate(category.path)}
                    >
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Featured Benchmarks */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Featured Industry Benchmarks</h2>
            <p className="text-muted-foreground text-lg">
              Sample performance data across key industries and channels
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredBenchmarks.map((benchmark, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">{benchmark.platform}</span>
                        <span>•</span>
                        <span>{benchmark.metric}</span>
                      </div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {benchmark.industry}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">25th Percentile</p>
                        <p className="font-semibold">{benchmark.percentile_25}</p>
                      </div>
                      <div className="space-y-1 border-x border-border">
                        <p className="text-sm text-muted-foreground">Median</p>
                        <p className="font-bold text-lg text-primary">{benchmark.median}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">75th Percentile</p>
                        <p className="font-semibold">{benchmark.percentile_75}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-sm"
                      onClick={() => navigate("/signup")}
                    >
                      Compare Your Performance →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="bg-muted/50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Industry Categories</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground">Marketing Channels</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Key Metrics</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">6</p>
              <p className="text-sm text-muted-foreground">Global Regions</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 bg-primary/5 rounded-2xl p-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to See How You Compare?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect your marketing accounts and get personalized benchmarks for your industry, 
              channels, and business model.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")} className="text-lg px-8 py-3">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/pricing")} className="text-lg px-8 py-3">
              View Pricing
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
