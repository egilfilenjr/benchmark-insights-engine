
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format, startOfDay, endOfDay, subDays, subMonths } from "date-fns";
import { useState, useEffect } from "react";

interface DateRangeSelectorProps {
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  initialDateRange?: { from: Date; to: Date };
  className?: string;
}

export default function DateRangeSelector({ 
  onDateRangeChange, 
  initialDateRange,
  className 
}: DateRangeSelectorProps) {
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>(initialDateRange || {
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    // Initialize with the provided date range
    if (initialDateRange) {
      setDate(initialDateRange);
    }
  }, [initialDateRange]);

  const predefinedRanges = [
    { label: "Last 7D", getRange: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
    { label: "Last 14D", getRange: () => ({ from: subDays(new Date(), 14), to: new Date() }) },
    { label: "Last 30D", getRange: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
    { label: "Last 3M", getRange: () => ({ from: subMonths(new Date(), 3), to: new Date() }) },
  ];

  const handleRangeSelect = (range: { from: Date; to: Date }) => {
    setDate(range);
    onDateRangeChange(range);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="flex items-center space-x-2">
        {predefinedRanges.map((range) => (
          <Button
            key={range.label}
            variant="outline"
            size="sm"
            onClick={() => handleRangeSelect(range.getRange())}
          >
            {range.label}
          </Button>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMM d, yyyy")} -{" "}
                  {format(date.to, "MMM d, yyyy")}
                </>
              ) : (
                format(date.from, "MMM d, yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              if (range?.from && range?.to) {
                const normalizedRange = {
                  from: startOfDay(range.from),
                  to: endOfDay(range.to),
                };
                handleRangeSelect(normalizedRange);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
