import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AppLayout from "@/components/layout/AppLayout";
import DashboardKPIs from "@/components/dashboard/DashboardKPIs";
import TrendGraph from "@/components/dashboard/TrendGraph";
import CampaignTable from "@/components/dashboard/CampaignTable";
import AecrScorePanel from "@/components/dashboard/AecrScorePanel";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import DateRangeSelector from "@/components/dashboard/DateRangeSelector";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import { IndustryBadge } from "@/components/ui/industry-badge";
import { useCompanyIndustry } from "@/hooks/useCompanyIndustry";
import { DataPoint, Campaign, Alert } from "@/components/dashboard/types";
import { subDays } from "date-fns";

export default function Dashboard() {
  const { companyIndustry, loading: industryLoading } = useCompanyIndustry();
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  const [selectedMetric, setSelectedMetric] = useState("cpa");
  const [industry, setIndustry] = useState("All");
  const [companySize, setCompanySize] = useState("All");
  const [maturity, setMaturity] = useState("All");
  const [integration, setIntegration] = useState("All");

  // Data states
  const [kpis, setKpis] = useState({
    cpa: { value: 45.23, change: -8.2, benchmark: 52.18 },
    roas: { value: 4.2, change: 12.5, benchmark: 3.8 },
    ctr: { value: 2.8, change: 5.1, benchmark: 2.4 },
    conversions: { value: 1247, change: 18.3, benchmark: 980 },
    spend: { value: 12450, change: -3.2, benchmark: 15000 }
  });

  const [aecrScore, setAecrScore] = useState({
    score: 85,
    percentile: 78,
    previousScore: 82
  });

  const [trendData, setTrendData] = useState<DataPoint[]>([
    { date: "2024-01-01", value: 45.2 },
    { date: "2024-01-02", value: 43.8 },
    { date: "2024-01-03", value: 46.1 },
    { date: "2024-01-04", value: 44.5 },
    { date: "2024-01-05", value: 42.9 }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Summer Sale Campaign",
      platform: "Google Ads",
      spend: 2450.00,
      conversions: 89,
      cpa: 27.53,
      roas: 3.8,
      ctr: 0.028,
      vsBenchmark: 12.5,
      status: "active"
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      message: "CPA increased by 15% in the last 7 days",
      timestamp: "2024-01-15T10:30:00Z"
    }
  ]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: metricsData } = await supabase
          .from("metrics")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (metricsData) {
          // Safely parse the JSON data with type assertions
          if (metricsData.aecr && typeof metricsData.aecr === 'object') {
            const aecrData = metricsData.aecr as any;
            if (aecrData.score !== undefined) {
              setAecrScore({
                score: Number(aecrData.score),
                percentile: Number(aecrData.percentile || 0),
                previousScore: Number(aecrData.previousScore || 0)
              });
            }
          }

          if (metricsData.trends && Array.isArray(metricsData.trends)) {
            const trendsArray = metricsData.trends as any[];
            const validTrends = trendsArray.filter(item => 
              item && typeof item === 'object' && item.date && item.value !== undefined
            ).map(item => ({
              date: String(item.date),
              value: Number(item.value)
            }));
            if (validTrends.length > 0) {
              setTrendData(validTrends);
            }
          }

          if (metricsData.campaigns && Array.isArray(metricsData.campaigns)) {
            const campaignsArray = metricsData.campaigns as any[];
            const validCampaigns = campaignsArray.filter(item => 
              item && typeof item === 'object' && item.id && item.name
            ).map(item => ({
              id: String(item.id),
              name: String(item.name),
              platform: String(item.platform || ''),
              spend: Number(item.spend || 0),
              conversions: Number(item.conversions || 0),
              cpa: Number(item.cpa || 0),
              roas: Number(item.roas || 0),
              ctr: Number(item.ctr || 0),
              vsBenchmark: Number(item.vsBenchmark || 0),
              status: String(item.status || 'active')
            }));
            if (validCampaigns.length > 0) {
              setCampaigns(validCampaigns);
            }
          }

          if (metricsData.alerts && Array.isArray(metricsData.alerts)) {
            const alertsArray = metricsData.alerts as any[];
            const validAlerts = alertsArray.filter(item => 
              item && typeof item === 'object' && item.id && item.message
            ).map(item => ({
              id: String(item.id),
              type: ['warning', 'info', 'success'].includes(item.type) ? item.type : 'info' as const,
              message: String(item.message),
              timestamp: String(item.timestamp || new Date().toISOString())
            }));
            if (validAlerts.length > 0) {
              setAlerts(validAlerts);
            }
          }
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();
  }, [dateRange, industry, companySize, maturity, integration]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {!industryLoading && companyIndustry && (
              <div className="mt-2">
                <IndustryBadge
                  domain={companyIndustry.domain}
                  category={companyIndustry.category}
                  subcategory={companyIndustry.subcategory}
                  detail={companyIndustry.detail}
                />
              </div>
            )}
          </div>
          <DateRangeSelector 
            onDateRangeChange={setDateRange}
            initialDateRange={dateRange}
          />
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

        <DashboardKPIs kpis={kpis} />

        <div className="grid gap-6 md:grid-cols-2">
          <TrendGraph 
            data={trendData}
            title="Performance Trend"
            valueLabel="Value"
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
          <AecrScorePanel 
            score={aecrScore.score}
            percentile={aecrScore.percentile}
            previousScore={aecrScore.previousScore}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CampaignTable 
            campaigns={campaigns} 
            dateRange={dateRange}
            title="Campaign Performance"
          />
          <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </AppLayout>
  );
}
