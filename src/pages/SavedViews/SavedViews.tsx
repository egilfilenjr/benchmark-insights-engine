
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LayoutDashboard, ExternalLink, Edit, Trash, Star, BarChart, Share2, PlusCircle, Calendar } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function SavedViews() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock data for saved views
  const [savedViews, setSavedViews] = useState([
    {
      id: "1",
      title: "Meta ROAS by Campaign",
      description: "Comparison of ROAS across all Meta campaigns with benchmarks",
      dateRange: { from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) },
      platform: "Meta",
      kpiFocus: "ROAS",
      filters: {
        conversionType: "Purchase",
        campaignType: "All",
      },
      isPinned: true,
      isShared: false,
      createdAt: new Date(2025, 3, 5),
      createdBy: "You",
    },
    {
      id: "2",
      title: "Google Search CPA Tracker",
      description: "Weekly CPA trend for Google Search campaigns",
      dateRange: { from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) },
      platform: "Google",
      kpiFocus: "CPA",
      filters: {
        conversionType: "Lead",
        campaignType: "Search",
      },
      isPinned: true,
      isShared: true,
      createdAt: new Date(2025, 3, 12),
      createdBy: "You",
    },
    {
      id: "3",
      title: "TikTok Ad Performance",
      description: "Performance metrics for all TikTok campaigns",
      dateRange: { from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) },
      platform: "TikTok",
      kpiFocus: "CTR",
      filters: {
        conversionType: "All",
        campaignType: "All",
      },
      isPinned: false,
      isShared: false,
      createdAt: new Date(2025, 3, 18),
      createdBy: "You",
    },
    {
      id: "4",
      title: "LinkedIn Lead Gen Dashboard",
      description: "Lead generation performance for LinkedIn campaigns",
      dateRange: { from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) },
      platform: "LinkedIn",
      kpiFocus: "CPA",
      filters: {
        conversionType: "Lead",
        campaignType: "Sponsored",
      },
      isPinned: false,
      isShared: true,
      createdAt: new Date(2025, 3, 20),
      createdBy: "Marketing Team",
    },
  ]);
  
  // New view state
  const [newView, setNewView] = useState({
    title: "",
    description: "",
    platform: "All",
    kpiFocus: "All",
    isPinned: false,
    isShared: false,
    conversionType: "All",
    campaignType: "All",
  });
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
  const handleTogglePin = (id: string) => {
    setSavedViews(prev => 
      prev.map(view => 
        view.id === id ? { ...view, isPinned: !view.isPinned } : view
      )
    );
    
    const view = savedViews.find(v => v.id === id);
    
    toast({
      title: view?.isPinned ? "Unpinned" : "Pinned to Dashboard",
      description: view?.isPinned 
        ? "View removed from dashboard pins." 
        : "View pinned to your dashboard.",
    });
  };
  
  const handleToggleShare = (id: string) => {
    setSavedViews(prev => 
      prev.map(view => 
        view.id === id ? { ...view, isShared: !view.isShared } : view
      )
    );
    
    const view = savedViews.find(v => v.id === id);
    
    toast({
      title: view?.isShared ? "Unshared" : "Shared with Team",
      description: view?.isShared 
        ? "View is now private." 
        : "View shared with your team members.",
    });
  };
  
  const handleDelete = (id: string) => {
    setSavedViews(prev => prev.filter(view => view.id !== id));
    
    toast({
      title: "View deleted",
      description: "The saved view has been deleted.",
    });
  };
  
  const handleCreateView = () => {
    // Validate new view
    if (!newView.title) {
      toast({
        title: "Missing title",
        description: "Please enter a view title.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new view object
    const newViewObj = {
      id: Math.random().toString(36).substring(7),
      title: newView.title,
      description: newView.description,
      dateRange: { from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) },
      platform: newView.platform,
      kpiFocus: newView.kpiFocus,
      filters: {
        conversionType: newView.conversionType,
        campaignType: newView.campaignType,
      },
      isPinned: newView.isPinned,
      isShared: newView.isShared,
      createdAt: new Date(),
      createdBy: "You",
    };
    
    // Add to saved views list
    setSavedViews([newViewObj, ...savedViews]);
    
    // Reset form
    setNewView({
      title: "",
      description: "",
      platform: "All",
      kpiFocus: "All",
      isPinned: false,
      isShared: false,
      conversionType: "All",
      campaignType: "All",
    });
    
    // Show success toast
    toast({
      title: "View saved",
      description: "Your dashboard view has been saved.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Saved Views</h1>
            <p className="text-muted-foreground">
              Save and organize your favorite dashboard configurations.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Save Current View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Save Current View</DialogTitle>
                <DialogDescription>
                  Save your current dashboard configuration for quick access later.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="view-title">Title</Label>
                  <Input 
                    id="view-title" 
                    value={newView.title}
                    onChange={(e) => setNewView(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Meta ROAS Dashboard"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="view-description">Description (optional)</Label>
                  <Input 
                    id="view-description" 
                    value={newView.description}
                    onChange={(e) => setNewView(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What's special about this view?"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <select 
                      id="platform"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newView.platform}
                      onChange={(e) => setNewView(prev => ({ ...prev, platform: e.target.value }))}
                    >
                      <option value="All">All Platforms</option>
                      <option value="Google">Google</option>
                      <option value="Meta">Meta</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="TikTok">TikTok</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="kpi-focus">KPI Focus</Label>
                    <select 
                      id="kpi-focus"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newView.kpiFocus}
                      onChange={(e) => setNewView(prev => ({ ...prev, kpiFocus: e.target.value }))}
                    >
                      <option value="All">All KPIs</option>
                      <option value="ROAS">ROAS</option>
                      <option value="CPA">CPA</option>
                      <option value="CTR">CTR</option>
                      <option value="AECR">AECR Score</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="conversion-type">Conversion Type</Label>
                    <select 
                      id="conversion-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newView.conversionType}
                      onChange={(e) => setNewView(prev => ({ ...prev, conversionType: e.target.value }))}
                    >
                      <option value="All">All Types</option>
                      <option value="Purchase">Purchase</option>
                      <option value="Lead">Lead</option>
                      <option value="Signup">Signup</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-type">Campaign Type</Label>
                    <select 
                      id="campaign-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newView.campaignType}
                      onChange={(e) => setNewView(prev => ({ ...prev, campaignType: e.target.value }))}
                    >
                      <option value="All">All Campaigns</option>
                      <option value="Search">Search</option>
                      <option value="Display">Display</option>
                      <option value="Video">Video</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pin-dashboard">Pin to Dashboard</Label>
                    <Switch 
                      id="pin-dashboard" 
                      checked={newView.isPinned}
                      onCheckedChange={(checked) => setNewView(prev => ({ ...prev, isPinned: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="team-share">Share with Team</Label>
                    <Switch 
                      id="team-share" 
                      checked={newView.isShared}
                      onCheckedChange={(checked) => setNewView(prev => ({ ...prev, isShared: checked }))}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleCreateView}>Save View</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="bg-gray-100 h-20"></CardHeader>
                <CardContent className="py-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : savedViews.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No saved views yet.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Save Your First View</Button>
                </DialogTrigger>
                {/* Same dialog content as above */}
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedViews.map(view => (
              <Card key={view.id} className={view.isPinned ? "border-primary/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline">{view.platform}</Badge>
                    {view.isPinned && (
                      <Badge variant="default" className="bg-primary">
                        <Star className="mr-1 h-3 w-3" />
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {view.title}
                    {view.isShared && (
                      <Badge variant="secondary" className="ml-2">
                        <Share2 className="mr-1 h-3 w-3" />
                        Shared
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{view.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{view.kpiFocus} Focus</Badge>
                    {view.filters.conversionType !== "All" && (
                      <Badge variant="secondary">{view.filters.conversionType}</Badge>
                    )}
                    {view.filters.campaignType !== "All" && (
                      <Badge variant="secondary">{view.filters.campaignType}</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      {view.dateRange.from && view.dateRange.to && (
                        <>
                          {format(view.dateRange.from, "MMM d")} - {format(view.dateRange.to, "MMM d, yyyy")}
                        </>
                      )}
                    </span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    Created by {view.createdBy} on {format(view.createdAt, "MMM d, yyyy")}
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/dashboard/${view.platform.toLowerCase()}`}>
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Open
                    </Link>
                  </Button>
                  
                  <Button 
                    variant={view.isPinned ? "outline" : "ghost"}
                    size="sm"
                    onClick={() => handleTogglePin(view.id)}
                  >
                    <Star className={`mr-2 h-3 w-3 ${view.isPinned ? "fill-primary" : ""}`} />
                    {view.isPinned ? "Unpin" : "Pin"}
                  </Button>
                  
                  <Button 
                    variant={view.isShared ? "outline" : "ghost"}
                    size="sm"
                    onClick={() => handleToggleShare(view.id)}
                  >
                    <Share2 className="mr-2 h-3 w-3" />
                    {view.isShared ? "Unshare" : "Share"}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive/90 ml-auto"
                    onClick={() => handleDelete(view.id)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
