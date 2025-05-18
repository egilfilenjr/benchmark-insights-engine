
// This file is meant to define types for dashboard components

export interface KpiTileProps {
  value: number;
  change: number;
  benchmark: number;
  key: string;
  label?: string; // Added to fix the type error
}

export interface FilterBarProps {
  dateRange?: { from: Date; to: Date }; // Added to fix the type error
  onDateChange?: (range: { from: Date; to: Date }) => void;
}

export interface TrendGraphProps {
  data: TrendEntry[];
  title: string;
  valueLabel: string; // Required property
}

export interface CampaignTableProps {
  dateRange?: { from: Date; to: Date }; // Added to fix the type error
  loading?: boolean;
}

export interface AlertsPanelProps {
  alerts: AlertItem[]; // Required property
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
