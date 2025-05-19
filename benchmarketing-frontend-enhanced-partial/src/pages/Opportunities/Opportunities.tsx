
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingDown,
  TrendingUp,
  Filter,
  Lightbulb,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Opportunity type definition
interface Opportunity {
  id: string;
  platform: string;
  title: string;
  description: string;
  potentialROI: number;
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  kpi: string;
  status: "open" | "applied" | "ignored";
}

export default function Opportunities() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filter, setFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  // Generate mock opportunities data
  useEffect(() => {
    setLoading(true);
    
    // Mock data - in a real app this would come from API
    const mockOpportunities: Opportunity[] = [
      {
        id: "1",
        platform: "Meta",
        title: "Retargeting audience expansion",
        description: "Expand your retargeting audience to include 60-day website visitors instead of 30-day to increase reach by approximately 40%.",
        potentialROI: 18.5,
        impact: "high",
        effort: "low",
        kpi: "ROAS",
        status: "open"
      },
      {
        id: "2",
        platform: "Google",
        title: "Underperforming search keywords",
        description: "5 search keywords have CPA 35% above target. Consider pausing or reducing bids on these keywords.",
        potentialROI: 12.3,
        impact: "medium",
        effort: "low",
        kpi: "CPA",
        status: "open"
      },
      {
        id: "3",
        platform: "TikTok",
        title: "Creative refresh needed",
        description: "Your TikTok ads have been running for 3+ weeks with declining CTR. Consider refreshing creative assets.",
        potentialROI: 15.7,
        impact: "medium",
        effort: "medium",
        kpi: "CTR",
        status: "open"
      },
      {
        id: "4",
        platform: "LinkedIn",
        title: "Job title targeting expansion",
        description: "Your current targeting is missing key decision-maker titles. Expand to include Director and VP-level positions.",
        potentialROI: 8.9,
        impact: "medium",
        effort: "low",
        kpi: "Conversion Rate",
        status: "open"
      },
      {
        id: "5",
        platform: "Meta",
        title: "Budget reallocation opportunity",
        description: "Shift 30% of budget from underperforming campaign 'Summer Promo' to top performer 'Product Demo'.",
        potentialROI: 22.4,
        impact: "high",
        effort: "low",
        kpi: "ROAS",
        status: "open"
      }
    ];
    
    setTimeout(() => {
      setOpportunities(mockOpportunities);
      setLoading(false);
    }, 1000);
  }, []);

  // Function to mark opportunity as applied
  const markAsApplied = (id: string) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === id ? { ...opp, status: "applied" as const } : opp
    ));
    toast({
      title: "Opportunity marked as applied",
      description: "Great job! We'll track the results."
    });
  };

  // Function to ignore opportunity
  const ignoreOpportunity = (id: string) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === id ? { ...opp, status: "ignored" as const } : opp
    ));
    toast({
      title: "Opportunity ignored",
      description: "This opportunity won't show up in your active list."
    });
  };

  // Filter opportunities based on status and platform
  const filteredOpportunities = opportunities.filter(opp => {
    const statusMatch = filter === "all" || opp.status === filter;
    const platformMatch = platformFilter === "all" || opp.platform === platformFilter;
    return statusMatch && platformMatch;
  });

  // Sort opportunities by potential ROI (descending)
  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => 
    b.potentialROI - a.potentialROI
  );

  // Get unique platforms for filter
  const platforms = ["all", ...new Set(opportunities.map(opp => opp.platform))];

  // Function to get badge color based on impact
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "";
    }
  };

  // Function to get badge color based on effort
  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Opportunities</h1>
            <p className="text-muted-foreground">
              Quick wins and optimization ideas to improve your marketing performance.
            </p>
          </div>
          <div className="flex space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="ignored">Ignored</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    {platform === "all" ? "All Platforms" : platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <Card key={i} className="h-60 opacity-50 animate-pulse">
                <CardHeader className="bg-gray-100"></CardHeader>
                <CardContent></CardContent>
              </Card>
            ))}
          </div>
        ) : sortedOpportunities.length === 0 ? (
          <Card className="p-8 text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No opportunities found</h3>
            <p className="text-muted-foreground mt-2">
              No opportunities match your current filters. Try changing your filter criteria.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className={opportunity.status !== "open" ? "opacity-70" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-sky-50 text-sky-700">
                      {opportunity.platform}
                    </Badge>
                    {opportunity.status === "applied" && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Applied
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg mt-2">{opportunity.title}</CardTitle>
                  <CardDescription className="mt-1 text-sm">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-700">+{opportunity.potentialROI}% {opportunity.kpi}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={getImpactColor(opportunity.impact)}>
                      {opportunity.impact.charAt(0).toUpperCase() + opportunity.impact.slice(1)} impact
                    </Badge>
                    <Badge variant="outline" className={getEffortColor(opportunity.effort)}>
                      {opportunity.effort.charAt(0).toUpperCase() + opportunity.effort.slice(1)} effort
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  {opportunity.status === "open" ? (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => ignoreOpportunity(opportunity.id)}>
                        Ignore
                      </Button>
                      <Button size="sm" onClick={() => markAsApplied(opportunity.id)}>
                        Apply This
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="ml-auto">
                      View Details
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
