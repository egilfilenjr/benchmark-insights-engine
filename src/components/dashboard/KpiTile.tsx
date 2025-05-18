
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { KpiTileProps } from "./types";

export default function KpiTile({
  title,
  value,
  change,
  format = "number",
  tooltipText,
  loading = false,
  benchmarkComparison,
}: KpiTileProps) {
  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val;
    
    switch (format) {
      case "percentage":
        return `${val.toFixed(2)}%`;
      case "currency":
        return `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      default:
        return val.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
    }
  };

  const renderChangeIndicator = () => {
    if (change === 0) {
      return <Minus className="h-4 w-4 text-yellow-500" />;
    }
    
    const isPositive = change > 0;
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
    const colorClass = title === "CPA" 
      ? (isPositive ? "text-red-500" : "text-green-500") 
      : (isPositive ? "text-green-500" : "text-red-500");
    
    return (
      <div className={`flex items-center ${colorClass}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span>{Math.abs(change).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            {tooltipText ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-help">
                    <span className="border-b border-dotted border-gray-400">{title}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              title
            )}
          </CardTitle>
          {!loading && renderChangeIndicator()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? "..." : formatValue(value)}
        </div>
        
        {benchmarkComparison && !loading && (
          <div className="text-xs text-muted-foreground mt-1">
            {benchmarkComparison.label}: {formatValue(benchmarkComparison.value)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
