import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useCompanyIndustry } from '@/hooks/useCompanyIndustry';

export interface CampaignData {
  id: string;
  campaign_id: string;
  campaign_name: string;
  platform: string;
  channel: string;
  status: string;
  objective?: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  conversion_value: number;
  ctr: number;
  cost_per_click: number;
  cpa: number;
  roas: number;
  conversion_rate: number;
  created_at: string;
}

export interface BenchmarkComparison {
  id: string;
  campaign_id: string;
  benchmark: {
    id: string;
    industry: string;
    platform: string;
    kpi: string;
    percentile_25: number;
    median: number;
    percentile_75: number;
    sample_size: number;
  };
  user_value: number;
  benchmark_percentile: number;
  performance_score: number;
}

export interface CampaignWithBenchmarks extends CampaignData {
  benchmarks: BenchmarkComparison[];
}

export function useCampaignData() {
  const { user } = useUserProfile();
  const { companyIndustry } = useCompanyIndustry();
  const [campaigns, setCampaigns] = useState<CampaignWithBenchmarks[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadCampaignData();
    }
  }, [user?.id]);

  const loadCampaignData = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      // Get campaigns for this user's team
      const { data: campaignData, error: campaignError } = await supabase
        .from('campaigns')
        .select(`
          *,
          oauth_accounts!inner(user_id)
        `)
        .eq('oauth_accounts.user_id', user.id)
        .order('created_at', { ascending: false });

      if (campaignError) throw campaignError;

      // Get benchmark comparisons
      const { data: benchmarkData, error: benchmarkError } = await supabase
        .from('campaign_benchmarks')
        .select(`
          *,
          benchmarks(*)
        `)
        .in('campaign_id', (campaignData || []).map(c => c.id));

      if (benchmarkError) console.error('Error loading benchmarks:', benchmarkError);

      // Combine campaigns with their benchmarks - use 'as any' for now until types regenerate
      const campaignsWithBenchmarks = (campaignData || []).map((campaign: any) => ({
        ...campaign,
        benchmarks: (benchmarkData || [])
          .filter((b: any) => b.campaign_id === campaign.id)
          .map((b: any) => ({
            id: b.id,
            campaign_id: b.campaign_id,
            benchmark: b.benchmarks,
            user_value: b.user_value,
            benchmark_percentile: b.benchmark_percentile,
            performance_score: b.performance_score
          }))
      })) as CampaignWithBenchmarks[];

      setCampaigns(campaignsWithBenchmarks);
    } catch (error) {
      console.error('Error loading campaign data:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncCampaignData = async (provider: string) => {
    if (!user?.id) return false;

    setSyncing(true);
    try {
      const response = await supabase.functions.invoke('sync-campaign-data', {
        body: { user_id: user.id, provider }
      });

      if (response.error) throw response.error;

      // Reload data after successful sync
      await loadCampaignData();
      return true;
    } catch (error) {
      console.error('Sync error:', error);
      return false;
    } finally {
      setSyncing(false);
    }
  };

  const getPerformanceSummary = () => {
    if (campaigns.length === 0) return null;

    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalConversionValue = campaigns.reduce((sum, c) => sum + c.conversion_value, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);

    const averageRoas = totalConversionValue / totalSpend;
    const averageCpa = totalSpend / totalConversions;
    const averageCtr = (totalClicks / totalImpressions) * 100;

    // Calculate overall performance vs benchmarks
    const allBenchmarks = campaigns.flatMap(c => c.benchmarks);
    const averagePerformanceScore = allBenchmarks.length > 0 
      ? allBenchmarks.reduce((sum, b) => sum + b.performance_score, 0) / allBenchmarks.length
      : 0;

    return {
      totalSpend,
      totalConversions,
      totalConversionValue,
      averageRoas,
      averageCpa,
      averageCtr,
      campaignCount: campaigns.length,
      averagePerformanceScore: Math.round(averagePerformanceScore),
      benchmarkComparisons: allBenchmarks.length
    };
  };

  const getIndustryRelevantBenchmarks = () => {
    if (!companyIndustry) return [];

    // Return unique benchmarks from all campaigns that match the user's industry
    const relevantBenchmarks = campaigns
      .flatMap(c => c.benchmarks)
      .filter(b => {
        const benchmark = b.benchmark;
        return (
          benchmark.industry.toLowerCase().includes(companyIndustry.domain?.toLowerCase() || '') ||
          benchmark.industry.toLowerCase().includes(companyIndustry.category?.toLowerCase() || '') ||
          benchmark.industry.toLowerCase().includes(companyIndustry.subcategory?.toLowerCase() || '')
        );
      });

    // Remove duplicates by benchmark ID
    const uniqueBenchmarks = relevantBenchmarks.filter((b, index, self) => 
      index === self.findIndex(x => x.benchmark.id === b.benchmark.id)
    );

    return uniqueBenchmarks;
  };

  return {
    campaigns,
    loading,
    syncing,
    loadCampaignData,
    syncCampaignData,
    getPerformanceSummary,
    getIndustryRelevantBenchmarks
  };
}