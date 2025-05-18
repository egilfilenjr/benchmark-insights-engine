
// This file is meant to define types for dashboard components

export interface KpiTileProps {
  value: number;
  change: number;
  benchmark: number;
  key: string;
  label: string; // Added for Dashboard.tsx
  title?: string; // Optional title prop
}

export interface FilterBarProps {
  dateRange?: { from: Date; to: Date }; 
  onDateChange?: (range: { from: Date; to: Date }) => void;
  onDateRangeChange?: (range: { from: Date; to: Date }) => void; // Added for compatibility
  onComparisonChange?: (comparison: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export interface TrendGraphProps {
  data: TrendEntry[];
  title: string;
  valueLabel: string; // Required property
}

export interface CampaignTableProps {
  dateRange?: { from: Date; to: Date }; 
  loading?: boolean;
  title?: string;
  campaigns?: any[];
  sortBy?: string;
  ascending?: boolean;
  onSort?: (column: string) => void;
}

export interface AlertsPanelProps {
  alerts: AlertItem[]; // Required property
  loading?: boolean;
  onClearAll?: () => void;
}

export interface TrendEntry {
  date: string;
  value: number;
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}
