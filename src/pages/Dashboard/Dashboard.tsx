
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import OverviewTab from "@/components/dashboard/OverviewTab";
import GA4AnalyticsTab from "@/components/dashboard/GA4AnalyticsTab";
import IntegrationsTab from "@/components/dashboard/IntegrationsTab";
import ReportsTab from "@/components/dashboard/ReportsTab";
import SettingsTab from "@/components/dashboard/SettingsTab";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';

  const renderContent = () => {
    switch (tab) {
      case 'ga4-analytics':
        return <GA4AnalyticsTab />;
      case 'integrations':
        return <IntegrationsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <AppLayout>
      {renderContent()}
    </AppLayout>
  );
}
