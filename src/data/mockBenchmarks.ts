
export interface BenchmarkData {
  id: string;
  industry: string;
  platform: string;
  channel: string;
  kpi: string;
  conversionType: string;
  region: string;
  value: number;
  percentile_25: number;
  median: number;
  percentile_75: number;
  sample_size: number;
  last_updated: string;
}

// Updated mock data using new industry categorization
export const MOCK_BENCHMARKS: BenchmarkData[] = [
  // Consumer Products - Food & Beverage
  {
    id: "1",
    industry: "Consumer Products → Food & Beverage → Restaurants → QSR",
    platform: "Meta Ads",
    channel: "Social",
    kpi: "CPA",
    conversionType: "Purchase",
    region: "North America",
    value: 12.50,
    percentile_25: 8.20,
    median: 12.50,
    percentile_75: 18.90,
    sample_size: 450,
    last_updated: "2024-01-15"
  },
  {
    id: "2",
    industry: "Consumer Products → Food & Beverage → Beverages → Coffee",
    platform: "Google Ads",
    channel: "Search",
    kpi: "ROAS",
    conversionType: "Purchase",
    region: "North America",
    value: 4.2,
    percentile_25: 3.1,
    median: 4.2,
    percentile_75: 5.8,
    sample_size: 230,
    last_updated: "2024-01-15"
  },
  {
    id: "3",
    industry: "Consumer Products → Beauty & Personal Care → Skincare → SPF",
    platform: "TikTok Ads",
    channel: "Social",
    kpi: "CTR",
    conversionType: "Add to Cart",
    region: "North America",
    value: 2.8,
    percentile_25: 1.9,
    median: 2.8,
    percentile_75: 4.1,
    sample_size: 180,
    last_updated: "2024-01-15"
  },
  {
    id: "4",
    industry: "Consumer Products → Apparel & Accessories → Fashion → Women's Clothing",
    platform: "Meta Ads",
    channel: "Social",
    kpi: "CPA",
    conversionType: "Purchase",
    region: "Europe",
    value: 22.40,
    percentile_25: 15.30,
    median: 22.40,
    percentile_75: 31.20,
    sample_size: 320,
    last_updated: "2024-01-15"
  },
  {
    id: "5",
    industry: "Consumer Products → Home Goods & Lifestyle → Furniture → Living Room",
    platform: "Google Ads",
    channel: "Search",
    kpi: "ROAS",
    conversionType: "Purchase",
    region: "North America",
    value: 3.8,
    percentile_25: 2.9,
    median: 3.8,
    percentile_75: 5.2,
    sample_size: 150,
    last_updated: "2024-01-15"
  },
  
  // Personal Services
  {
    id: "6",
    industry: "Personal Services → Healthcare & Wellness → Dental → General Dentistry",
    platform: "Google Ads",
    channel: "Search",
    kpi: "CPA",
    conversionType: "Lead",
    region: "North America",
    value: 85.20,
    percentile_25: 62.50,
    median: 85.20,
    percentile_75: 125.80,
    sample_size: 280,
    last_updated: "2024-01-15"
  },
  {
    id: "7",
    industry: "Personal Services → Fitness & Wellness → Studios → Yoga",
    platform: "Meta Ads",
    channel: "Social",
    kpi: "CTR",
    conversionType: "Sign Up",
    region: "North America",
    value: 1.9,
    percentile_25: 1.2,
    median: 1.9,
    percentile_75: 2.8,
    sample_size: 120,
    last_updated: "2024-01-15"
  },
  {
    id: "8",
    industry: "Personal Services → Travel & Tourism → Hotels → Boutique Hotels",
    platform: "Google Ads",
    channel: "Search",
    kpi: "ROAS",
    conversionType: "Booking",
    region: "Europe",
    value: 6.5,
    percentile_25: 4.8,
    median: 6.5,
    percentile_75: 8.9,
    sample_size: 95,
    last_updated: "2024-01-15"
  },

  // B2B Software & Services
  {
    id: "9",
    industry: "B2B Software & Services → B2B SaaS → Marketing → Email Platforms",
    platform: "LinkedIn Ads",
    channel: "Social",
    kpi: "CPA",
    conversionType: "Trial Sign Up",
    region: "North America",
    value: 145.60,
    percentile_25: 98.20,
    median: 145.60,
    percentile_75: 210.40,
    sample_size: 85,
    last_updated: "2024-01-15"
  },
  {
    id: "10",
    industry: "B2B Software & Services → B2B SaaS → Sales → CRM",
    platform: "Google Ads",
    channel: "Search",
    kpi: "CTR",
    conversionType: "Demo Request",
    region: "North America",
    value: 3.2,
    percentile_25: 2.1,
    median: 3.2,
    percentile_75: 4.8,
    sample_size: 65,
    last_updated: "2024-01-15"
  },

  // Real Estate
  {
    id: "11",
    industry: "Real Estate, Property, Construction → Residential Real Estate → Brokerages",
    platform: "Meta Ads",
    channel: "Social",
    kpi: "CPA",
    conversionType: "Lead",
    region: "North America",
    value: 42.80,
    percentile_25: 28.90,
    median: 42.80,
    percentile_75: 62.10,
    sample_size: 190,
    last_updated: "2024-01-15"
  },

  // Energy & Utilities
  {
    id: "12",
    industry: "Energy, Utilities, Natural Resources → Renewable Energy → Solar",
    platform: "Google Ads",
    channel: "Search",
    kpi: "CPA",
    conversionType: "Consultation",
    region: "North America",
    value: 125.40,
    percentile_25: 89.30,
    median: 125.40,
    percentile_75: 178.90,
    sample_size: 45,
    last_updated: "2024-01-15"
  },

  // Gaming & Entertainment
  {
    id: "13",
    industry: "Gaming, Entertainment, Media → Gaming → Game Studios",
    platform: "TikTok Ads",
    channel: "Social",
    kpi: "CTR",
    conversionType: "App Install",
    region: "Global",
    value: 4.1,
    percentile_25: 2.8,
    median: 4.1,
    percentile_75: 6.2,
    sample_size: 75,
    last_updated: "2024-01-15"
  },

  // Additional examples across different domains
  {
    id: "14",
    industry: "Consumer Products → Consumer Electronics → Smart Home",
    platform: "Amazon Ads",
    channel: "Search",
    kpi: "ROAS",
    conversionType: "Purchase",
    region: "North America",
    value: 3.9,
    percentile_25: 2.7,
    median: 3.9,
    percentile_75: 5.4,
    sample_size: 110,
    last_updated: "2024-01-15"
  },
  {
    id: "15",
    industry: "Personal Services → Education & Learning → Online Courses → Tech Courses",
    platform: "YouTube Ads",
    channel: "Video",
    kpi: "CPA",
    conversionType: "Course Purchase",
    region: "Global",
    value: 89.50,
    percentile_25: 65.20,
    median: 89.50,
    percentile_75: 124.80,
    sample_size: 140,
    last_updated: "2024-01-15"
  }
];

// Helper function to get unique values for filters
export const getUniqueIndustries = () => [...new Set(MOCK_BENCHMARKS.map(b => b.industry))];
export const getUniquePlatforms = () => [...new Set(MOCK_BENCHMARKS.map(b => b.platform))];
export const getUniqueChannels = () => [...new Set(MOCK_BENCHMARKS.map(b => b.channel))];
export const getUniqueKPIs = () => [...new Set(MOCK_BENCHMARKS.map(b => b.kpi))];
export const getUniqueConversionTypes = () => [...new Set(MOCK_BENCHMARKS.map(b => b.conversionType))];
export const getUniqueRegions = () => [...new Set(MOCK_BENCHMARKS.map(b => b.region))];
