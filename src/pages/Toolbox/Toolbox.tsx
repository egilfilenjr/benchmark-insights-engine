
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calculator, ChevronRight, ArrowUpRight, DollarSign, BarChart, Target, TrendingUp, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Toolbox() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for tools
  const allTools = [
    {
      id: "1",
      name: "ROAS Calculator",
      description: "Calculate return on ad spend based on campaign costs and revenue",
      category: "kpi",
      popularity: "high",
      url: "/toolbox/roas-calculator",
      icon: <Calculator />
    },
    {
      id: "2",
      name: "CPA Calculator",
      description: "Determine cost per acquisition across channels",
      category: "kpi",
      popularity: "high",
      url: "/toolbox/cpa-calculator",
      icon: <DollarSign />
    },
    {
      id: "3",
      name: "CTR Calculator",
      description: "Measure click-through rate effectiveness",
      category: "kpi",
      popularity: "medium",
      url: "/toolbox/ctr-calculator",
      icon: <BarChart />
    },
    {
      id: "4",
      name: "Budget Planner",
      description: "Plan your marketing budget allocation across channels",
      category: "budgeting",
      popularity: "high",
      url: "/toolbox/budget-planner",
      icon: <DollarSign />
    },
    {
      id: "5",
      name: "Media Mix Optimizer",
      description: "Optimize your media mix for maximum performance",
      category: "budgeting",
      popularity: "medium",
      url: "/toolbox/media-mix-optimizer",
      icon: <TrendingUp />
    },
    {
      id: "6",
      name: "Funnel Conversion Calculator",
      description: "Calculate conversion rates across your marketing funnel",
      category: "funnel",
      popularity: "high",
      url: "/toolbox/funnel-conversion-calculator",
      icon: <Target />
    },
    {
      id: "7",
      name: "Funnel Dropout Analyzer",
      description: "Identify where customers drop out of your conversion funnel",
      category: "funnel",
      popularity: "medium",
      url: "/toolbox/funnel-dropout-analyzer",
      icon: <TrendingUp />
    },
    {
      id: "8",
      name: "AECR Score Explainer",
      description: "Understand how your AECR Score is calculated",
      category: "reporting",
      popularity: "medium",
      url: "/toolbox/aecr-explainer",
      icon: <BarChart />
    },
    {
      id: "9",
      name: "Campaign ROI Forecaster",
      description: "Forecast expected ROI for your marketing campaigns",
      category: "forecasting",
      popularity: "high",
      url: "/toolbox/campaign-roi-forecaster",
      icon: <TrendingUp />
    },
    {
      id: "10",
      name: "Ad Frequency Optimizer",
      description: "Calculate optimal ad frequency to prevent audience fatigue",
      category: "forecasting",
      popularity: "low",
      url: "/toolbox/ad-frequency-optimizer",
      icon: <Clock />
    },
  ];
  
  const [filteredTools, setFilteredTools] = useState(allTools);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Calculate tool categories
  const categories = [
    { id: "all", name: "All Tools" },
    { id: "kpi", name: "KPI Calculators" },
    { id: "budgeting", name: "Budgeting Tools" },
    { id: "funnel", name: "Funnel Analysis" },
    { id: "forecasting", name: "Forecasting" },
    { id: "reporting", name: "Reporting Tools" },
  ];
  
  // Popular tools section
  const popularTools = allTools.filter(tool => tool.popularity === "high").slice(0, 4);
  
  useEffect(() => {
    // Filter tools based on category and search query
    let filtered = allTools;
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tool => 
          tool.name.toLowerCase().includes(query) || 
          tool.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTools(filtered);
    setLoading(false);
  }, [activeCategory, searchQuery]);
  
  const handleOpenTool = (tool: any) => {
    // In a full implementation, this would navigate to the tool
    // For now we'll just show a toast
    toast({
      title: `Opening ${tool.name}`,
      description: "This tool would open in a new tab or modal in a production environment.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Marketing Toolbox</h1>
          <p className="text-muted-foreground">
            Free calculators and tools to help optimize your marketing performance.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for tools..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex-shrink-0">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {!searchQuery && activeCategory === "all" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Popular Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTools.map(tool => (
                <Card 
                  key={tool.id} 
                  className="flex flex-col h-full transition-all duration-200 hover:shadow-md cursor-pointer"
                  onClick={() => handleOpenTool(tool)}
                >
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                      {React.cloneElement(tool.icon as React.ReactElement, { className: "h-5 w-5 text-primary" })}
                    </div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                      Open Tool
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {activeCategory === "all" 
              ? "All Tools" 
              : categories.find(c => c.id === activeCategory)?.name || "Tools"}
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="bg-gray-200 rounded-full p-2 w-10 h-10 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredTools.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No tools match your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map(tool => (
                <Card 
                  key={tool.id} 
                  className="flex flex-col h-full transition-all duration-200 hover:shadow-md cursor-pointer"
                  onClick={() => handleOpenTool(tool)}
                >
                  <CardHeader className="pb-2">
                    <div className="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                      {React.cloneElement(tool.icon as React.ReactElement, { className: "h-5 w-5 text-primary" })}
                    </div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-primary flex items-center gap-1">
                      Open Tool
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <h3 className="text-lg font-medium mb-2">Need a custom calculator?</h3>
            <p className="text-muted-foreground max-w-md mb-4">
              Let us know if you need a specific marketing calculator or tool for your business.
            </p>
            <Button>Suggest a Tool</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
