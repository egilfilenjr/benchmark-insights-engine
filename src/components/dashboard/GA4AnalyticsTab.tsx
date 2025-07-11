import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, MousePointer, Clock, Target, Zap, RefreshCw, Calendar } from 'lucide-react';
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
  const [comparisonType, setComparisonType] = useState<'previous-period' | 'previous-year' | 'industry-benchmark'>('previous-period');

  useEffect(() => {
    if (integration && user?.id) {
      loadGA4Data();
      loadBenchmarkComparisons();
    }
  }, [integration, user?.id]);

  const loadGA4Data = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // In a real implementation, this would fetch actual GA4 data
      // For now, we'll use mock data
      const mockMetrics: GA4Metrics = {
        sessions: 12458,
        users: 8934,
        pageviews: 24891,
        bounceRate: 58.2,
        avgSessionDuration: 142,
        conversionRate: 2.4,
        ecommerceConversionRate: 1.8,
        revenue: 45789,
        goalCompletions: 299,
        newUserRate: 71.6,
        previousPeriod: {
          sessions: 11145,
          users: 7982,
          pageviews: 22134,
          bounceRate: 60.1,
          avgSessionDuration: 147,
          conversionRate: 2.1,
          goalCompletions: 251,
          newUserRate: 69.8
        },
        previousYear: {
          sessions: 10234,
          users: 7123,
          pageviews: 19876,
          bounceRate: 62.8,
          avgSessionDuration: 134,
          conversionRate: 1.9,
          goalCompletions: 189,
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
            <Select value={dateRange} onValueChange={setDateRange}>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                      <span className="font-semibold">{metrics.bounceRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pageviews</span>
                      <span className="font-semibold">{formatNumber(metrics.pageviews)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New User Rate</span>
                      <span className="font-semibold">{metrics.newUserRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Goal Completions</span>
                      <span className="font-semibold">{metrics.goalCompletions}</span>
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
                        <span className="font-semibold">${formatNumber(metrics.revenue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Ecommerce Conversion Rate</span>
                        <span className="font-semibold">{metrics.ecommerceConversionRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Revenue per User</span>
                        <span className="font-semibold">${(metrics.revenue / metrics.users).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          ) : null}
        </TabsContent>


        <TabsContent value="conversions">
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Conversion Analytics</h3>
              <p className="text-muted-foreground">
                Goal completions and conversion funnel analysis will be shown here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}