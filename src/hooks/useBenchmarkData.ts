
import { useState, useEffect } from "react";
import { MOCK_BENCHMARKS, BenchmarkData } from "@/data/mockBenchmarks";

interface Filters {
  industry: string;
  platform: string;
  channel: string;
  kpi: string;
  conversionType: string;
  geo: string;
}

export function useBenchmarkData(filters: Filters) {
  const [loading, setLoading] = useState(true);
  const [benchmarks, setBenchmarks] = useState<BenchmarkData[]>([]);

  useEffect(() => {
    setLoading(true);
    
    // Simulate API request delay
    const timer = setTimeout(() => {
      // Filter benchmarks based on active filters
      const filtered = MOCK_BENCHMARKS.filter(benchmark => {
        return (
          (filters.industry === "All" || benchmark.industry === filters.industry) &&
          (filters.platform === "All" || benchmark.platform === filters.platform) &&
          (filters.channel === "All" || benchmark.channel === filters.channel) &&
          (filters.kpi === "All" || benchmark.kpi === filters.kpi) &&
          (filters.conversionType === "All" || benchmark.conversionType === filters.conversionType) &&
          (filters.geo === "All" || benchmark.region === filters.geo)
        );
      });
      
      setBenchmarks(filtered);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [filters]);

  return { benchmarks, loading };
}
