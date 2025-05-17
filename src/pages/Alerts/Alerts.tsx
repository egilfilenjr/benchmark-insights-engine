
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, TrendingDown, TrendingUp, Bell, Settings, Trash, PlusCircle, BellRing, Mail, Clock, Check } from "lucide-react";
import { format, subDays } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function Alerts() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock team plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  // Mock data for alerts
  const [alertsConfig, setAlertsConfig] = useState([
    {
      id: "1",
      name: "CPA Increase Alert",
      trigger: "increase",
      kpi: "CPA",
      threshold: 20,
      platform: "All",
      channel: "All",
      delivery: ["app", "email"],
      isActive: true,
      lastTriggered: subDays(new Date(), 2),
    },
    {
      id: "2",
      name: "ROAS Decrease Alert",
      trigger: "decrease",
      kpi: "ROAS",
      threshold: 15,
      platform: "Meta",
      channel: "Feed",
      delivery: ["app"],
      isActive: true,
      lastTriggered: subDays(new Date(), 5),
    },
    {
      id: "3",
      name: "CTR Below Benchmark",
      trigger: "below_benchmark",
      kpi: "CTR",
      threshold: 10,
      platform: "Google",
      channel: "Search",
      delivery: ["app", "email"],
      isActive: false,
      lastTriggered: subDays(new Date(), 12),
    },
    {
      id: "4",
      name: "AECR Weekly Change",
      trigger: "change",
      kpi: "AECR",
      threshold: 5,
      platform: "All",
      channel: "All",
      delivery: ["app", "email"],
      isActive: true,
      lastTriggered: subDays(new Date(), 7),
    },
  ]);
  
  // Mock data for alert history
  const [alertHistory, setAlertHistory] = useState([
    {
      id: "h1",
      configId: "1",
      name: "CPA Increase Alert",
      message: "CPA increased by 23% in Meta campaigns",
      timestamp: subDays(new Date(), 2),
      kpi: "CPA",
      platform: "Meta",
      isRead: true,
    },
    {
      id: "h2",
      configId: "2",
      name: "ROAS Decrease Alert",
      message: "ROAS decreased by 18% in Meta Feed campaigns",
      timestamp: subDays(new Date(), 5),
      kpi: "ROAS",
      platform: "Meta",
      isRead: false,
    },
    {
      id: "h3",
      configId: "3",
      name: "CTR Below Benchmark",
      message: "CTR is 12% below industry benchmark in Google Search campaigns",
      timestamp: subDays(new Date(), 12),
      kpi: "CTR",
      platform: "Google",
      isRead: true,
    },
    {
      id: "h4",
      configId: "4",
      name: "AECR Weekly Change",
      message: "AECR Score decreased by 6.5 points in the last week",
      timestamp: subDays(new Date(), 7),
      kpi: "AECR",
      platform: "All",
      isRead: true,
    },
    {
      id: "h5",
      configId: "1",
      name: "CPA Increase Alert",
      message: "CPA increased by 21% in LinkedIn campaigns",
      timestamp: subDays(new Date(), 14),
      kpi: "CPA",
      platform: "LinkedIn",
      isRead: true,
    },
  ]);
  
  // New alert config state
  const [newAlert, setNewAlert] = useState({
    name: "",
    trigger: "increase",
    kpi: "CPA",
    threshold: 20,
    platform: "All",
    channel: "All",
    delivery: ["app"],
    isActive: true,
  });
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  
  const handleToggleAlert = (id: string) => {
    setAlertsConfig(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
    
    const alert = alertsConfig.find(a => a.id === id);
    
    toast({
      title: alert?.isActive ? "Alert deactivated" : "Alert activated",
      description: alert?.isActive 
        ? "The alert has been turned off." 
        : "The alert has been turned on.",
    });
  };
  
  const handleDeleteAlert = (id: string) => {
    setAlertsConfig(prev => prev.filter(alert => alert.id !== id));
    
    toast({
      title: "Alert deleted",
      description: "The alert has been deleted.",
    });
  };
  
  const handleCreateAlert = () => {
    // Validate new alert
    if (!newAlert.name) {
      toast({
        title: "Missing name",
        description: "Please enter an alert name.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new alert object
    const newAlertObj = {
      id: Math.random().toString(36).substring(7),
      name: newAlert.name,
      trigger: newAlert.trigger,
      kpi: newAlert.kpi,
      threshold: newAlert.threshold,
      platform: newAlert.platform,
      channel: newAlert.channel,
      delivery: newAlert.delivery,
      isActive: newAlert.isActive,
      lastTriggered: null,
    };
    
    // Add to alerts config list
    setAlertsConfig([newAlertObj, ...alertsConfig]);
    
    // Reset form
    setNewAlert({
      name: "",
      trigger: "increase",
      kpi: "CPA",
      threshold: 20,
      platform: "All",
      channel: "All",
      delivery: ["app"],
      isActive: true,
    });
    
    // Show success toast
    toast({
      title: "Alert created",
      description: "Your new alert has been created.",
    });
  };
  
  const handleMarkAllRead = () => {
    setAlertHistory(prev => 
      prev.map(alert => ({ ...alert, isRead: true }))
    );
    
    toast({
      title: "All alerts marked as read",
      description: "Your alert history has been cleared.",
    });
  };
  
  const handleMarkAsRead = (id: string) => {
    setAlertHistory(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, isRead: true } : alert
      )
    );
  };
  
  // Check if user is eligible for this feature
  const planAccessible = userPlan === "pro_plus" || userPlan === "agency";
  
  if (!planAccessible && !testMode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Alerts</h1>
          </div>
          
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Set up custom alerts to monitor your performance metrics with Pro+ and Agency plans.
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
            <h1 className="text-2xl font-bold">Alerts</h1>
            <p className="text-muted-foreground">
              Get notified when your performance metrics change significantly.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Set up a new alert to monitor changes in your performance metrics.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="alert-name">Alert Name</Label>
                  <Input 
                    id="alert-name" 
                    value={newAlert.name}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., High CPA Alert"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="trigger-type">Trigger Type</Label>
                    <select 
                      id="trigger-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newAlert.trigger}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, trigger: e.target.value }))}
                    >
                      <option value="increase">Increases by</option>
                      <option value="decrease">Decreases by</option>
                      <option value="above">Goes above</option>
                      <option value="below">Goes below</option>
                      <option value="below_benchmark">Below benchmark</option>
                      <option value="change">Changes by</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="kpi-type">KPI</Label>
                    <select 
                      id="kpi-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newAlert.kpi}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, kpi: e.target.value }))}
                    >
                      <option value="CPA">CPA</option>
                      <option value="ROAS">ROAS</option>
                      <option value="CTR">CTR</option>
                      <option value="AECR">AECR Score</option>
                      <option value="Spend">Spend</option>
                      <option value="Conversions">Conversions</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="threshold">Threshold (%)</Label>
                    <Input 
                      id="threshold"
                      type="number" 
                      min="1"
                      max="100"
                      value={newAlert.threshold}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, threshold: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <select 
                      id="platform"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newAlert.platform}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, platform: e.target.value }))}
                    >
                      <option value="All">All Platforms</option>
                      <option value="Google">Google</option>
                      <option value="Meta">Meta</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="TikTok">TikTok</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="channel">Channel</Label>
                  <select 
                    id="channel"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newAlert.channel}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, channel: e.target.value }))}
                  >
                    <option value="All">All Channels</option>
                    <option value="Search">Search</option>
                    <option value="Display">Display</option>
                    <option value="Video">Video</option>
                    <option value="Feed">Feed</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Delivery Methods</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="delivery-app" 
                        checked={newAlert.delivery.includes("app")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAlert(prev => ({ ...prev, delivery: [...prev.delivery, "app"] }));
                          } else {
                            setNewAlert(prev => ({ ...prev, delivery: prev.delivery.filter(d => d !== "app") }));
                          }
                        }}
                      />
                      <Label htmlFor="delivery-app" className="text-sm font-normal">In-app notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="delivery-email" 
                        checked={newAlert.delivery.includes("email")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAlert(prev => ({ ...prev, delivery: [...prev.delivery, "email"] }));
                          } else {
                            setNewAlert(prev => ({ ...prev, delivery: prev.delivery.filter(d => d !== "email") }));
                          }
                        }}
                      />
                      <Label htmlFor="delivery-email" className="text-sm font-normal">Email notifications</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="alert-active">Active</Label>
                  <Switch 
                    id="alert-active" 
                    checked={newAlert.isActive}
                    onCheckedChange={(checked) => setNewAlert(prev => ({ ...prev, isActive: checked }))}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleCreateAlert}>Create Alert</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="config">Alert Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Recent Alerts</h3>
              <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                <Check className="mr-2 h-4 w-4" />
                Mark All as Read
              </Button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="bg-gray-100 h-12"></CardHeader>
                    <CardContent className="py-4">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : alertHistory.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No alerts in your history.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {alertHistory.map(alert => (
                  <Card 
                    key={alert.id} 
                    className={!alert.isRead ? "border-primary" : ""}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className={`rounded-full p-2 ${getAlertIconBg(alert.kpi)}`}>
                            {getAlertIcon(alert.kpi)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{alert.name}</h4>
                              {!alert.isRead && (
                                <Badge className="bg-primary text-white">New</Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Badge variant="outline">{alert.platform}</Badge>
                              <Badge variant="outline">{alert.kpi}</Badge>
                              <span>
                                <Clock className="inline-block mr-1 h-3 w-3" />
                                {format(alert.timestamp, "MMM d, yyyy h:mm a")}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {!alert.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleMarkAsRead(alert.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="config" className="mt-4">
            {loading ? (
              <div className="space-y-4">
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
            ) : alertsConfig.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">No alerts configured yet.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Create Your First Alert</Button>
                    </DialogTrigger>
                    {/* Same dialog content as above */}
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {alertsConfig.map(alert => (
                  <Card key={alert.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base flex items-center">
                            {alert.name}
                            <Badge 
                              variant={alert.isActive ? "default" : "secondary"}
                              className="ml-2"
                            >
                              {alert.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            Alert when {alert.kpi} {getAlertTriggerText(alert.trigger)} {alert.threshold}%
                          </CardDescription>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={alert.isActive}
                            onCheckedChange={() => handleToggleAlert(alert.id)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline">Platform: {alert.platform}</Badge>
                        <Badge variant="outline">Channel: {alert.channel}</Badge>
                        <Badge variant="outline">KPI: {alert.kpi}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <BellRing className="mr-1 h-3 w-3" />
                          <span>
                            Delivery: {alert.delivery.includes("app") && "In-app"} 
                            {alert.delivery.includes("app") && alert.delivery.includes("email") && " & "}
                            {alert.delivery.includes("email") && "Email"}
                          </span>
                        </div>
                        
                        {alert.lastTriggered && (
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Last triggered: {format(alert.lastTriggered, "MMM d, yyyy")}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>Alert Monitoring Active</AlertTitle>
          <AlertDescription>
            Alerts are checked hourly and will be delivered according to your preferences.
          </AlertDescription>
        </Alert>
      </div>
    </AppLayout>
  );
}

function getAlertTriggerText(trigger: string) {
  switch (trigger) {
    case "increase":
      return "increases by";
    case "decrease":
      return "decreases by";
    case "above":
      return "goes above";
    case "below":
      return "goes below";
    case "below_benchmark":
      return "falls below benchmark by";
    case "change":
      return "changes by";
    default:
      return "changes by";
  }
}

function getAlertIcon(kpi: string) {
  switch (kpi) {
    case "CPA":
      return <TrendingUp className="h-5 w-5 text-white" />;
    case "ROAS":
      return <BarChart className="h-5 w-5 text-white" />;
    case "CTR":
      return <TrendingUp className="h-5 w-5 text-white" />;
    case "AECR":
      return <BarChart className="h-5 w-5 text-white" />;
    default:
      return <TrendingDown className="h-5 w-5 text-white" />;
  }
}

function getAlertIconBg(kpi: string) {
  switch (kpi) {
    case "CPA":
      return "bg-red-500";
    case "ROAS":
      return "bg-green-500";
    case "CTR":
      return "bg-blue-500";
    case "AECR":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
}
