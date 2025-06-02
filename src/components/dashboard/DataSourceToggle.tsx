
import React, { useState, useEffect } from 'react';
import { Calendar, CalendarIcon, TrendingUp, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';

export type DataMode = 'your-data' | 'industry-benchmarks';
export type BenchmarkRange = 'month-over-month' | 'year-over-year';

export interface DateRange {
  from: Date;
  to: Date;
}

interface DataSourceToggleProps {
  dataMode: DataMode;
  dateRange: DateRange;
  benchmarkRange: BenchmarkRange;
  onDataModeChange: (mode: DataMode) => void;
  onDateRangeChange: (range: DateRange) => void;
  onBenchmarkRangeChange: (range: BenchmarkRange) => void;
  className?: string;
}

const DataSourceToggle: React.FC<DataSourceToggleProps> = ({
  dataMode,
  dateRange,
  benchmarkRange,
  onDataModeChange,
  onDateRangeChange,
  onBenchmarkRangeChange,
  className
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Predefined date ranges
  const predefinedRanges = [
    {
      label: 'Last 7 Days',
      range: { from: subDays(new Date(), 7), to: new Date() }
    },
    {
      label: 'Last 30 Days',
      range: { from: subDays(new Date(), 30), to: new Date() }
    },
    {
      label: 'This Month',
      range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) }
    },
    {
      label: 'Last 3 Months',
      range: { from: subMonths(new Date(), 3), to: new Date() }
    }
  ];

  const handlePredefinedRangeSelect = (range: DateRange) => {
    onDateRangeChange(range);
    setIsCalendarOpen(false);
  };

  const formatDateRange = (range: DateRange) => {
    if (range.from && range.to) {
      return `${format(range.from, 'MMM d')} - ${format(range.to, 'MMM d, yyyy')}`;
    }
    return 'Select date range';
  };

  return (
    <Card className={cn("w-full max-w-4xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm", className)}>
      <CardContent className="p-6 space-y-6">
        {/* Data Source Toggle */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Source
          </h3>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 w-fit">
            <button
              onClick={() => onDataModeChange('your-data')}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2",
                dataMode === 'your-data'
                  ? "bg-white dark:bg-gray-700 text-primary shadow-md transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              <TrendingUp className="h-4 w-4" />
              Your Data
            </button>
            <button
              onClick={() => onDataModeChange('industry-benchmarks')}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2",
                dataMode === 'industry-benchmarks'
                  ? "bg-white dark:bg-gray-700 text-primary shadow-md transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              <Database className="h-4 w-4" />
              Industry Benchmarks
            </button>
          </div>
        </div>

        {/* Date Controls */}
        <div className="space-y-4">
          {dataMode === 'your-data' ? (
            <div className="space-y-3">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Date Range
              </h4>
              
              {/* Predefined Range Buttons */}
              <div className="flex flex-wrap gap-2">
                {predefinedRanges.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePredefinedRangeSelect(preset.range)}
                    className="rounded-full text-xs hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>

              {/* Custom Date Picker */}
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-fit justify-start text-left font-normal rounded-full",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDateRange(dateRange)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-xl border-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        onDateRangeChange({ from: range.from, to: range.to });
                        setIsCalendarOpen(false);
                      }
                    }}
                    numberOfMonths={2}
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>

              {/* Selected Range Display */}
              {dateRange && (
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                  <p className="text-sm text-primary font-medium">
                    Selected: {formatDateRange(dateRange)}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Comparison Period
              </h4>
              
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 w-fit">
                <button
                  onClick={() => onBenchmarkRangeChange('month-over-month')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out",
                    benchmarkRange === 'month-over-month'
                      ? "bg-white dark:bg-gray-700 text-primary shadow-md transform scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  Month-over-Month
                </button>
                <button
                  onClick={() => onBenchmarkRangeChange('year-over-year')}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out",
                    benchmarkRange === 'year-over-year'
                      ? "bg-white dark:bg-gray-700 text-primary shadow-md transform scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  Year-over-Year
                </button>
              </div>

              {/* Benchmark Range Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {benchmarkRange === 'month-over-month' 
                    ? 'Comparing current month performance against the previous month'
                    : 'Comparing current period performance against the same period last year'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              dataMode === 'your-data' ? "bg-green-500" : "bg-blue-500"
            )} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {dataMode === 'your-data' ? 'Using your connected data' : 'Using industry benchmark data'}
            </span>
          </div>
          {dataMode === 'your-data' && (
            <span className="text-xs text-gray-500 dark:text-gray-500">
              Last updated: {format(new Date(), 'MMM d, h:mm a')}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceToggle;
