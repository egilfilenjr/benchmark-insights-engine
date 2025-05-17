import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CalendarIcon, 
  Download, 
  FileText, 
  Image, 
  LayoutDashboard, 
  BarChart, 
  Settings, 
  Calendar, 
  Clock,
  Trash
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function Reports() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock team plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  // Mock data for reports
  const reports = [
    {
      id: "1",
      title: "Monthly Performance Overview",
      type: "monthly",
      dateRange: { 
        from: new Date(2023, 4, 1), 
        to: new Date(2023, 4, 31) 
      },
      createdAt: new Date(2023, 5, 1),
      format: "pdf",
      status: "completed",
      downloadUrl: "https://example.com/reports/may-overview.pdf"
    },
    {
      id: "2",
      title: "ROAS Trend Analysis Q1",
      type: "roas_trend",
      dateRange: { from: new Date(2025, 0, 1), to: new Date(2025, 2, 31) },
      createdAt: new Date(2025, 3, 5),
      format: "pptx",
      status: "ready",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Campaign Benchmark Card - Search",
      type: "campaign_benchmark",
      dateRange: { from: new Date(2025, 2, 1), to: new Date(2025, 2, 31) },
      createdAt: new Date(2025, 3, 2),
      format: "pdf",
      status: "ready",
      downloadUrl: "#",
    },
    {
      id: "4",
      title: "AECR Explainer - March 2025",
      type: "aecr_explainer",
      dateRange: { from: new Date(2025, 2, 1), to: new Date(2025, 2, 31) },
      createdAt: new Date(2025, 3, 1),
      format: "pdf",
      status: "generating",
      downloadUrl: null,
    },
  ];
  
  // New report state
  const [newReport, setNewReport] = useState({
    title: "",
    type: "monthly_snapshot",
    format: "pdf",
    dateRange: {
      from: new Date(2025, 4, 1),
      to: new Date()
    } as DateRange,
    includeNarrative: true,
    includeLogo: false,
  });
  
  // Mock scheduled reports
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: "s1",
      title: "Weekly Performance Dashboard",
      type: "weekly_snapshot",
      frequency: "weekly",
      recipients: ["team@example.com"],
      nextSend: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      active: true
    },
    {
      id: "s2",
      title: "Monthly ROAS Report",
      type: "roas_trend",
      frequency: "monthly",
      recipients: ["manager@example.com", "ceo@example.com"],
      nextSend: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 days from now
      active: true
    }
  ]);
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  
  const handleCreateReport = () => {
    // Validate new report data
    if (!newReport.title) {
      toast({
        title: "Missing title",
        description: "Please enter a report title.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new report object
    const newReportObj = {
      id: Math.random().toString(36).substring(7),
      title: newReport.title,
      type: newReport.type,
      dateRange: newReport.dateRange,
      createdAt: new Date(),
      format: newReport.format,
      status: "generating",
      downloadUrl: null,
    };
    
    // Add to reports list
    setReports([newReportObj, ...reports]);
    
    // Reset form
    setNewReport({
      title: "",
      type: "monthly_snapshot",
      format: "pdf",
      dateRange: {
        from: new Date(2025, 4, 1),
        to: new Date()
      },
      includeNarrative: true,
      includeLogo: false,
    });
    
    // Show success toast
    toast({
      title: "Report generating",
      description: "Your report is being generated and will be ready shortly.",
    });
    
    // Simulate report generation completion after 3 seconds
    setTimeout(() => {
      setReports(prevReports => 
        prevReports.map(r => 
          r.id === newReportObj.id 
            ? { ...r, status: "ready", downloadUrl: "#" } 
            : r
        )
      );
      
      toast({
        title: "Report ready",
        description: "Your report is now ready to download.",
      });
    }, 3000);
  };
  
  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
    
    toast({
      title: "Report deleted",
      description: "The report has been deleted.",
    });
  };
  
  const handleToggleScheduledReport = (id: string) => {
    setScheduledReports(prev => 
      prev.map(r => 
        r.id === id ? { ...r, active: !r.active } : r
      )
    );
    
    const report = scheduledReports.find(r => r.id === id);
    
    toast({
      title: report?.active ? "Report paused" : "Report activated",
      description: report?.active 
        ? "The scheduled report has been paused." 
        : "The scheduled report has been activated.",
    });
  };
  
  const handleDeleteScheduledReport = (id: string) => {
    setScheduledReports(scheduledReports.filter(r => r.id !== id));
    
    toast({
      title: "Scheduled report deleted",
      description: "The scheduled report has been deleted.",
    });
  };
  
  // Check if user is eligible for reports feature
  const planAccessible = userPlan === "pro_plus" || userPlan === "agency";
  
  if (!planAccessible && !testMode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Reports</h1>
          </div>
          
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Create and export white-labeled reports with Pro+ and Agency plans. Upgrade to generate branded performance reports.
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
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">
              Generate custom reports based on your performance data.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Generate New Report</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
                <DialogDescription>
                  Select the type of report you want to generate and customize its settings.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-title" className="text-right">Title</Label>
                  <Input 
                    id="report-title" 
                    className="col-span-3" 
                    value={newReport.title}
                    onChange={(e) => setNewReport(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Monthly Performance Report - May 2025"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Type</Label>
                  <div className="col-span-3">
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newReport.type}
                      onChange={(e) => setNewReport(prev => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="monthly_snapshot">Monthly Snapshot</option>
                      <option value="campaign_benchmark">Campaign Benchmark Card</option>
                      <option value="roas_trend">ROAS Trend Deck</option>
                      <option value="aecr_explainer">AECR Explainer</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Date Range</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="grid gap-1">
                      <Label className="text-xs">From</Label>
                      <div className="flex items-center">
                        <Input 
                          type="date" 
                          value={newReport.dateRange.from ? format(newReport.dateRange.from, "yyyy-MM-dd") : ""} 
                          onChange={(e) => {
                            const from = e.target.value ? new Date(e.target.value) : undefined;
                            setNewReport(prev => ({
                              ...prev,
                              dateRange: {
                                ...prev.dateRange,
                                from
                              }
                            }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs">To</Label>
                      <div className="flex items-center">
                        <Input 
                          type="date" 
                          value={newReport.dateRange.to ? format(newReport.dateRange.to, "yyyy-MM-dd") : ""} 
                          onChange={(e) => {
                            const to = e.target.value ? new Date(e.target.value) : undefined;
                            setNewReport(prev => ({
                              ...prev,
                              dateRange: {
                                ...prev.dateRange,
                                to
                              }
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Format</Label>
                  <div className="col-span-3">
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newReport.format}
                      onChange={(e) => setNewReport(prev => ({ ...prev, format: e.target.value }))}
                    >
                      <option value="pdf">PDF</option>
                      <option value="pptx">PowerPoint</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Options</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="include-narrative" 
                        checked={newReport.includeNarrative}
                        onChange={(e) => setNewReport(prev => ({ ...prev, includeNarrative: e.target.checked }))}
                      />
                      <Label htmlFor="include-narrative" className="text-sm font-normal">Include AI narrative summary</Label>
                    </div>
                    {userPlan === "agency" && (
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="include-logo" 
                          checked={newReport.includeLogo}
                          onChange={(e) => setNewReport(prev => ({ ...prev, includeLogo: e.target.checked }))}
                        />
                        <Label htmlFor="include-logo" className="text-sm font-normal">Include company logo (Agency plan only)</Label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleCreateReport}>Generate Report</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="generated">
          <TabsList>
            <TabsTrigger value="generated">Generated Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generated" className="mt-4">
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
            ) : reports.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">No reports generated yet.</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Generate Your First Report</Button>
                    </DialogTrigger>
                    {/* Same dialog content as above */}
                  </Dialog>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reports.map(report => (
                  <Card key={report.id} className="overflow-hidden">
                    <div className="h-40 bg-muted flex items-center justify-center">
                      {getReportIcon(report.type, report.format)}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="capitalize">
                          {report.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant={report.format === "pdf" ? "default" : report.format === "pptx" ? "secondary" : "outline"}>
                          {report.format.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-base">{report.title}</CardTitle>
                      <CardDescription>
                        {report.dateRange.from && report.dateRange.to && (
                          <>
                            {format(report.dateRange.from, "MMM d")} - {format(report.dateRange.to, "MMM d, yyyy")}
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-xs text-muted-foreground">
                        Created {format(report.createdAt, "MMM d, yyyy")}
                      </div>
                    </CardContent>
                    <div className="px-6 py-3 bg-muted/50 border-t flex justify-between">
                      {report.status === "ready" ? (
                        <Button variant="outline" size="sm" asChild>
                          <a href={report.downloadUrl} download>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                          Generating...
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2].map(i => (
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
            ) : scheduledReports.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground mb-4">No scheduled reports set up yet.</p>
                  <Button>Schedule Your First Report</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {scheduledReports.map(report => (
                  <Card key={report.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="capitalize mb-2">
                            {report.frequency}
                          </Badge>
                          <CardTitle className="text-base">{report.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Next send: {format(report.nextSend, "MMM d, yyyy")}
                          </CardDescription>
                        </div>
                        <Badge variant={report.active ? "default" : "secondary"}>
                          {report.active ? "Active" : "Paused"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground mr-1">Recipients:</span>
                        {report.recipients.join(", ")}
                      </div>
                    </CardContent>
                    <div className="px-6 py-3 bg-muted/50 border-t flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleScheduledReport(report.id)}
                      >
                        {report.active ? "Pause" : "Activate"}
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1 text-primary"
                        >
                          <Settings className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive/90"
                          onClick={() => handleDeleteScheduledReport(report.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

function getReportIcon(type: string, format: string) {
  let Icon;
  let color;
  
  switch (type) {
    case "monthly_snapshot":
      Icon = LayoutDashboard;
      color = "text-blue-500";
      break;
    case "campaign_benchmark":
      Icon = BarChart;
      color = "text-purple-500";
      break;
    case "roas_trend":
      Icon = Calendar;
      color = "text-green-500";
      break;
    case "aecr_explainer":
      Icon = FileText;
      color = "text-yellow-500";
      break;
    default:
      Icon = FileText;
      color = "text-gray-500";
  }
  
  return (
    <div className="text-center">
      <Icon className={`h-16 w-16 ${color}`} />
      <div className="mt-2 text-xs font-medium uppercase text-muted-foreground">
        {format.toUpperCase()}
      </div>
    </div>
  );
}
