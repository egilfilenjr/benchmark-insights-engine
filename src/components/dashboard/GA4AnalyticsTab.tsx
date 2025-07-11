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

  useEffect(() => {
    if (integration && user?.id) {
      loadGA4Data();
      loadBenchmarkComparisons();
    }
  }, [integration, user?.id, dateRange, comparisonType]);

  const loadGA4Data = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // In a real implementation, this would fetch actual GA4 data based on dateRange
      // For now, we'll use mock data that varies slightly based on date range
      const baseMultiplier = dateRange === 'last-7-days' ? 0.3 : 
                           dateRange === 'last-30-days' ? 1 :
                           dateRange === 'last-90-days' ? 2.8 :
                           dateRange === 'last-12-months' ? 12 : 1;
      
      const mockMetrics: GA4Metrics = {
        sessions: Math.round(12458 * baseMultiplier),
        users: Math.round(8934 * baseMultiplier),
        pageviews: Math.round(24891 * baseMultiplier),
        bounceRate: 58.2,
        avgSessionDuration: 142,
        conversionRate: 2.4,
        ecommerceConversionRate: 1.8,
        revenue: Math.round(45789 * baseMultiplier),
        goalCompletions: Math.round(299 * baseMultiplier),
        newUserRate: 71.6,
        previousPeriod: {
          sessions: Math.round(11145 * baseMultiplier),
          users: Math.round(7982 * baseMultiplier),
          pageviews: Math.round(22134 * baseMultiplier),
          bounceRate: 60.1,
          avgSessionDuration: 147,
          conversionRate: 2.1,
          goalCompletions: Math.round(251 * baseMultiplier),
          newUserRate: 69.8
        },
        previousYear: {
          sessions: Math.round(10234 * baseMultiplier),
          users: Math.round(7123 * baseMultiplier),
          pageviews: Math.round(19876 * baseMultiplier),
          bounceRate: 62.8,
          avgSessionDuration: 134,
          conversionRate: 1.9,
          goalCompletions: Math.round(189 * baseMultiplier),
          newUserRate: 73.2
        }
      };

      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Error loading GA4 data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBenchmarkComparisons = async () => {
    if (!user?.id || !metrics) return;

    try {
      // Fetch relevant benchmarks for website analytics
      const { data: benchmarkData } = await supabase
        .from('benchmarks')
        .select('*')
        .in('kpi', ['bounce_rate', 'session_duration', 'conversion_rate', 'new_user_rate'])
        .eq('platform', 'google_analytics')
        .eq('region', 'global');

      if (benchmarkData && metrics) {
        const comparisons: BenchmarkComparison[] = [
          {
            metric: 'Bounce Rate',
            userValue: metrics.bounceRate,
            benchmarkP25: 45.2,
            benchmarkMedian: 58.1,
            benchmarkP75: 72.8,
            unit: '%',
            percentile: calculatePercentile(metrics.bounceRate, 45.2, 58.1, 72.8, true),
            status: getStatus(calculatePercentile(metrics.bounceRate, 45.2, 58.1, 72.8, true))
          },
          {
            metric: 'Avg Session Duration',
            userValue: metrics.avgSessionDuration,
            benchmarkP25: 89,
            benchmarkMedian: 142,
            benchmarkP75: 208,
            unit: 's',
            percentile: calculatePercentile(metrics.avgSessionDuration, 89, 142, 208),
            status: getStatus(calculatePercentile(metrics.avgSessionDuration, 89, 142, 208))
          },
          {
            metric: 'Conversion Rate',
            userValue: metrics.conversionRate,
            benchmarkP25: 1.2,
            benchmarkMedian: 2.1,
            benchmarkP75: 3.8,
            unit: '%',
            percentile: calculatePercentile(metrics.conversionRate, 1.2, 2.1, 3.8),
            status: getStatus(calculatePercentile(metrics.conversionRate, 1.2, 2.1, 3.8))
          },
          {
            metric: 'New User Rate',
            userValue: metrics.newUserRate,
            benchmarkP25: 62.1,
            benchmarkMedian: 71.5,
            benchmarkP75: 81.3,
            unit: '%',
            percentile: calculatePercentile(metrics.newUserRate, 62.1, 71.5, 81.3),
            status: getStatus(calculatePercentile(metrics.newUserRate, 62.1, 71.5, 81.3))
          }
        ];

        setBenchmarks(comparisons);
      }
    } catch (error) {
      console.error('Error loading benchmark comparisons:', error);
    }
  };

  const calculatePercentile = (value: number, p25: number, median: number, p75: number, reverse = false): number => {
    if (reverse) {
      if (value <= p25) return 90;
      if (value <= median) return 60;
      if (value <= p75) return 30;
      return 10;
    } else {
      if (value >= p75) return 90;
      if (value >= median) return 60;
      if (value >= p25) return 30;
      return 10;
    }
  };

  const getStatus = (percentile: number): 'excellent' | 'good' | 'average' | 'below_average' | 'poor' => {
    if (percentile >= 80) return 'excellent';
    if (percentile >= 60) return 'good';
    if (percentile >= 40) return 'average';
    if (percentile >= 20) return 'below_average';
    return 'poor';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'average': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'below_average': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
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

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    if (value !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
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

  // Generate chart data based on selected timeframe
  const generateChartData = () => {
    if (!metrics) return [];
    
    const now = new Date();
    const data = [];
    
    // Generate different number of data points based on timeframe
    const dataPoints = chartTimeframe === 'day' ? 30 : chartTimeframe === 'week' ? 12 : 6;
    
    for (let i = dataPoints - 1; i >= 0; i--) {
      const date = new Date(now);
      if (chartTimeframe === 'day') {
        date.setDate(date.getDate() - i);
      } else if (chartTimeframe === 'week') {
        date.setDate(date.getDate() - (i * 7));
      } else {
        date.setMonth(date.getMonth() - i);
      }
      
      const formatString = chartTimeframe === 'day' ? 'MM/dd' : chartTimeframe === 'week' ? 'MM/dd' : 'MMM';
      const label = chartTimeframe === 'day' 
        ? `${date.getMonth() + 1}/${date.getDate()}`
        : chartTimeframe === 'week'
        ? `${date.getMonth() + 1}/${date.getDate()}`
        : date.toLocaleDateString('en-US', { month: 'short' });
      
      // Generate realistic trend data with some randomness
      const trend = 1 + (Math.sin(i / 5) * 0.2) + (Math.random() - 0.5) * 0.1;
      const baseSessions = metrics.sessions / dataPoints;
      const baseUsers = metrics.users / dataPoints;
      
      const dataPoint: any = {
        name: label,
        date: date.toISOString().split('T')[0],
      };
      
      // Add selected metrics to data point
      if (chartMetric1) {
        const metric1Data = chartMetricOptions.find(m => m.value === chartMetric1);
        if (metric1Data) {
          let value = 0;
          const baseValue = getMetricValue(chartMetric1);
          const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
          
          switch (chartMetric1) {
            case 'sessions':
            case 'users':
            case 'pageviews':
            case 'goalCompletions':
            case 'conversions':
            case 'impressions':
            case 'clicks':
              value = Math.round((baseValue / dataPoints) * trend * (1 + variation));
              break;
            case 'bounceRate':
            case 'conversionRate':
            case 'newUserRate':
            case 'ctr':
            case 'engagement':
              value = Number((baseValue * (1 + variation)).toFixed(2));
              break;
            case 'avgSessionDuration':
              value = Math.round(baseValue * (1 + variation));
              break;
            case 'revenue':
              value = Math.round((baseValue / dataPoints) * trend * (1 + variation));
              break;
            case 'cpc':
              value = Number((baseValue * (1 + variation)).toFixed(2));
              break;
            default:
              value = Math.round((baseValue / dataPoints) * trend);
          }
          dataPoint[chartMetric1] = value;
          
          // Add comparison data if toggle is enabled
          if (showComparison) {
            const comparisonData = getComparisonData(chartMetric1);
            const comparisonVariation = (Math.random() - 0.5) * 0.15; // Slightly less variation for comparison
            let comparisonValue = 0;
            
            switch (chartMetric1) {
              case 'sessions':
              case 'users':
              case 'pageviews':
              case 'goalCompletions':
              case 'conversions':
              case 'impressions':
              case 'clicks':
                comparisonValue = Math.round((comparisonData.value / dataPoints) * trend * (1 + comparisonVariation));
                break;
              case 'bounceRate':
              case 'conversionRate':
              case 'newUserRate':
              case 'ctr':
              case 'engagement':
                comparisonValue = Number((comparisonData.value * (1 + comparisonVariation)).toFixed(2));
                break;
              case 'avgSessionDuration':
                comparisonValue = Math.round(comparisonData.value * (1 + comparisonVariation));
                break;
              case 'revenue':
                comparisonValue = Math.round((comparisonData.value / dataPoints) * trend * (1 + comparisonVariation));
                break;
              case 'cpc':
                comparisonValue = Number((comparisonData.value * (1 + comparisonVariation)).toFixed(2));
                break;
              default:
                comparisonValue = Math.round((comparisonData.value / dataPoints) * trend);
            }
            dataPoint[`${chartMetric1}_comparison`] = comparisonValue;
          }
        }
      }
      
      if (chartMetric2 && chartMetric2 !== 'none') {
        const metric2Data = chartMetricOptions.find(m => m.value === chartMetric2);
        if (metric2Data) {
          let value = 0;
          const baseValue = getMetricValue(chartMetric2);
          const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
          
          switch (chartMetric2) {
            case 'sessions':
            case 'users':
            case 'pageviews':
            case 'goalCompletions':
            case 'conversions':
            case 'impressions':
            case 'clicks':
              value = Math.round((baseValue / dataPoints) * trend * (1 + variation));
              break;
            case 'bounceRate':
            case 'conversionRate':
            case 'newUserRate':
            case 'ctr':
            case 'engagement':
              value = Number((baseValue * (1 + variation)).toFixed(2));
              break;
            case 'avgSessionDuration':
              value = Math.round(baseValue * (1 + variation));
              break;
            case 'revenue':
              value = Math.round((baseValue / dataPoints) * trend * (1 + variation));
              break;
            case 'cpc':
              value = Number((baseValue * (1 + variation)).toFixed(2));
              break;
            default:
              value = Math.round((baseValue / dataPoints) * trend);
          }
          dataPoint[chartMetric2] = value;
          
          // Add comparison data if toggle is enabled
          if (showComparison) {
            const comparisonData = getComparisonData(chartMetric2);
            const comparisonVariation = (Math.random() - 0.5) * 0.15; // Slightly less variation for comparison
            let comparisonValue = 0;
            
            switch (chartMetric2) {
              case 'sessions':
              case 'users':
              case 'pageviews':
              case 'goalCompletions':
              case 'conversions':
              case 'impressions':
              case 'clicks':
                comparisonValue = Math.round((comparisonData.value / dataPoints) * trend * (1 + comparisonVariation));
                break;
              case 'bounceRate':
              case 'conversionRate':
              case 'newUserRate':
              case 'ctr':
              case 'engagement':
                comparisonValue = Number((comparisonData.value * (1 + comparisonVariation)).toFixed(2));
                break;
              case 'avgSessionDuration':
                comparisonValue = Math.round(comparisonData.value * (1 + comparisonVariation));
                break;
              case 'revenue':
                comparisonValue = Math.round((comparisonData.value / dataPoints) * trend * (1 + comparisonVariation));
                break;
              case 'cpc':
                comparisonValue = Number((comparisonData.value * (1 + comparisonVariation)).toFixed(2));
                break;
              default:
                comparisonValue = Math.round((comparisonData.value / dataPoints) * trend);
            }
            dataPoint[`${chartMetric2}_comparison`] = comparisonValue;
          }
        }
      }
      
      data.push(dataPoint);
    }
    
    return data;
  };

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
      ],
      deviceCategory: [
        { dimension: 'Desktop', dimension2: 'Windows', sessions: 68420, users: 48900 },
        { dimension: 'Mobile', dimension2: 'iOS', sessions: 32380, users: 24750 },
        { dimension: 'Mobile', dimension2: 'Android', sessions: 20000, users: 15000 },
        { dimension: 'Tablet', dimension2: 'iOS', sessions: 12920, users: 9800 },
        { dimension: 'Tablet', dimension2: 'Android', sessions: 6000, users: 5000 },
        { dimension: 'Desktop', dimension2: 'macOS', sessions: 15420, users: 12340 }
      ],
      country: [
        { dimension: 'United States', dimension2: 'English', sessions: 58420, users: 42380 },
        { dimension: 'United Kingdom', dimension2: 'English', sessions: 22340, users: 17650 },
        { dimension: 'Canada', dimension2: 'English', sessions: 18920, users: 14800 },
        { dimension: 'Australia', dimension2: 'English', sessions: 12450, users: 9870 },
        { dimension: 'Germany', dimension2: 'German', sessions: 10320, users: 8250 },
        { dimension: 'France', dimension2: 'French', sessions: 8950, users: 7120 },
        { dimension: 'Spain', dimension2: 'Spanish', sessions: 6780, users: 5340 },
        { dimension: 'Netherlands', dimension2: 'Dutch', sessions: 4230, users: 3450 }
      ],
      browser: [
        { dimension: 'Chrome', dimension2: 'Desktop', sessions: 69420, users: 49200 },
        { dimension: 'Chrome', dimension2: 'Mobile', sessions: 20000, users: 15000 },
        { dimension: 'Safari', dimension2: 'Desktop', sessions: 22580, users: 17890 },
        { dimension: 'Safari', dimension2: 'Mobile', sessions: 10000, users: 8000 },
        { dimension: 'Firefox', dimension2: 'Desktop', sessions: 12450, users: 9870 },
        { dimension: 'Edge', dimension2: 'Desktop', sessions: 8920, users: 7410 }
      ],
      operatingSystem: [
        { dimension: 'Windows', dimension2: '10', sessions: 42380, users: 30200 },
        { dimension: 'Windows', dimension2: '11', sessions: 20000, users: 15000 },
        { dimension: 'macOS', dimension2: 'Monterey', sessions: 28920, users: 21750 },
        { dimension: 'macOS', dimension2: 'Big Sur', sessions: 10000, users: 8000 },
        { dimension: 'iOS', dimension2: '16', sessions: 20440, users: 16890 },
        { dimension: 'iOS', dimension2: '15', sessions: 8000, users: 6000 },
        { dimension: 'Android', dimension2: '12', sessions: 12650, users: 9200 },
        { dimension: 'Android', dimension2: '11', sessions: 6000, users: 5000 }
      ],
      landingPage: [
        { dimension: '/', dimension2: 'Organic Search', sessions: 28920, users: 21750 },
        { dimension: '/', dimension2: 'Direct', sessions: 10000, users: 8000 },
        { dimension: '/pricing', dimension2: 'Paid Search', sessions: 15340, users: 12890 },
        { dimension: '/pricing', dimension2: 'Social', sessions: 7000, users: 6000 },
        { dimension: '/features', dimension2: 'Organic Search', sessions: 12650, users: 9200 },
        { dimension: '/features', dimension2: 'Referral', sessions: 6000, users: 5000 },
        { dimension: '/about', dimension2: 'Direct', sessions: 8450, users: 6230 },
        { dimension: '/contact', dimension2: 'Email', sessions: 4920, users: 3410 }
      ],
      campaign: [
        { dimension: 'Summer Sale 2024', dimension2: 'Google Ads', sessions: 15340, users: 12890 },
        { dimension: 'Summer Sale 2024', dimension2: 'Facebook Ads', sessions: 7000, users: 6000 },
        { dimension: 'Brand Awareness Q3', dimension2: 'Google Ads', sessions: 12650, users: 9200 },
        { dimension: 'Brand Awareness Q3', dimension2: 'LinkedIn Ads', sessions: 6000, users: 5000 },
        { dimension: 'Product Launch', dimension2: 'Google Ads', sessions: 10420, users: 8350 },
        { dimension: 'Product Launch', dimension2: 'Twitter Ads', sessions: 5000, users: 4000 },
        { dimension: 'Holiday Special', dimension2: 'Facebook Ads', sessions: 8450, users: 6230 },
        { dimension: 'Retargeting Campaign', dimension2: 'Google Ads', sessions: 4920, users: 3410 }
      ],
      ageGroup: [
        { dimension: '25-34', dimension2: 'Male', sessions: 25820, users: 18150 },
        { dimension: '25-34', dimension2: 'Female', sessions: 20000, users: 14000 },
        { dimension: '35-44', dimension2: 'Male', sessions: 18340, users: 14890 },
        { dimension: '35-44', dimension2: 'Female', sessions: 14000, users: 11000 },
        { dimension: '45-54', dimension2: 'Male', sessions: 12450, users: 9200 },
        { dimension: '45-54', dimension2: 'Female', sessions: 10000, users: 9000 },
        { dimension: '18-24', dimension2: 'Male', sessions: 10650, users: 8800 },
        { dimension: '18-24', dimension2: 'Female', sessions: 8000, users: 6000 }
      ],
      gender: [
        { dimension: 'Male', dimension2: '25-34', sessions: 38420, users: 27900 },
        { dimension: 'Male', dimension2: '35-44', sessions: 20000, users: 15000 },
        { dimension: 'Male', dimension2: '45-54', sessions: 10000, users: 8000 },
        { dimension: 'Female', dimension2: '25-34', sessions: 35380, users: 26200 },
        { dimension: 'Female', dimension2: '35-44', sessions: 17000, users: 13000 },
        { dimension: 'Female', dimension2: '45-54', sessions: 10000, users: 8000 },
        { dimension: 'Unknown', dimension2: 'N/A', sessions: 4920, users: 3410 }
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

  // Export functions
  const exportDashboardAsPDF = () => {
    // This would integrate with a PDF generation library
    console.log('Exporting dashboard as PDF...');
    // For now, we'll show a simple alert
    alert('Dashboard PDF export feature coming soon!');
  };

  const exportPivotTableAsCSV = () => {
    const data = generatePivotData();
    const headers = [
      pivotDimensionOptions.find(d => d.value === pivotDimension)?.label || 'Dimension',
      chartMetricOptions.find(m => m.value === pivotMetric1)?.label || 'Metric'
    ];
    
    if (pivotMetric2 !== 'none') {
      headers.push(chartMetricOptions.find(m => m.value === pivotMetric2)?.label || 'Metric 2');
    }
    headers.push('Change');

    const csvContent = [
      headers.join(','),
      ...data.map(row => {
        const csvRow = [
          row.dimension,
          formatMetricValue(row.metric1, pivotMetric1).replace(/,/g, '')
        ];
        if (pivotMetric2 !== 'none') {
          csvRow.push(formatMetricValue(row.metric2 || 0, pivotMetric2).replace(/,/g, ''));
        }
        const comparisonData = getComparisonData(pivotMetric1);
        csvRow.push(`${comparisonData.change.toFixed(1)}%`);
        return csvRow.join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pivot-table-${pivotDimension}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportPivotTableAsPDF = () => {
    console.log('Exporting pivot table as PDF...');
    alert('Pivot table PDF export feature coming soon!');
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

  if (integrationLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
          <p className="text-muted-foreground">Loading integration...</p>
        </div>
      </div>
    );
  }

  if (!integration) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connect Google Analytics</h3>
          <p className="text-muted-foreground mb-6">
            Connect your Google Analytics 4 property to view website analytics data and benchmark comparisons.
          </p>
          <Button onClick={() => window.location.href = '/dashboard?tab=integrations'}>
            Go to Integrations
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Website Analytics (GA4)</h2>
          <p className="text-muted-foreground">
            Connected to: {integration.property_name}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-12-months">Last 12 months</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {dateRange === 'custom' && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
                placeholder="Start date"
              />
              <span className="text-muted-foreground">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
                placeholder="End date"
              />
            </div>
          )}
          {/* Standout Comparison Dropdown */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-75"></div>
            <Select value={comparisonType} onValueChange={(value: 'previous-period' | 'previous-year' | 'industry-benchmark') => setComparisonType(value)}>
              <SelectTrigger className="w-56 relative bg-background border-2 border-primary/20 shadow-lg hover:border-primary/40 transition-all">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="previous-period">vs Previous Period</SelectItem>
                <SelectItem value="previous-year">vs Previous Year</SelectItem>
                <SelectItem value="industry-benchmark">vs Industry Benchmark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={syncData} disabled={syncing} variant="outline">
              {syncing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Data
                </>
              )}
            </Button>
            <Button 
              onClick={() => exportDashboardAsPDF()} 
              variant="default"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg"
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Dashboard PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Customizable Trend Chart */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle>Performance Trends</CardTitle>
            
            {/* Responsive Grid for Chart Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Chart Type</label>
                <Select value={chartType} onValueChange={(value: 'line' | 'bar') => setChartType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4" />
                        Line
                      </div>
                    </SelectItem>
                    <SelectItem value="bar">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Bar
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Period</label>
                <Select value={chartTimeframe} onValueChange={(value: 'day' | 'week' | 'month') => setChartTimeframe(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Daily</SelectItem>
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Primary Metric</label>
                <Select value={chartMetric1} onValueChange={setChartMetric1}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chartMetricOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Secondary Metric</label>
                <Select value={chartMetric2} onValueChange={setChartMetric2}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {chartMetricOptions
                      .filter(option => option.value !== chartMetric1)
                      .map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="lg:col-span-2 xl:col-span-2 space-y-2">
                <label className="text-sm text-muted-foreground">Show Comparison</label>
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border">
                  <Switch 
                    checked={showComparison} 
                    onCheckedChange={setShowComparison}
                  />
                  <span className="text-sm text-muted-foreground">
                    {comparisonType === 'previous-period' ? 'vs Previous Period' : 
                     comparisonType === 'previous-year' ? 'vs Previous Year' : 
                     'vs Industry Benchmark'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <RechartsLineChart data={generateChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="left"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                    label={{ 
                      value: chartMetricOptions.find(m => m.value === chartMetric1)?.label || '', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  {chartMetric2 && chartMetric2 !== 'none' && (
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.toLocaleString()}
                      label={{ 
                        value: chartMetricOptions.find(m => m.value === chartMetric2)?.label || '', 
                        angle: 90, 
                        position: 'insideRight' 
                      }}
                    />
                  )}
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any, name: string) => {
                      const metric = chartMetricOptions.find(m => m.value === name);
                      return [value.toLocaleString(), metric?.label || name];
                    }}
                  />
                  <Legend />
                  {chartMetric1 && (
                    <Line 
                      type="monotone" 
                      dataKey={chartMetric1} 
                      stroke={chartMetricOptions.find(m => m.value === chartMetric1)?.color}
                      strokeWidth={2}
                      name={chartMetricOptions.find(m => m.value === chartMetric1)?.label}
                      yAxisId="left"
                    />
                  )}
                  {showComparison && chartMetric1 && (
                    <Line 
                      type="monotone" 
                      dataKey={`${chartMetric1}_comparison`}
                      stroke={chartMetricOptions.find(m => m.value === chartMetric1)?.color}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name={`${chartMetricOptions.find(m => m.value === chartMetric1)?.label} (${comparisonType === 'previous-period' ? 'Prev Period' : comparisonType === 'previous-year' ? 'Prev Year' : 'Industry'})`}
                      yAxisId="left"
                    />
                  )}
                  {chartMetric2 && chartMetric2 !== 'none' && (
                    <Line 
                      type="monotone" 
                      dataKey={chartMetric2} 
                      stroke={chartMetricOptions.find(m => m.value === chartMetric2)?.color}
                      strokeWidth={2}
                      name={chartMetricOptions.find(m => m.value === chartMetric2)?.label}
                      yAxisId="right"
                    />
                  )}
                  {showComparison && chartMetric2 && chartMetric2 !== 'none' && (
                    <Line 
                      type="monotone" 
                      dataKey={`${chartMetric2}_comparison`}
                      stroke={chartMetricOptions.find(m => m.value === chartMetric2)?.color}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name={`${chartMetricOptions.find(m => m.value === chartMetric2)?.label} (${comparisonType === 'previous-period' ? 'Prev Period' : comparisonType === 'previous-year' ? 'Prev Year' : 'Industry'})`}
                      yAxisId="right"
                    />
                  )}
                </RechartsLineChart>
              ) : (
                <RechartsBarChart data={generateChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    yAxisId="left"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toLocaleString()}
                    label={{ 
                      value: chartMetricOptions.find(m => m.value === chartMetric1)?.label || '', 
                      angle: -90, 
                      position: 'insideLeft' 
                    }}
                  />
                  {chartMetric2 && chartMetric2 !== 'none' && (
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.toLocaleString()}
                      label={{ 
                        value: chartMetricOptions.find(m => m.value === chartMetric2)?.label || '', 
                        angle: 90, 
                        position: 'insideRight' 
                      }}
                    />
                  )}
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: any, name: string) => {
                      const metric = chartMetricOptions.find(m => m.value === name);
                      return [value.toLocaleString(), metric?.label || name];
                    }}
                  />
                  <Legend />
                  {chartMetric1 && (
                    <Bar 
                      dataKey={chartMetric1} 
                      fill={chartMetricOptions.find(m => m.value === chartMetric1)?.color}
                      name={chartMetricOptions.find(m => m.value === chartMetric1)?.label}
                      yAxisId="left"
                    />
                  )}
                  {showComparison && chartMetric1 && (
                    <Bar 
                      dataKey={`${chartMetric1}_comparison`}
                      fill={chartMetricOptions.find(m => m.value === chartMetric1)?.color}
                      fillOpacity={0.5}
                      name={`${chartMetricOptions.find(m => m.value === chartMetric1)?.label} (${comparisonType === 'previous-period' ? 'Prev Period' : comparisonType === 'previous-year' ? 'Prev Year' : 'Industry'})`}
                      yAxisId="left"
                    />
                  )}
                  {chartMetric2 && chartMetric2 !== 'none' && (
                    <Bar 
                      dataKey={chartMetric2} 
                      fill={chartMetricOptions.find(m => m.value === chartMetric2)?.color}
                      name={chartMetricOptions.find(m => m.value === chartMetric2)?.label}
                      yAxisId="right"
                    />
                  )}
                  {showComparison && chartMetric2 && chartMetric2 !== 'none' && (
                    <Bar 
                      dataKey={`${chartMetric2}_comparison`}
                      fill={chartMetricOptions.find(m => m.value === chartMetric2)?.color}
                      fillOpacity={0.5}
                      name={`${chartMetricOptions.find(m => m.value === chartMetric2)?.label} (${comparisonType === 'previous-period' ? 'Prev Period' : comparisonType === 'previous-year' ? 'Prev Year' : 'Industry'})`}
                      yAxisId="right"
                    />
                  )}
                </RechartsBarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : metrics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { key: 'card1', state: metricCard1, setter: setMetricCard1 },
                  { key: 'card2', state: metricCard2, setter: setMetricCard2 },
                  { key: 'card3', state: metricCard3, setter: setMetricCard3 },
                  { key: 'card4', state: metricCard4, setter: setMetricCard4 }
                ].map(({ key, state, setter }) => {
                  const selectedMetric = chartMetricOptions.find(m => m.value === state);
                  if (!selectedMetric) return null;
                  
                  const IconComponent = selectedMetric.icon;
                  const metricValue = getMetricValue(state);
                  const formattedValue = formatMetricValue(metricValue, state);
                  
                  return (
                    <Card key={key}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <span className="text-sm text-muted-foreground">{selectedMetric.label}</span>
                          </div>
                          <Select value={state} onValueChange={setter}>
                            <SelectTrigger className="w-8 h-8 p-0 border-none">
                              <Settings className="h-4 w-4" />
                            </SelectTrigger>
                            <SelectContent>
                              {chartMetricOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <option.icon className="h-4 w-4" />
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">{formattedValue}</div>
                          {(() => {
                            const comparison = getComparisonData(state);
                            return (
                              <div className={`text-sm flex items-center ${comparison.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {comparison.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {comparison.isPositive ? '+' : '-'}{comparison.change.toFixed(1)}% {comparison.label}
                              </div>
                            );
                          })()}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bounce Rate</span>
                      <div className="text-right">
                        <span className="font-semibold">{metrics.bounceRate}%</span>
                        {(() => {
                          const comparison = getComparisonData('bounceRate');
                          return (
                            <div className={`text-xs flex items-center justify-end mt-1 ${comparison.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {comparison.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {comparison.isPositive ? '+' : '-'}{comparison.change.toFixed(1)}%
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pageviews</span>
                      <div className="text-right">
                        <span className="font-semibold">{formatNumber(metrics.pageviews)}</span>
                        {(() => {
                          const currentPageviews = metrics.pageviews;
                          const previousPageviews = comparisonType === 'previous-year' ? metrics.previousYear.pageviews : metrics.previousPeriod.pageviews;
                          const change = calculatePercentageChange(currentPageviews, previousPageviews);
                          const isPositive = change > 0;
                          return (
                            <div className={`text-xs flex items-center justify-end mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {isPositive ? '+' : '-'}{Math.abs(change).toFixed(1)}%
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New User Rate</span>
                      <div className="text-right">
                        <span className="font-semibold">{metrics.newUserRate}%</span>
                        {(() => {
                          const comparison = getComparisonData('newUserRate');
                          return (
                            <div className={`text-xs flex items-center justify-end mt-1 ${comparison.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {comparison.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {comparison.isPositive ? '+' : '-'}{comparison.change.toFixed(1)}%
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Goal Completions</span>
                      <div className="text-right">
                        <span className="font-semibold">{metrics.goalCompletions}</span>
                        {(() => {
                          const comparison = getComparisonData('goalCompletions');
                          return (
                            <div className={`text-xs flex items-center justify-end mt-1 ${comparison.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {comparison.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {comparison.isPositive ? '+' : '-'}{comparison.change.toFixed(1)}%
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {metrics.revenue && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Revenue</span>
                        <div className="text-right">
                          <span className="font-semibold">${formatNumber(metrics.revenue)}</span>
                          {(() => {
                            const currentRevenue = metrics.revenue;
                            const previousRevenue = comparisonType === 'previous-year' ? 
                              (metrics.previousYear.sessions * (currentRevenue / metrics.sessions)) : 
                              (metrics.previousPeriod.sessions * (currentRevenue / metrics.sessions));
                            const change = calculatePercentageChange(currentRevenue, previousRevenue);
                            const isPositive = change > 0;
                            return (
                              <div className={`text-xs flex items-center justify-end mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {isPositive ? '+' : '-'}{Math.abs(change).toFixed(1)}%
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ecommerce Conversion Rate</span>
                        <div className="text-right">
                          <span className="font-semibold">{metrics.ecommerceConversionRate}%</span>
                          <div className="text-xs text-muted-foreground mt-1">+0.3% vs prev</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Revenue per User</span>
                        <div className="text-right">
                          <span className="font-semibold">${(metrics.revenue / metrics.users).toFixed(2)}</span>
                          {(() => {
                            const currentRpu = metrics.revenue / metrics.users;
                            const previousUsers = comparisonType === 'previous-year' ? metrics.previousYear.users : metrics.previousPeriod.users;
                            const previousRevenue = comparisonType === 'previous-year' ? 
                              (metrics.previousYear.sessions * (metrics.revenue / metrics.sessions)) : 
                              (metrics.previousPeriod.sessions * (metrics.revenue / metrics.sessions));
                            const previousRpu = previousRevenue / previousUsers;
                            const change = calculatePercentageChange(currentRpu, previousRpu);
                            const isPositive = change > 0;
                            return (
                              <div className={`text-xs flex items-center justify-end mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {isPositive ? '+' : '-'}{Math.abs(change).toFixed(1)}%
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* AI Recommendations Section - Pro+ Feature */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    AI Recommendations {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}
                    <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full">PRO+</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-blue-900">
                            {comparisonType === 'industry-benchmark' ? 'Improve Mobile Experience' :
                             comparisonType === 'previous-period' ? 'Maintain Recent Momentum' :
                             'Capitalize on Seasonal Trends'}
                          </h4>
                          <p className="text-sm text-blue-700 mt-1">
                            {comparisonType === 'industry-benchmark' ? 'Your mobile bounce rate (48.2%) is above industry average (45%). Consider optimizing page load speeds and mobile navigation.' :
                             comparisonType === 'previous-period' ? 'Your conversion rate improved 14% vs previous period. Double down on successful campaigns and page optimizations.' :
                             'Q4 traffic patterns show 22% higher engagement vs last year. Prepare inventory and campaigns for peak season.'}
                          </p>
                          <div className="text-xs text-blue-600 mt-2">
                            Impact: {comparisonType === 'industry-benchmark' ? '+15% potential session duration' :
                                     comparisonType === 'previous-period' ? '+18% conversion optimization' :
                                     '+30% seasonal revenue boost'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-green-900">
                            {comparisonType === 'industry-benchmark' ? 'Expand High-Performing Content' :
                             comparisonType === 'previous-period' ? 'Content Strategy Optimization' :
                             'Content Evolution Success'}
                          </h4>
                          <p className="text-sm text-green-700 mt-1">
                            {comparisonType === 'industry-benchmark' ? 'Your blog content shows 85th percentile engagement. Create more similar content to drive organic growth.' :
                             comparisonType === 'previous-period' ? 'Video content engagement increased 40% vs previous period. Increase video production and distribution.' :
                             'Long-form content performs 50% better than last year. Invest in comprehensive guides and resources.'}
                          </p>
                          <div className="text-xs text-green-600 mt-2">
                            Impact: {comparisonType === 'industry-benchmark' ? '+25% potential organic traffic' :
                                     comparisonType === 'previous-period' ? '+35% engagement growth' :
                                     '+45% content reach expansion'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Opportunities Section - Pro+ Feature */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Growth Opportunities {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}
                    <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full">PRO+</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <h4 className="font-medium">
                          {comparisonType === 'industry-benchmark' ? 'Underperforming Pages' :
                           comparisonType === 'previous-period' ? 'Declining Segments' :
                           'Seasonal Opportunities'}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {comparisonType === 'industry-benchmark' ? '3 pages have high traffic but low engagement' :
                         comparisonType === 'previous-period' ? 'Email referrals decreased 15% vs previous period' :
                         'Q4 mobile traffic 40% higher than last year'}
                      </p>
                      <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        {comparisonType === 'industry-benchmark' ? 'Revenue potential: $2,400/month' :
                         comparisonType === 'previous-period' ? 'Recovery potential: +20%' :
                         'Seasonal potential: $5,200/month'}
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h4 className="font-medium">
                          {comparisonType === 'industry-benchmark' ? 'Traffic Source Gap' :
                           comparisonType === 'previous-period' ? 'Growing Segments' :
                           'Year-over-Year Winners'}
                        </h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {comparisonType === 'industry-benchmark' ? 'Low social media referrals vs industry' :
                         comparisonType === 'previous-period' ? 'Direct traffic conversion improved 25%' :
                         'Organic search traffic 60% higher than last year'}
                      </p>
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {comparisonType === 'industry-benchmark' ? 'Traffic potential: +35%' :
                         comparisonType === 'previous-period' ? 'Growth potential: +40%' :
                         'Expansion potential: +75%'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trends Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Performance Trends {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">
                        ↗ {comparisonType === 'industry-benchmark' ? '23%' : comparisonType === 'previous-period' ? '18%' : '45%'}
                      </div>
                      <div className="text-sm text-green-600">Sessions Growth</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {comparisonType === 'industry-benchmark' ? 'Industry avg: +18% | 78th percentile' :
                         comparisonType === 'previous-period' ? 'vs previous period' :
                         'vs last year | Excellent growth'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">
                        ↗ {comparisonType === 'industry-benchmark' ? '15%' : comparisonType === 'previous-period' ? '12%' : '28%'}
                      </div>
                      <div className="text-sm text-blue-600">Conversion Rate</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {comparisonType === 'industry-benchmark' ? 'Industry avg: +12% | 65th percentile' :
                         comparisonType === 'previous-period' ? 'vs previous period' :
                         'vs last year | Strong improvement'}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="text-2xl font-bold text-orange-700">
                        ↘ {comparisonType === 'industry-benchmark' ? '8%' : comparisonType === 'previous-period' ? '5%' : '↗ 12%'}
                      </div>
                      <div className="text-sm text-orange-600">Page Load Time</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {comparisonType === 'industry-benchmark' ? 'Industry avg: -5% | 45th percentile' :
                         comparisonType === 'previous-period' ? 'vs previous period | Needs attention' :
                         'vs last year | Improved performance'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* GA4 Data Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
                  <TabsTrigger value="audience">Audience</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Website Overview {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Pageviews</div>
                              <div className="text-2xl font-bold">{formatNumber(metrics.pageviews)}</div>
                              <div className="text-sm text-green-600">
                                {comparisonType === 'industry-benchmark' ? '+22% vs industry avg' :
                                 comparisonType === 'previous-period' ? '+15.2% vs previous period' :
                                 '+38% vs last year'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Unique Pageviews</div>
                              <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.78))}</div>
                              <div className="text-sm text-green-600">
                                {comparisonType === 'industry-benchmark' ? '+18% vs industry avg' :
                                 comparisonType === 'previous-period' ? '+12.8% vs previous period' :
                                 '+31% vs last year'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Pages / Session</div>
                              <div className="text-2xl font-bold">{(metrics.pageviews / metrics.sessions).toFixed(1)}</div>
                              <div className="text-sm text-green-600">
                                {comparisonType === 'industry-benchmark' ? '+0.8 vs industry avg (2.0)' :
                                 comparisonType === 'previous-period' ? '+0.3 vs previous period' :
                                 '+1.2 vs last year'}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Exit Rate</div>
                              <div className="text-2xl font-bold">52.4%</div>
                              <div className="text-sm text-green-600">
                                {comparisonType === 'industry-benchmark' ? '-5.8% vs industry avg (58.2%)' :
                                 comparisonType === 'previous-period' ? '-2.1% vs previous period' :
                                 '-8.6% vs last year'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="acquisition" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Acquisition {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Organic Search</div>
                          <div className="text-2xl font-bold">45.2%</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+8.2% vs industry avg (37%)' :
                             comparisonType === 'previous-period' ? '+2.1% vs previous period' :
                             '+12.5% vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Direct</div>
                          <div className="text-2xl font-bold">28.7%</div>
                          <div className="text-xs text-red-600">
                            {comparisonType === 'industry-benchmark' ? '-2.8% vs industry avg (31.5%)' :
                             comparisonType === 'previous-period' ? '-1.4% vs previous period' :
                             '+3.2% vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Social Media</div>
                          <div className="text-2xl font-bold">15.3%</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+3.8% vs industry avg (11.5%)' :
                             comparisonType === 'previous-period' ? '+4.2% vs previous period' :
                             '+8.7% vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Paid Search</div>
                          <div className="text-2xl font-bold">10.8%</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '-9.2% vs industry avg (20%)' :
                             comparisonType === 'previous-period' ? '+1.8% vs previous period' :
                             '+5.1% vs last year'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Channels Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { channel: 'Google Organic', users: Math.round(metrics.users * 0.452), sessions: Math.round(metrics.sessions * 0.452), conversion: 2.8, benchmark: comparisonType === 'industry-benchmark' ? 2.3 : comparisonType === 'previous-period' ? 2.6 : 2.1 },
                          { channel: 'Direct', users: Math.round(metrics.users * 0.287), sessions: Math.round(metrics.sessions * 0.287), conversion: 3.1, benchmark: comparisonType === 'industry-benchmark' ? 2.9 : comparisonType === 'previous-period' ? 3.0 : 2.7 },
                          { channel: 'Facebook', users: Math.round(metrics.users * 0.102), sessions: Math.round(metrics.sessions * 0.102), conversion: 1.9, benchmark: comparisonType === 'industry-benchmark' ? 1.7 : comparisonType === 'previous-period' ? 1.8 : 1.5 },
                          { channel: 'Google Ads', users: Math.round(metrics.users * 0.108), sessions: Math.round(metrics.sessions * 0.108), conversion: 4.2, benchmark: comparisonType === 'industry-benchmark' ? 3.8 : comparisonType === 'previous-period' ? 4.0 : 3.5 }
                        ].map((channel, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{channel.channel}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatNumber(channel.users)} users • {formatNumber(channel.sessions)} sessions
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{channel.conversion}%</div>
                              <div className="text-sm text-muted-foreground">conversion rate</div>
                              <div className="text-xs text-green-600">
                                +{((channel.conversion - channel.benchmark) / channel.benchmark * 100).toFixed(1)}% {comparisonType === 'industry-benchmark' ? 'vs industry' : comparisonType === 'previous-period' ? 'vs previous' : 'vs last year'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Media Mix Section in Acquisition */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-purple-600" />
                        Media Mix Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Organic Search</span>
                            <span className="text-sm text-green-600">↗ Increase</span>
                          </div>
                          <div className="text-lg font-bold">45% → 52%</div>
                          <div className="text-xs text-muted-foreground">Best performing channel vs benchmark</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Paid Social</span>
                            <span className="text-sm text-orange-600">→ Maintain</span>
                          </div>
                          <div className="text-lg font-bold">25% → 25%</div>
                          <div className="text-xs text-muted-foreground">At industry benchmark</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Display</span>
                            <span className="text-sm text-red-600">↘ Decrease</span>
                          </div>
                          <div className="text-lg font-bold">30% → 23%</div>
                          <div className="text-xs text-muted-foreground">Underperforming vs benchmark</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audience" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audience Demographics {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-4">Age Groups</h4>
                          <div className="space-y-3">
                            {[
                              { age: '18-24', percentage: 15.2, benchmark: comparisonType === 'industry-benchmark' ? 18.5 : comparisonType === 'previous-period' ? 14.8 : 13.6 },
                              { age: '25-34', percentage: 32.8, benchmark: comparisonType === 'industry-benchmark' ? 29.2 : comparisonType === 'previous-period' ? 31.9 : 30.1 },
                              { age: '35-44', percentage: 28.1, benchmark: comparisonType === 'industry-benchmark' ? 26.8 : comparisonType === 'previous-period' ? 28.5 : 27.2 },
                              { age: '45-54', percentage: 16.4, benchmark: comparisonType === 'industry-benchmark' ? 17.2 : comparisonType === 'previous-period' ? 16.8 : 18.1 },
                              { age: '55+', percentage: 7.5, benchmark: comparisonType === 'industry-benchmark' ? 8.3 : comparisonType === 'previous-period' ? 8.0 : 11.0 }
                            ].map((group, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{group.age}</span>
                                <div className="flex items-center gap-2 flex-1 ml-4">
                                  <Progress value={group.percentage} className="flex-1" />
                                  <span className="text-sm font-medium w-12">{group.percentage}%</span>
                                  <span className="text-xs text-muted-foreground w-16">
                                    {((group.percentage - group.benchmark) >= 0 ? '+' : '')}
                                    {(group.percentage - group.benchmark).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-4">Device Categories</h4>
                          <div className="space-y-3">
                            {[
                              { device: 'Desktop', percentage: 42.3, benchmark: comparisonType === 'industry-benchmark' ? 46.8 : comparisonType === 'previous-period' ? 43.1 : 48.2 },
                              { device: 'Mobile', percentage: 51.7, benchmark: comparisonType === 'industry-benchmark' ? 47.2 : comparisonType === 'previous-period' ? 50.9 : 45.8 },
                              { device: 'Tablet', percentage: 6.0, benchmark: comparisonType === 'industry-benchmark' ? 6.0 : comparisonType === 'previous-period' ? 6.0 : 6.0 }
                            ].map((device, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{device.device}</span>
                                <div className="flex items-center gap-2 flex-1 ml-4">
                                  <Progress value={device.percentage} className="flex-1" />
                                  <span className="text-sm font-medium w-12">{device.percentage}%</span>
                                  <span className="text-xs text-muted-foreground w-16">
                                    {((device.percentage - device.benchmark) >= 0 ? '+' : '')}
                                    {(device.percentage - device.benchmark).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { country: 'United States', users: Math.round(metrics.users * 0.423), percentage: 42.3 },
                          { country: 'United Kingdom', users: Math.round(metrics.users * 0.156), percentage: 15.6 },
                          { country: 'Canada', users: Math.round(metrics.users * 0.098), percentage: 9.8 },
                          { country: 'Australia', users: Math.round(metrics.users * 0.067), percentage: 6.7 },
                          { country: 'Germany', users: Math.round(metrics.users * 0.054), percentage: 5.4 }
                        ].map((country, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{country.country}</div>
                              <div className="text-sm text-muted-foreground">{formatNumber(country.users)} users</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{country.percentage}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="engagement" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Engagement Metrics {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Pages per Session</div>
                          <div className="text-2xl font-bold">2.8</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+0.5 vs industry avg (2.3)' :
                             comparisonType === 'previous-period' ? '+0.3 vs previous period' :
                             '+0.8 vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Avg Time on Page</div>
                          <div className="text-2xl font-bold">1m 42s</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+12s vs industry avg (1m 30s)' :
                             comparisonType === 'previous-period' ? '+8s vs previous period' :
                             '+28s vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Return Visitors</div>
                          <div className="text-2xl font-bold">28.4%</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+3.8% vs industry avg (24.6%)' :
                             comparisonType === 'previous-period' ? '+2.1% vs previous period' :
                             '+5.9% vs last year'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Pages by Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { page: '/product/analytics-dashboard', views: Math.round(metrics.pageviews * 0.18), time: '3m 24s', benchmark: comparisonType === 'industry-benchmark' ? '2m 58s' : comparisonType === 'previous-period' ? '3m 16s' : '2m 48s' },
                          { page: '/pricing', views: Math.round(metrics.pageviews * 0.15), time: '2m 56s', benchmark: comparisonType === 'industry-benchmark' ? '2m 31s' : comparisonType === 'previous-period' ? '2m 48s' : '2m 22s' },
                          { page: '/features', views: Math.round(metrics.pageviews * 0.12), time: '2m 31s', benchmark: comparisonType === 'industry-benchmark' ? '2m 18s' : comparisonType === 'previous-period' ? '2m 28s' : '2m 09s' },
                          { page: '/blog/marketing-insights', views: Math.round(metrics.pageviews * 0.09), time: '4m 12s', benchmark: comparisonType === 'industry-benchmark' ? '3m 45s' : comparisonType === 'previous-period' ? '3m 58s' : '3m 31s' },
                          { page: '/contact', views: Math.round(metrics.pageviews * 0.08), time: '1m 47s', benchmark: comparisonType === 'industry-benchmark' ? '1m 32s' : comparisonType === 'previous-period' ? '1m 41s' : '1m 28s' }
                        ].map((page, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{page.page}</div>
                              <div className="text-xs text-muted-foreground">{formatNumber(page.views)} pageviews</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{page.time}</div>
                              <div className="text-xs text-muted-foreground">avg time</div>
                              <div className="text-xs text-green-600">
                                +{((parseInt(page.time.split('m')[0]) * 60 + parseInt(page.time.split('m')[1])) - (parseInt(page.benchmark.split('m')[0]) * 60 + parseInt(page.benchmark.split('m')[1]))).toString()}s {comparisonType === 'industry-benchmark' ? 'vs industry' : comparisonType === 'previous-period' ? 'vs previous' : 'vs last year'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Events Tracking {comparisonType === 'industry-benchmark' ? 'vs Industry' : comparisonType === 'previous-period' ? 'vs Previous Period' : 'vs Previous Year'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Button Clicks</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.42))}</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+25% vs industry' :
                             comparisonType === 'previous-period' ? '+15.3% vs previous period' :
                             '+42% vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Form Submissions</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.08))}</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+18% vs industry' :
                             comparisonType === 'previous-period' ? '+8.7% vs previous period' :
                             '+31% vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Download Events</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.05))}</div>
                          <div className="text-xs text-red-600">
                            {comparisonType === 'industry-benchmark' ? '-8% vs industry' :
                             comparisonType === 'previous-period' ? '-2.1% vs previous period' :
                             '+12% vs last year'}
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Video Plays</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.12))}</div>
                          <div className="text-xs text-green-600">
                            {comparisonType === 'industry-benchmark' ? '+35% vs industry' :
                             comparisonType === 'previous-period' ? '+23.8% vs previous period' :
                             '+67% vs last year'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { event: 'CTA Button Click', count: Math.round(metrics.pageviews * 0.28), conversion: 12.4, benchmark: comparisonType === 'industry-benchmark' ? 9.8 : comparisonType === 'previous-period' ? 10.9 : 8.7 },
                          { event: 'Newsletter Signup', count: Math.round(metrics.pageviews * 0.06), conversion: 8.9, benchmark: comparisonType === 'industry-benchmark' ? 6.2 : comparisonType === 'previous-period' ? 8.1 : 6.8 },
                          { event: 'Product Demo Request', count: Math.round(metrics.pageviews * 0.04), conversion: 24.7, benchmark: comparisonType === 'industry-benchmark' ? 18.3 : comparisonType === 'previous-period' ? 22.1 : 19.4 },
                          { event: 'Free Trial Start', count: Math.round(metrics.pageviews * 0.03), conversion: 31.2, benchmark: comparisonType === 'industry-benchmark' ? 26.8 : comparisonType === 'previous-period' ? 28.9 : 24.1 },
                          { event: 'Contact Form Submit', count: Math.round(metrics.pageviews * 0.02), conversion: 18.6, benchmark: comparisonType === 'industry-benchmark' ? 14.2 : comparisonType === 'previous-period' ? 17.1 : 15.8 }
                        ].map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{event.event}</div>
                              <div className="text-sm text-muted-foreground">{formatNumber(event.count)} events</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{event.conversion}%</div>
                              <div className="text-sm text-muted-foreground">conversion</div>
                              <div className="text-xs text-green-600">
                                +{((event.conversion - event.benchmark) / event.benchmark * 100).toFixed(1)}% {comparisonType === 'industry-benchmark' ? 'vs industry' : comparisonType === 'previous-period' ? 'vs previous' : 'vs last year'}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Pivot Table Section */}
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Custom Pivot Table
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button onClick={exportPivotTableAsCSV} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button onClick={exportPivotTableAsPDF} variant="outline" size="sm">
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

                    {/* Pagination Controls - Separate from table configuration */}
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
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <RefreshCw className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
                <p className="text-muted-foreground mb-6">
                  Unable to load analytics data. Please try syncing your data or check your integration settings.
                </p>
                <Button onClick={syncData} disabled={syncing}>
                  {syncing ? 'Syncing...' : 'Sync Data'}
                </Button>
              </CardContent>
            </Card>
          )}
    </div>
  );
}