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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, Lightbulb } from "lucide-react";

type SpendDataItem = {
  name: string;
  value: number;
  fill: string;
};

type PerformanceDataItem = {
  platform: string;
  cpa: number;
  roas: number;
  ctr: number;
};

export default function MediaMix() {
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("ga4");

  const [spendData, setSpendData] = useState<SpendDataItem[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceDataItem[]>([]);

  useEffect(() => {
    setLoading(true);

    // TODO: Replace with Supabase data fetch
    setSpendData([
      { name: "Google Search", value: 4500, fill: "#4285F4" },
      { name: "Meta Feed", value: 3200, fill: "#1877F2" },
      { name: "LinkedIn", value: 2800, fill: "#0A66C2" },
      { name: "TikTok", value: 1800, fill: "#000000" },
      { name: "YouTube", value: 1200, fill: "#FF0000" },
      { name: "Google Display", value: 800, fill: "#34A853" },
    ]);

    setPerformanceData([
      { platform: "Google Search", cpa: 25.4, roas: 4.2, ctr: 3.1 },
      { platform: "Meta Feed", cpa: 31.6, roas: 3.7, ctr: 2.5 },
      { platform: "LinkedIn", cpa: 42.3, roas: 2.8, ctr: 1.9 },
      { platform: "TikTok", cpa: 28.1, roas: 3.9, ctr: 2.7 },
      { platform: "YouTube", cpa: 36.0, roas: 3.0, ctr: 1.5 },
      { platform: "Google Display", cpa: 33.8, roas: 2.6, ctr: 1.8 },
    ]);

    setLoading(false);
  }, [user]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Media Mix</h1>
            <p className="text-muted-foreground">
              Understand your platform spend and performance.
            </p>
          </div>

          <Select value={dataSource} onValueChange={setDataSource}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ga4">GA4</SelectItem>
              <SelectItem value="meta">Meta</SelectItem>
              <SelectItem value="manual">Manual Upload
