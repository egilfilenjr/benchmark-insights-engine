
export interface BenchmarkData {
  id: string;
  industry: string;
  platform: string;
  channel: string;
  kpi: string;
  conversionType: string;
  percentile_25: number;
  median: number;
  percentile_75: number;
  sample_size: number;
  region: string;
}

export const MOCK_BENCHMARKS: BenchmarkData[] = [
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
  },
  {
    id: "4",
    industry: "E-commerce",
    platform: "Meta",
    channel: "Feed",
    kpi: "CPA",
    conversionType: "Purchase",
    percentile_25: 38.45,
    median: 52.18,
    percentile_75: 68.92,
    sample_size: 980,
    region: "North America"
  },
  {
    id: "5",
    industry: "E-commerce",
    platform: "Meta",
    channel: "Feed",
    kpi: "ROAS",
    conversionType: "Purchase",
    percentile_25: 2.8,
    median: 4.2,
    percentile_75: 6.1,
    sample_size: 980,
    region: "North America"
  }
];

export const YOUR_PERFORMANCE = {
  CPA: 54.12,
  ROAS: 3.8,
  CTR: 2.8
};
