
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Check, X, ThumbsUp, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Recommendations() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    platform: "all",
    kpiType: "all",
    funnelStage: "all"
  });
  
  // Mock recommendations data
  const [recommendations, setRecommendations] = useState([
    {
      id: "1",
      platform: "Meta",
      channel: "Feed",
      kpi: "ROAS",
      kpiType: "roas",
      funnelStage: "middle",
      problem: "ROAS is 22% below benchmark for your primary lookalike audience",
      recommendation: "Narrow your lookalike audience from 3% to 1% and test a video creative focused on testimonials",
      estimatedImpact: "15-20% ROAS increase",
      status: "open"
    },
    {
      id: "2",
      platform: "Google",
      channel: "Search",
      kpi: "CPA",
      kpiType: "cpa",
      funnelStage: "bottom",
      problem: "CPA for branded terms is 30% higher than benchmark",
      recommendation: "Update ad copy to emphasize limited-time offer and increase bid adjustments for high-converting geos",
      estimatedImpact: "25-30% CPA reduction",
      status: "open"
    },
    {
      id: "3",
      platform: "LinkedIn",
      channel: "Sponsored",
      kpi: "CTR",
      kpiType: "ctr",
      funnelStage: "top",
      problem: "CTR is in the bottom 20% of your industry benchmark",
      recommendation: "Implement carousel format with stronger headers and industry-specific statistics",
      estimatedImpact: "40-45% CTR improvement",
      status: "open"
    },
    {
      id: "4",
      platform: "TikTok",
      channel: "Feed",
      kpi: "ROAS",
      kpiType: "roas",
      funnelStage: "middle",
      problem: "ROAS is 15% below benchmark for younger demographics",
      recommendation: "Create shorter (< 15sec) videos with stronger CTAs that highlight core product benefits",
      estimatedImpact: "10-15% ROAS increase",
      status: "open"
    },
    {
      id: "5",
      platform: "Google",
      channel: "Display",
      kpi: "CPA",
      kpiType: "cpa",
      funnelStage: "top",
      problem: "Awareness campaigns have a CPA 50% higher than similar audience targeting",
      recommendation: "Implement custom intent audiences based on your highest converting search terms",
      estimatedImpact: "30-35% CPA reduction",
      status: "open"
    },
  ]);
  
  // Mock team plan for test mode
  const userPlan = "pro_plus"; // Could be 'free', 'pro', 'pro_plus', 'agency'

  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const filteredRecommendations = recommendations.filter(rec => {
    return (
      (filter.platform === "all" || rec.platform === filter.platform) &&
      (filter.kpiType === "all" || rec.kpiType === filter.kpiType) &&
      (filter.funnelStage === "all" || rec.funnelStage === filter.funnelStage)
    );
  });

  const handleApply = (id: string) => {
    // In a real implementation, would update the status in Supabase
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, status: "applied" } : rec
      )
    );
    
    toast({
      title: "Recommendation applied",
      description: "The recommendation has been marked as applied.",
    });
  };

  const handleIgnore = (id: string) => {
    // In a real implementation, would update the status in Supabase
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id ? { ...rec, status: "ignored" } : rec
      )
    );
    
    toast({
      title: "Recommendation ignored",
      description: "The recommendation has been marked as ignored.",
    });
  };

  // Check if user is eligible for this feature
  const planAccessible = userPlan === "pro_plus" || userPlan === "agency";

  if (!planAccessible && !testMode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Recommendations</h1>
          </div>
          
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                AI-powered recommendations are available on Pro+ and Agency plans. Upgrade to unlock personalized performance improvements.
              </p>
              <Button className="w-full sm:w-auto">Upgrade Plan</Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AI Recommendations</h1>
            <p className="text-muted-foreground">
              Personalized, data-driven suggestions to improve your marketing performance.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Tabs defaultValue="open">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="applied">Applied</TabsTrigger>
                  <TabsTrigger value="ignored">Ignored</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Select onValueChange={(value) => handleFilterChange("platform", value)}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="Meta">Meta</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => handleFilterChange("kpiType", value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="KPI Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All KPIs</SelectItem>
                      <SelectItem value="cpa">CPA</SelectItem>
                      <SelectItem value="roas">ROAS</SelectItem>
                      <SelectItem value="ctr">CTR</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select onValueChange={(value) => handleFilterChange("funnelStage", value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Funnel Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="top">Top Funnel</SelectItem>
                      <SelectItem value="middle">Mid Funnel</SelectItem>
                      <SelectItem value="bottom">Bottom Funnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="open" className="space-y-4">
                {loading ? (
                  <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader className="bg-gray-100 h-20"></CardHeader>
                        <CardContent className="py-6">
                          <div className="h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                        <CardFooter className="bg-gray-50 h-16"></CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : filteredRecommendations.filter(r => r.status === "open").length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredRecommendations
                      .filter(r => r.status === "open")
                      .map(recommendation => (
                        <RecommendationCard 
                          key={recommendation.id}
                          recommendation={recommendation}
                          onApply={() => handleApply(recommendation.id)}
                          onIgnore={() => handleIgnore(recommendation.id)}
                        />
                      ))
                    }
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No open recommendations match your current filters.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="applied" className="space-y-4">
                {filteredRecommendations.filter(r => r.status === "applied").length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredRecommendations
                      .filter(r => r.status === "applied")
                      .map(recommendation => (
                        <RecommendationCard 
                          key={recommendation.id}
                          recommendation={recommendation}
                          onApply={() => {}}
                          onIgnore={() => {}}
                          isApplied
                        />
                      ))
                    }
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No applied recommendations yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="ignored" className="space-y-4">
                {filteredRecommendations.filter(r => r.status === "ignored").length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredRecommendations
                      .filter(r => r.status === "ignored")
                      .map(recommendation => (
                        <RecommendationCard 
                          key={recommendation.id}
                          recommendation={recommendation}
                          onApply={() => handleApply(recommendation.id)}
                          onIgnore={() => {}}
                          isIgnored
                        />
                      ))
                    }
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <p className="text-muted-foreground">No ignored recommendations.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

type Recommendation = {
  id: string;
  platform: string;
  channel: string;
  kpi: string;
  kpiType: string;
  funnelStage: string;
  problem: string;
  recommendation: string;
  estimatedImpact: string;
  status: string;
};

interface RecommendationCardProps {
  recommendation: Recommendation;
  onApply: () => void;
  onIgnore: () => void;
  isApplied?: boolean;
  isIgnored?: boolean;
}

const RecommendationCard = ({ 
  recommendation, 
  onApply, 
  onIgnore,
  isApplied = false,
  isIgnored = false
}: RecommendationCardProps) => {
  const { platform, channel, kpi, problem, recommendation: recommendationText, estimatedImpact } = recommendation;
  
  return (
    <Card className={isIgnored ? "opacity-75" : ""}>
      <CardHeader className="bg-gray-50">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-1">{platform} {channel}</Badge>
            <CardTitle className="text-lg">{kpi} Optimization</CardTitle>
          </div>
          <Badge variant={kpi === "ROAS" ? "default" : kpi === "CPA" ? "destructive" : "secondary"}>
            {kpi}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Problem:</h4>
            <p>{problem}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Recommendation:</h4>
            <p>{recommendationText}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Estimated Impact:</h4>
            <p className="font-semibold text-green-600">{estimatedImpact}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 bg-gray-50 flex justify-between">
        {isApplied ? (
          <Badge variant="success" className="flex items-center gap-1">
            <Check size={14} />
            Applied
          </Badge>
        ) : isIgnored ? (
          <div className="flex space-x-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <X size={14} />
              Ignored
            </Badge>
            <Button variant="outline" size="sm" onClick={onApply}>
              Reconsider
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onIgnore}>
              Ignore
            </Button>
            <Button size="sm" onClick={onApply}>
              Apply
            </Button>
          </div>
        )}
        <Button variant="ghost" size="sm" className="text-gray-500">
          <ArrowUpRight size={14} className="mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
