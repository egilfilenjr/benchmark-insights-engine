
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import FilterBar from "@/components/dashboard/FilterBar";
import AecrScorePanel from "@/components/dashboard/AecrScorePanel";
import KpiTile from "@/components/dashboard/KpiTile";
import TrendGraph from "@/components/dashboard/TrendGraph";
import CampaignTable from "@/components/dashboard/CampaignTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { supabase } from "@/integrations/supabase/client";
import { subDays } from "date-fns";

export default function Dashboard() {
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  // Mock data for demonstration
  const [aecrScore, setAecrScore] = useState({
    score: 78.5,
    percentile: 67,
    previousScore: 76.2,
  });
  
  const [kpis, setKpis] = useState({
    cpa: { value: 32.45, change: -5.2, benchmark: 34.8 },
    roas: { value: 3.8, change: 7.1, benchmark: 3.2 },
    ctr: { value: 2.4, change: 0.8, benchmark: 2.1 },
    spend: { value: 12542.89, change: 12.3, benchmark: 15000 },
    conversions: { value: 386, change: 18.4, benchmark: 310 },
  });
  
  // Mock trend data
  const [trendData, setTrendData] = useState({
    cpa: Array.from({ length: 30 }, (_, i) => ({
      date: subDays(new Date(), 30 - i),
      value: 30 + Math.random() * 10,
      benchmark: 34.8,
    })),
    roas: Array.from({ length: 30 }, (_, i) => ({
      date: subDays(new Date(), 30 - i),
      value: 3 + Math.random() * 1.5,
      benchmark: 3.2,
    })),
  });
  
  // Mock campaign data
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      name: "Summer Sale - Search",
      platform: "Google",
      spend: 2453.67,
      conversions: 87,
      cpa: 28.20,
      roas: 4.2,
      ctr: 0.045,
      vsBenchmark: 12.5,
    },
    {
      id: "2",
      name: "Retargeting - Dynamic",
      platform: "Meta",
      spend: 1876.35,
      conversions: 62,
      cpa: 30.26,
      roas: 3.8,
      ctr: 0.038,
      vsBenchmark: 8.2,
    },
    {
      id: "3",
      name: "Professional Audience",
      platform: "LinkedIn",
      spend: 3245.89,
      conversions: 34,
      cpa: 95.47,
      roas: 2.1,
      ctr: 0.025,
      vsBenchmark: -5.8,
    },
    {
      id: "4",
      name: "Gen Z Awareness",
      platform: "TikTok",
      spend: 1890.45,
      conversions: 52,
      cpa: 36.35,
      roas: 3.4,
      ctr: 0.052,
      vsBenchmark: 14.3,
    },
    {
      id: "5",
      name: "Fall Collection Promo",
      platform: "Meta",
      spend: 2105.78,
      conversions: 43,
      cpa: 48.97,
      roas: 2.8,
      ctr: 0.031,
      vsBenchmark: -12.4,
    },
  ]);
  
  // Mock alerts
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "warning" as const,
      message: "Meta CPA increased by 22% in the last 7 days",
      timestamp: new Date(),
      actionLabel: "View details",
      onAction: () => console.log("View Meta CPA details"),
    },
    {
      id: "2",
      type: "success" as const,
      message: "Google Search ROAS improved by 15% vs benchmark",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      actionLabel: "See why",
      onAction: () => console.log("See why Google ROAS improved"),
    },
    {
      id: "3",
      type: "info" as const,
      message: "AI recommendation: Adjust LinkedIn targeting to lower CPA",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      actionLabel: "Apply",
      onAction: () => console.log("Apply LinkedIn recommendation"),
    },
  ]);

  useEffect(() => {
    // Simulate API calls to Supabase
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real implementation, we would fetch data from Supabase here
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Data would be loaded from Supabase tables like:
        // const { data: aecrData } = await supabase
        //   .from('aecr_scores')
        //   .select('*')
        //   .eq('team_id', teamId)
        //   .order('date_calculated', { ascending: false })
        //   .limit(1);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
  };

  const handleComparisonChange = (comparison: string) => {
    console.log("Comparison changed to:", comparison);
    // Would fetch new comparison data from Supabase
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    console.log("Filters changed:", filters);
    // Would fetch filtered data from Supabase
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.user_metadata?.name || "Marketer"}. Here's your performance overview.
          </p>
        </div>

        <FilterBar
          onDateRangeChange={handleDateRangeChange}
          onComparisonChange={handleComparisonChange}
          onFilterChange={handleFilterChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <AecrScorePanel
              score={aecrScore.score}
              percentile={aecrScore.percentile}
              previousScore={aecrScore.previousScore}
              loading={loading}
            />
          </div>
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <KpiTile
              title="CPA"
              value={kpis.cpa.value}
              change={kpis.cpa.change}
              format="currency"
              tooltipText="Cost Per Acquisition - The average cost to acquire a customer"
              loading={loading}
              benchmarkComparison={{
                value: kpis.cpa.benchmark,
                label: "Benchmark",
              }}
            />
            <KpiTile
              title="ROAS"
              value={kpis.roas.value}
              change={kpis.roas.change}
              format="number"
              tooltipText="Return On Ad Spend - Revenue divided by ad spend"
              loading={loading}
              benchmarkComparison={{
                value: kpis.roas.benchmark,
                label: "Benchmark",
              }}
            />
            <KpiTile
              title="CTR"
              value={kpis.ctr.value}
              change={kpis.ctr.change}
              format="percentage"
              tooltipText="Click-Through Rate - Percentage of impressions that result in clicks"
              loading={loading}
              benchmarkComparison={{
                value: kpis.ctr.benchmark,
                label: "Benchmark",
              }}
            />
            <KpiTile
              title="Spend"
              value={kpis.spend.value}
              change={kpis.spend.change}
              format="currency"
              tooltipText="Total ad spend during selected period"
              loading={loading}
              benchmarkComparison={{
                value: kpis.spend.benchmark,
                label: "Budget",
              }}
            />
            <KpiTile
              title="Conversions"
              value={kpis.conversions.value}
              change={kpis.conversions.change}
              tooltipText="Total number of conversions (purchases, leads, etc.)"
              loading={loading}
              benchmarkComparison={{
                value: kpis.conversions.benchmark,
                label: "Target",
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrendGraph
            title="CPA Trend"
            data={trendData.cpa}
            valueLabel="CPA"
            benchmarkLabel="Benchmark"
            valueFormat="currency"
            loading={loading}
          />
          <TrendGraph
            title="ROAS Trend"
            data={trendData.roas}
            valueLabel="ROAS"
            benchmarkLabel="Benchmark"
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <CampaignTable
              title="Campaign Performance"
              campaigns={campaigns}
              loading={loading}
            />
          </div>
          <div>
            <AlertsPanel
              alerts={alerts}
              loading={loading}
              onClearAll={handleClearAlerts}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
