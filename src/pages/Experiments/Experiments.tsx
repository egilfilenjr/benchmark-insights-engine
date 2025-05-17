
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Plus, Calendar, TrendingUp, Check, X, Lightbulb, ArrowRight, ChevronRight } from "lucide-react";
import { format, addDays } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function Experiments() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock data for experiments
  const [experiments, setExperiments] = useState([
    {
      id: "1",
      name: "Video vs Static Creative Test",
      campaign: "Summer Sale - Meta",
      hypothesis: "Video creative will drive 20% better ROAS than static images for our summer promotion",
      metric: "ROAS",
      expectedResult: "20% improvement in ROAS",
      actualResult: "15% improvement in ROAS",
      benchmarkComparison: "8% above benchmark median",
      status: "completed",
      startDate: new Date(2025, 3, 1),
      endDate: new Date(2025, 3, 14),
      platform: "Meta",
    },
    {
      id: "2",
      name: "Testimonial Landing Page Test",
      campaign: "Lead Gen - Google Search",
      hypothesis: "Landing page with customer testimonials will increase lead conversion rate by 15%",
      metric: "CPA",
      expectedResult: "15% decrease in CPA",
      actualResult: null,
      benchmarkComparison: null,
      status: "in_progress",
      startDate: new Date(2025, 4, 5),
      endDate: addDays(new Date(), 10),
      platform: "Google",
    },
    {
      id: "3",
      name: "Bid Strategy Optimization",
      campaign: "Performance Max - Google",
      hypothesis: "Switching from tCPA to tROAS will improve overall campaign efficiency",
      metric: "ROAS",
      expectedResult: "25% improvement in ROAS",
      actualResult: "32% improvement in ROAS",
      benchmarkComparison: "22% above benchmark median",
      status: "completed",
      startDate: new Date(2025, 2, 15),
      endDate: new Date(2025, 3, 15),
      platform: "Google",
    },
    {
      id: "4",
      name: "LinkedIn Audience Expansion Test",
      campaign: "B2B Lead Gen - LinkedIn",
      hypothesis: "Using LinkedIn Audience Expansion will reduce CPA without sacrificing lead quality",
      metric: "CPA",
      expectedResult: "10% decrease in CPA",
      actualResult: null,
      benchmarkComparison: null,
      status: "planned",
      startDate: addDays(new Date(), 7),
      endDate: addDays(new Date(), 21),
      platform: "LinkedIn",
    },
  ]);
  
  // New experiment state
  const [newExperiment, setNewExperiment] = useState({
    name: "",
    campaign: "",
    hypothesis: "",
    metric: "ROAS",
    expectedResult: "",
    platform: "Google",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 14), "yyyy-MM-dd"),
  });
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  
  const handleCreateExperiment = () => {
    // Validate form
    if (!newExperiment.name || !newExperiment.campaign || !newExperiment.hypothesis || !newExperiment.expectedResult) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new experiment object
    const newExperimentObj = {
      id: Math.random().toString(36).substring(7),
      name: newExperiment.name,
      campaign: newExperiment.campaign,
      hypothesis: newExperiment.hypothesis,
      metric: newExperiment.metric,
      expectedResult: newExperiment.expectedResult,
      actualResult: null,
      benchmarkComparison: null,
      status: "planned",
      startDate: new Date(newExperiment.startDate),
      endDate: new Date(newExperiment.endDate),
      platform: newExperiment.platform,
    };
    
    // Add to experiments list
    setExperiments([newExperimentObj, ...experiments]);
    
    // Reset form
    setNewExperiment({
      name: "",
      campaign: "",
      hypothesis: "",
      metric: "ROAS",
      expectedResult: "",
      platform: "Google",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(addDays(new Date(), 14), "yyyy-MM-dd"),
    });
    
    // Show success toast
    toast({
      title: "Experiment created",
      description: "Your new experiment has been created.",
    });
  };
  
  const handleStartExperiment = (id: string) => {
    setExperiments(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, status: "in_progress", startDate: new Date() } : exp
      )
    );
    
    toast({
      title: "Experiment started",
      description: "The experiment has been started.",
    });
  };
  
  const handleCompleteExperiment = (id: string) => {
    // In a real implementation, this would show a form to capture results
    setExperiments(prev => 
      prev.map(exp => 
        exp.id === id ? { 
          ...exp, 
          status: "completed", 
          endDate: new Date(),
          actualResult: "Results pending analysis",
          benchmarkComparison: "Analysis in progress",
        } : exp
      )
    );
    
    toast({
      title: "Experiment completed",
      description: "The experiment has been marked as completed.",
    });
  };
  
  const handleDeleteExperiment = (id: string) => {
    setExperiments(prev => prev.filter(exp => exp.id !== id));
    
    toast({
      title: "Experiment deleted",
      description: "The experiment has been deleted.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Experiments</h1>
            <p className="text-muted-foreground">
              Create, track, and analyze A/B tests across your campaigns.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Experiment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Experiment</DialogTitle>
                <DialogDescription>
                  Set up a new marketing experiment to test your hypothesis.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="exp-name">Experiment Name</Label>
                  <Input 
                    id="exp-name" 
                    value={newExperiment.name}
                    onChange={(e) => setNewExperiment(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Video Creative A/B Test"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="campaign">Campaign</Label>
                  <Input 
                    id="campaign" 
                    value={newExperiment.campaign}
                    onChange={(e) => setNewExperiment(prev => ({ ...prev, campaign: e.target.value }))}
                    placeholder="e.g., Summer Promotion - Meta Feed"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="platform">Platform</Label>
                  <select 
                    id="platform"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newExperiment.platform}
                    onChange={(e) => setNewExperiment(prev => ({ ...prev, platform: e.target.value }))}
                  >
                    <option value="Google">Google</option>
                    <option value="Meta">Meta</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="hypothesis">Hypothesis</Label>
                  <Textarea 
                    id="hypothesis" 
                    value={newExperiment.hypothesis}
                    onChange={(e) => setNewExperiment(prev => ({ ...prev, hypothesis: e.target.value }))}
                    placeholder="What do you expect to happen and why?"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="metric">Primary Metric</Label>
                    <select 
                      id="metric"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newExperiment.metric}
                      onChange={(e) => setNewExperiment(prev => ({ ...prev, metric: e.target.value }))}
                    >
                      <option value="ROAS">ROAS</option>
                      <option value="CPA">CPA</option>
                      <option value="CTR">CTR</option>
                      <option value="Conversion Rate">Conversion Rate</option>
                      <option value="AECR">AECR Score</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="expected-result">Expected Result</Label>
                    <Input 
                      id="expected-result" 
                      value={newExperiment.expectedResult}
                      onChange={(e) => setNewExperiment(prev => ({ ...prev, expectedResult: e.target.value }))}
                      placeholder="e.g., 20% increase in ROAS"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input 
                      id="start-date"
                      type="date" 
                      value={newExperiment.startDate}
                      onChange={(e) => setNewExperiment(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input 
                      id="end-date"
                      type="date" 
                      value={newExperiment.endDate}
                      onChange={(e) => setNewExperiment(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleCreateExperiment}>Create Experiment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Experiments</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ExperimentsList 
              experiments={experiments} 
              loading={loading}
              onStart={handleStartExperiment}
              onComplete={handleCompleteExperiment}
              onDelete={handleDeleteExperiment}
            />
          </TabsContent>
          
          <TabsContent value="in_progress" className="mt-4">
            <ExperimentsList 
              experiments={experiments.filter(exp => exp.status === "in_progress")} 
              loading={loading}
              onStart={handleStartExperiment}
              onComplete={handleCompleteExperiment}
              onDelete={handleDeleteExperiment}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <ExperimentsList 
              experiments={experiments.filter(exp => exp.status === "completed")} 
              loading={loading}
              onStart={handleStartExperiment}
              onComplete={handleCompleteExperiment}
              onDelete={handleDeleteExperiment}
            />
          </TabsContent>
          
          <TabsContent value="planned" className="mt-4">
            <ExperimentsList 
              experiments={experiments.filter(exp => exp.status === "planned")} 
              loading={loading}
              onStart={handleStartExperiment}
              onComplete={handleCompleteExperiment}
              onDelete={handleDeleteExperiment}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

interface ExperimentsListProps {
  experiments: Array<{
    id: string;
    name: string;
    campaign: string;
    hypothesis: string;
    metric: string;
    expectedResult: string;
    actualResult: string | null;
    benchmarkComparison: string | null;
    status: string;
    startDate: Date;
    endDate: Date;
    platform: string;
  }>;
  loading: boolean;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExperimentsList = ({ experiments, loading, onStart, onComplete, onDelete }: ExperimentsListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map(i => (
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
  
  if (experiments.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-muted-foreground mb-4">No experiments found in this category.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create New Experiment</Button>
            </DialogTrigger>
            {/* Same dialog content as above */}
          </Dialog>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {experiments.map(experiment => (
        <ExperimentCard 
          key={experiment.id} 
          experiment={experiment}
          onStart={onStart}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

interface ExperimentCardProps {
  experiment: {
    id: string;
    name: string;
    campaign: string;
    hypothesis: string;
    metric: string;
    expectedResult: string;
    actualResult: string | null;
    benchmarkComparison: string | null;
    status: string;
    startDate: Date;
    endDate: Date;
    platform: string;
  };
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const ExperimentCard = ({ experiment, onStart, onComplete, onDelete }: ExperimentCardProps) => {
  const { 
    id, 
    name, 
    campaign, 
    hypothesis, 
    metric, 
    expectedResult, 
    actualResult, 
    benchmarkComparison, 
    status, 
    startDate, 
    endDate, 
    platform 
  } = experiment;
  
  // Calculate progress for in-progress experiments
  const calculateProgress = () => {
    if (status !== "in_progress") return 0;
    
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const totalDays = Math.max(1, (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.max(0, (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min(100, Math.round((daysElapsed / totalDays) * 100));
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case "planned":
        return <Badge variant="outline">Planned</Badge>;
      case "in_progress":
        return <Badge variant="default">In Progress</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const isSuccess = actualResult && actualResult.includes("improvement");

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">{platform}</Badge>
              {getStatusBadge()}
            </div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {campaign}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-2">
        <div className="grid gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Hypothesis:</h4>
            <p className="text-sm">{hypothesis}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Primary Metric:</h4>
              <p className="text-sm">{metric}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Expected Result:</h4>
              <p className="text-sm">{expectedResult}</p>
            </div>
          </div>
          
          {status === "completed" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Actual Result:</h4>
                <p className={`text-sm ${isSuccess ? "text-green-600" : "text-red-600"}`}>
                  {actualResult || "Not recorded"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">vs Benchmark:</h4>
                <p className="text-sm">{benchmarkComparison || "Not available"}</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
              </span>
            </div>
            
            {status === "completed" && (
              <div className="flex items-center">
                <Lightbulb className="h-3 w-3 mr-1" />
                <span>
                  {isSuccess 
                    ? "Continue similar tests for more improvements" 
                    : "Consider revising approach for better results"}
                </span>
              </div>
            )}
          </div>
          
          {status === "in_progress" && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
        <div className="flex gap-2">
          {status === "planned" && (
            <Button size="sm" variant="outline" onClick={() => onStart(id)}>
              <TrendingUp className="mr-2 h-4 w-4" />
              Start
            </Button>
          )}
          
          {status === "in_progress" && (
            <Button size="sm" variant="outline" onClick={() => onComplete(id)}>
              <Check className="mr-2 h-4 w-4" />
              Complete
            </Button>
          )}
          
          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(id)}>
            <X className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
        
        <Button size="sm" variant="ghost" className="text-primary">
          View Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
