
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
    score: 0,
    percentile: 0,
    previousScore: 0,
  });

  const [kpis, setKpis] = useState<KPIData>({
    cpa: { value: 0, change: 0, benchmark: 0 },
    roas: { value: 0, change: 0, benchmark: 0 },
    ctr: { value: 0, change: 0, benchmark: 0 },
    spend: { value: 0, change: 0, benchmark: 0 },
    conversions: { value: 0, change: 0, benchmark: 0 },
  });

  const [trendData, setTrendData] = useState<DataPoint[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("metrics")
          .select("*")
          .eq("user_id", userProfile?.userId);

        if (error) throw error;

        if (data && data.length > 0) {
          const entry = data[0];
          
          // Ensure all values are numbers with safe fallbacks
          const safeKpis = {
            cpa: {
              value: Number(entry.kpis?.cpa?.value) || 0,
              change: Number(entry.kpis?.cpa?.change) || 0,
              benchmark: Number(entry.kpis?.cpa?.benchmark) || 0,
            },
            roas: {
              value: Number(entry.kpis?.roas?.value) || 0,
              change: Number(entry.kpis?.roas?.change) || 0,
              benchmark: Number(entry.kpis?.roas?.benchmark) || 0,
            },
            ctr: {
              value: Number(entry.kpis?.ctr?.value) || 0,
              change: Number(entry.kpis?.ctr?.change) || 0,
              benchmark: Number(entry.kpis?.ctr?.benchmark) || 0,
            },
            spend: {
              value: Number(entry.kpis?.spend?.value) || 0,
              change: Number(entry.kpis?.spend?.change) || 0,
              benchmark: Number(entry.kpis?.spend?.benchmark) || 0,
            },
            conversions: {
              value: Number(entry.kpis?.conversions?.value) || 0,
              change: Number(entry.kpis?.conversions?.change) || 0,
              benchmark: Number(entry.kpis?.conversions?.benchmark) || 0,
            },
          };

          const safeAecrScore = {
            score: Number(entry.aecr?.score) || 0,
            percentile: Number(entry.aecr?.percentile) || 0,
            previousScore: Number(entry.aecr?.previousScore) || 0,
          };

          // Ensure trend data has proper numeric values
          const safeTrendData = (entry.trends || []).map((trend: any) => ({
            date: trend.date,
            value: Number(trend.value) || 0,
            benchmark: Number(trend.benchmark) || 0,
          }));

          setKpis(safeKpis);
          setAecrScore(safeAecrScore);
          setTrendData(safeTrendData);
          setCampaigns(entry.campaigns || []);
          setAlerts(entry.alerts || []);
        }
      } catch (err: any) {
        console.error(err);
        toast({
          title: "Error loading data",
          description: err.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.userId) {
      fetchData();
    }
  }, [userProfile?.userId, dateRange]);

  const handleSort = (column: string) => {
    console.log(`Sorting by ${column}`);
    // Sorting logic here
  };

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
      />
    ));
  }, [kpis]);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <FilterBar dateRange={dateRange} setDateRange={setDateRange} />
        <AecrScorePanel score={aecrScore} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {renderKpiTiles}
        </div>
        <TrendGraph data={trendData} />
        <CampaignTable campaigns={campaigns} onSort={handleSort} />
        <AlertsPanel alerts={alerts} onClear={handleClearAlerts} />
      </div>
    </AppLayout>
  );
}
