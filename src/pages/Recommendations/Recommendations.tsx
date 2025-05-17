import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/hooks/use-toast";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  platform: string;
  kpi: string;
  funnelStage: "Top" | "Mid" | "Bottom";
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  status: "new" | "applied" | "ignored";
};

export default function Recommendations() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (!["pro_plus", "agency"].includes(plan)) return;

    setLoading(true);

    // TODO: Replace with Supabase query
    const mockRecs: Recommendation[] = [
      {
        id: "1",
        title: "Increase budget for high-performing campaign",
        description:
          "Your 'Summer Sale' campaign has 320% ROAS. Add $2,000 to capitalize.",
        platform: "Google Ads",
        kpi: "ROAS",
        funnelStage: "Bottom",
        impact: "high",
        effort: "low",
        status: "new",
      },
      {
        id: "2",
        title: "Pause underperforming Meta ad sets",
        description: "Spent $1,500 with no conversions. Pause to reduce waste.",
        platform: "Meta",
        kpi: "CPA",
        funnelStage: "Mid",
        impact: "medium",
        effort: "low",
        status: "new",
      },
    ];

    setRecommendations(mockRecs);
    setLoading(false);
  }, [plan]);

  const handleStatusUpdate = (id: string, newStatus: Recommendation["status"]) => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: newStatus } : rec))
    );
    toast({ title: `Marked as ${newStatus}` });
  };

  if (!["pro_plus", "agency"].includes(plan)) {
    return (
      <AppLayout>
        <div className="text-center max-w-lg mx-auto mt-24">
          <h1 className="text-2xl font-semibold">Upgrade Required</h1>
          <p className="text-muted-foreground mt-2">
            AI recommendations are only available to Pro+ and Agency plans.
          </p>
          <Button className="mt-4">Upgrade Plan</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">AI Recommendations</h1>
          <p className="text-muted-foreground">
            Personalized ideas to improve your campaign performance.
          </p>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="roas">ROAS</TabsTrigger>
            <TabsTrigger value="cpa">CPA</TabsTrigger>
            <TabsTrigger value="ctr">CTR</TabsTrigger>
          </TabsList>

          {["all", "roas", "cpa", "ctr"].map((filter) => (
            <TabsContent value={filter} key={filter}>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations
                  .filter((r) =>
                    filter === "all" ? true : r.kpi.toLowerCase() === filter
                  )
                  .map((rec) => (
                    <Card key={rec.id}>
                      <CardHeader>
                        <CardTitle>{rec.title}</CardTitle>
                        <CardDescription>{rec.platform} • {rec.kpi}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{rec.description}</p>
                        <div className="mt-3 flex gap-2 text-xs">
                          <Badge variant="outline">{rec.impact} impact</Badge>
                          <Badge variant="outline">{rec.effort} effort</Badge>
                          <Badge variant="outline">{rec.funnelStage} funnel</Badge>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {rec.status === "applied" && (
                          <CheckCircle className="text-green-600 w-5 h-5" />
                        )}
                        {rec.status === "ignored" && (
                          <Clock className="text-gray-400 w-5 h-5" />
                        )}
                        {rec.status === "new" && (
                          <ThumbsUp className="text-blue-500 w-5 h-5" />
                        )}

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(rec.id, "applied")}
                          >
                            Apply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStatusUpdate(rec.id, "ignored")}
                          >
                            Ignore
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
