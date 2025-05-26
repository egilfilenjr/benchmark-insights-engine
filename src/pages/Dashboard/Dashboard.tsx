import { useEffect, useMemo, useState } from "react";
import { subDays } from "date-fns";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import FilterBar from "@/components/dashboard/FilterBar";
import AecrScorePanel from "@/components/dashboard/AecrScorePanel";
import KpiTile from "@/components/dashboard/KpiTile";
import TrendGraph from "@/components/dashboard/TrendGraph";
import CampaignTable from "@/components/dashboard/CampaignTable";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Campaign, Alert, DataPoint } from "@/components/dashboard/types";

type KPI = { value: number; change: number; benchmark: number };
type KPIData = { [key: string]: KPI };

const industryOptions = ["All", "E-commerce", "SaaS", "Healthcare", "Finance"];
const sizeOptions = ["All", "1–10", "11–50", "51–200", "201–500", "501+"];
const maturityOptions = ["All", "Beginner", "Intermediate", "Advanced", "Enterprise"];
const platformOptions = ["All", "google_ads", "meta_ads", "linkedin_ads", "tiktok_ads", "ga4", "shopify"];

export default function Dashboard() {
  const userProfile = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  // Filters
  const [industry, setIndustry] = useState("All");
  const [companySize, setCompanySize] = useState("All");
  const [maturity, setMaturity] = useState("All");
  const [integration, setIntegration] = useState("All");

  // Dashboard data
  const [aecrScore, setAecrScore] = useState({ score: 0, percentile: 0, previousScore: 0 });
  const [kpis, setKpis] = useState<KPIData>({});
  const [trendData, setTrendData] = useState<DataPoint[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [profileMeta, setProfileMeta] = useState<any>(null);

  useEffect(() => {
    const fetchProfileMeta = async () => {
      const { data, error } = await supabase
        .from("public_user_profile_view")
        .select("*")
        .eq("id", userProfile?.userId)
        .single();

      if (error) {
        console.error("Failed to load profile view:", error);
        return;
      }

      setProfileMeta(data);
      setIndustry(data.industry || "All");
      setCompanySize(data.company_size || "All");
      setMaturity(data.analytics_maturity || "All");
    };

    if (userProfile?.userId) fetchProfileMeta();
  }, [userProfile?.userId]);

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
          const kpiData = entry.kpis || {};
          const aecr = entry.aecr || {};

          setKpis({
            cpa: formatKpi(kpiData, "cpa"),
            roas: formatKpi(kpiData, "roas"),
            ctr: formatKpi(kpiData, "ctr"),
            spend: formatKpi(kpiData, "spend"),
            conversions: formatKpi(kpiData, "conversions"),
          });

          setAecrScore({
            score: aecr.score || 0,
            percentile: aecr.percentile || 0,
            previousScore: aecr.previousScore || 0,
          });

          setTrendData(parseTrend(entry.trends));
          setCampaigns(parseCampaigns(entry.campaigns));
          setAlerts(parseAlerts(entry.alerts));
        }
      } catch (err: any) {
        toast({
          title: "Error loading data",
          description: err.message || "Unknown error",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.userId) fetchData();
  }, [userProfile?.userId, dateRange]);

  const renderKpis = useMemo(() => {
    return Object.entries(kpis).map(([key, kpi]) => (
      <KpiTile key={key} title={key.toUpperCase()} {...kpi} />
    ));
  }, [kpis]);

  const clearAlerts = () => {
    setAlerts([]);
    toast({ title: "All alerts cleared" });
  };

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <FilterBar dateRange={dateRange} onDateRangeChange={setDateRange} />

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Dropdown label="Industry" value={industry} onChange={setIndustry} options={industryOptions} />
          <Dropdown label="Company Size" value={companySize} onChange={setCompanySize} options={sizeOptions} />
          <Dropdown label="Maturity" value={maturity} onChange={setMaturity} options={maturityOptions} />
          <Dropdown label="Integration" value={integration} onChange={setIntegration} options={platformOptions} />
        </div>

        <AecrScorePanel
          score={aecrScore.score}
          percentile={aecrScore.percentile}
          previousScore={aecrScore.previousScore}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{renderKpis}</div>

        <TrendGraph data={trendData} title="Performance Trend" valueLabel="Performance" />

        <CampaignTable campaigns={campaigns} onSort={() => {}} dateRange={dateRange} />

        <AlertsPanel alerts={alerts} onClearAll={clearAlerts} />
      </div>
    </AppLayout>
  );
}

function Dropdown({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-xs font-medium block mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-2 py-1 rounded text-sm"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function formatKpi(data: any, key: string): KPI {
  return {
    value: Number(data?.[key]?.value) || 0,
    change: Number(data?.[key]?.change) || 0,
    benchmark: Number(data?.[key]?.benchmark) || 0,
  };
}

function parseTrend(data: any): DataPoint[] {
  return Array.isArray(data)
    ? data.map((t: any) => ({
        date: t.date,
        value: Number(t.value) || 0,
        benchmark: Number(t.benchmark) || 0,
      }))
    : [];
}

function parseCampaigns(data: any): Campaign[] {
  return Array.isArray(data)
    ? data.map((c: any) => ({
        id: c.id || "",
        name: c.name || "",
        platform: c.platform || "",
        spend: Number(c.spend) || 0,
        conversions: Number(c.conversions) || 0,
        cpa: Number(c.cpa) || 0,
        roas: Number(c.roas) || 0,
        ctr: Number(c.ctr) || 0,
        vsBenchmark: Number(c.vsBenchmark) || 0,
      }))
    : [];
}

function parseAlerts(data: any): Alert[] {
  return Array.isArray(data)
    ? data.map((a: any) => ({
        id: a.id || "",
        type: a.type || "info",
        message: a.message || "",
        timestamp: new Date(a.timestamp || Date.now()),
        actionLabel: a.actionLabel,
        onAction: a.onAction,
      }))
    : [];
}
