
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowDown, ArrowUp } from "lucide-react";

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

interface IndustryComparisonProps {
  yourPerformance: {
    CPA: number;
    ROAS: number;
    CTR: number;
    [key: string]: number;
  };
  selectedKpi: string;
  industryBenchmarks: BenchmarkData[];
}

export default function IndustryComparison({
  yourPerformance,
  selectedKpi,
  industryBenchmarks,
}: IndustryComparisonProps) {
  // Format based on KPI type
  const formatValue = (value: number, kpi: string) => {
    switch (kpi) {
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

  // For KPIs like CPA where lower is better
  const isLowerBetter = selectedKpi === "CPA";
  
  // Calculate the average median value for the selected KPI
  const averageMedian = industryBenchmarks
    .filter(item => item.kpi === selectedKpi)
    .reduce((sum, item) => sum + item.median, 0) / 
    Math.max(1, industryBenchmarks.filter(item => item.kpi === selectedKpi).length);

  // Calculate performance difference
  const performanceDiff = yourPerformance[selectedKpi] - averageMedian;
  const performancePercent = (Math.abs(performanceDiff) / averageMedian) * 100;
  
  // Determine if the performance is good or bad
  const isGoodPerformance = isLowerBetter ? performanceDiff < 0 : performanceDiff > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>You vs. Industry Average</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Your {selectedKpi}</div>
            <div className="text-3xl font-bold">{formatValue(yourPerformance[selectedKpi], selectedKpi)}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Industry Average</div>
            <div className="text-3xl font-bold">{formatValue(averageMedian, selectedKpi)}</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Performance</div>
            <div className={`text-3xl font-bold flex items-center ${isGoodPerformance ? 'text-green-600' : 'text-red-600'}`}>
              {isGoodPerformance ? (
                <ArrowUp className="mr-1 h-6 w-6" />
              ) : (
                <ArrowDown className="mr-1 h-6 w-6" />
              )}
              {performancePercent.toFixed(1)}% {isGoodPerformance ? 'better' : 'worse'}
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <div>0</div>
            <div>Industry Median</div>
            <div>{formatValue(averageMedian * 2, selectedKpi)}</div>
          </div>
          <div className="relative">
            <Progress value={averageMedian} max={averageMedian * 2} className="h-3" />
            
            {/* Industry median marker */}
            <div 
              className="absolute top-0 w-1 h-5 bg-black"
              style={{ left: `${(averageMedian / (averageMedian * 2)) * 100}%` }}
            ></div>
            
            {/* Your performance marker */}
            <div 
              className={`absolute top-0 w-2 h-5 ${isGoodPerformance ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ 
                left: `${(yourPerformance[selectedKpi] / (averageMedian * 2)) * 100}%`,
                transform: 'translateX(-50%)'
              }}
            ></div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Performance Insight:</h4>
            <p className="text-sm text-muted-foreground">
              {isGoodPerformance ? (
                <>
                  Your {selectedKpi} is outperforming the industry average by {performancePercent.toFixed(1)}%.
                  {selectedKpi === 'CPA' && 'This means you\'re acquiring customers more efficiently than your competitors.'}
                  {selectedKpi === 'ROAS' && 'This indicates your ad spend is generating better returns than average.'}
                  {selectedKpi === 'CTR' && 'Your ads are more engaging than industry benchmarks.'}
                </>
              ) : (
                <>
                  Your {selectedKpi} is underperforming the industry average by {performancePercent.toFixed(1)}%.
                  {selectedKpi === 'CPA' && 'This suggests an opportunity to optimize your acquisition costs.'}
                  {selectedKpi === 'ROAS' && 'Consider reviewing your campaign targeting to improve ROI.'}
                  {selectedKpi === 'CTR' && 'You may want to test new ad creative to improve engagement.'}
                </>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
