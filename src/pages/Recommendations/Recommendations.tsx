
import React, { useState, useEffect } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Clock, 
  X, 
  Lightbulb, 
  ArrowRight, 
  Tag,
  ChevronDown,
  Filter,
  SortDesc,
  RefreshCw
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CustomBadge } from '@/components/ui/custom-badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

// This is the main component that will be exported
function Recommendations() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('impact');
  
  // Mock user plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'

  // Mock recommendations data
  const mockRecommendations = [
    {
      id: "r1",
      platform: "meta",
      channel: "feed",
      kpi: "cpa",
      title: "Reduce CPA in Meta Feed Campaigns",
      description: "Your CPA in Meta Feed campaigns is 32% higher than benchmark. Adjust your targeting and creative approach.",
      recommendation: "Test lookalike audiences based on your top 1% of converters rather than your current 5% approach.",
      impact: "high",
      effort: "medium",
      status: "open",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r2",
      platform: "google",
      channel: "search",
      kpi: "roas",
      title: "Improve ROAS in Google Search",
      description: "Your Google Search campaigns have a ROAS of 2.1x compared to industry benchmark of 3.5x.",
      recommendation: "Implement a tiered bidding strategy based on keyword conversion probability.",
      impact: "high",
      effort: "high",
      status: "applied",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r3",
      platform: "tiktok",
      channel: "feed",
      kpi: "ctr",
      title: "Boost CTR on TikTok Feed Ads",
      description: "Your CTR is in the bottom 25th percentile of benchmarks. Creative fatigue may be an issue.",
      recommendation: "Refresh creative with trending audio and more dynamic first 2 seconds.",
      impact: "medium",
      effort: "medium",
      status: "open",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r4",
      platform: "linkedin",
      channel: "sponsored",
      kpi: "cpa",
      title: "Reduce LinkedIn Sponsored Content CPA",
      description: "You're paying 48% above benchmark for leads from LinkedIn Sponsored Content.",
      recommendation: "Test document ads format which shows 26% lower CPA in similar accounts.",
      impact: "medium",
      effort: "low",
      status: "ignored",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    },
    {
      id: "r5",
      platform: "meta",
      channel: "stories",
      kpi: "roas",
      title: "Improve ROAS on Instagram Stories",
      description: "Your Instagram Stories campaigns have a ROAS of 1.3x compared to benchmark of 2.0x.",
      recommendation: "Implement a product highlight format with clear price and CTA in first 3 seconds.",
      impact: "high",
      effort: "low",
      status: "open",
      createdAt: new Date(),
    },
  ];
  
  useEffect(() => {
    // In a real app, we would fetch recommendations from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    if (filter === 'open') return rec.status === 'open';
    if (filter === 'applied') return rec.status === 'applied';
    if (filter === 'ignored') return rec.status === 'ignored';
    if (filter === 'high-impact') return rec.impact === 'high';
    return true;
  });
  
  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    if (sort === 'impact') {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
    if (sort === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });
  
  const handleRecommendationAction = (id, action) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.id === id 
          ? { ...rec, status: action === 'ignore' ? 'ignored' : action === 'apply' ? 'applied' : rec.status } 
          : rec
      )
    );
    
    toast({
      title: action === 'ignore' ? "Recommendation ignored" : "Recommendation applied",
      description: action === 'ignore' 
        ? "This recommendation won't appear in your active list." 
        : "Great! We'll track the impact of this change.",
    });
  };

  // Check if user is on the right plan to access recommendations
  const isAccessible = userPlan === 'pro_plus' || userPlan === 'agency' || testMode;
  
  if (!isAccessible) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Recommendations</h1>
              <p className="text-muted-foreground">
                Get personalized recommendations to improve your campaigns.
              </p>
            </div>
          </div>
          
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Lightbulb size={48} className="mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                AI-driven recommendations are available with Pro+ and Agency plans. Upgrade to receive personalized advice based on benchmarks.
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Recommendations</h1>
            <p className="text-muted-foreground">
              Get personalized recommendations to improve your campaigns.
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button variant="outline" size="sm" className="h-8 px-2">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  All Recommendations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('open')}>
                  Open
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('applied')}>
                  Applied
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('ignored')}>
                  Ignored
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('high-impact')}>
                  High Impact Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <SortDesc className="h-4 w-4 mr-1" />
                  Sort
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSort('impact')}>
                  By Impact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort('newest')}>
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSort('oldest')}>
                  Oldest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Recommendations</TabsTrigger>
            <TabsTrigger value="platform">By Platform</TabsTrigger>
            <TabsTrigger value="kpi">By KPI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : sortedRecommendations.length > 0 ? (
              <div className="space-y-4">
                {sortedRecommendations.map(recommendation => (
                  <RecommendationCard 
                    key={recommendation.id}
                    recommendation={recommendation}
                    onAction={handleRecommendationAction}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground max-w-md mb-2">
                    You don't have any recommendations right now. Check back later or update your campaign data.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="platform" className="mt-6">
            <Alert>
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                Platform-specific recommendations will be available in an upcoming update.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="kpi" className="mt-6">
            <Alert>
              <AlertTitle>Coming Soon</AlertTitle>
              <AlertDescription>
                KPI-focused recommendations will be available in an upcoming update.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

// Recommendation Card Component
const RecommendationCard = ({ recommendation, onAction }) => {
  // Helper function to format the platform name for display
  const getPlatformDisplay = (platform) => {
    const platforms = {
      meta: "Meta",
      google: "Google",
      tiktok: "TikTok",
      linkedin: "LinkedIn"
    };
    return platforms[platform] || platform;
  };
  
  // Helper function to get badge color based on impact
  const getImpactBadge = (impact) => {
    if (impact === 'high') return "bg-red-500 text-white";
    if (impact === 'medium') return "bg-yellow-500 text-white";
    return "bg-blue-500 text-white";
  };
  
  // Helper function to format date
  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <Card className={recommendation.status === 'ignored' ? "opacity-60" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CustomBadge variant="outline" className="px-2 py-0.5 text-xs">
                {recommendation.platform.toUpperCase()}
              </CustomBadge>
              <CustomBadge variant="outline" className="px-2 py-0.5 text-xs capitalize">
                {recommendation.channel}
              </CustomBadge>
              <CustomBadge variant="outline" className="px-2 py-0.5 text-xs uppercase">
                {recommendation.kpi}
              </CustomBadge>
            </div>
            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <CustomBadge variant="outline" className={`${getImpactBadge(recommendation.impact)} border-0`}>
              {recommendation.impact.charAt(0).toUpperCase() + recommendation.impact.slice(1)} Impact
            </CustomBadge>
            
            {recommendation.status === 'applied' && (
              <CustomBadge variant="success" className="flex items-center gap-1">
                <CheckCircle size={12} />
                Applied
              </CustomBadge>
            )}
            
            {recommendation.status === 'ignored' && (
              <CustomBadge variant="outline" className="flex items-center gap-1 text-gray-500">
                <X size={12} />
                Ignored
              </CustomBadge>
            )}
          </div>
        </div>
        <CardDescription className="flex items-center mt-1">
          <Clock size={14} className="mr-1" />
          {formatDate(recommendation.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{recommendation.description}</p>
        <div className="bg-muted p-4 rounded-md mb-4">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-primary" />
            <strong>Recommendation:</strong>
          </div>
          <p className="mt-1">{recommendation.recommendation}</p>
        </div>
        
        {recommendation.status === 'open' && (
          <div className="flex flex-col xs:flex-row gap-2 justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAction(recommendation.id, 'ignore')}
            >
              <X className="h-4 w-4 mr-1" />
              Ignore
            </Button>
            <Button 
              size="sm" 
              onClick={() => onAction(recommendation.id, 'apply')}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Apply Recommendation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Recommendations;
