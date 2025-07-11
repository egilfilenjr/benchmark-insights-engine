
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Users, MousePointer, Clock, Target, Zap, RefreshCw, Calendar, BarChart3, DollarSign, Filter, Settings } from 'lucide-react';
import { useGA4Integration } from '@/hooks/useGA4Integration';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function OverviewTab() {
  const { integration: ga4Integration, loading: ga4Loading } = useGA4Integration();
  const { user } = useUserProfile();
  const [dateRange, setDateRange] = useState('last-30-days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comparisonType, setComparisonType] = useState('previous-period');
  const [selectedMetrics, setSelectedMetrics] = useState(['bounce-rate', 'avg-session', 'conversion-rate', 'new-users']);

  // Available metrics for the Website Analytics Summary
  const availableMetrics = [
    { key: 'bounce-rate', label: 'Bounce Rate', value: '58.2%', change: '-5.3%', icon: TrendingDown, positive: false },
    { key: 'avg-session', label: 'Avg Session', value: '2m 22s', change: '+12.1%', icon: TrendingUp, positive: true },
    { key: 'conversion-rate', label: 'Conversion Rate', value: '2.4%', change: '+18.9%', icon: TrendingUp, positive: true },
    { key: 'new-users', label: 'New Users', value: '71.6%', change: '+7.2%', icon: TrendingUp, positive: true },
    { key: 'page-views', label: 'Page Views', value: '45.2K', change: '+15.4%', icon: TrendingUp, positive: true },
    { key: 'events', label: 'Events', value: '123.5K', change: '+22.8%', icon: TrendingUp, positive: true },
    { key: 'ecommerce-rate', label: 'Ecommerce Rate', value: '3.8%', change: '+11.3%', icon: TrendingUp, positive: true },
    { key: 'session-duration', label: 'Session Duration', value: '3m 45s', change: '+8.7%', icon: TrendingUp, positive: true }
  ];

  // Mock data for connected integrations
  const [integrations, setIntegrations] = useState([
    { name: 'Google Analytics 4', connected: !!ga4Integration, type: 'website' },
    { name: 'Google Ads', connected: false, type: 'advertising' },
    { name: 'Meta Ads', connected: false, type: 'advertising' },
    { name: 'LinkedIn Ads', connected: false, type: 'advertising' },
    { name: 'TikTok Ads', connected: false, type: 'advertising' }
  ]);

  useEffect(() => {
    setIntegrations(prev => prev.map(int => 
      int.name === 'Google Analytics 4' ? { ...int, connected: !!ga4Integration } : int
    ));
  }, [ga4Integration]);

  const connectedCount = integrations.filter(int => int.connected).length;
  const totalIntegrations = integrations.length;

  // Mock overview metrics (in real app, this would aggregate from all connected sources)
  const overviewMetrics = {
    totalSessions: 12458,
    totalUsers: 8934,
    totalRevenue: 45789,
    totalConversions: 299,
    adSpend: 0, // No ad platforms connected yet
    roas: 0,
    cpa: 0,
    ctr: 0
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    if (value !== 'custom') {
      setStartDate('');
      setEndDate('');
    }
  };

  const getComparisonText = () => {
    switch (comparisonType) {
      case 'industry-benchmark':
        return 'vs industry';
      case 'previous-year':
        return 'vs prev year';
      case 'previous-period':
      default:
        return 'vs prev period';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Unified view of all your connected marketing data sources
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
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={comparisonType} onValueChange={setComparisonType}>
              <SelectTrigger className="w-56 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-sm border shadow-lg">
                <SelectItem value="previous-period">vs Previous Period</SelectItem>
                <SelectItem value="previous-year">vs Previous Year</SelectItem>
                <SelectItem value="industry-benchmark">vs Industry Benchmark</SelectItem>
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
        </div>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Connected Data Sources
            <Badge variant={connectedCount > 0 ? "default" : "secondary"}>
              {connectedCount}/{totalIntegrations} connected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={(connectedCount / totalIntegrations) * 100} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${integration.connected ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <div className="font-medium text-sm">{integration.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{integration.type}</div>
                    </div>
                  </div>
                  <Badge variant={integration.connected ? "default" : "outline"} className="text-xs">
                    {integration.connected ? 'Connected' : 'Not connected'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Metrics */}
      {connectedCount > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-muted-foreground">Total Users</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{overviewMetrics.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.3% {getComparisonText()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <MousePointer className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{overviewMetrics.totalSessions.toLocaleString()}</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.7% {getComparisonText()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">${overviewMetrics.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.8% {getComparisonText()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-muted-foreground">Total Conversions</span>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{overviewMetrics.totalConversions}</div>
                  <div className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +22.1% {getComparisonText()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {ga4Integration && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Website Analytics Summary
                  <div className="flex items-center gap-2">
                    <Select value={selectedMetrics.join(',')} onValueChange={(value) => setSelectedMetrics(value.split(','))}>
                      <SelectTrigger className="w-48">
                        <Settings className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Customize metrics" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMetrics.map((metric) => (
                          <SelectItem key={metric.key} value={metric.key}>
                            {metric.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard?tab=ga4-analytics'}>
                      View Details
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Recent data from Google Analytics 4: {ga4Integration.property_name}
                </p>
                <div className={`grid gap-4 ${selectedMetrics.length === 4 ? 'grid-cols-2 md:grid-cols-4' : selectedMetrics.length === 3 ? 'grid-cols-1 md:grid-cols-3' : selectedMetrics.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {availableMetrics
                    .filter(metric => selectedMetrics.includes(metric.key))
                    .map((metric) => {
                      const IconComponent = metric.icon;
                      return (
                        <div key={metric.key} className="text-center p-4 border rounded-lg">
                          <div className="text-2xl font-bold mb-1">{metric.value}</div>
                          <div className="text-xs text-muted-foreground mb-2">{metric.label}</div>
                          <div className={`text-xs flex items-center justify-center ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                            <IconComponent className="h-3 w-3 mr-1" />
                            {metric.change} {getComparisonText()}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Data Sources Connected</h3>
            <p className="text-muted-foreground mb-6">
              Connect your marketing platforms to see unified analytics and insights.
            </p>
            <Button onClick={() => window.location.href = '/dashboard?tab=integrations'}>
              Connect Data Sources
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
