
import React, { useState, useEffect } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Plus, 
  Search,
  Filter,
  BarChart,
  LineChart,
  Clock,
  Calendar,
  File,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CustomBadge } from '@/components/ui/custom-badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Reports = () => {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock user plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  // Mock reports
  const mockReports = [
    {
      id: "1",
      title: "Monthly Performance Summary",
      type: "performance_summary",
      dateRange: { from: new Date(2023, 4, 1), to: new Date(2023, 4, 31) },
      createdAt: new Date(2023, 5, 1),
      format: "pdf",
      status: "completed",
      downloadUrl: "https://example.com/reports/1.pdf"
    },
    {
      id: "2",
      title: "Campaign Benchmarks Q2",
      type: "benchmark_comparison",
      dateRange: { from: new Date(2023, 3, 1), to: new Date(2023, 5, 30) },
      createdAt: new Date(2023, 6, 2),
      format: "pptx",
      status: "completed",
      downloadUrl: "https://example.com/reports/2.pptx"
    },
    {
      id: "3",
      title: "Meta Ads Performance",
      type: "platform_specific",
      dateRange: { from: new Date(2023, 5, 1), to: new Date(2023, 5, 15) },
      createdAt: new Date(2023, 5, 16),
      format: "csv",
      status: "completed",
      downloadUrl: "https://example.com/reports/3.csv"
    },
    {
      id: "4",
      title: "AECR Score Annual Trend",
      type: "aecr_analysis",
      dateRange: { from: new Date(2022, 0, 1), to: new Date(2022, 11, 31) },
      createdAt: new Date(2023, 0, 5),
      format: "pdf",
      status: "completed",
      downloadUrl: "https://example.com/reports/4.pdf"
    },
    {
      id: "5",
      title: "Weekly Snapshot",
      type: "performance_summary",
      dateRange: { from: new Date(2023, 5, 19), to: new Date(2023, 5, 25) },
      createdAt: new Date(2023, 5, 26),
      format: "pdf",
      status: "generating",
      downloadUrl: ""
    }
  ];
  
  useEffect(() => {
    // Simulating API call to fetch reports
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
  }, []);
  
  const filteredReports = reports.filter(report => 
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const generateReport = (data) => {
    // In a real app, we would call an API to generate a report
    const newReport = {
      id: String(reports.length + 1),
      title: data.title,
      type: data.type,
      dateRange: { from: data.dateFrom, to: data.dateTo },
      createdAt: new Date(),
      format: data.format,
      status: "generating",
      downloadUrl: ""
    };
    
    setReports([newReport, ...reports]);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === newReport.id 
            ? { 
                ...report, 
                status: "completed", 
                downloadUrl: `https://example.com/reports/${newReport.id}.${newReport.format}` 
              } 
            : report
        )
      );
      
      toast({
        title: "Report ready",
        description: `Your "${data.title}" report is ready to download.`,
      });
    }, 3000);
    
    toast({
      title: "Report generation started",
      description: "We'll notify you when your report is ready.",
    });
  };
  
  const deleteReport = (id) => {
    setReports(reports.filter(report => report.id !== id));
    
    toast({
      title: "Report deleted",
      description: "The report has been deleted successfully.",
    });
  };
  
  // Check if user is on the right plan to access reports
  const isAccessible = userPlan === 'pro_plus' || userPlan === 'agency' || testMode;
  
  if (!isAccessible) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Reports</h1>
          </div>
          
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <FileText size={48} className="mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Generate, download, and share custom reports with Pro+ and Agency plans. Upgrade to unlock export capabilities.
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
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">
              Generate and download custom reports for your marketing campaigns.
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <NewReportForm onSubmit={generateReport} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search reports..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto hidden sm:flex">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Reports</DropdownMenuItem>
              <DropdownMenuItem>Performance Summaries</DropdownMenuItem>
              <DropdownMenuItem>Benchmark Comparisons</DropdownMenuItem>
              <DropdownMenuItem>Platform Specific</DropdownMenuItem>
              <DropdownMenuItem>AECR Analysis</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="summary">Performance Summaries</TabsTrigger>
            <TabsTrigger value="benchmark">Benchmark Comparisons</TabsTrigger>
            <TabsTrigger value="platform">Platform Specific</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border rounded-lg p-6 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex justify-end mt-4">
                      <div className="h-9 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredReports.length > 0 ? (
              <div className="space-y-4">
                {filteredReports.map(report => (
                  <ReportCard 
                    key={report.id} 
                    report={report}
                    onDelete={() => deleteReport(report.id)}
                    whiteLabel={userPlan === "agency"}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText size={48} className="mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">No reports found</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Get started by creating your first report or change your search criteria.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        New Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <NewReportForm onSubmit={generateReport} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BarChart size={48} className="mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Performance Summaries</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Create a new performance summary report to get an overview of your marketing efforts.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      New Performance Summary
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <NewReportForm 
                      onSubmit={generateReport} 
                      defaultType="performance_summary"
                      defaultTitle="Performance Summary"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="benchmark" className="mt-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <LineChart size={48} className="mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Benchmark Comparisons</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Generate a benchmark report to compare your performance against industry standards.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      New Benchmark Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <NewReportForm 
                      onSubmit={generateReport} 
                      defaultType="benchmark_comparison"
                      defaultTitle="Benchmark Comparison"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="platform" className="mt-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar size={48} className="mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Platform Specific Reports</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Create detailed reports for specific platforms like Google Ads, Meta, TikTok, or LinkedIn.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" />
                      New Platform Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <NewReportForm 
                      onSubmit={generateReport} 
                      defaultType="platform_specific"
                      defaultTitle="Platform Performance"
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Report Card Component
const ReportCard = ({ report, onDelete, whiteLabel }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'performance_summary':
        return <BarChart className="h-5 w-5" />;
      case 'benchmark_comparison':
        return <LineChart className="h-5 w-5" />;
      case 'platform_specific':
        return <Calendar className="h-5 w-5" />;
      case 'aecr_analysis':
        return <File className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getTypeLabel = (type) => {
    switch (type) {
      case 'performance_summary':
        return 'Performance Summary';
      case 'benchmark_comparison':
        return 'Benchmark Comparison';
      case 'platform_specific':
        return 'Platform Performance';
      case 'aecr_analysis':
        return 'AECR Analysis';
      default:
        return type;
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-muted rounded-md">
            {getTypeIcon(report.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{report.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {getTypeLabel(report.type)}
              </Badge>
              
              <span className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(report.dateRange.from)} - {formatDate(report.dateRange.to)}
              </span>
              
              <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Created: {formatDate(report.createdAt)}
              </span>

              {report.status === 'generating' ? (
                <CustomBadge variant="outline" className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50">
                  <AlertTriangle size={12} />
                  Generating
                </CustomBadge>
              ) : (
                <Badge variant="outline" className="uppercase text-xs">
                  {report.format}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          {report.status === 'completed' && (
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="h-8 px-2"
            >
              <a href={report.downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-1" />
                Download
              </a>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                  <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {whiteLabel && (
                <DropdownMenuItem>
                  Download White-Labeled
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                Regenerate Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                Schedule Recurring
              </DropdownMenuItem>
              <DropdownMenuItem>
                Share Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(report.id)} className="text-destructive">
                Delete Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

// New Report Form
const NewReportForm = ({ onSubmit, defaultType = "", defaultTitle = "" }) => {
  const [formData, setFormData] = useState({
    title: defaultTitle,
    type: defaultType || "performance_summary",
    dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    dateTo: new Date(),
    format: "pdf"
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Create New Report</DialogTitle>
        <DialogDescription>
          Configure your report settings and generate a downloadable report.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium">
            Report Title
          </label>
          <Input 
            id="title" 
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Monthly Performance Summary"
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="type" className="text-sm font-medium">
            Report Type
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select a report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance_summary">Performance Summary</SelectItem>
              <SelectItem value="benchmark_comparison">Benchmark Comparison</SelectItem>
              <SelectItem value="platform_specific">Platform Performance</SelectItem>
              <SelectItem value="aecr_analysis">AECR Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="dateFrom" className="text-sm font-medium">
              From Date
            </label>
            <Input 
              id="dateFrom" 
              type="date"
              value={formData.dateFrom.toISOString().substring(0, 10)}
              onChange={(e) => handleChange('dateFrom', new Date(e.target.value))}
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="dateTo" className="text-sm font-medium">
              To Date
            </label>
            <Input 
              id="dateTo" 
              type="date"
              value={formData.dateTo.toISOString().substring(0, 10)}
              onChange={(e) => handleChange('dateTo', new Date(e.target.value))}
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="format" className="text-sm font-medium">
            Format
          </label>
          <Select
            value={formData.format}
            onValueChange={(value) => handleChange('format', value)}
          >
            <SelectTrigger id="format">
              <SelectValue placeholder="Select a format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Document</SelectItem>
              <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
              <SelectItem value="csv">CSV Spreadsheet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit">Generate Report</Button>
      </DialogFooter>
    </form>
  );
};

export default Reports;
