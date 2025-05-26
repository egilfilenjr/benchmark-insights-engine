
import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useCompanyIndustry } from "@/hooks/useCompanyIndustry";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BenchmarkFilterBar from "@/components/benchmarks/BenchmarkFilterBar";
import BenchmarkTable from "@/components/benchmarks/BenchmarkTable";
import BenchmarkPercentileVisual from "@/components/benchmarks/BenchmarkPercentileVisual";
import IndustryComparison from "@/components/benchmarks/IndustryComparison";
import { IndustryBadge } from "@/components/ui/industry-badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { useBenchmarkData } from "@/hooks/useBenchmarkData";
import { YOUR_PERFORMANCE } from "@/data/mockBenchmarks";

export default function Benchmarks() {
  const { user, plan } = useUserProfile();
  const { companyIndustry, loading: industryLoading } = useCompanyIndustry();
  
  // Initialize filters based on company industry
  const [filters, setFilters] = useState({
    industry: companyIndustry?.domain || "All",
    platform: "Google",
    channel: "Search",
    kpi: "CPA", 
    conversionType: "Lead",
    geo: "North America", 
  });
  
  const [selectedKPI, setSelectedKPI] = useState("CPA");
  const { benchmarks, loading } = useBenchmarkData(filters);

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

  const getIndustryBreadcrumb = () => {
    if (!companyIndustry) return "All Industries";
    
    const parts = [
      companyIndustry.domain,
      companyIndustry.category,
      companyIndustry.subcategory,
      companyIndustry.detail
    ].filter(Boolean);
    
    return parts.join(" → ");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Benchmarks Explorer</h1>
            <p className="text-muted-foreground">
              Compare your marketing performance to industry standards.
            </p>
            {!industryLoading && companyIndustry && (
              <div className="mt-2">
                <div className="text-sm text-muted-foreground mb-1">Your Benchmarks:</div>
                <IndustryBadge
                  domain={companyIndustry.domain}
                  category={companyIndustry.category}
                  subcategory={companyIndustry.subcategory}
                  detail={companyIndustry.detail}
                />
              </div>
            )}
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
                
                {activeBenchmark && (
                  <BenchmarkPercentileVisual 
                    data={activeBenchmark}
                    yourPerformance={plan !== "free" ? YOUR_PERFORMANCE[selectedKPI as keyof typeof YOUR_PERFORMANCE] : undefined}
                    loading={loading}
                    showYourData={plan !== "free"}
                  />
                )}
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
