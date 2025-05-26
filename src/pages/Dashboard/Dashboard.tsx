
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import FilterBar from "@/components/dashboard/FilterBar";
import AecrScorePanel from "@/components/dashboard/AecrScorePanel";
import TrendGraph from "@/components/dashboard/TrendGraph";
import CampaignTable from "@/components/dashboard/CampaignTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DashboardKPIs from "@/components/dashboard/DashboardKPIs";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MetricSelector from "@/components/dashboard/MetricSelector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Campaign, Alert, DataPoint } from "@/components/dashboard/types";

const trendMetrics = ["roas", "cpa", "ctr"];

export default function Dashboard() {
  const userProfile = useUserProfile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState(() => ({
    from: new Date(searchParams.get("from") || subDays(new Date(), 30)),
    to: new Date(searchParams.get("to") || new Date()),
  }));

  const [industry, setIndustry] = useState(searchParams.get("industry") || "All");
  const [companySize, setCompanySize] = useState(searchParams.get("size") || "All");
  const [maturity, setMaturity] = useState(searchParams.get("maturity") || "All");
  const [integration, setIntegration] = useState(searchParams.get("integration") || "All");
  const [selectedMetric, setSelectedMetric] = useState("roas");

  const [kpis, setKpis] = useState({});
  const [aecrScore, setAecrScore] = useState({ score: 0, percentile: 0, previousScore: 0 });
  const [trendData, setTrendData] = useState<DataPoint[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    searchParams.set("industry", industry);
    searchParams.set("size", companySize);
    searchParams.set("maturity", maturity);
    searchParams.set("integration", integration);
    setSearchParams(searchParams);
  }, [industry, companySize, maturity, integration]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("metrics")
          .select("*")
          .eq("user_id", userProfile?.userId);

        if (error) throw error;
        if (data?.length) {
          const entry = data[0];
          const k = entry.kpis || {};
          setKpis(k);
          setAecrScore(entry.aecr || { score: 0, percentile: 0, previousScore: 0 });
          setTrendData(Array.isArray(entry.trends) ? entry.trends : []);
          
          // Safely handle campaigns and alerts data
          const campaignsData = Array.isArray(entry.campaigns) ? entry.campaigns as Campaign[] : [];
          const alertsData = Array.isArray(entry.alerts) ? entry.alerts as Alert[] : [];
          
          setCampaigns(campaignsData);
          setAlerts(alertsData);
        }
      } catch (e) {
        console.error('Dashboard data fetch error:', e);
        toast({ title: "Failed to load dashboard", variant: "destructive" });
      }
    };

    if (userProfile?.userId) fetchData();
  }, [userProfile?.userId]);

  const handleQuickRange = (days: number) => {
    const to = new Date();
    const from = subDays(to, days);
    setDateRange({ from, to });
    searchParams.set("from", from.toISOString());
    searchParams.set("to", to.toISOString());
    setSearchParams(searchParams);
  };

  const filteredTrend = trendData.map((t: any) => ({
    date: t.date,
    value: t[selectedMetric],
    benchmark: t.benchmark,
  }));

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <FilterBar dateRange={dateRange} onDateRangeChange={setDateRange} />

        {/* Quick Date Ranges */}
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => handleQuickRange(d)}
              className="bg-muted px-2 py-1 rounded text-sm"
            >
              Last {d}d
            </button>
          ))}
        </div>

        <DashboardFilters
          industry={industry}
          setIndustry={setIndustry}
          companySize={companySize}
          setCompanySize={setCompanySize}
          maturity={maturity}
          setMaturity={setMaturity}
          integration={integration}
          setIntegration={setIntegration}
        />

        <AecrScorePanel 
          score={aecrScore.score} 
          percentile={aecrScore.percentile} 
          previousScore={aecrScore.previousScore} 
        />

        <DashboardKPIs kpis={kpis} />

        <MetricSelector 
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          metrics={trendMetrics}
        />

        <TrendGraph data={filteredTrend} title={`${selectedMetric.toUpperCase()} Trend`} valueLabel={selectedMetric} />

        <CampaignTable campaigns={campaigns} onSort={() => {}} dateRange={dateRange} />

        <AlertsPanel alerts={alerts} onClearAll={() => setAlerts([])} />
      </div>
    </AppLayout>
  );
}
