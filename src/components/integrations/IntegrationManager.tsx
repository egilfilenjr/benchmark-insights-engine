import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from '@/hooks/use-toast';
import GoogleAnalyticsCard from './GoogleAnalyticsCard';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  Clock,
  Database
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Integration {
  id: string;
  platform: string;
  provider: string;
  status: 'active' | 'error' | 'pending';
  access_token?: string;
  last_synced_at?: string;
  expires_at?: string;
  account_id?: string;
  account_name?: string;
  connected_at?: string;
}

interface IntegrationConfig {
  name: string;
  description: string;
  authUrl: string;
  icon: string;
  testDataGenerator: () => any;
}

const INTEGRATION_CONFIGS: Record<string, IntegrationConfig> = {
  google_analytics: {
    name: 'Google Analytics 4',
    description: 'Website traffic and conversion data',
    authUrl: '/auth/google-analytics',
    icon: '📊',
    testDataGenerator: () => ({
      sessions: Math.floor(Math.random() * 10000) + 5000,
      conversions: Math.floor(Math.random() * 500) + 100,
      bounce_rate: (Math.random() * 0.3 + 0.4).toFixed(2),
      avg_session_duration: Math.floor(Math.random() * 300) + 120
    })
  },
  google_ads: {
    name: 'Google Ads',
    description: 'Search and display advertising performance',
    authUrl: '/auth/google-ads',
    icon: '🎯',
    testDataGenerator: () => ({
      spend: Math.floor(Math.random() * 5000) + 1000,
      clicks: Math.floor(Math.random() * 1000) + 200,
      impressions: Math.floor(Math.random() * 50000) + 10000,
      ctr: (Math.random() * 0.05 + 0.02).toFixed(3),
      cpc: (Math.random() * 3 + 1).toFixed(2),
      conversions: Math.floor(Math.random() * 50) + 10
    })
  },
  meta_ads: {
    name: 'Meta Ads',
    description: 'Facebook and Instagram advertising',
    authUrl: '/auth/meta-ads',
    icon: '📱',
    testDataGenerator: () => ({
      spend: Math.floor(Math.random() * 3000) + 800,
      reach: Math.floor(Math.random() * 100000) + 20000,
      engagement: Math.floor(Math.random() * 5000) + 1000,
      cpm: (Math.random() * 15 + 5).toFixed(2),
      ctr: (Math.random() * 0.04 + 0.01).toFixed(3),
      conversions: Math.floor(Math.random() * 40) + 8
    })
  },
  linkedin_ads: {
    name: 'LinkedIn Ads',
    description: 'B2B professional network advertising',
    authUrl: '/auth/linkedin-ads',
    icon: '💼',
    testDataGenerator: () => ({
      spend: Math.floor(Math.random() * 2000) + 500,
      clicks: Math.floor(Math.random() * 200) + 50,
      impressions: Math.floor(Math.random() * 10000) + 2000,
      ctr: (Math.random() * 0.03 + 0.01).toFixed(3),
      cpc: (Math.random() * 8 + 3).toFixed(2),
      leads: Math.floor(Math.random() * 20) + 5
    })
  },
  tiktok_ads: {
    name: 'TikTok Ads',
    description: 'Short-form video advertising',
    authUrl: '/auth/tiktok-ads',
    icon: '🎵',
    testDataGenerator: () => ({
      spend: Math.floor(Math.random() * 1500) + 400,
      video_views: Math.floor(Math.random() * 200000) + 50000,
      engagement_rate: (Math.random() * 0.08 + 0.02).toFixed(3),
      cpm: (Math.random() * 12 + 3).toFixed(2),
      conversions: Math.floor(Math.random() * 30) + 6
    })
  }
};

export default function IntegrationManager() {
  const { user } = useUserProfile();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user?.id) {
      loadIntegrations();
    }
  }, [user?.id]);

  const loadIntegrations = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('oauth_accounts')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Transform the data to match our Integration interface
      const transformedData: Integration[] = (data || []).map(item => ({
        id: item.id,
        platform: item.platform,
        provider: item.provider || item.platform,
        status: (['active', 'error', 'pending'].includes(item.status) ? item.status : 'pending') as 'active' | 'error' | 'pending',
        access_token: item.access_token,
        last_synced_at: item.last_synced_at,
        expires_at: item.expires_at,
        account_id: item.account_id,
        account_name: item.account_name,
        connected_at: item.connected_at
      }));
      
      setIntegrations(transformedData);
    } catch (error) {
      console.error('Error loading integrations:', error);
      toast({
        title: "Error",
        description: "Failed to load integrations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (platform: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to connect integrations",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log(`🔗 Starting ${platform} connection for user:`, user.id);
      
      let functionName = '';
      switch (platform) {
        case 'google_analytics':
          functionName = 'oauth-google-analytics-start';
          break;
        case 'google_ads':
          functionName = 'oauth-google-ads-start';
          break;
        case 'meta_ads':
          functionName = 'oauth-meta-ads-start';
          break;
        default:
          throw new Error(`Unsupported platform: ${platform}`);
      }

      console.log('📡 Calling OAuth start function:', functionName);
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: {
          user_id: user.id,
          company_id: user.id // Using user ID as company ID for now
        }
      });

      console.log('📡 Function response:', { data, error });

      if (error) {
        console.error('❌ Function invoke error:', error);
        throw error;
      }

      if (data?.auth_url) {
        console.log('🚀 Redirecting to OAuth URL:', data.auth_url);
        window.location.href = data.auth_url;
      } else {
        throw new Error('No auth URL returned from function');
      }
    } catch (error) {
      console.error(`❌ ${platform} connection error:`, error);
      toast({
        title: "Connection Failed",
        description: `Failed to connect ${INTEGRATION_CONFIGS[platform]?.name}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const handleSync = async (platform: string) => {
    setSyncing(prev => ({ ...prev, [platform]: true }));

    try {
      const { data, error } = await supabase.functions.invoke('sync-campaign-data', {
        body: { user_id: user?.id, provider: platform }
      });

      if (error) throw error;

      toast({
        title: "Sync Completed",
        description: `${INTEGRATION_CONFIGS[platform]?.name} campaign data synced successfully`,
      });

      loadIntegrations();
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync campaign data and benchmarks",
        variant: "destructive"
      });
    } finally {
      setSyncing(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleLoadTestData = async (platform: string) => {
    const config = INTEGRATION_CONFIGS[platform];
    if (!config || !user?.id) return;

    try {
      const testData = config.testDataGenerator();
      
      // Store test data in metrics table using the correct schema
      const { error } = await supabase
        .from('metrics')
        .upsert({
          user_id: user.id,
          kpis: testData,
          campaigns: [],
          alerts: [],
          aecr: { score: 85, percentile: 78 },
          trends: [{ date: new Date().toISOString(), value: Math.random() * 100 }]
        });

      if (error) throw error;

      toast({
        title: "Test Data Loaded",
        description: `Sample ${config.name} data loaded to dashboard`,
      });

      // Refresh integrations to show updated sync time
      loadIntegrations();
    } catch (error) {
      console.error('Error loading test data:', error);
      toast({
        title: "Error",
        description: "Failed to load test data",
        variant: "destructive"
      });
    }
  };

  const handleDisconnect = async (integrationId: string, platform: string) => {
    try {
      const { error } = await supabase
        .from('oauth_accounts')
        .delete()
        .eq('id', integrationId);

      if (error) throw error;

      toast({
        title: "Disconnected",
        description: `${INTEGRATION_CONFIGS[platform]?.name} has been disconnected`,
      });

      loadIntegrations();
    } catch (error) {
      console.error('Error disconnecting:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect integration",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (integration: Integration) => {
    const isExpired = integration.expires_at && new Date(integration.expires_at) < new Date();
    
    if (isExpired) {
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>;
    }
    
    switch (integration.status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'error':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Error</Badge>;
      case 'pending':
        return <Badge variant="secondary"><AlertTriangle className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span>Loading integrations...</span>
      </div>
    );
  }

  // Get GA4 integration specifically
  const ga4Integration = integrations.find(i => i.provider === 'google_analytics' || i.platform === 'google_analytics');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Special GA4 Card */}
        <GoogleAnalyticsCard 
          integration={ga4Integration}
          onRefresh={loadIntegrations}
        />

        {/* Other integration cards */}
        {Object.entries(INTEGRATION_CONFIGS).filter(([platform]) => platform !== 'google_analytics').map(([platform, config]) => {
          const integration = integrations.find(i => i.provider === platform || i.platform === platform);
          const isConnected = !!integration;
          const isSyncing = syncing[platform];

          return (
            <Card key={platform} className={`hover:shadow-md transition-shadow ${!isConnected ? "opacity-75" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{config.icon}</span>
                    {config.name}
                  </CardTitle>
                  {isConnected && getStatusBadge(integration)}
                </div>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {isConnected ? (
                  <div className="space-y-3">
                    {integration.account_name && (
                      <div className="text-sm">
                        <span className="font-medium">Account:</span> {integration.account_name}
                      </div>
                    )}
                    
                    {integration.connected_at && (
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Connected: {formatDistanceToNow(new Date(integration.connected_at), { addSuffix: true })}
                      </div>
                    )}

                    {integration.last_synced_at && (
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        Last synced: {formatDistanceToNow(new Date(integration.last_synced_at), { addSuffix: true })}
                      </div>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSync(platform)}
                        disabled={isSyncing}
                      >
                        {isSyncing && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                        Sync Data
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleLoadTestData(platform)}
                      >
                        Load Test Data
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDisconnect(integration.id, platform)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Alert>
                      <AlertDescription>
                        Connect your {config.name} account to sync performance data and access real-time insights.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleConnect(platform)}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => handleLoadTestData(platform)}
                      >
                        Test Data
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {integrations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Integration Status</h3>
          <div className="text-sm text-muted-foreground">
            You have {integrations.filter(i => i.status === 'active').length} active integration(s) connected.
            {integrations.some(i => i.expires_at && new Date(i.expires_at) < new Date()) && (
              <span className="text-orange-600 ml-2">
                Some integrations may need re-authorization.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
