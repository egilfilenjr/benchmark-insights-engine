
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AecrScorePanelProps {
  score: number;
  percentile: number;
  previousScore?: number;
  loading?: boolean;
}

export default function AecrScorePanel({
  score,
  percentile,
  previousScore,
  loading = false,
}: AecrScorePanelProps) {
  const scoreChange = previousScore ? score - previousScore : 0;
  const isPositive = scoreChange > 0;
  const changeText = scoreChange === 0 
    ? "No change" 
    : `${isPositive ? "+" : ""}${scoreChange.toFixed(1)} pts`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            AECR Score™ 
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    The Ad Efficiency & Conversion Rate (AECR) Score measures your overall 
                    marketing performance as a single metric from 0-100, combining CPA, ROAS, and CTR.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            {percentile}th percentile
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              {loading ? "..." : score.toFixed(1)}
            </div>
            <div className={`text-sm flex items-center ${isPositive ? 'text-green-600' : scoreChange < 0 ? 'text-red-600' : 'text-gray-500'}`}>
              {loading ? "..." : changeText}
              <span className="text-xs ml-1">vs prev</span>
            </div>
          </div>
          <Progress 
            value={loading ? 0 : score} 
            max={100} 
            indicatorClassName={percentile > 75 ? "bg-green-500" : percentile > 40 ? "bg-yellow-500" : "bg-red-500"}
            className="h-2.5" 
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <div>0</div>
            <div>100</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
