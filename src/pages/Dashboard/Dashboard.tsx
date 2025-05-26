import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

const industryOptions = ["All", "E-commerce", "SaaS", "Healthcare"];
const sizeOptions = ["All", "1–10", "11–50", "51–200", "501+"];
const maturityOptions = ["All", "Beginner", "Intermediate", "Advanced"];
const platformOptions = ["All", "google_ads", "meta_ads", "linkedin_ads", "tiktok_ads"];
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
          setAecrScore(entry.aecr || {});
          setTrendData(entry.trends || []);
          setCampaigns(entry.campaigns || []);
          setAlerts(entry.alerts || []);
        }
      } catch (e) {
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

  const getKpiColor = (value: number, benchmark: number) => {
    if (value >= benchmark) return "green";
    if (value >= benchmark * 0.9) return "yellow";
    return "red";
  };

  const renderKpis = useMemo(() => {
    return Object.entries(kpis).map(([key, { value, change, benchmark }]: any) => (
      <KpiTile
        key={key}
        title={key.toUpperCase()}
        value={value}
        change={change}
        benchmark={benchmark}
        color={getKpiColor(value, benchmark)}
      />
    ));
  }, [kpis]);

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

        {/* Metadata Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Dropdown label="Industry" value={industry} onChange={setIndustry} options={industryOptions} />
          <Dropdown label="Size" value={companySize} onChange={setCompanySize} options={sizeOptions} />
          <Dropdown label="Maturity" value={maturity} onChange={setMaturity} options={maturityOptions} />
          <Dropdown label="Integration" value={integration} onChange={setIntegration} options={platformOptions} />
        </div>

        <AecrScorePanel {...aecrScore} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">{renderKpis}</div>

        {/* Metric Selector */}
        <div className="flex gap-3">
          {trendMetrics.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetric(m)}
              className={`text-sm px-2 py-1 rounded ${selectedMetric === m ? "bg-blue-500 text-white" : "bg-muted"}`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <TrendGraph data={filteredTrend} title={`${selectedMetric.toUpperCase()} Trend`} valueLabel={selectedMetric} />

        <CampaignTable campaigns={campaigns} onSort={() => {}} dateRange={dateRange} />

        <AlertsPanel alerts={alerts} onClearAll={() => setAlerts([])} />
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
