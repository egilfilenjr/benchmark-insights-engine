
import { useState, useEffect, useMemo } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import FilterBar from "@/components/dashboard/FilterBar";
import AecrScorePanel from "@/components/dashboard/AecrScorePanel";
import KpiTile from "@/components/dashboard/KpiTile";
import TrendGraph from "@/components/dashboard/TrendGraph";
import CampaignTable from "@/components/dashboard/CampaignTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { subDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Alert, DataPoint, Campaign } from "@/components/dashboard/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type KPI = {
  value: number;
  change: number;
  benchmark: number;
};

type KPIData = {
  cpa: KPI;
  roas: KPI;
  ctr: KPI;
  spend: KPI;
  conversions: KPI;
};

export default function Dashboard() {
  const userProfile = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [aecrScore, setAecrScore] = useState({
    score: 78.5,
    percentile: 67,
    previousScore: 76.2,
  });

  const [kpis, setKpis] = useState<KPIData>({
    cpa: { value: 32.45, change: -5.2, benchmark: 34.8 },
    roas: { value: 3.8, change: 7.1, benchmark: 3.2 },
    ctr: { value: 2.4, change: 0.8, benchmark: 2.1 },
    spend: { value: 12542.89, change: 12.3, benchmark: 15000 },
    conversions: { value: 386, change: 18.4, benchmark: 310 },
  });

  // Create proper DataPoint[] array for the trend graph
  const [trendData, setTrendData] = useState<DataPoint[]>(
    Array.from({ length: 30 }, (_, i) => ({
      date: subDays(new Date(), 30 - i),
      value: 30 + Math.random() * 10,
    }))
  );

  // Mock campaigns for CampaignTable
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Summer Sale Promo",
      platform: "Meta",
      spend: 2456.78,
      conversions: 124,
      cpa: 19.81,
      roas: 4.2,
      ctr: 0.032,
      vsBenchmark: 12.4,
    },
    {
      id: "2",
      name: "Search Brand Terms",
      platform: "Google",
      spend: 1875.43,
      conversions: 98,
      cpa: 19.14,
      roas: 5.1,
      ctr: 0.084,
      vsBenchmark: 18.7,
    },
    {
      id: "3",
      name: "Retargeting - Cart Abandonment",
      platform: "Meta",
      spend: 1243.56,
      conversions: 87,
      cpa: 14.29,
      roas: 6.3,
      ctr: 0.041,
      vsBenchmark: 24.6,
    },
    {
      id: "4",
      name: "Lead Gen Campaign",
      platform: "LinkedIn",
      spend: 3567.98,
      conversions: 42,
      cpa: 84.95,
      roas: 1.8,
      ctr: 0.018,
      vsBenchmark: -8.2,
    },
    {
      id: "5",
      name: "Awareness Video Campaign",
      platform: "TikTok",
      spend: 1987.45,
      conversions: 23,
      cpa: 86.41,
      roas: 1.4,
      ctr: 0.025,
      vsBenchmark: -12.5,
    }
  ]);

  // Mock alerts for AlertsPanel
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      message: "Your CPA is 15% above target on Meta campaigns",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "info",
      message: "You've spent 75% of monthly budget with 45% of month remaining",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "success",
      message: "Google Search campaigns are outperforming benchmarks by 18%",
      timestamp: new Date(),
      actionLabel: "View Details",
      onAction: () => toast({ title: "Viewing campaign details..." }),
    }
  ]);

  // Placeholder for real data fetching logic
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // Data is already set in state
        setLoading(false);
      }, 1000);

      // Example Supabase query for real metrics
      // const { data, error } = await supabase
      //   .from("metrics")
      //   .select("*")
      //   .eq("user_id", userProfile.userId);

      // if (data) {
      //   setKpis(data.kpis);
      //   setAecrScore(data.aecr);
      //   setTrendData(data.trends);
      //   setCampaigns(data.campaigns);
      // }
    };

    fetchData();
  }, [userProfile, dateRange]);

  // Handle sort for campaign table
  const handleSort = (column: string) => {
    console.log(`Sorting by ${column}`);
    // Implement sorting logic
    // This would be implemented in a real app to sort campaigns
  };

  // Clear all alerts
  const handleClearAlerts = () => {
    setAlerts([]);
    toast({ title: "All alerts cleared" });
  };

  const renderKpiTiles = useMemo(() => {
    return Object.entries(kpis).map(([key, kpi]) => (
      <KpiTile 
        key={key} 
        title={key.toUpperCase()} 
        value={kpi.value} 
        change={kpi.change} 
        benchmark={kpi.benchmark} 
        loading={loading}
        format={key === 'roas' || key === 'ctr' ? 'number' : 
               key === 'cpa' || key === 'spend' ? 'currency' : 'number'}
        tooltipText={
          key === 'cpa' ? "Cost Per Acquisition" :
          key === 'roas' ? "Return On Ad Spend" :
          key === 'ctr' ? "Click-Through Rate" :
          key === 'spend' ? "Total Ad Spend" :
          "Total Conversions"
        }
      />
    ));
  }, [kpis, loading]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <FilterBar 
          dateRange={dateRange} 
          onDateRangeChange={setDateRange}
          onComparisonChange={(comparison) => console.log('Comparison changed:', comparison)} 
          onFilterChange={(filters) => console.log('Filters changed:', filters)}
        />

        <AecrScorePanel
          score={aecrScore.score}
          percentile={aecrScore.percentile}
          previousScore={aecrScore.previousScore}
          loading={loading}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {renderKpiTiles}
        </div>

        <TrendGraph 
          data={trendData} 
          title="CPA Trend" 
          valueLabel="Cost Per Acquisition" 
          benchmarkLabel="Industry Average"
          valueFormat="currency"
          loading={loading}
        />

        <CampaignTable 
          dateRange={dateRange} 
          loading={loading} 
          title="Campaign Performance"
          campaigns={campaigns}
          onSort={handleSort}
        />

        <AlertsPanel 
          alerts={alerts} 
          loading={loading}
          onClearAll={handleClearAlerts}
        />
      </div>
    </AppLayout>
  );
}
