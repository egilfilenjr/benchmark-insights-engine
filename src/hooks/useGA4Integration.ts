
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
        .select('id, property_id, property_name, status, last_synced_at')
        .eq('user_id', user.id)
        .eq('provider', 'google_analytics')
        .maybeSingle();

      if (oauthData) {
        // Create integration object from OAuth data
        const mockIntegration: GA4Integration = {
          id: oauthData.id,
          user_id: user.id,
          property_id: oauthData.property_id || '',
          property_name: oauthData.property_name || 'Default Property',
          status: (oauthData.status as 'active' | 'error' | 'pending') || 'active',
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
      // Update oauth_accounts with selected property
      const { error } = await supabase
        .from('oauth_accounts')
        .update({
          property_id: propertyId,
          property_name: propertyName,
          status: 'active'
        })
        .eq('user_id', user.id)
        .eq('provider', 'google_analytics');

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
      console.log('Syncing GA4 data for user:', user.id);
      
      // Trigger GA4 sync job
      await supabase.functions.invoke('jobs/sync_ga4', {
        body: { 
          user_id: user.id,
          job_type: 'manual_sync',
          date_range: 'last_30_days'
        }
      });
      
      // Update last sync time
      await supabase
        .from('oauth_accounts')
        .update({ 
          last_synced_at: new Date().toISOString(),
          status: 'active'
        })
        .eq('user_id', user.id)
        .eq('provider', 'google_analytics')
        .select('id')
        .single();
      
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
      const { error } = await supabase
        .from('oauth_accounts')
        .delete()
        .eq('user_id', user.id)
        .eq('provider', 'google_analytics');

      if (error) throw error;

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
