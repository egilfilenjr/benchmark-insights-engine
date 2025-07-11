
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useCompanyIndustry } from "@/hooks/useCompanyIndustry";
import { useCampaignData } from "@/hooks/useCampaignData";
import AppLayout from "@/components/layout/AppLayout";
import IntegrationManager from "@/components/integrations/IntegrationManager";
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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Dropzone } from "@/components/ui/dropzone";
import {
  CheckCircle,
  RefreshCw,
  XCircle,
  AlertTriangle,
  Upload,
  Info,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

type OAuthConnection = {
  id: string;
  platform: string;
  accountName: string;
  accountId: string;
  lastSynced: Date;
  status: "active" | "error" | "pending";
  error: string | null;
};

export default function MyData() {
  const { user } = useUserProfile();
  const { companyIndustry, getIndustryBreadcrumb } = useCompanyIndustry();
  const { 
    campaigns, 
    loading: campaignsLoading, 
    getPerformanceSummary, 
    getIndustryRelevantBenchmarks 
  } = useCampaignData();
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleAddFiles = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleRemoveFile = (file: File) => {
    setFiles(prev => prev.filter(f => f !== file));
  };

  const performanceSummary = getPerformanceSummary();
  const relevantBenchmarks = getIndustryRelevantBenchmarks();

  const getPerformanceColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-4 h-4" />;
    if (score >= 50) return <Target className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header with Industry Context */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">My Data & Performance</h1>
            <p className="text-muted-foreground">Campaign data synced from ad platforms with industry benchmarks</p>
            {companyIndustry && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {getIndustryBreadcrumb()}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Performance Overview */}
        {performanceSummary && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${performanceSummary.totalSpend.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Across {performanceSummary.campaignCount} campaigns
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ROAS</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceSummary.averageRoas.toFixed(2)}x</div>
                <p className="text-xs text-muted-foreground">
                  ${performanceSummary.totalConversionValue.toLocaleString()} revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average CPA</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${performanceSummary.averageCpa.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {performanceSummary.totalConversions} total conversions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Benchmark Score</CardTitle>
                {getPerformanceIcon(performanceSummary.averagePerformanceScore)}
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getPerformanceColor(performanceSummary.averagePerformanceScore)}`}>
                  {performanceSummary.averagePerformanceScore}/100
                </div>
                <p className="text-xs text-muted-foreground">
                  vs {performanceSummary.benchmarkComparisons} industry benchmarks
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="integrations" className="w-full">
          <TabsList>
            <TabsTrigger value="integrations">Ad Platform Integrations</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
            <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
            <TabsTrigger value="uploads">Manual Uploads</TabsTrigger>
          </TabsList>

          <TabsContent value="integrations">
            <IntegrationManager />
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="space-y-4">
              {campaignsLoading ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                    Loading campaign data...
                  </CardContent>
                </Card>
              ) : campaigns.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Campaign Data</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect your ad platforms to see campaign performance and benchmark comparisons.
                    </p>
                    <Button variant="outline">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Connect Integration
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {campaigns.map((campaign) => (
                    <Card key={campaign.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{campaign.campaign_name}</CardTitle>
                            <CardDescription>
                              {campaign.platform} • {campaign.channel} • {campaign.status}
                            </CardDescription>
                          </div>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Spend</Label>
                            <div className="text-lg font-semibold">${campaign.spend.toLocaleString()}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">ROAS</Label>
                            <div className="text-lg font-semibold">{campaign.roas.toFixed(2)}x</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">CPA</Label>
                            <div className="text-lg font-semibold">${campaign.cpa.toFixed(2)}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">CTR</Label>
                            <div className="text-lg font-semibold">{campaign.ctr.toFixed(2)}%</div>
                          </div>
                        </div>

                        {campaign.benchmarks.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Benchmark Comparisons</Label>
                            {campaign.benchmarks.map((benchmark) => (
                              <div key={benchmark.id} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="text-sm">
                                  <span className="font-medium">{benchmark.benchmark.kpi}</span>
                                  <span className="text-muted-foreground ml-2">
                                    {benchmark.user_value.toFixed(2)} vs {benchmark.benchmark.median.toFixed(2)} (median)
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress 
                                    value={benchmark.performance_score} 
                                    className="w-16" 
                                  />
                                  <span className={`text-sm font-medium ${getPerformanceColor(benchmark.performance_score)}`}>
                                    {benchmark.performance_score}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="benchmarks">
            <div className="space-y-4">
              {relevantBenchmarks.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Info className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Industry Benchmarks Available</h3>
                    <p className="text-muted-foreground">
                      Industry-specific benchmarks will appear here once you have campaign data and a complete company profile.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {relevantBenchmarks.map((comparison) => (
                    <Card key={comparison.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {comparison.benchmark.kpi} - {comparison.benchmark.platform}
                        </CardTitle>
                        <CardDescription>{comparison.benchmark.industry}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Your Value</Label>
                            <div className="text-lg font-semibold">{comparison.user_value.toFixed(2)}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Industry Median</Label>
                            <div className="text-lg font-semibold">{comparison.benchmark.median.toFixed(2)}</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Your Percentile</Label>
                            <div className="text-lg font-semibold">{comparison.benchmark_percentile}th</div>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Performance Score</Label>
                            <div className={`text-lg font-semibold ${getPerformanceColor(comparison.performance_score)}`}>
                              {comparison.performance_score}/100
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Label className="text-sm font-medium mb-2 block">Industry Range</Label>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>25th: {comparison.benchmark.percentile_25.toFixed(2)}</span>
                            <span>•</span>
                            <span>50th: {comparison.benchmark.median.toFixed(2)}</span>
                            <span>•</span>
                            <span>75th: {comparison.benchmark.percentile_75.toFixed(2)}</span>
                            <span className="ml-auto">({comparison.benchmark.sample_size} companies)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="uploads">
            <Card>
              <CardHeader>
                <CardTitle>Manual Data Upload</CardTitle>
                <CardDescription>Upload campaign CSVs to supplement your connected integrations.</CardDescription>
              </CardHeader>
              <CardContent>
                <Dropzone
                  value={files}
                  onAddFiles={handleAddFiles}
                  onRemoveFile={handleRemoveFile}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
