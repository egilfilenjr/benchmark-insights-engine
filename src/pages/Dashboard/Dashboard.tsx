
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
          
          // Safe JSON parsing with type checking
          const parseKpiData = (jsonData: any, kpiName: string) => ({
            value: Number(jsonData?.[kpiName]?.value) || 0,
            change: Number(jsonData?.[kpiName]?.change) || 0,
            benchmark: Number(jsonData?.[kpiName]?.benchmark) || 0,
          });

          // Safely parse KPI data
          const kpiData = entry.kpis as any;
          const safeKpis = {
            cpa: parseKpiData(kpiData, 'cpa'),
            roas: parseKpiData(kpiData, 'roas'),
            ctr: parseKpiData(kpiData, 'ctr'),
            spend: parseKpiData(kpiData, 'spend'),
            conversions: parseKpiData(kpiData, 'conversions'),
          };

          // Safely parse AECR data
          const aecrData = entry.aecr as any;
          const safeAecrScore = {
            score: Number(aecrData?.score) || 0,
            percentile: Number(aecrData?.percentile) || 0,
            previousScore: Number(aecrData?.previousScore) || 0,
          };

          // Safely parse trend data
          const trendsData = entry.trends as any;
          const safeTrendData = Array.isArray(trendsData) ? trendsData.map((trend: any) => ({
            date: trend.date,
            value: Number(trend.value) || 0,
            benchmark: Number(trend.benchmark) || 0,
          })) : [];

          // Safely parse campaigns and alerts arrays with proper type casting
          const safeCampaigns: Campaign[] = Array.isArray(entry.campaigns) 
            ? entry.campaigns
                .filter(c => c && typeof c === 'object')
                .map((c: any) => ({
                  id: c.id || '',
                  name: c.name || '',
                  platform: c.platform || '',
                  spend: Number(c.spend) || 0,
                  conversions: Number(c.conversions) || 0,
                  cpa: Number(c.cpa) || 0,
                  roas: Number(c.roas) || 0,
                  ctr: Number(c.ctr) || 0,
                  vsBenchmark: Number(c.vsBenchmark) || 0,
                }))
            : [];

          const safeAlerts: Alert[] = Array.isArray(entry.alerts)
            ? entry.alerts
                .filter(a => a && typeof a === 'object')
                .map((a: any) => ({
                  id: a.id || '',
                  type: a.type || 'info',
                  message: a.message || '',
                  timestamp: new Date(a.timestamp || Date.now()),
                  actionLabel: a.actionLabel,
                  onAction: a.onAction,
                }))
            : [];

          setKpis(safeKpis);
          setAecrScore(safeAecrScore);
          setTrendData(safeTrendData);
          setCampaigns(safeCampaigns);
          setAlerts(safeAlerts);
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
        <FilterBar 
          dateRange={dateRange} 
          onDateRangeChange={setDateRange} 
        />
        <AecrScorePanel 
          score={aecrScore.score} 
          percentile={aecrScore.percentile}
          previousScore={aecrScore.previousScore}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {renderKpiTiles}
        </div>
        <TrendGraph 
          data={trendData} 
          title="Performance Trend"
          valueLabel="Performance" 
        />
        <CampaignTable 
          campaigns={campaigns} 
          onSort={handleSort}
          dateRange={dateRange}
        />
        <AlertsPanel 
          alerts={alerts} 
          onClearAll={handleClearAlerts} 
        />
      </div>
    </AppLayout>
  );
}
