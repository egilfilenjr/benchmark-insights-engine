
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ThumbsUp, Bell, Clock, CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Recommendations = () => {
  const recommendationList = [
    {
      id: "rec1",
      title: "Increase budget for high-performing Google Ads campaign",
      description:
        "Your 'Summer Sale 2025' campaign has a 320% ROAS. Consider adding $2,000 to capitalize on performance.",
      platform: "Google Ads",
      impact: "high",
      effort: "low",
      timeframe: "immediate",
      status: "new",
      category: "budget",
    },
    {
      id: "rec2",
      title: "Pause underperforming Facebook ad sets",
      description:
        "Three ad sets have spent $1,500 with no conversions. We recommend pausing these to reallocate budget.",
      platform: "Meta",
      impact: "medium",
      effort: "low",
      timeframe: "immediate",
      status: "new",
      category: "optimization",
    },
    {
      id: "rec3",
      title: "Create lookalike audience based on high-value customers",
      description:
        "Your customer data shows a segment with 3x higher LTV. Create a Meta lookalike to find similar prospects.",
      platform: "Meta",
      impact: "high",
      effort: "medium",
      timeframe: "this week",
      status: "new",
      category: "audience",
    },
    {
      id: "rec4",
      title: "Implement Responsive Search Ads across all ad groups",
      description:
        "20% of your ad groups still use expanded text ads. Update to RSAs for better performance.",
      platform: "Google Ads",
      impact: "medium",
      effort: "medium",
      timeframe: "this week",
      status: "new",
      category: "creative",
    },
    {
      id: "rec5",
      title: "Add negative keywords to reduce wasted spend",
      description:
        "We found 47 search terms driving clicks but no conversions. Add these as negative keywords.",
      platform: "Google Ads",
      impact: "medium",
      effort: "low",
      timeframe: "immediate",
      status: "implemented",
      category: "optimization",
    },
    {
      id: "rec6",
      title: "Set up conversion value rules for enhanced ROAS tracking",
      description:
        "Implement conversion value rules to better account for different lead types and their values.",
      platform: "Google Ads",
      impact: "high",
      effort: "high",
      timeframe: "this month",
      status: "in_progress",
      category: "measurement",
    },
    {
      id: "rec7",
      title: "Optimize your LinkedIn ad copy based on A/B test results",
      description:
        "Recent tests show benefit-focused headlines outperform feature-focused ones by 45%.",
      platform: "LinkedIn",
      impact: "medium",
      effort: "medium",
      timeframe: "this week",
      status: "new",
      category: "creative",
    },
    {
      id: "rec8",
      title: "Implement TikTok pixel for better targeting",
      description:
        "Add the TikTok pixel to your website to improve audience targeting and conversion tracking.",
      platform: "TikTok",
      impact: "high",
      effort: "medium",
      timeframe: "this week",
      status: "scheduled",
      category: "measurement",
    },
  ];

  // Filter recommendations by status
  const newRecommendations = recommendationList.filter(
    (rec) => rec.status === "new"
  );
  const inProgressRecommendations = recommendationList.filter(
    (rec) => rec.status === "in_progress"
  );
  const scheduledRecommendations = recommendationList.filter(
    (rec) => rec.status === "scheduled"
  );
  const implementedRecommendations = recommendationList.filter(
    (rec) => rec.status === "implemented"
  );

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return (
          <Badge variant="default" className="bg-green-600">
            High Impact
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="default" className="bg-blue-600">
            Medium Impact
          </Badge>
        );
      case "low":
        return (
          <Badge variant="default" className="bg-orange-600">
            Low Impact
          </Badge>
        );
      default:
        return null;
    }
  };

  const getEffortBadge = (effort: string) => {
    switch (effort) {
      case "low":
        return (
          <Badge variant="outline" className="border-green-600 text-green-600">
            Low Effort
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="border-blue-600 text-blue-600">
            Medium Effort
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="border-orange-600 text-orange-600">
            High Effort
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTimeframeBadge = (timeframe: string) => {
    switch (timeframe) {
      case "immediate":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-600">
            Immediate
          </Badge>
        );
      case "this week":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-600">
            This Week
          </Badge>
        );
      case "this month":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-600">
            This Month
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "Google Ads":
        return (
          <Badge variant="outline" className="border-blue-600 text-blue-600">
            Google Ads
          </Badge>
        );
      case "Meta":
        return (
          <Badge variant="outline" className="border-blue-400 text-blue-400">
            Meta
          </Badge>
        );
      case "LinkedIn":
        return (
          <Badge variant="outline" className="border-blue-800 text-blue-800">
            LinkedIn
          </Badge>
        );
      case "TikTok":
        return (
          <Badge variant="outline" className="border-black text-black">
            TikTok
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="border-blue-600 text-blue-600 flex items-center gap-1">
            <Bell size={12} /> New
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="outline" className="border-orange-600 text-orange-600 flex items-center gap-1">
            <Clock size={12} /> In Progress
          </Badge>
        );
      case "scheduled":
        return (
          <Badge variant="outline" className="border-purple-600 text-purple-600 flex items-center gap-1">
            <Clock size={12} /> Scheduled
          </Badge>
        );
      case "implemented":
        return (
          <Badge variant="outline" className="border-green-600 text-green-600 flex items-center gap-1">
            <CheckCircle size={12} /> Implemented
          </Badge>
        );
      default:
        return null;
    }
  };

  const RecommendationCard = ({ recommendation }: { recommendation: any }) => {
    return (
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{recommendation.title}</CardTitle>
              <CardDescription className="mt-2">
                {getPlatformBadge(recommendation.platform)}
                {getStatusBadge(recommendation.status)}
              </CardDescription>
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="sr-only">Like</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark as helpful</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {recommendation.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {getImpactBadge(recommendation.impact)}
            {getEffortBadge(recommendation.effort)}
            {getTimeframeBadge(recommendation.timeframe)}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">
            Details
          </Button>
          <Button size="sm">
            Apply <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Recommendations</h1>
            <p className="text-muted-foreground">
              AI-powered recommendations to improve your marketing performance
            </p>
          </div>
          <Button>Apply All High Impact</Button>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="new" className="flex-1">
              New ({newRecommendations.length})
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex-1">
              In Progress ({inProgressRecommendations.length})
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="flex-1">
              Scheduled ({scheduledRecommendations.length})
            </TabsTrigger>
            <TabsTrigger value="implemented" className="flex-1">
              Implemented ({implementedRecommendations.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new">
            {newRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </TabsContent>
          <TabsContent value="in_progress">
            {inProgressRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </TabsContent>
          <TabsContent value="scheduled">
            {scheduledRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </TabsContent>
          <TabsContent value="implemented">
            {implementedRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Recommendations;
