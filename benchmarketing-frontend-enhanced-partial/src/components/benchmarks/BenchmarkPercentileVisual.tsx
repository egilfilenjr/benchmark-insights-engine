
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface BenchmarkData {
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

interface BenchmarkPercentileVisualProps {
  data: BenchmarkData;
  yourPerformance?: number;
  loading?: boolean;
  showYourData?: boolean;
}

export default function BenchmarkPercentileVisual({
  data,
  yourPerformance,
  loading = false,
  showYourData = true,
}: BenchmarkPercentileVisualProps) {
  
  // For KPIs like CPA where lower is better
  const isLowerBetter = data.kpi === "CPA";
  
  // Format based on KPI type
  const formatValue = (value: number) => {
    switch (data.kpi) {
      case "CPA":
        return `$${value.toFixed(2)}`;
      case "ROAS":
        return `${value.toFixed(1)}x`;
      case "CTR":
        return `${value.toFixed(2)}%`;
      default:
        return value.toFixed(2);
    }
  };
  
  // Determine where your performance sits in the distribution
  const getYourPerformancePosition = () => {
    if (!yourPerformance) return null;
    
    const min = isLowerBetter ? 0 : data.percentile_25 * 0.5;
    const max = isLowerBetter ? data.percentile_75 * 1.5 : data.percentile_75 * 1.5;
    const range = max - min;
    
    let position = ((yourPerformance - min) / range) * 100;
    position = Math.max(0, Math.min(position, 100)); // Clamp between 0-100
    
    return `${position}%`;
  };
  
  // Get the color for performance indicator based on where you stand
  const getPerformanceColor = () => {
    if (!yourPerformance) return "bg-gray-400";
    
    if (isLowerBetter) {
      if (yourPerformance < data.percentile_25) return "bg-green-500";
      if (yourPerformance < data.median) return "bg-green-400";
      if (yourPerformance < data.percentile_75) return "bg-yellow-500";
      return "bg-red-500";
    } else {
      if (yourPerformance > data.percentile_75) return "bg-green-500";
      if (yourPerformance > data.median) return "bg-green-400";
      if (yourPerformance > data.percentile_25) return "bg-yellow-500";
      return "bg-red-500";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            {`${data.platform} ${data.channel} ${data.kpi}`}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Based on {data.sample_size.toLocaleString()} {data.conversionType} conversions 
                    in {data.industry} industry. Region: {data.region}.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          {showYourData && yourPerformance && (
            <div className="text-sm font-medium flex items-center">
              Your {data.kpi}: {formatValue(yourPerformance)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="relative h-16">
            {/* Benchmark distribution visualization */}
            <div className="absolute left-0 right-0 top-4 h-2 bg-gray-100 rounded-full">
              {/* 25th to 75th percentile range */}
              <div 
                className="absolute h-full bg-blue-200 rounded-full"
                style={{ 
                  left: `${(data.percentile_25 / (data.percentile_75 * 1.5)) * 100}%`, 
                  width: `${((data.percentile_75 - data.percentile_25) / (data.percentile_75 * 1.5)) * 100}%`
                }}
              ></div>
              
              {/* Median line */}
              <div 
                className="absolute h-4 w-1 bg-blue-600 -top-1 rounded"
                style={{ left: `${(data.median / (data.percentile_75 * 1.5)) * 100}%` }}
              ></div>
              
              {/* Your performance marker */}
              {showYourData && yourPerformance && (
                <div 
                  className={`absolute h-6 w-2 -top-2 rounded ${getPerformanceColor()}`}
                  style={{ left: getYourPerformancePosition() }}
                >
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium ${getPerformanceColor().replace('bg-', 'text-')}`}>
                    You
                  </div>
                </div>
              )}
              
              {/* Benchmark labels */}
              <div 
                className="absolute -bottom-6 text-xs text-muted-foreground"
                style={{ left: `${(data.percentile_25 / (data.percentile_75 * 1.5)) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {formatValue(data.percentile_25)}
              </div>
              <div 
                className="absolute -bottom-6 text-xs text-muted-foreground"
                style={{ left: `${(data.median / (data.percentile_75 * 1.5)) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {formatValue(data.median)}
              </div>
              <div 
                className="absolute -bottom-6 text-xs text-muted-foreground"
                style={{ left: `${(data.percentile_75 / (data.percentile_75 * 1.5)) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {formatValue(data.percentile_75)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 text-center">
            <div>
              <div className="text-sm text-muted-foreground">25th Percentile</div>
              <div className="text-lg font-medium">{formatValue(data.percentile_25)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Median</div>
              <div className="text-lg font-medium">{formatValue(data.median)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">75th Percentile</div>
              <div className="text-lg font-medium">{formatValue(data.percentile_75)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
