
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
import { Alert, DataPoint } from "@/components/dashboard/types";

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

  const [trendData, setTrendData] = useState<DataPoint[]>(
    Array.from({ length: 30 }, (_, i) => ({
      date: subDays(new Date(), 30 - i),
      value: 30 + Math.random() * 10,
    }))
  );

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
    }
  ]);

  // Placeholder for real data fetching logic
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Example Supabase query for real metrics
      // const { data, error } = await supabase
      //   .from("metrics")
      //   .select("*")
      //   .eq("user_id", userProfile.userId);

      // if (data) {
      //   setKpis(data.kpis);
      //   setAecrScore(data.aecr);
      //   setTrendData(data.trends);
      // }

      setLoading(false);
    };

    fetchData();
  }, [userProfile]);

  const renderKpiTiles = useMemo(() => {
    return Object.entries(kpis).map(([key, kpi]) => (
      <KpiTile 
        key={key} 
        title={key.toUpperCase()} 
        value={kpi.value} 
        change={kpi.change} 
        benchmark={kpi.benchmark} 
      />
    ));
  }, [kpis]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <FilterBar 
          dateRange={dateRange} 
          onDateRangeChange={setDateRange}
          onComparisonChange={() => {}} 
          onFilterChange={() => {}}
        />

        <AecrScorePanel
          score={aecrScore.score}
          percentile={aecrScore.percentile}
          previousScore={aecrScore.previousScore}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {renderKpiTiles}
        </div>

        <TrendGraph 
          data={trendData} 
          title="CPA Trend" 
          valueLabel="Cost Per Acquisition" 
        />

        <CampaignTable 
          dateRange={dateRange} 
          loading={loading} 
          title="Campaign Performance"
          campaigns={[]}
        />

        <AlertsPanel alerts={alerts} />
      </div>
    </AppLayout>
  );
}
