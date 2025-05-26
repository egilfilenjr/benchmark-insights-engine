
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
    if (user?.userId) {
      loadIntegration();
    }
  }, [user?.userId]);

  const loadIntegration = async () => {
    if (!user?.userId) return;

    setLoading(true);
    try {
      // Check if user has GA4 OAuth connection
      const { data: oauthData } = await supabase
        .from('oauth_accounts')
        .select('*')
        .eq('user_id', user.userId)
        .eq('platform', 'google_analytics')
        .maybeSingle();

      if (oauthData) {
        // Load GA4 integration details
        const { data: integrationData } = await supabase
          .from('ga4_integrations')
          .select('*')
          .eq('user_id', user.userId)
          .maybeSingle();

        setIntegration(integrationData);
      }
    } catch (error) {
      console.error('Error loading GA4 integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    if (!user?.userId) return [];

    try {
      const { data, error } = await supabase.functions.invoke('ga4-properties', {
        body: { user_id: user.userId }
      });

      if (error) throw error;
      
      setProperties(data.properties || []);
      return data.properties || [];
    } catch (error) {
      console.error('Error fetching GA4 properties:', error);
      return [];
    }
  };

  const selectProperty = async (propertyId: string, propertyName: string) => {
    if (!user?.userId) return false;

    try {
      const { error } = await supabase
        .from('ga4_integrations')
        .upsert({
          user_id: user.userId,
          property_id: propertyId,
          property_name: propertyName,
          status: 'active'
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      
      await loadIntegration();
      return true;
    } catch (error) {
      console.error('Error selecting GA4 property:', error);
      return false;
    }
  };

  const syncData = async () => {
    if (!user?.userId || !integration) return false;

    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-ga4-data', {
        body: { 
          user_id: user.userId,
          property_id: integration.property_id
        }
      });

      if (error) throw error;
      
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
    if (!user?.userId) return false;

    try {
      // Remove OAuth connection
      await supabase
        .from('oauth_accounts')
        .delete()
        .eq('user_id', user.userId)
        .eq('platform', 'google_analytics');

      // Remove GA4 integration
      await supabase
        .from('ga4_integrations')
        .delete()
        .eq('user_id', user.userId);

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
