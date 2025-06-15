
import React from "react";
import { cn } from "@/lib/utils";

type CompareMode = "competitors" | "yourself";
type Timeframe = "YOY" | "MOM" | "WOW";

interface ComparisonToggleProps {
  compareMode: CompareMode;
  setCompareMode: (mode: CompareMode) => void;
  timeframe: Timeframe;
  setTimeframe: (tf: Timeframe) => void;
  className?: string;
}

export const ComparisonToggle: React.FC<ComparisonToggleProps> = ({
  compareMode,
  setCompareMode,
  timeframe,
  setTimeframe,
  className
}) => {
  return (
    <div className={cn("flex flex-wrap gap-4 items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm border", className)}>
      <div className="flex gap-2 font-medium">
        <button 
          onClick={() => setCompareMode("competitors")}
          className={cn(
            "px-5 py-2 rounded-full transition font-semibold",
            compareMode === "competitors" ? "bg-primary text-white shadow" : "bg-muted/50 text-muted-foreground hover:bg-primary/10"
          )}
        >
          Compare vs Competitors
        </button>
        <button 
          onClick={() => setCompareMode("yourself")}
          className={cn(
            "px-5 py-2 rounded-full transition font-semibold",
            compareMode === "yourself" ? "bg-primary text-white shadow" : "bg-muted/50 text-muted-foreground hover:bg-primary/10"
          )}
        >
          Compare vs Yourself
        </button>
      </div>
      {compareMode === "yourself" && (
        <div className="flex gap-2 ml-4">
          {["YOY", "MOM", "WOW"].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf as Timeframe)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition",
                timeframe === tf ? "bg-blue-600 text-white shadow" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
