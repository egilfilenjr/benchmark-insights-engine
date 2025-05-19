import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, Share2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type Report = {
  id: string;
  type: string;
  generatedAt: Date;
  format: string;
  downloadUrl: string;
};

export default function Reports() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("snapshot");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reports, setReports] = useState<Report[]>([]);

  const canAccessReports = ["pro_plus", "agency"].includes(plan);

  useEffect(() => {
    if (!canAccessReports) return;

    setLoading(true);

    // TODO: Replace with Supabase fetch
    const mockReports: Report[] = [
      {
        id: "r1",
        type: "snapshot",
        generatedAt: new Date(),
        format: "PDF",
        downloadUrl: "#",
      },
      {
        id: "r2",
        type: "roas_trend",
        generatedAt: new Date(),
        format: "PPT",
        downloadUrl: "#",
      },
    ];

    setReports(mockReports);
    setLoading(false);
  }, [plan]);

  if (!canAccessReports) {
    return (
      <AppLayout>
        <div className="text-center max-w-lg mx-auto mt-24">
          <h1 className="text-2xl font-semibold">Upgrade Required</h1>
          <p className="text-muted-foreground mt-2">
            Reports and Exports are only available to Pro+ and Agency plans.
          </p>
          <Button className="mt-4">Upgrade Plan</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Reports</h1>
            <p className="text-muted-foreground">
              Exportable insights, branded decks, and monthly snapshots.
            </p>
          </div>
        </div>

        <Tabs defaultValue={reportType} onValueChange={setReportType}>
          <TabsList>
            <TabsTrigger value="snapshot">Monthly Snapshot</TabsTrigger>
            <TabsTrigger value="benchmark_card">Benchmark Card</TabsTrigger>
            <TabsTrigger value="roas_trend">ROAS Trend Deck</TabsTrigger>
            <TabsTrigger value="aecr_explainer">AECR Explainer</TabsTrigger>
          </TabsList>

          <TabsContent value={reportType}>
            <Card>
              <CardHeader>
                <CardTitle>Generate {reportType.replace("_", " ")}</CardTitle>
                <CardDescription>Select a date and format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                  </Popover>

                  <Select defaultValue="PDF">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="PPT">PPT</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div>
          <h2 className="text-lg font-medium">Past Reports</h2>
          <div className="grid gap-4 md:grid-cols-2 mt-2">
            {reports.map((r) => (
              <Card key={r.id}>
                <CardHeader>
                  <CardTitle>{r.type.replace("_", " ")}</CardTitle>
                  <CardDescription>
                    Generated {format(r.generatedAt, "PPpp")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-3">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    {r.format}
                  </Button>
                  <Button variant="ghost">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
