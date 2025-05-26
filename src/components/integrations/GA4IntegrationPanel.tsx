
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGA4Integration } from '@/hooks/useGA4Integration';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function GA4IntegrationPanel() {
  const {
    integration,
    properties,
    loading,
    syncing,
    fetchProperties,
    selectProperty,
    syncData,
    disconnect
  } = useGA4Integration();

  const [selectedPropertyId, setSelectedPropertyId] = useState('');

  useEffect(() => {
    if (integration?.property_id) {
      setSelectedPropertyId(integration.property_id);
    }
  }, [integration]);

  const handleConnect = () => {
    // Redirect to Google OAuth
    window.location.href = '/auth/google-analytics';
  };

  const handleSelectProperty = async () => {
    if (!selectedPropertyId) return;
    
    const selectedProperty = properties.find(p => p.propertyId === selectedPropertyId);
    if (selectedProperty) {
      await selectProperty(selectedPropertyId, selectedProperty.displayName);
    }
  };

  const getStatusBadge = () => {
    if (!integration) return <Badge variant="outline">Not Connected</Badge>;
    
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

  const formatLastSync = () => {
    if (!integration?.last_synced_at) return 'Never';
    return formatDistanceToNow(new Date(integration.last_synced_at), { addSuffix: true });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Google Analytics 4</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Google Analytics 4
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!integration ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your Google Analytics 4 property to sync website performance metrics.
            </p>
            <Button onClick={handleConnect} className="w-full">
              Connect Google Analytics
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Property Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Selected Property</label>
              {integration.property_id ? (
                <div className="p-2 bg-muted rounded text-sm">
                  {integration.property_name}
                </div>
              ) : (
                <div className="space-y-2">
                  <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a GA4 property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.propertyId} value={property.propertyId}>
                          {property.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleSelectProperty} 
                    disabled={!selectedPropertyId}
                    size="sm"
                  >
                    Select Property
                  </Button>
                </div>
              )}
            </div>

            {/* Sync Status */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Sync</span>
                <span className="text-sm text-muted-foreground">{formatLastSync()}</span>
              </div>
              
              {integration.sync_error && (
                <Alert variant="destructive">
                  <AlertDescription>{integration.sync_error}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                onClick={syncData} 
                disabled={syncing || !integration.property_id}
                size="sm"
                variant="outline"
              >
                {syncing && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
                Re-sync Data
              </Button>
              
              <Button 
                onClick={() => fetchProperties()} 
                size="sm"
                variant="outline"
              >
                Refresh Properties
              </Button>
              
              <Button 
                onClick={disconnect} 
                size="sm"
                variant="destructive"
              >
                Disconnect
              </Button>
            </div>

            {/* Metrics Info */}
            <div className="text-xs text-muted-foreground">
              <p>Synced metrics: Sessions, Conversions, Bounce Rate, Avg Session Duration, Engaged Sessions, Conversion Rate</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
