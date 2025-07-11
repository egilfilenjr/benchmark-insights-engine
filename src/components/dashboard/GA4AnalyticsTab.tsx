import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, MousePointer, Clock, Target, Zap, RefreshCw, Calendar, Lightbulb, PieChart } from 'lucide-react';
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

  const getComparisonData = (metric: keyof GA4Metrics['previousPeriod']) => {
    if (!metrics) return { value: 0, change: 0, isPositive: true };
    
    let previousValue: number;
    let changeLabel: string;
    
    switch (comparisonType) {
      case 'previous-period':
        previousValue = metrics.previousPeriod[metric];
        changeLabel = 'vs last period';
        break;
      case 'previous-year':
        previousValue = metrics.previousYear[metric];
        changeLabel = 'vs last year';
        break;
      case 'industry-benchmark':
        // For industry benchmark, we'll use benchmark data
        const benchmark = benchmarks.find(b => b.metric.toLowerCase().includes(metric.toString().toLowerCase()));
        if (benchmark) {
          const change = ((metrics[metric as keyof GA4Metrics] as number - benchmark.benchmarkMedian) / benchmark.benchmarkMedian) * 100;
          return {
            value: benchmark.benchmarkMedian,
            change: change,
            isPositive: change >= 0,
            label: 'vs industry median'
          };
        }
        previousValue = metrics.previousPeriod[metric];
        changeLabel = 'vs last period';
        break;
      default:
        previousValue = metrics.previousPeriod[metric];
        changeLabel = 'vs last period';
    }
    
    const change = calculatePercentageChange(metrics[metric as keyof GA4Metrics] as number, previousValue);
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
          <Select value={comparisonType} onValueChange={(value: 'previous-period' | 'previous-year' | 'industry-benchmark') => setComparisonType(value)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous-period">vs Previous Period</SelectItem>
              <SelectItem value="previous-year">vs Previous Year</SelectItem>
              <SelectItem value="industry-benchmark">vs Industry Benchmark</SelectItem>
            </SelectContent>
          </Select>
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
        </div>
      </div>

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
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-muted-foreground">Users</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">{formatNumber(metrics.users)}</div>
                      {(() => {
                        const comparison = getComparisonData('users');
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

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <MousePointer className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-muted-foreground">Sessions</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">{formatNumber(metrics.sessions)}</div>
                      {(() => {
                        const comparison = getComparisonData('sessions');
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

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <span className="text-sm text-muted-foreground">Avg Session Duration</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">{formatDuration(metrics.avgSessionDuration)}</div>
                      {(() => {
                        const comparison = getComparisonData('avgSessionDuration');
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

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
                      {(() => {
                        const comparison = getComparisonData('conversionRate');
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
                    AI Recommendations
                    <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full">PRO+</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-blue-900">Improve Mobile Experience</h4>
                          <p className="text-sm text-blue-700 mt-1">Your mobile bounce rate (48.2%) is above industry average (45%). Consider optimizing page load speeds and mobile navigation.</p>
                          <div className="text-xs text-blue-600 mt-2">Impact: +15% potential session duration</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <div>
                          <h4 className="font-medium text-green-900">Expand High-Performing Content</h4>
                          <p className="text-sm text-green-700 mt-1">Your blog content shows 85th percentile engagement. Create more similar content to drive organic growth.</p>
                          <div className="text-xs text-green-600 mt-2">Impact: +25% potential organic traffic</div>
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
                    Growth Opportunities
                    <span className="text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full">PRO+</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <h4 className="font-medium">Underperforming Pages</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">3 pages have high traffic but low engagement</p>
                      <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Revenue potential: $2,400/month</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <h4 className="font-medium">Traffic Source Gap</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Low social media referrals vs industry</p>
                      <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Traffic potential: +35%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trends Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Performance Trends vs Industry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-2xl font-bold text-green-700">↗ 23%</div>
                      <div className="text-sm text-green-600">Sessions vs Last Month</div>
                      <div className="text-xs text-muted-foreground mt-1">Industry avg: +18% | 78th percentile</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-2xl font-bold text-blue-700">↗ 15%</div>
                      <div className="text-sm text-blue-600">Conversion Rate</div>
                      <div className="text-xs text-muted-foreground mt-1">Industry avg: +12% | 65th percentile</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="text-2xl font-bold text-orange-700">↘ 8%</div>
                      <div className="text-sm text-orange-600">Page Load Time</div>
                      <div className="text-xs text-muted-foreground mt-1">Industry avg: -5% | 45th percentile</div>
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
                        Website Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Pageviews</div>
                              <div className="text-2xl font-bold">{formatNumber(metrics.pageviews)}</div>
                              <div className="text-sm text-green-600">+15.2% vs last period</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Unique Pageviews</div>
                              <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.78))}</div>
                              <div className="text-sm text-green-600">+12.8% vs last period</div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Pages / Session</div>
                              <div className="text-2xl font-bold">{(metrics.pageviews / metrics.sessions).toFixed(1)}</div>
                              <div className="text-sm text-green-600">+0.3 vs last period</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <div className="text-sm text-muted-foreground">Exit Rate</div>
                              <div className="text-2xl font-bold">52.4%</div>
                              <div className="text-sm text-green-600">-2.1% vs last period</div>
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
                      <CardTitle>Traffic Acquisition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Organic Search</div>
                          <div className="text-2xl font-bold">45.2%</div>
                          <div className="text-xs text-green-600">+2.1% vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Direct</div>
                          <div className="text-2xl font-bold">28.7%</div>
                          <div className="text-xs text-red-600">-1.4% vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Social Media</div>
                          <div className="text-2xl font-bold">15.3%</div>
                          <div className="text-xs text-green-600">+4.2% vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Paid Search</div>
                          <div className="text-2xl font-bold">10.8%</div>
                          <div className="text-xs text-green-600">+1.8% vs last period</div>
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
                          { channel: 'Google Organic', users: Math.round(metrics.users * 0.452), sessions: Math.round(metrics.sessions * 0.452), conversion: 2.8 },
                          { channel: 'Direct', users: Math.round(metrics.users * 0.287), sessions: Math.round(metrics.sessions * 0.287), conversion: 3.1 },
                          { channel: 'Facebook', users: Math.round(metrics.users * 0.102), sessions: Math.round(metrics.sessions * 0.102), conversion: 1.9 },
                          { channel: 'Google Ads', users: Math.round(metrics.users * 0.108), sessions: Math.round(metrics.sessions * 0.108), conversion: 4.2 }
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
                      <CardTitle>Audience Demographics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-4">Age Groups</h4>
                          <div className="space-y-3">
                            {[
                              { age: '18-24', percentage: 15.2 },
                              { age: '25-34', percentage: 32.8 },
                              { age: '35-44', percentage: 28.1 },
                              { age: '45-54', percentage: 16.4 },
                              { age: '55+', percentage: 7.5 }
                            ].map((group, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{group.age}</span>
                                <div className="flex items-center gap-2 flex-1 ml-4">
                                  <Progress value={group.percentage} className="flex-1" />
                                  <span className="text-sm font-medium w-12">{group.percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-4">Device Categories</h4>
                          <div className="space-y-3">
                            {[
                              { device: 'Desktop', percentage: 42.3 },
                              { device: 'Mobile', percentage: 51.7 },
                              { device: 'Tablet', percentage: 6.0 }
                            ].map((device, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{device.device}</span>
                                <div className="flex items-center gap-2 flex-1 ml-4">
                                  <Progress value={device.percentage} className="flex-1" />
                                  <span className="text-sm font-medium w-12">{device.percentage}%</span>
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
                      <CardTitle>User Engagement Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Pages per Session</div>
                          <div className="text-2xl font-bold">2.8</div>
                          <div className="text-xs text-green-600">+0.3 vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Avg Time on Page</div>
                          <div className="text-2xl font-bold">1m 42s</div>
                          <div className="text-xs text-green-600">+8s vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Return Visitors</div>
                          <div className="text-2xl font-bold">28.4%</div>
                          <div className="text-xs text-green-600">+2.1% vs last period</div>
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
                          { page: '/product/analytics-dashboard', views: Math.round(metrics.pageviews * 0.18), time: '3m 24s' },
                          { page: '/pricing', views: Math.round(metrics.pageviews * 0.15), time: '2m 56s' },
                          { page: '/features', views: Math.round(metrics.pageviews * 0.12), time: '2m 31s' },
                          { page: '/blog/marketing-insights', views: Math.round(metrics.pageviews * 0.09), time: '4m 12s' },
                          { page: '/contact', views: Math.round(metrics.pageviews * 0.08), time: '1m 47s' }
                        ].map((page, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{page.page}</div>
                              <div className="text-xs text-muted-foreground">{formatNumber(page.views)} pageviews</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{page.time}</div>
                              <div className="text-xs text-muted-foreground">avg time</div>
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
                      <CardTitle>Custom Events Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Button Clicks</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.42))}</div>
                          <div className="text-xs text-green-600">+15.3% vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Form Submissions</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.08))}</div>
                          <div className="text-xs text-green-600">+8.7% vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Download Events</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.05))}</div>
                          <div className="text-xs text-red-600">-2.1% vs last period</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-sm text-muted-foreground">Video Plays</div>
                          <div className="text-2xl font-bold">{formatNumber(Math.round(metrics.pageviews * 0.12))}</div>
                          <div className="text-xs text-green-600">+23.8% vs last period</div>
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
                          { event: 'CTA Button Click', count: Math.round(metrics.pageviews * 0.28), conversion: 12.4 },
                          { event: 'Newsletter Signup', count: Math.round(metrics.pageviews * 0.06), conversion: 8.9 },
                          { event: 'Product Demo Request', count: Math.round(metrics.pageviews * 0.04), conversion: 24.7 },
                          { event: 'Free Trial Start', count: Math.round(metrics.pageviews * 0.03), conversion: 31.2 },
                          { event: 'Contact Form Submit', count: Math.round(metrics.pageviews * 0.02), conversion: 18.6 }
                        ].map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">{event.event}</div>
                              <div className="text-sm text-muted-foreground">{formatNumber(event.count)} events</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{event.conversion}%</div>
                              <div className="text-sm text-muted-foreground">conversion</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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