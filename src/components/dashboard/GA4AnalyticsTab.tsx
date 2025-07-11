import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, MousePointer, Clock, Target, Zap, RefreshCw, Calendar, Lightbulb, PieChart, BarChart3, LineChart, Filter, Settings, Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGA4Integration } from '@/hooks/useGA4Integration';
import { supabase } from '@/lib/supabase';
import { useUserProfile } from '@/hooks/useUserProfile';

interface GA4Metrics {
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
  ecommerceConversionRate?: number;
  revenue?: number;
  goalCompletions: number;
  newUserRate: number;
  // Comparison data
  previousPeriod: {
    sessions: number;
    users: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversionRate: number;
    goalCompletions: number;
    newUserRate: number;
  };
  previousYear: {
    sessions: number;
    users: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversionRate: number;
    goalCompletions: number;
    newUserRate: number;
  };
}

interface BenchmarkComparison {
  metric: string;
  userValue: number;
  benchmarkP25: number;
  benchmarkMedian: number;
  benchmarkP75: number;
  unit: string;
  percentile: number;
  status: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
}

export default function GA4AnalyticsTab() {
  const { integration, loading: integrationLoading, syncData, syncing } = useGA4Integration();
  const { user } = useUserProfile();
  const [metrics, setMetrics] = useState<GA4Metrics | null>(null);
  const [benchmarks, setBenchmarks] = useState<BenchmarkComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comparisonType, setComparisonType] = useState<'previous-period' | 'previous-year' | 'industry-benchmark'>('previous-period');
  
  // Chart state
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [chartTimeframe, setChartTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const [chartMetric1, setChartMetric1] = useState('sessions');
  const [chartMetric2, setChartMetric2] = useState('none');
  const [showComparison, setShowComparison] = useState(false);

  // Customizable metric cards state
  const [metricCard1, setMetricCard1] = useState('users');
  const [metricCard2, setMetricCard2] = useState('sessions');
  const [metricCard3, setMetricCard3] = useState('pageviews');
  const [metricCard4, setMetricCard4] = useState('conversions');

  // Pivot table state
  const [pivotDimension, setPivotDimension] = useState('source');
  const [pivotDimension2, setPivotDimension2] = useState('none');
  const [pivotMetric1, setPivotMetric1] = useState('sessions');
  const [pivotMetric2, setPivotMetric2] = useState('none');
  const [pivotCurrentPage, setPivotCurrentPage] = useState(1);
  const [pivotRowsPerPage, setPivotRowsPerPage] = useState(10);

  // Available metrics for chart and cards
  const chartMetricOptions = [
    { value: 'sessions', label: 'Sessions', color: '#8884d8', icon: MousePointer },
    { value: 'users', label: 'Users', color: '#82ca9d', icon: Users },
    { value: 'pageviews', label: 'Page Views', color: '#ffc658', icon: MousePointer },
    { value: 'bounceRate', label: 'Bounce Rate (%)', color: '#ff7c7c', icon: TrendingDown },
    { value: 'conversionRate', label: 'Conversion Rate (%)', color: '#8dd1e1', icon: Target },
    { value: 'goalCompletions', label: 'Goal Completions', color: '#d084d0', icon: Target },
    { value: 'newUserRate', label: 'New User Rate (%)', color: '#ffb347', icon: Users },
    { value: 'avgSessionDuration', label: 'Avg Session Duration', color: '#ff9999', icon: Clock },
    { value: 'conversions', label: 'Conversions', color: '#87ceeb', icon: Target },
    { value: 'revenue', label: 'Revenue', color: '#dda0dd', icon: TrendingUp },
    { value: 'ctr', label: 'Click-through Rate (%)', color: '#f0e68c', icon: MousePointer },
    { value: 'impressions', label: 'Impressions', color: '#ffa07a', icon: Zap },
    { value: 'clicks', label: 'Clicks', color: '#20b2aa', icon: MousePointer },
    { value: 'cpc', label: 'Cost Per Click', color: '#da70d6', icon: TrendingUp },
    { value: 'engagement', label: 'Engagement Rate (%)', color: '#ff6347', icon: Users }
  ];

  // Available dimensions for pivot table
  const pivotDimensionOptions = [
    { value: 'source', label: 'Traffic Source' },
    { value: 'medium', label: 'Medium' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'deviceCategory', label: 'Device Category' },
    { value: 'country', label: 'Country' },
    { value: 'browser', label: 'Browser' },
    { value: 'operatingSystem', label: 'Operating System' },
    { value: 'landingPage', label: 'Landing Page' },
    { value: 'ageGroup', label: 'Age Group' },
    { value: 'gender', label: 'Gender' }
  ];

  // Generate pivot table data
  const generatePivotData = () => {
    console.log('generatePivotData called', { metrics, pivotDimension, pivotMetric1, pivotMetric2 });
    if (!metrics) return [];
    
    const dimensionData = {
      source: [
        { dimension: 'Google', dimension2: 'Organic Search', sessions: 45820, users: 32150 },
        { dimension: 'Direct', dimension2: 'Direct', sessions: 28440, users: 21890 },
        { dimension: 'Facebook', dimension2: 'Social', sessions: 18650, users: 14200 },
        { dimension: 'LinkedIn', dimension2: 'Social', sessions: 12340, users: 9870 },
        { dimension: 'Twitter', dimension2: 'Social', sessions: 8920, users: 7410 },
        { dimension: 'Email', dimension2: 'Email', sessions: 6780, users: 5920 },
        { dimension: 'Bing', dimension2: 'Organic Search', sessions: 5420, users: 4320 },
        { dimension: 'YouTube', dimension2: 'Social', sessions: 4850, users: 3890 }
      ],
      medium: [
        { dimension: 'Organic Search', dimension2: 'Desktop', sessions: 48920, users: 35640 },
        { dimension: 'Paid Search', dimension2: 'Desktop', sessions: 22340, users: 17890 },
        { dimension: 'Social', dimension2: 'Mobile', sessions: 18650, users: 14200 },
        { dimension: 'Email', dimension2: 'Desktop', sessions: 12450, users: 10230 },
        { dimension: 'Direct', dimension2: 'Mobile', sessions: 28440, users: 21890 },
        { dimension: 'Referral', dimension2: 'Desktop', sessions: 8920, users: 7410 },
        { dimension: 'Display', dimension2: 'Mobile', sessions: 6780, users: 5200 },
        { dimension: 'Video', dimension2: 'Mobile', sessions: 4320, users: 3450 }
      ]
    };

    const baseData = dimensionData[pivotDimension as keyof typeof dimensionData] || dimensionData.source;
    
    return baseData.map(item => {
      const variation = 0.8 + Math.random() * 0.4; // ±20% variation
      
      const result: any = {
        dimension: item.dimension,
        dimension2: pivotDimension2 !== 'none' ? item.dimension2 : undefined,
        metric1: getMetricValue(pivotMetric1) * (item.sessions / 100000) * variation,
      };
      
      if (pivotMetric2 !== 'none') {
        result.metric2 = getMetricValue(pivotMetric2) * (item.sessions / 100000) * variation;
      }
      
      return result;
    });
  };

  // Helper function to get metric value from metrics object
  const getMetricValue = (metricKey: string): number => {
    if (!metrics) return 0;
    
    switch (metricKey) {
      case 'users': return metrics.users;
      case 'sessions': return metrics.sessions;
      case 'pageviews': return metrics.pageviews;
      case 'bounceRate': return metrics.bounceRate;
      case 'conversionRate': return metrics.conversionRate;
      case 'goalCompletions': return metrics.goalCompletions;
      case 'newUserRate': return metrics.newUserRate;
      case 'avgSessionDuration': return metrics.avgSessionDuration;
      case 'conversions': return metrics.goalCompletions; // Using goalCompletions as conversions
      case 'revenue': return 45789; // Mock revenue data
      case 'ctr': return 3.2; // Mock CTR data
      case 'impressions': return 125000; // Mock impressions
      case 'clicks': return 4200; // Mock clicks
      case 'cpc': return 1.25; // Mock CPC
      case 'engagement': return 67.8; // Mock engagement rate
      default: return 0;
    }
  };

  // Helper function to format metric values
  const formatMetricValue = (value: number, metricKey: string): string => {
    switch (metricKey) {
      case 'revenue':
        return `$${value.toLocaleString()}`;
      case 'bounceRate':
      case 'conversionRate':
      case 'newUserRate':
      case 'ctr':
      case 'engagement':
        return `${value.toFixed(1)}%`;
      case 'avgSessionDuration':
        const minutes = Math.floor(value / 60);
        const seconds = value % 60;
        return `${minutes}m ${seconds}s`;
      case 'cpc':
        return `$${value.toFixed(2)}`;
      default:
        return value.toLocaleString();
    }
  };

  const getComparisonData = (metric: string) => {
    if (!metrics) return { value: 0, change: 0, isPositive: true, label: 'vs last period' };
    
    const currentValue = getMetricValue(metric);
    let previousValue: number;
    let changeLabel: string;
    
    // Generate mock previous values for new metrics
    const mockPreviousMultiplier = 0.85 + Math.random() * 0.3; // ±15% variation
    
    switch (comparisonType) {
      case 'previous-period':
        if (metric in metrics.previousPeriod) {
          previousValue = metrics.previousPeriod[metric as keyof GA4Metrics['previousPeriod']];
        } else {
          previousValue = currentValue * mockPreviousMultiplier;
        }
        changeLabel = 'vs last period';
        break;
      case 'previous-year':
        if (metric in metrics.previousYear) {
          previousValue = metrics.previousYear[metric as keyof GA4Metrics['previousYear']];
        } else {
          previousValue = currentValue * (mockPreviousMultiplier * 0.9); // Slightly more variation for year
        }
        changeLabel = 'vs last year';
        break;
      case 'industry-benchmark':
        // For industry benchmark, we'll use benchmark data
        const benchmark = benchmarks.find(b => b.metric.toLowerCase().includes(metric.toLowerCase()));
        if (benchmark) {
          const change = ((currentValue - benchmark.benchmarkMedian) / benchmark.benchmarkMedian) * 100;
          return {
            value: benchmark.benchmarkMedian,
            change: Math.abs(change),
            isPositive: change >= 0,
            label: 'vs industry median'
          };
        }
        previousValue = currentValue * mockPreviousMultiplier;
        changeLabel = 'vs industry';
        break;
      default:
        previousValue = currentValue * mockPreviousMultiplier;
        changeLabel = 'vs last period';
    }
    
    const change = calculatePercentageChange(currentValue, previousValue);
    const isPositive = metric === 'bounceRate' ? change < 0 : change > 0; // Lower bounce rate is better
    
    return {
      value: previousValue,
      change: Math.abs(change),
      isPositive,
      label: changeLabel
    };
  };

  const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Pagination helpers
  const getPaginatedPivotData = () => {
    const data = generatePivotData();
    const startIndex = (pivotCurrentPage - 1) * pivotRowsPerPage;
    const endIndex = startIndex + pivotRowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPivotPages = () => {
    const data = generatePivotData();
    return Math.ceil(data.length / pivotRowsPerPage);
  };

  // Load mock data on component mount
  useEffect(() => {
    if (!integrationLoading && integration) {
      // Simulate loading time
      setTimeout(() => {
        setMetrics({
          sessions: 125846,
          users: 89432,
          pageviews: 324567,
          bounceRate: 42.5,
          avgSessionDuration: 156,
          conversionRate: 3.8,
          ecommerceConversionRate: 2.1,
          revenue: 45789,
          goalCompletions: 4785,
          newUserRate: 67.2,
          previousPeriod: {
            sessions: 118642,
            users: 84219,
            pageviews: 298432,
            bounceRate: 45.1,
            avgSessionDuration: 142,
            conversionRate: 3.4,
            goalCompletions: 4234,
            newUserRate: 63.8
          },
          previousYear: {
            sessions: 98456,
            users: 72134,
            pageviews: 256789,
            bounceRate: 48.3,
            avgSessionDuration: 128,
            conversionRate: 2.9,
            goalCompletions: 3567,
            newUserRate: 58.4
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [integration, integrationLoading]);

  if (!metrics) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <RefreshCw className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Loading Analytics Data</h3>
          <p className="text-muted-foreground">Please wait while we fetch your data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pivot Table Section */}
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Custom Pivot Table
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Pivot Table Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Dimension</label>
                <Select value={pivotDimension} onValueChange={setPivotDimension}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    {pivotDimensionOptions.map(dim => (
                      <SelectItem key={dim.value} value={dim.value}>
                        {dim.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Secondary Dimension (Optional)</label>
                <Select value={pivotDimension2} onValueChange={setPivotDimension2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {pivotDimensionOptions
                      .filter(dim => dim.value !== pivotDimension)
                      .map(dim => (
                        <SelectItem key={dim.value} value={dim.value}>
                          {dim.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Metric</label>
                <Select value={pivotMetric1} onValueChange={setPivotMetric1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    {chartMetricOptions.map(metric => (
                      <SelectItem key={metric.value} value={metric.value}>
                        {metric.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Secondary Metric (Optional)</label>
                <Select value={pivotMetric2} onValueChange={setPivotMetric2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {chartMetricOptions.map(metric => (
                      <SelectItem key={metric.value} value={metric.value}>
                        {metric.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pivot Table Display */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-medium">
                        {pivotDimensionOptions.find(d => d.value === pivotDimension)?.label || 'Dimension'}
                      </th>
                      {pivotDimension2 !== 'none' && (
                        <th className="text-left p-3 font-medium">
                          {pivotDimensionOptions.find(d => d.value === pivotDimension2)?.label || 'Secondary Dimension'}
                        </th>
                      )}
                      <th className="text-right p-3 font-medium">
                        {chartMetricOptions.find(m => m.value === pivotMetric1)?.label || 'Metric'}
                      </th>
                      {pivotMetric2 !== 'none' && (
                        <th className="text-right p-3 font-medium">
                          {chartMetricOptions.find(m => m.value === pivotMetric2)?.label}
                        </th>
                      )}
                      <th className="text-right p-3 font-medium">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedPivotData().map((row, index) => {
                      const comparisonData = getComparisonData(pivotMetric1);
                      return (
                        <tr key={index} className="border-b hover:bg-muted/25">
                          <td className="p-3 font-medium">{row.dimension}</td>
                          {pivotDimension2 !== 'none' && row.dimension2 && (
                            <td className="p-3 text-muted-foreground">{row.dimension2}</td>
                          )}
                          <td className="p-3 text-right">
                            {formatMetricValue(row.metric1, pivotMetric1)}
                          </td>
                          {pivotMetric2 !== 'none' && (
                            <td className="p-3 text-right">
                              {formatMetricValue(row.metric2 || 0, pivotMetric2)}
                            </td>
                          )}
                          <td className="p-3 text-right">
                            <div className={`flex items-center justify-end gap-1 ${
                              comparisonData.isPositive ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {comparisonData.isPositive ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {comparisonData.change.toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {comparisonData.label}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls - Outside the table */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Show:</label>
                  <Select value={pivotRowsPerPage.toString()} onValueChange={(value) => {
                    setPivotRowsPerPage(Number(value));
                    setPivotCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">rows per page</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {((pivotCurrentPage - 1) * pivotRowsPerPage) + 1} to {Math.min(pivotCurrentPage * pivotRowsPerPage, generatePivotData().length)} of {generatePivotData().length} entries
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPivotCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={pivotCurrentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {pivotCurrentPage} of {getTotalPivotPages()}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPivotCurrentPage(prev => Math.min(getTotalPivotPages(), prev + 1))}
                  disabled={pivotCurrentPage === getTotalPivotPages()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}