
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BenchmarkFilterBar from "@/components/benchmarks/BenchmarkFilterBar";
import BenchmarkTable from "@/components/benchmarks/BenchmarkTable";
import BenchmarkPercentileVisual from "@/components/benchmarks/BenchmarkPercentileVisual";
import IndustryComparison from "@/components/benchmarks/IndustryComparison";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

// Convert mock benchmark data to match component expectations
const MOCK_BENCHMARKS = [
  {
    id: "1",
    industry: "SaaS",
    platform: "Google",
    channel: "Search",
    kpi: "CPA",
    conversionType: "Lead",
    percentile_25: 42.67,
    median: 58.23,
    percentile_75: 75.48,
    sample_size: 1250,
    region: "North America"
  },
  {
    id: "2",
    industry: "SaaS",
    platform: "Google",
    channel: "Search",
    kpi: "ROAS",
    conversionType: "Lead",
    percentile_25: 2.1,
    median: 3.4,
    percentile_75: 5.2,
    sample_size: 1250,
    region: "North America"
  },
  {
    id: "3",
    industry: "SaaS",
    platform: "Google",
    channel: "Search",
    kpi: "CTR",
    conversionType: "Lead",
    percentile_25: 1.5,
    median: 2.4,
    percentile_75: 4.2,
    sample_size: 1250,
    region: "North America"
  }
];

// Mock performance data for the logged-in user
const YOUR_PERFORMANCE = {
  CPA: 54.12,
  ROAS: 3.8,
  CTR: 2.8
};

export default function Benchmarks() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: "SaaS",
    platform: "Google",
    channel: "Search",
    kpi: "CPA", 
    conversionType: "Lead",
    geo: "North America", 
  });
  
  const [benchmarks, setBenchmarks] = useState(MOCK_BENCHMARKS);
  const [selectedKPI, setSelectedKPI] = useState("CPA");

  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      // In a real app, we would fetch data based on filters
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [filters]);

  const handleExport = () => {
    if (plan !== "pro_plus" && plan !== "agency") {
      toast({
        title: "Feature not available",
        description: "Upgrade to Pro+ or Agency plan to export benchmark data.",
      });
      return;
    }
    
    toast({
      title: "Exporting benchmarks",
      description: "Your benchmark data is being prepared for download.",
    });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const activeBenchmark = benchmarks.find(b => b.kpi === selectedKPI) || benchmarks[0];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Benchmarks Explorer</h1>
            <p className="text-muted-foreground">
              Compare your marketing performance to industry standards.
            </p>
          </div>
          <Button onClick={handleExport} disabled={plan === "free" || plan === "pro"}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        <BenchmarkFilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {plan === "free" && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Limited View</AlertTitle>
            <AlertDescription>
              You're viewing industry benchmarks. Upgrade to Pro or higher to compare your performance data.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Percentiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {benchmarks.map(benchmark => (
                    <Button 
                      key={benchmark.id}
                      variant={selectedKPI === benchmark.kpi ? "default" : "outline"}
                      onClick={() => setSelectedKPI(benchmark.kpi)}
                      size="sm"
                    >
                      {benchmark.kpi}
                    </Button>
                  ))}
                </div>
                
                <BenchmarkPercentileVisual 
                  data={activeBenchmark}
                  yourPerformance={plan !== "free" ? YOUR_PERFORMANCE[selectedKPI as keyof typeof YOUR_PERFORMANCE] : undefined}
                  loading={loading}
                  showYourData={plan !== "free"}
                />
              </div>
            </CardContent>
          </Card>
          
          <IndustryComparison 
            yourPerformance={YOUR_PERFORMANCE}
            selectedKpi={selectedKPI}
            industryBenchmarks={benchmarks}
          />
        </div>

        <BenchmarkTable 
          data={benchmarks}
          loading={loading}
        />
      </div>
    </AppLayout>
  );
}
