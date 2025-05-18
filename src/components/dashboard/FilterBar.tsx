
import { useState } from "react";
import DateRangeSelector from "./DateRangeSelector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";
import { FilterBarProps } from "./types";

export default function FilterBar({
  dateRange,
  onDateRangeChange,
  onComparisonChange,
  onFilterChange,
}: FilterBarProps) {
  const [activeComparison, setActiveComparison] = useState("vs Previous Period");
  const [filters, setFilters] = useState({
    conversionType: "Purchase",
    campaignType: "All",
    platform: "All",
  });

  const comparisonOptions = [
    "vs Previous Period",
    "vs Industry",
    "vs Top 25%",
  ];

  const filterOptions = {
    conversionType: ["Purchase", "Lead", "Install", "Registration"],
    campaignType: ["All", "Search", "Display", "Social", "Video"],
    platform: ["All", "Google", "Meta", "LinkedIn", "TikTok"],
  };

  const handleComparisonChange = (comparison: string) => {
    setActiveComparison(comparison);
    if (onComparisonChange) onComparisonChange(comparison);
  };

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex-1">
        <DateRangeSelector onDateRangeChange={onDateRangeChange} />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {activeComparison}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {comparisonOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => handleComparisonChange(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {Object.entries(filterOptions).map(([type, options]) => (
              <div key={type} className="p-2">
                <div className="text-sm font-medium mb-1">
                  {type === "conversionType" ? "Conversion Type" : 
                   type === "campaignType" ? "Campaign Type" : "Platform"}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {options.map((option) => (
                    <Button
                      key={option}
                      variant={filters[type as keyof typeof filters] === option ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={() => handleFilterChange(type, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
