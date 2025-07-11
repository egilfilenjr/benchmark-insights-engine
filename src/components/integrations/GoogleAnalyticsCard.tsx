
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from '@/hooks/use-toast';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  ExternalLink,
  Clock,
  Database,
  BarChart3
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GoogleAnalyticsCardProps {
  integration?: {
    id: string;
    platform: string;
    provider: string;
    status: 'active' | 'error' | 'pending';
    account_id?: string;
    account_name?: string;
    connected_at?: string;
    last_synced_at?: string;
    expires_at?: string;
  };
  onRefresh: () => void;
}

export default function GoogleAnalyticsCard({ integration, onRefresh }: GoogleAnalyticsCardProps) {
  const { user } = useUserProfile();
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const isConnected = !!integration;
  const isExpired = integration?.expires_at && new Date(integration.expires_at) < new Date();

  const handleConnect = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please make sure you're logged in",
        variant: "destructive"
      });
      return;
    }

    setConnecting(true);
    console.log('🔗 Starting GA4 connection for user:', user.id);
    
    try {
      // Call the GA4 OAuth start edge function
      console.log('📡 Calling GA4 OAuth start function...');
      
      const { data, error } = await supabase.functions.invoke('oauth-google-analytics-start', {
        body: { 
          company_id: user.id, // Using user.id as company_id for now
          user_id: user.id 
        }
      });

      console.log('📡 Function response:', { data, error });

      if (error) {
        console.error('❌ Function invoke error:', error);
        throw error;
      }

      if (data?.auth_url) {
        console.log('✅ Opening OAuth popup...');
        
        // Open OAuth in a popup window
        const popup = window.open(
          data.auth_url,
          'google-oauth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          throw new Error('Popup blocked. Please allow popups for this site.');
        }

        // Listen for the popup to close (successful auth or user cancellation)
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            setConnecting(false);
            
            // Refresh the integrations to see if connection was successful
            setTimeout(() => {
              onRefresh();
            }, 1000);
          }
        }, 1000);

        // Handle successful OAuth callback via postMessage
        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'oauth-success') {
            clearInterval(checkClosed);
            popup.close();
            setConnecting(false);
            
            toast({
              title: "Connected!",
              description: "Google Analytics 4 has been connected successfully",
            });
            
            onRefresh();
          } else if (event.data.type === 'oauth-error') {
            clearInterval(checkClosed);
            popup.close();
            setConnecting(false);
            
            toast({
              title: "Connection Failed",
              description: event.data.message || "Failed to connect Google Analytics 4",
              variant: "destructive"
            });
          }
        };

        window.addEventListener('message', handleMessage);
        
        // Cleanup listener when component unmounts or popup closes
        return () => {
          window.removeEventListener('message', handleMessage);
          clearInterval(checkClosed);
        };
      } else {
        console.error('❌ No auth URL in response:', data);
        throw new Error('No auth URL returned from function');
      }
    } catch (error) {
      console.error('❌ GA4 connection error:', error);
      
      // More specific error messages
      let errorMessage = "Failed to start Google Analytics 4 connection";
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = "Network error: Unable to reach authentication service. Please try again.";
      } else if (error.message?.includes('Function not found')) {
        errorMessage = "Service temporarily unavailable. Please try again in a moment.";
      } else if (error.message?.includes('Popup blocked')) {
        errorMessage = "Popup blocked. Please allow popups for this site and try again.";
      }
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive"
      });
      setConnecting(false);
    }
  };

  const handleSync = async () => {
    if (!user?.id || !integration) return;

    setSyncing(true);
    try {
      const { error } = await supabase.functions.invoke('jobs/sync_ga4', {
        body: { 
          user_id: user.id,
          company_id: user.id,
          job_type: 'daily_delta'
        }
      });

      if (error) throw error;

      toast({
        title: "Sync Started",
        description: "Google Analytics 4 data sync initiated",
      });

      // Update the last_synced_at timestamp
      await supabase
        .from('oauth_accounts')
        .update({ last_synced_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('provider', 'google_analytics');

      onRefresh();
    } catch (error) {
      console.error('GA4 sync error:', error);
      toast({
        title: "Sync Failed",
        description: "Failed to sync Google Analytics 4 data",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!integration?.id) return;

    try {
      const { error } = await supabase
        .from('oauth_accounts')
        .delete()
        .eq('id', integration.id);

      if (error) throw error;

      toast({
        title: "Disconnected",
        description: "Google Analytics 4 has been disconnected",
      });

      onRefresh();
    } catch (error) {
      console.error('Error disconnecting GA4:', error);
      toast({
        title: "Error",
        description: "Failed to disconnect Google Analytics 4",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = () => {
    if (isExpired) {
      return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>;
    }
    
    if (!isConnected) {
      return <Badge variant="outline">Not Connected</Badge>;
    }
    
    switch (integration?.status) {
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

  return (
    <Card className={`hover:shadow-md transition-shadow ${!isConnected ? "opacity-75" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl"><BarChart3 className="w-6 h-6 text-orange-500" /></span>
            Google Analytics 4
          </CardTitle>
          {getStatusBadge()}
        </div>
        <p className="text-sm text-muted-foreground">
          Website traffic, user behavior, and conversion tracking
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {isConnected ? (
          <div className="space-y-3">
            {integration?.account_name && (
              <div className="text-sm">
                <span className="font-medium">Property:</span> {integration.account_name}
              </div>
            )}
            
            {integration?.connected_at && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Connected: {formatDistanceToNow(new Date(integration.connected_at), { addSuffix: true })}
              </div>
            )}

            {integration?.last_synced_at && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Database className="w-3 h-3" />
                Last synced: {formatDistanceToNow(new Date(integration.last_synced_at), { addSuffix: true })}
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSync}
                disabled={syncing}
              >
                {syncing && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
                Sync Data
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Alert>
              <AlertDescription>
                Connect your Google Analytics 4 property to sync website traffic data, user behavior metrics, and conversion tracking.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={handleConnect}
              disabled={connecting}
              className="w-full"
            >
              {connecting ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <ExternalLink className="w-4 h-4 mr-2" />
              )}
              Connect Google Analytics 4
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
