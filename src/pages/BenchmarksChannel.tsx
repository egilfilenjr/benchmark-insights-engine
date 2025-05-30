
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const channelCategories = [
  {
    type: "Paid Channels",
    color: "bg-red-50 border-red-200",
    channels: [
      { name: "Google Search", description: "Search ads and shopping campaigns", benchmarks: "CPA, ROAS, CTR" },
      { name: "Google Display", description: "Display network and remarketing", benchmarks: "CTR, CPC, CVR" },
      { name: "YouTube Ads", description: "Video advertising campaigns", benchmarks: "CPM, CTR, VTR" },
      { name: "Meta (Facebook + Instagram)", description: "Social media advertising", benchmarks: "CPA, ROAS, CTR" },
      { name: "TikTok Ads", description: "Short-form video advertising", benchmarks: "CPA, CTR, Engagement" },
      { name: "LinkedIn Ads", description: "B2B professional advertising", benchmarks: "CPA, CTR, Lead Quality" },
      { name: "Pinterest Ads", description: "Visual discovery advertising", benchmarks: "CPA, CTR, Saves" },
      { name: "Snapchat Ads", description: "Mobile-first advertising", benchmarks: "CPA, CTR, Swipe Rate" }
    ]
  },
  {
    type: "Owned Channels", 
    color: "bg-green-50 border-green-200",
    channels: [
      { name: "Email Marketing", description: "Newsletter and automated campaigns", benchmarks: "Open Rate, CTR, CVR" },
      { name: "Organic SEO", description: "Search engine optimization", benchmarks: "CTR, Conversion Rate" },
      { name: "Website Conversion", description: "On-site optimization", benchmarks: "CVR, Bounce Rate, AOV" },
      { name: "SMS / Text Campaigns", description: "Mobile messaging", benchmarks: "Open Rate, CTR, CVR" },
      { name: "App Push Notifications", description: "Mobile app engagement", benchmarks: "Open Rate, CTR, Retention" }
    ]
  },
  {
    type: "Earned / Influencer",
    color: "bg-blue-50 border-blue-200", 
    channels: [
      { name: "Influencer Whitelisting", description: "Creator content promotion", benchmarks: "CPA, Engagement, Reach" },
      { name: "Affiliate Programs", description: "Partner marketing", benchmarks: "CPA, ROAS, Partner ROI" },
      { name: "UGC Campaigns", description: "User-generated content", benchmarks: "Engagement, Shares, CVR" },
      { name: "PR & Press Pickup", description: "Earned media coverage", benchmarks: "Reach, Sentiment, Referrals" }
    ]
  }
];

export default function BenchmarksChannel() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Benchmarks by Marketing Channel</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Compare performance across paid, owned, and earned marketing channels. 
            See how your ROAS, CPA, and CTR stack up against industry standards.
          </p>
        </section>

        {/* Channel Categories */}
        <section className="space-y-12">
          {channelCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{category.type}</h2>
                <div className="w-20 h-1 bg-primary mx-auto rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.channels.map((channel, channelIndex) => (
                  <Card key={channelIndex} className={`hover:shadow-lg transition-shadow cursor-pointer group ${category.color}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {channel.description}
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Key Metrics
                        </p>
                        <p className="text-sm font-medium">
                          {channel.benchmarks}
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-white/70 transition-colors"
                        onClick={() => navigate("/signup")}
                      >
                        View Benchmarks <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="bg-muted/50 rounded-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">15+</p>
              <p className="text-sm text-muted-foreground">Paid Channels</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">8+</p>
              <p className="text-sm text-muted-foreground">Owned Channels</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">6+</p>
              <p className="text-sm text-muted-foreground">Earned Channels</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Key Metrics</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 bg-primary/5 rounded-xl p-8">
          <h2 className="text-2xl font-bold">Connect Your Channels</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get real-time benchmarks for all your marketing channels in one dashboard. 
            See which channels are over or under-performing.
          </p>
          <Button onClick={() => navigate("/signup")}>
            Start Free Trial
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
