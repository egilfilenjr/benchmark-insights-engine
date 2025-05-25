
import { useState, useEffect } from "react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";

interface BenchmarkFilterBarProps {
  filters: {
    industry: string;
    platform: string;
    channel: string;
    kpi: string;
    conversionType: string;
    geo: string;
  };
  onFilterChange: (filters: any) => void;
}

export default function BenchmarkFilterBar({ 
  filters, 
  onFilterChange 
}: BenchmarkFilterBarProps) {
  const industries = [
    "All", 
    "E-commerce", 
    "SaaS", 
    "B2B Services", 
    "Financial Services", 
    "Education", 
    "Healthcare"
  ];
  
  const platforms = [
    "All", 
    "Google", 
    "Meta", 
    "LinkedIn", 
    "TikTok"
  ];
  
  const channels = [
    "All", 
    "Search", 
    "Display", 
    "Feed", 
    "Stories", 
    "Reels", 
    "Sponsored", 
    "Video"
  ];
  
  const kpis = [
    "CPA", 
    "ROAS", 
    "CTR"
  ];
  
  const conversionTypes = [
    "All", 
    "Purchase", 
    "Lead", 
    "Install", 
    "Registration"
  ];
  
  const geos = [
    "All", 
    "North America", 
    "Europe", 
    "Asia Pacific", 
    "Latin America", 
    "Global"
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    onFilterChange(newFilters);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <FilterDropdown 
            label="Industry"
            options={industries}
            value={filters.industry}
            onChange={(value) => handleFilterChange('industry', value)}
          />
          
          <FilterDropdown 
            label="Platform"
            options={platforms}
            value={filters.platform}
            onChange={(value) => handleFilterChange('platform', value)}
          />
          
          <FilterDropdown 
            label="Channel"
            options={channels}
            value={filters.channel}
            onChange={(value) => handleFilterChange('channel', value)}
          />
          
          <FilterDropdown 
            label="KPI"
            options={kpis}
            value={filters.kpi}
            onChange={(value) => handleFilterChange('kpi', value)}
          />
          
          <FilterDropdown 
            label="Conversion Type"
            options={conversionTypes}
            value={filters.conversionType}
            onChange={(value) => handleFilterChange('conversionType', value)}
          />
          
          <FilterDropdown 
            label="Geo"
            options={geos}
            value={filters.geo}
            onChange={(value) => handleFilterChange('geo', value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {value}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {options.map((option) => (
            <DropdownMenuItem 
              key={option}
              onClick={() => onChange(option)}
              className={value === option ? "bg-muted" : ""}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
