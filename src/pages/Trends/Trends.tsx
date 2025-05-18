
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { subDays, format } from "date-fns";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

type TrendEntry = {
  date: string;
  value: number;
  benchmark: number;
};

export default function Trends() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [selectedKpi, setSelectedKpi] = useState("roas");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [showBenchmark, setShowBenchmark] = useState(true);
  const [trendData, setTrendData] = useState<TrendEntry[]>([]);

  const days = parseInt(selectedPeriod);

  const generateTrendData = (kpi: string, days: number): TrendEntry[] => {
    let base = 0;
    let bench = 0;
    switch (kpi) {
      case "roas":
        base = 3.8;
        bench = 3.2;
        break;
      case "cpa":
        base = 28;
        bench = 32;
        break;
      case "ctr":
        base = 2.1;
        bench = 1.9;
        break;
      case "aecr":
        base = 74;
        bench = 68;
        break;
      case "spend":
        base = 4000;
        bench = 3800;
        break;
      default:
        break;
    }

    return Array.from({ length: days }, (_, i) => ({
      date: format(subDays(new Date(), days - i), "MM/dd"),
      value: parseFloat((base + Math.random() * 0.5).toFixed(2)),
      benchmark: parseFloat((bench + Math.random() * 0.3).toFixed(2)),
    }));
  };

  useEffect(() => {
    setLoading(true);
    // Replace this with Supabase fetch in production
    const data = generateTrendData(selectedKpi, days);
    setTrendData(data);
    setLoading(false);
  }, [selectedKpi, selectedPeriod]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">KPI Trends</h1>
            <p className="text-muted-foreground">
              Monitor your weekly and monthly KPI momentum over time.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7D</SelectItem>
                <SelectItem value="14">Last 14D</SelectItem>
                <SelectItem value="30">Last 30D</SelectItem>
                <SelectItem value="90">Last 3M</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Switch
                checked={showBenchmark}
                onCheckedChange={setShowBenchmark}
              />
              <Label>Show Benchmark</Label>
            </div>
          </div>
        </div>

        <Tabs defaultValue="roas" value={selectedKpi} onValueChange={setSelectedKpi}>
          <TabsList>
            {["roas", "cpa", "ctr", "aecr", "spend"].map((kpi) => (
              <TabsTrigger key={kpi} value={kpi}>
                {kpi.toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedKpi}>
            <Card>
              <CardHeader>
                <CardTitle>{selectedKpi.toUpperCase()} Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      name="My Data"
                    />
                    {showBenchmark && (
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="#94A3B8"
                        strokeDasharray="5 5"
                        name="Industry Avg"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Example Anomaly Callout */}
        {selectedKpi === "cpa" && trendData[trendData.length - 1]?.value > 35 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Spike detected</AlertTitle>
            <AlertDescription>
              CPA increased by more than 20% this week on TikTok campaigns.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </AppLayout>
  );
}
