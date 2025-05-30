
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AppLayout from "@/components/layout/AppLayout";
import IntegrationManager from "@/components/integrations/IntegrationManager";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/hooks/use-toast";

export default function IntegrationsPage() {
  const navigate = useNavigate();
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Handle OAuth callback results
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success === 'ga4_connected') {
      toast({
        title: "Google Analytics 4 Connected",
        description: "Successfully connected your GA4 property. Data sync will begin shortly.",
      });
      // Clean up URL
      navigate('/integrations', { replace: true });
    } else if (error) {
      let errorMessage = "Failed to connect integration";
      switch (error) {
        case 'access_denied':
          errorMessage = "Access denied. Please try again and grant the necessary permissions.";
          break;
        case 'missing_params':
          errorMessage = "Invalid callback parameters. Please try connecting again.";
          break;
        case 'token_exchange_failed':
          errorMessage = "Failed to exchange authorization code. Please try again.";
          break;
        case 'database_error':
          errorMessage = "Failed to save connection. Please try again.";
          break;
        case 'callback_failed':
          errorMessage = "Connection callback failed. Please try again.";
          break;
        default:
          errorMessage = `Connection failed: ${error}`;
      }
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive"
      });
      // Clean up URL
      navigate('/integrations', { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    // Simple loading check
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Please log in to view integrations.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold">🔌 Marketing Integrations</h1>
            <p className="text-muted-foreground mt-2">
              Connect your marketing accounts to sync performance data or load test data to explore the platform
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/integrations/info")}>
            View All Integrations
          </Button>
        </div>

        <IntegrationManager />

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">💡 Getting Started</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>Connect</strong> your actual marketing accounts to sync real performance data</p>
            <p>• <strong>Load Test Data</strong> to explore the platform with sample metrics and benchmarks</p>
            <p>• Once connected, data will appear in your Dashboard, Benchmarks, and other analytics views</p>
            <p>• Re-sync anytime to get the latest performance data from your accounts</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
