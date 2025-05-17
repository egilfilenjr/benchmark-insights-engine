import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart, Trophy, TrendingUp } from "lucide-react";

type Opportunity = {
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

export default function Opportunities() {
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    setLoading(true);

    // TODO: Replace with Supabase fetch or scoring algorithm
    const mockData: Opportunity[] = [
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
        recommendation: "Test carousel ads with stats-first copy",
        potentialRoi: 65,
        easeOfFix: 60,
        priorityScore: 72,
      },
    ];

    setOpportunities(mockData);
    setLoading(false);
  }, [user]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Opportunities</h1>
            <p className="text-muted-foreground">
              High-leverage areas to improve performance.
            </p>
          </div>
          <Button variant="outline">
            <ChevronRight className="w-4 h-4 mr-2" />
            View All Insights
          </Button>
        </div>

        <Tabs defaultValue="priority">
          <TabsList>
            <TabsTrigger value="priority">Top Priority</TabsTrigger>
            <TabsTrigger value="roi">By ROI</TabsTrigger>
            <TabsTrigger value="ease">By Ease of Fix</TabsTrigger>
          </TabsList>

          <TabsContent value="priority">
            <div className="grid gap-4 md:grid-cols-2">
              {opportunities
                .sort((a, b) => b.priorityScore - a.priorityScore)
                .map((opp) => (
                  <Card key={opp.id}>
                    <CardHeader>
                      <CardTitle>{opp.platform} – {opp.channel}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>KPI:</strong> {opp.kpi}</p>
                      <p><strong>Issue:</strong> {opp.metric}</p>
                      <p><strong>Recommendation:</strong> {opp.recommendation}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Potential ROI</p>
                        <Progress value={opp.potentialRoi} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Ease of Fix</p>
                        <Progress value={opp.easeOfFix} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Priority Score</p>
                        <Progress value={opp.priorityScore} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="roi">
            <div className="grid gap-4 md:grid-cols-2">
              {opportunities
                .sort((a, b) => b.potentialRoi - a.potentialRoi)
                .map((opp) => (
                  <Card key={opp.id}>
                    <CardHeader>
                      <CardTitle>{opp.platform} – {opp.channel}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>KPI:</strong> {opp.kpi}</p>
                      <p><strong>Issue:</strong> {opp.metric}</p>
                      <p><strong>Recommendation:</strong> {opp.recommendation}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Potential ROI</p>
                        <Progress value={opp.potentialRoi} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ease">
            <div className="grid gap-4 md:grid-cols-2">
              {opportunities
                .sort((a, b) => b.easeOfFix - a.easeOfFix)
                .map((opp) => (
                  <Card key={opp.id}>
                    <CardHeader>
                      <CardTitle>{opp.platform} – {opp.channel}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p><strong>KPI:</strong> {opp.kpi}</p>
                      <p><strong>Issue:</strong> {opp.metric}</p>
                      <p><strong>Recommendation:</strong> {opp.recommendation}</p>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Ease of Fix</p>
                        <Progress value={opp.easeOfFix} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
