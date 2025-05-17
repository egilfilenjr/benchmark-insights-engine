
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart, Trophy, TrendingUp } from "lucide-react";

export default function Opportunities() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock opportunities data
  const [opportunities, setOpportunities] = useState([
    {
      id: "1",
      platform: "Meta",
      channel: "Retargeting",
      kpi: "ROAS",
      metric: "17% below benchmark",
      recommendation: "Try a shorter offer-based video format",
      potentialRoi: 85,
      easeOfFix: 70,
      priorityScore: 92,
    },
    {
      id: "2",
      platform: "Google",
      channel: "Search",
      kpi: "CPA",
      metric: "25% above benchmark",
      recommendation: "Adjust bids for non-converting keywords with high spend",
      potentialRoi: 75,
      easeOfFix: 90,
      priorityScore: 88,
    },
    {
      id: "3",
      platform: "LinkedIn",
      channel: "Sponsored Content",
      kpi: "CTR",
      metric: "32% below benchmark",
      recommendation: "Test carousel format with stronger industry headlines",
      potentialRoi: 65,
      easeOfFix: 80,
      priorityScore: 72,
    },
    {
      id: "4",
      platform: "TikTok",
      channel: "Feed Ads",
      kpi: "ROAS",
      metric: "20% below benchmark",
      recommendation: "Implement creator-style content with authentic product demos",
      potentialRoi: 80,
      easeOfFix: 60,
      priorityScore: 75,
    },
    {
      id: "5",
      platform: "Google",
      channel: "Display",
      kpi: "CPA",
      metric: "35% above benchmark",
      recommendation: "Refine audience targeting to match your best customers",
      potentialRoi: 70,
      easeOfFix: 75,
      priorityScore: 78,
    },
  ]);

  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Opportunities</h1>
            <p className="text-muted-foreground">
              High-impact optimization opportunities sorted by potential ROI and ease of implementation.
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="priority">
          <TabsList>
            <TabsTrigger value="priority">Priority Score</TabsTrigger>
            <TabsTrigger value="roi">Potential ROI</TabsTrigger>
            <TabsTrigger value="ease">Ease of Fix</TabsTrigger>
          </TabsList>
          
          <TabsContent value="priority" className="mt-4">
            <OpportunitiesList 
              opportunities={opportunities.sort((a, b) => b.priorityScore - a.priorityScore)} 
              loading={loading} 
              scoreType="priority" 
            />
          </TabsContent>
          
          <TabsContent value="roi" className="mt-4">
            <OpportunitiesList 
              opportunities={opportunities.sort((a, b) => b.potentialRoi - a.potentialRoi)} 
              loading={loading} 
              scoreType="roi" 
            />
          </TabsContent>
          
          <TabsContent value="ease" className="mt-4">
            <OpportunitiesList 
              opportunities={opportunities.sort((a, b) => b.easeOfFix - a.easeOfFix)} 
              loading={loading} 
              scoreType="ease" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

interface OpportunitiesListProps {
  opportunities: Array<{
    id: string;
    platform: string;
    channel: string;
    kpi: string;
    metric: string;
    recommendation: string;
    potentialRoi: number;
    easeOfFix: number;
    priorityScore: number;
  }>;
  loading: boolean;
  scoreType: 'priority' | 'roi' | 'ease';
}

const OpportunitiesList = ({ opportunities, loading, scoreType }: OpportunitiesListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="bg-gray-100 h-16"></CardHeader>
            <CardContent className="py-6">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {opportunities.map((opportunity) => (
        <OpportunityCard 
          key={opportunity.id}
          opportunity={opportunity}
          scoreType={scoreType}
        />
      ))}
    </div>
  );
};

interface OpportunityCardProps {
  opportunity: {
    id: string;
    platform: string;
    channel: string;
    kpi: string;
    metric: string;
    recommendation: string;
    potentialRoi: number;
    easeOfFix: number;
    priorityScore: number;
  };
  scoreType: 'priority' | 'roi' | 'ease';
}

const OpportunityCard = ({ opportunity, scoreType }: OpportunityCardProps) => {
  const { platform, channel, kpi, metric, recommendation, potentialRoi, easeOfFix, priorityScore } = opportunity;
  
  const getScoreLabel = () => {
    switch (scoreType) {
      case 'priority': return 'Priority Score';
      case 'roi': return 'ROI Potential';
      case 'ease': return 'Ease of Fix';
      default: return 'Score';
    }
  };
  
  const getScoreValue = () => {
    switch (scoreType) {
      case 'priority': return priorityScore;
      case 'roi': return potentialRoi;
      case 'ease': return easeOfFix;
      default: return 0;
    }
  };
  
  const getScoreIcon = () => {
    switch (scoreType) {
      case 'priority': return <Trophy size={18} />;
      case 'roi': return <BarChart size={18} />;
      case 'ease': return <TrendingUp size={18} />;
      default: return <Trophy size={18} />;
    }
  };
  
  const getProgressColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-1">{platform} {channel}</Badge>
            <CardTitle className="text-base font-medium">{kpi}: {metric}</CardTitle>
          </div>
          <Badge 
            variant={kpi === "ROAS" ? "default" : kpi === "CPA" ? "destructive" : "secondary"}
            className="shrink-0"
          >
            {kpi}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">{recommendation}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                {getScoreIcon()}
                <span>{getScoreLabel()}</span>
              </div>
              <span className="font-semibold">{getScoreValue()}%</span>
            </div>
            <Progress
              value={getScoreValue()}
              max={100}
              className="h-2"
              indicatorClassName={getProgressColor(getScoreValue())}
            />
          </div>
          
          <Button variant="ghost" size="sm" className="w-full flex justify-between items-center text-primary hover:text-primary">
            View Details
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
