
// This file defines types for dashboard components

export interface KpiTileProps {
  title: string;
  value: number;
  change: number;
  benchmark: number;
  format?: "percentage" | "currency" | "number";
  tooltipText?: string;
  loading?: boolean;
  color?: string;
  benchmarkComparison?: {
    value: number;
    label: string;
  };
}

export interface FilterBarProps {
  dateRange: { from: Date; to: Date }; 
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  onComparisonChange?: (comparison: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export interface DataPoint {
  date: string; // Keep as string for easier JSON handling
  value: number;
  benchmark?: number;
}

export interface TrendGraphProps {
  data: DataPoint[];
  title: string;
  valueLabel: string;
  benchmarkLabel?: string;
  valueFormat?: "currency" | "percentage" | "number";
  loading?: boolean;
  selectedMetric?: string;
  setSelectedMetric?: (metric: string) => void;
}

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  spend: number;
  conversions: number;
  cpa: number;
  roas: number;
  ctr: number;
  vsBenchmark: number;
  status?: string; // Optional status field
}

export interface CampaignTableProps {
  dateRange: { from: Date; to: Date }; 
  loading?: boolean;
  title?: string;
  campaigns?: Campaign[];
  sortBy?: string;
  ascending?: boolean;
  onSort?: (column: string) => void;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "success";
  message: string;
  timestamp: string; // Keep as string for easier JSON handling
  actionLabel?: string;
  onAction?: () => void;
}

export interface AlertsPanelProps {
  alerts: Alert[];
  loading?: boolean;
  onClearAll?: () => void;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TrendEntry {
  date: string;
  value: number;
}

// Date range selector props
export interface DateRangeSelectorProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  initialDateRange?: { from: Date; to: Date };
  className?: string;
}
