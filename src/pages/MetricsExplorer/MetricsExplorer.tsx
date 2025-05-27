
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DateRangeSelector from '@/components/dashboard/DateRangeSelector';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserProfile } from '@/hooks/useUserProfile';
import { subDays } from 'date-fns';

interface MetricData {
  id: string;
  metric_name: string;
  metric_value: number;
  source: 'GA4' | 'Campaign' | 'Snapshot';
  date: string;
  benchmark_value?: number;
}

export default function MetricsExplorer() {
  const { user } = useUserProfile();
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    source: 'All',
    metricType: 'All',
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date()
    }
  });

  const [selectedMetric, setSelectedMetric] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      loadMetrics();
    }
  }, [user?.id, filters]);

  const loadMetrics = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // Load campaign metrics since analytics_snapshots table doesn't exist yet
      const { data: campaignData } = await supabase
        .from('campaigns')
        .select('id, campaign_name, cpa, roas, ctr, created_at')
        .eq('team_id', user.id);

      // Transform campaign data to metrics format
      const transformedMetrics: MetricData[] = (campaignData || []).flatMap(campaign => [
        {
          id: `${campaign.id}-cpa`,
          metric_name: 'CPA',
          metric_value: campaign.cpa || 0,
          source: 'Campaign' as const,
          date: campaign.created_at,
        },
        {
          id: `${campaign.id}-roas`,
          metric_name: 'ROAS',
          metric_value: campaign.roas || 0,
          source: 'Campaign' as const,
          date: campaign.created_at,
        },
        {
          id: `${campaign.id}-ctr`,
          metric_name: 'CTR',
          metric_value: campaign.ctr || 0,
          source: 'Campaign' as const,
          date: campaign.created_at,
        }
      ]);

      // Add some mock GA4 metrics for demonstration
      const mockGA4Metrics: MetricData[] = [
        {
          id: 'ga4-sessions',
          metric_name: 'Sessions',
          metric_value: 1250,
          source: 'GA4' as const,
          date: new Date().toISOString(),
          benchmark_value: 1100
        },
        {
          id: 'ga4-bounce-rate',
          metric_name: 'Bounce Rate',
          metric_value: 0.35,
          source: 'GA4' as const,
          date: new Date().toISOString(),
          benchmark_value: 0.42
        },
        {
          id: 'ga4-conversion-rate',
          metric_name: 'Conversion Rate',
          metric_value: 0.028,
          source: 'GA4' as const,
          date: new Date().toISOString(),
          benchmark_value: 0.025
        }
      ];

      setMetrics([...transformedMetrics, ...mockGA4Metrics]);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUniqueMetricTypes = () => {
    const types = [...new Set(metrics.map(m => m.metric_name))];
    return types;
  };

  const getFilteredMetrics = () => {
    return metrics.filter(metric => {
      if (filters.source !== 'All' && metric.source !== filters.source) return false;
      if (filters.metricType !== 'All' && metric.metric_name !== filters.metricType) return false;
      
      const metricDate = new Date(metric.date);
      if (metricDate < filters.dateRange.from || metricDate > filters.dateRange.to) return false;
      
      return true;
    });
  };

  const getChartData = () => {
    if (!selectedMetric) return [];
    
    const filteredData = getFilteredMetrics().filter(m => m.metric_name === selectedMetric);
    return filteredData.map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      value: item.metric_value,
      benchmark: item.benchmark_value || 0,
      source: item.source
    }));
  };

  const metricTypes = getUniqueMetricTypes();
  const filteredMetrics = getFilteredMetrics();
  const chartData = getChartData();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Metrics Explorer</h1>
            <p className="text-muted-foreground">
              Explore and compare your GA4 and campaign performance metrics
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Source</label>
                <Select value={filters.source} onValueChange={(value) => setFilters(prev => ({ ...prev, source: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sources</SelectItem>
                    <SelectItem value="GA4">Google Analytics</SelectItem>
                    <SelectItem value="Campaign">Campaigns</SelectItem>
                    <SelectItem value="Snapshot">Snapshots</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Metric Type</label>
                <Select value={filters.metricType} onValueChange={(value) => setFilters(prev => ({ ...prev, metricType: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Metrics</SelectItem>
                    {metricTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <DateRangeSelector 
                  onDateRangeChange={(range) => setFilters(prev => ({ ...prev, dateRange: range }))}
                  initialDateRange={filters.dateRange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metricTypes.slice(0, 6).map(metricType => {
            const typeMetrics = filteredMetrics.filter(m => m.metric_name === metricType);
            const avgValue = typeMetrics.length > 0 
              ? typeMetrics.reduce((sum, m) => sum + m.metric_value, 0) / typeMetrics.length 
              : 0;
            const sources = [...new Set(typeMetrics.map(m => m.source))];

            return (
              <Card 
                key={metricType} 
                className={`cursor-pointer transition-colors ${selectedMetric === metricType ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedMetric(metricType)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{metricType}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgValue.toFixed(2)}</div>
                  <div className="flex gap-1 mt-2">
                    {sources.map(source => (
                      <Badge key={source} variant="outline" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {typeMetrics.length} data points
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart */}
        {selectedMetric && chartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedMetric} Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Your Value" />
                  <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" strokeDasharray="5 5" name="Benchmark" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Metrics Data ({filteredMetrics.length} items)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading metrics...</div>
            ) : filteredMetrics.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No metrics found for the selected filters
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Metric</th>
                      <th className="text-left p-2">Value</th>
                      <th className="text-left p-2">Source</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMetrics.slice(0, 50).map(metric => (
                      <tr key={metric.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{metric.metric_name}</td>
                        <td className="p-2">{metric.metric_value.toFixed(2)}</td>
                        <td className="p-2">
                          <Badge variant="outline">{metric.source}</Badge>
                        </td>
                        <td className="p-2">{new Date(metric.date).toLocaleDateString()}</td>
                        <td className="p-2">
                          {metric.benchmark_value ? metric.benchmark_value.toFixed(2) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
