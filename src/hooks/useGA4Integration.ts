
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserProfile } from '@/hooks/useUserProfile';

interface GA4Property {
  propertyId: string;
  displayName: string;
  account: string;
}

interface GA4Integration {
  id?: string;
  user_id: string;
  property_id: string;
  property_name: string;
  access_token?: string;
  refresh_token?: string;
  last_synced_at?: string;
  status: 'active' | 'error' | 'pending';
  sync_error?: string;
}

export function useGA4Integration() {
  const { user } = useUserProfile();
  const [integration, setIntegration] = useState<GA4Integration | null>(null);
  const [properties, setProperties] = useState<GA4Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadIntegration();
    }
  }, [user?.id]);

  const loadIntegration = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // Check if user has GA4 OAuth connection
      const { data: oauthData } = await supabase
        .from('oauth_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('platform', 'google_analytics')
        .maybeSingle();

      if (oauthData) {
        // For now, create a mock integration since the ga4_integrations table doesn't exist
        // In a real implementation, you would query the actual ga4_integrations table
        const mockIntegration: GA4Integration = {
          id: oauthData.id,
          user_id: user.id,
          property_id: oauthData.account_id || '',
          property_name: oauthData.account_name || 'Default Property',
          status: 'active',
          last_synced_at: oauthData.last_synced_at
        };
        
        setIntegration(mockIntegration);
      }
    } catch (error) {
      console.error('Error loading GA4 integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    if (!user?.id) return [];

    try {
      // Mock properties for now since the edge function doesn't exist
      // In a real implementation, this would call a Supabase edge function
      const mockProperties: GA4Property[] = [
        {
          propertyId: 'GA4-123456789',
          displayName: 'Your Website Analytics',
          account: 'Default Account'
        }
      ];
      
      setProperties(mockProperties);
      return mockProperties;
    } catch (error) {
      console.error('Error fetching GA4 properties:', error);
      return [];
    }
  };

  const selectProperty = async (propertyId: string, propertyName: string) => {
    if (!user?.id) return false;

    try {
      // For now, we'll update the oauth_accounts table
      // In a real implementation, this would update the ga4_integrations table
      const { error } = await supabase
        .from('oauth_accounts')
        .update({
          account_id: propertyId,
          account_name: propertyName,
          status: 'active'
        })
        .eq('user_id', user.id)
        .eq('platform', 'google_analytics');

      if (error) throw error;
      
      await loadIntegration();
      return true;
    } catch (error) {
      console.error('Error selecting GA4 property:', error);
      return false;
    }
  };

  const syncData = async () => {
    if (!user?.id || !integration) return false;

    setSyncing(true);
    try {
      // Mock sync for now since the edge function doesn't exist
      // In a real implementation, this would call a Supabase edge function
      console.log('Syncing GA4 data for user:', user.id);
      
      // Simulate sync delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update last sync time
      await supabase
        .from('oauth_accounts')
        .update({ last_synced_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('platform', 'google_analytics');
      
      await loadIntegration();
      return true;
    } catch (error) {
      console.error('Error syncing GA4 data:', error);
      return false;
    } finally {
      setSyncing(false);
    }
  };

  const disconnect = async () => {
    if (!user?.id) return false;

    try {
      // Remove OAuth connection
      await supabase
        .from('oauth_accounts')
        .delete()
        .eq('user_id', user.id)
        .eq('platform', 'google_analytics');

      setIntegration(null);
      setProperties([]);
      return true;
    } catch (error) {
      console.error('Error disconnecting GA4:', error);
      return false;
    }
  };

  return {
    integration,
    properties,
    loading,
    syncing,
    fetchProperties,
    selectProperty,
    syncData,
    disconnect,
    refetch: loadIntegration
  };
}
