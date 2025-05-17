import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, FileText, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Reports = () => {
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("performance");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
  
  // Mock user plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleReportTypeChange = (value: string) => {
    setReportType(value);
    setLoading(true);
    
    // Simulate loading data for the new report type
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  const handlePlatformChange = (value: string) => {
    if (value === "all") {
      setSelectedPlatforms(["all"]);
    } else {
      const newSelectedPlatforms = selectedPlatforms.includes("all")
        ? [value]
        : selectedPlatforms.includes(value)
          ? selectedPlatforms.filter(p => p !== value)
          : [...selectedPlatforms, value];
      
      setSelectedPlatforms(newSelectedPlatforms.length === 0 ? ["all"] : newSelectedPlatforms);
    }
    
    setLoading(true);
    
    // Simulate loading data for the new platform selection
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };
  
  const handleDownloadReport = () => {
    // In a real app, this would trigger a download of the report
    console.log("Downloading report:", reportType);
  };
  
  const handleShareReport = () => {
    // In a real app, this would open a sharing dialog
    console.log("Sharing report:", reportType);
  };
  
  const renderReportContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading report data...</p>
        </div>
      );
    }
    
    switch (reportType) {
      case "performance":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Performance Overview</h3>
            <p className="text-muted-foreground">
              This report shows your overall ad performance across all platforms.
            </p>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              [Performance Chart Placeholder]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                [CPA Breakdown]
              </div>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                [ROAS Breakdown]
              </div>
            </div>
          </div>
        );
      case "conversion":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Conversion Analysis</h3>
            <p className="text-muted-foreground">
              This report analyzes your conversion funnel and identifies optimization opportunities.
            </p>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              [Conversion Funnel Chart]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                [Conversion by Channel]
              </div>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                [Conversion by Device]
              </div>
            </div>
          </div>
        );
      case "audience":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Audience Insights</h3>
            <p className="text-muted-foreground">
              This report provides detailed information about your audience demographics and behavior.
            </p>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
              [Audience Demographics Chart]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                [Interests Breakdown]
              </div>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                [Behavior Analysis]
              </div>
            </div>
          </div>
        );
      case "custom":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Custom Report</h3>
            {userPlan === "pro_plus" || userPlan === "agency" ? (
              <>
                <p className="text-muted-foreground">
                  Build your own custom report by selecting the metrics and dimensions you want to analyze.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-cpa" className="rounded" />
                        <label htmlFor="metric-cpa">Cost Per Acquisition (CPA)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-roas" className="rounded" />
                        <label htmlFor="metric-roas">Return On Ad Spend (ROAS)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-ctr" className="rounded" />
                        <label htmlFor="metric-ctr">Click-Through Rate (CTR)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="metric-conv" className="rounded" />
                        <label htmlFor="metric-conv">Conversion Rate</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Dimensions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="dim-platform" className="rounded" />
                        <label htmlFor="dim-platform">Platform</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="dim-campaign" className="rounded" />
                        <label htmlFor="dim-campaign">Campaign</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="dim-device" className="rounded" />
                        <label htmlFor="dim-device">Device</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="dim-geo" className="rounded" />
                        <label htmlFor="dim-geo">Geography</label>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="mt-4">Generate Custom Report</Button>
              </>
            ) : (
              <div className="p-6 bg-gray-50 rounded-md text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h4 className="text-lg font-medium mb-2">Upgrade to Pro+ or Agency</h4>
                <p className="text-muted-foreground mb-4">
                  Custom reports are available on Pro+ and Agency plans. Upgrade now to unlock this feature.
                </p>
                <Button>Upgrade Plan</Button>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Reports</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleShareReport}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReport}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Report Settings</CardTitle>
            <CardDescription>
              Configure your report parameters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Report Type</label>
                <Select value={reportType} onValueChange={handleReportTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance Report</SelectItem>
                    <SelectItem value="conversion">Conversion Analysis</SelectItem>
                    <SelectItem value="audience">Audience Insights</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Platforms</label>
                <Select value={selectedPlatforms[0]} onValueChange={handlePlatformChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="meta">Meta</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</CardTitle>
            <CardDescription>
              {reportType === "performance" && "Overview of your advertising performance metrics."}
              {reportType === "conversion" && "Analysis of your conversion funnel and optimization opportunities."}
              {reportType === "audience" && "Insights about your audience demographics and behavior."}
              {reportType === "custom" && "Build your own custom report with the metrics that matter to you."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderReportContent()}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;
