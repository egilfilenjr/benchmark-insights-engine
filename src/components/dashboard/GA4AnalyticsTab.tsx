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
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Connected
          </Badge>
          <span className="text-sm text-muted-foreground">
            Google Analytics Connected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={comparisonType} onValueChange={(value) => setComparisonType(value as typeof comparisonType)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Compare to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous-period">Previous period</SelectItem>
              <SelectItem value="previous-year">Previous year</SelectItem>
              <SelectItem value="industry-benchmark">Industry benchmark</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={syncData} 
            disabled={syncing}
            variant="outline"
          >
            {syncing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Sync Data
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts & Visualization</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Customizable Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[metricCard1, metricCard2, metricCard3, metricCard4].map((metricKey, index) => {
              const metric = chartMetricOptions.find(m => m.value === metricKey);
              if (!metric) return null;
              
              const value = getMetricValue(metricKey);
              const comparisonData = getComparisonData(metricKey);
              const IconComponent = metric.icon;
              
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                      <div className="text-sm font-medium">{metric.label}</div>
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{formatMetricValue(value, metricKey)}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      {comparisonData.isPositive ? (
                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className={comparisonData.isPositive ? "text-green-600" : "text-red-600"}>
                        {comparisonData.change.toFixed(1)}%
                      </span>
                      <span className="ml-1">{comparisonData.label}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Metric Card Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Customize Overview Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { value: metricCard1, setter: setMetricCard1, label: 'Card 1' },
                  { value: metricCard2, setter: setMetricCard2, label: 'Card 2' },
                  { value: metricCard3, setter: setMetricCard3, label: 'Card 3' },
                  { value: metricCard4, setter: setMetricCard4, label: 'Card 4' }
                ].map((card, index) => (
                  <div key={index}>
                    <label className="text-sm font-medium mb-2 block">{card.label}</label>
                    <Select value={card.value} onValueChange={card.setter}>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6 mt-6">
          {/* Chart Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Chart Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Chart Type</label>
                  <Select value={chartType} onValueChange={(value) => setChartType(value as typeof chartType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">
                        <div className="flex items-center gap-2">
                          <LineChart className="h-4 w-4" />
                          Line Chart
                        </div>
                      </SelectItem>
                      <SelectItem value="bar">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Bar Chart
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Timeframe</label>
                  <Select value={chartTimeframe} onValueChange={(value) => setChartTimeframe(value as typeof chartTimeframe)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Daily</SelectItem>
                      <SelectItem value="week">Weekly</SelectItem>
                      <SelectItem value="month">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Metric</label>
                  <Select value={chartMetric1} onValueChange={setChartMetric1}>
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
                  <label className="text-sm font-medium mb-2 block">Secondary Metric</label>
                  <Select value={chartMetric2} onValueChange={setChartMetric2}>
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
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="show-comparison" 
                      checked={showComparison}
                      onCheckedChange={setShowComparison}
                    />
                    <label htmlFor="show-comparison" className="text-sm font-medium">
                      Show comparison
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {chartType === 'line' ? <LineChart className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />}
                Analytics Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'line' ? (
                    <RechartsLineChart data={[]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value1" 
                        stroke={chartMetricOptions.find(m => m.value === chartMetric1)?.color || '#8884d8'}
                        name={chartMetricOptions.find(m => m.value === chartMetric1)?.label || 'Metric 1'}
                      />
                      {chartMetric2 !== 'none' && (
                        <Line 
                          type="monotone" 
                          dataKey="value2" 
                          stroke={chartMetricOptions.find(m => m.value === chartMetric2)?.color || '#82ca9d'}
                          name={chartMetricOptions.find(m => m.value === chartMetric2)?.label || 'Metric 2'}
                        />
                      )}
                    </RechartsLineChart>
                  ) : (
                    <RechartsBarChart data={[]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value1" 
                        fill={chartMetricOptions.find(m => m.value === chartMetric1)?.color || '#8884d8'}
                        name={chartMetricOptions.find(m => m.value === chartMetric1)?.label || 'Metric 1'}
                      />
                      {chartMetric2 !== 'none' && (
                        <Bar 
                          dataKey="value2" 
                          fill={chartMetricOptions.find(m => m.value === chartMetric2)?.color || '#82ca9d'}
                          name={chartMetricOptions.find(m => m.value === chartMetric2)?.label || 'Metric 2'}
                        />
                      )}
                    </RechartsBarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-medium text-blue-900">Traffic Growth Opportunity</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your organic search traffic has increased by 23% this month. Consider creating more content around your top-performing keywords to maintain this momentum.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-900">Conversion Rate Improvement</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your conversion rate is 18% above industry average. The checkout flow optimization implemented last month is showing positive results.
                  </p>
                </div>
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h4 className="font-medium text-yellow-900">Bounce Rate Alert</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Mobile bounce rate has increased by 8% this week. Consider optimizing page load speeds and mobile user experience.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pivot Table Section - Now at the bottom */}
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
                          {chartMetricOptions.find(m => m.value === pivotMetric2)?.label || 'Secondary Metric'}
                        </th>
                      )}
                      <th className="text-right p-3 font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedPivotData().map((row, index) => {
                      const comparisonData = getComparisonData(pivotMetric1);
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{row.dimension}</td>
                          {pivotDimension2 !== 'none' && (
                            <td className="p-3 text-muted-foreground">{row.dimension2}</td>
                          )}
                          <td className="p-3 text-right">{formatMetricValue(row.metric1, pivotMetric1)}</td>
                          {pivotMetric2 !== 'none' && (
                            <td className="p-3 text-right">{formatMetricValue(row.metric2, pivotMetric2)}</td>
                          )}
                          <td className="p-3 text-right">
                            <div className={`flex items-center justify-end gap-1 ${comparisonData.isPositive ? 'text-green-600' : 'text-red-600'}`}>
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