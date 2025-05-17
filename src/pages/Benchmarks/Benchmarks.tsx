
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import BenchmarkFilterBar from "@/components/benchmarks/BenchmarkFilterBar";
import BenchmarkPercentileVisual from "@/components/benchmarks/BenchmarkPercentileVisual";
import BenchmarkTable from "@/components/benchmarks/BenchmarkTable";
import IndustryComparison from "@/components/benchmarks/IndustryComparison";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Benchmarks() {
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [userTeam, setUserTeam] = useState<any>(null);
  const [benchmarkData, setBenchmarkData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    industry: "All",
    platform: "All",
    channel: "All",
    kpi: "CPA",
    conversionType: "Purchase",
    geo: "All",
  });

  // Mock data - in real implementation, this would come from Supabase
  const mockBenchmarkData = [
    {
      id: "1",
      industry: "E-commerce",
      platform: "Google",
      channel: "Search",
      kpi: "CPA",
      conversionType: "Purchase",
      percentile_25: 18.32,
      median: 25.67,
      percentile_75: 42.15,
      sample_size: 1250,
      region: "North America",
    },
    {
      id: "2",
      industry: "E-commerce",
      platform: "Meta",
      channel: "Feed",
      kpi: "CPA",
      conversionType: "Purchase",
      percentile_25: 22.45,
      median: 30.18,
      percentile_75: 48.90,
      sample_size: 980,
      region: "North America",
    },
    {
      id: "3",
      industry: "SaaS",
      platform: "LinkedIn",
      channel: "Sponsored",
      kpi: "CPA",
      conversionType: "Lead",
      percentile_25: 45.78,
      median: 68.25,
      percentile_75: 110.50,
      sample_size: 650,
      region: "Global",
    },
    {
      id: "4",
      industry: "E-commerce",
      platform: "Google",
      channel: "Search",
      kpi: "ROAS",
      conversionType: "Purchase",
      percentile_25: 2.1,
      median: 3.4,
      percentile_75: 5.2,
      sample_size: 1250,
      region: "North America",
    },
    {
      id: "5",
      industry: "E-commerce",
      platform: "Meta",
      channel: "Feed",
      kpi: "ROAS",
      conversionType: "Purchase",
      percentile_25: 1.8,
      median: 2.9,
      percentile_75: 4.3,
      sample_size: 980,
      region: "North America",
    },
  ];

  // Mock performance data - would come from Supabase based on user's actual data
  const yourPerformance = {
    CPA: 32.45,
    ROAS: 3.8,
    CTR: 2.4,
  };

  useEffect(() => {
    // In a real implementation, this would fetch data from Supabase
    // based on the selected filters
    const fetchBenchmarkData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, we would query Supabase:
        // const { data, error } = await supabase
        //   .from('benchmarks')
        //   .select('*')
        //   .eq('industry', filters.industry !== 'All' ? filters.industry : null)
        //   .eq('platform', filters.platform !== 'All' ? filters.platform : null)
        //   ...etc
        
        // Filter the mock data based on selected filters
        const filteredData = mockBenchmarkData.filter(item => {
          return (
            (filters.industry === "All" || item.industry === filters.industry) &&
            (filters.platform === "All" || item.platform === filters.platform) &&
            (filters.channel === "All" || item.channel === filters.channel) &&
            item.kpi === filters.kpi &&
            (filters.conversionType === "All" || item.conversionType === filters.conversionType)
          );
        });
        
        setBenchmarkData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching benchmark data:", error);
        setLoading(false);
      }
    };

    // Also fetch user's team details to determine plan capabilities
    const fetchUserTeam = async () => {
      try {
        // In a real implementation, fetch user's team from Supabase
        // const { data, error } = await supabase
        //   .from('team_members')
        //   .select('teams(*)')
        //   .eq('user_id', user?.id)
        //   .single();
        
        // Mock team data
        setUserTeam({
          id: "team1",
          name: "Demo Marketing Team",
          plan: "pro" // Could be 'free', 'pro', 'pro_plus', or 'agency'
        });
      } catch (error) {
        console.error("Error fetching user team:", error);
      }
    };

    fetchBenchmarkData();
    fetchUserTeam();
  }, [filters, user]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSaveFilterSet = () => {
    // Check if user has proper plan
    if (userTeam?.plan === 'free' || userTeam?.plan === 'pro') {
      toast({
        title: "Feature requires upgrade",
        description: "Saving filter sets is available on Pro+ and Agency plans.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, save to Supabase
    toast({
      title: "Filter set saved",
      description: "Your benchmark filter configuration has been saved.",
    });
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Check if user has proper plan
    if (userTeam?.plan !== 'agency') {
      toast({
        title: "Feature requires upgrade",
        description: "Exporting reports is available on Agency plan.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: `Exporting as ${format.toUpperCase()}`,
      description: "Your benchmark data export is being prepared.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Benchmarks</h1>
          <p className="text-muted-foreground">
            Compare industry benchmarks across platforms, channels, and KPIs.
            {userTeam?.plan === 'free' && " Upgrade to see your data against industry standards."}
          </p>
        </div>

        <BenchmarkFilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveFilterSet}
            className={userTeam?.plan === 'free' || userTeam?.plan === 'pro' ? 'opacity-50' : ''}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Filter Set
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            className={userTeam?.plan !== 'agency' ? 'opacity-50' : ''}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
            className={userTeam?.plan !== 'agency' ? 'opacity-50' : ''}
          >
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>

        <Tabs defaultValue="visual">
          <TabsList>
            <TabsTrigger value="visual">Percentile Visual</TabsTrigger>
            <TabsTrigger value="table">Data Table</TabsTrigger>
          </TabsList>
          <TabsContent value="visual" className="pt-4">
            <div className="grid grid-cols-1 gap-4">
              {benchmarkData.map((benchmark) => (
                <BenchmarkPercentileVisual 
                  key={benchmark.id}
                  data={benchmark}
                  yourPerformance={filters.kpi === benchmark.kpi ? yourPerformance[benchmark.kpi as keyof typeof yourPerformance] : undefined}
                  loading={loading}
                  showYourData={userTeam?.plan !== 'free'}
                />
              ))}
              {benchmarkData.length === 0 && !loading && (
                <Card className="p-8 text-center">
                  <p>No benchmark data available for the selected filters.</p>
                </Card>
              )}
            </div>
          </TabsContent>
          <TabsContent value="table" className="pt-4">
            <BenchmarkTable 
              data={benchmarkData} 
              loading={loading} 
            />
          </TabsContent>
        </Tabs>

        {userTeam?.plan !== 'free' && (
          <IndustryComparison 
            yourPerformance={yourPerformance}
            selectedKpi={filters.kpi}
            industryBenchmarks={benchmarkData}
          />
        )}
      </div>
    </AppLayout>
  );
}
