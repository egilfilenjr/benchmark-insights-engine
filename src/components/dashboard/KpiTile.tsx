
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiTileProps {
  title: string;
  value: number;
  change: number;
  benchmark: number;
  color?: string;
}

export default function KpiTile({ title, value, change, benchmark, color = "gray" }: KpiTileProps) {
  const formatValue = (val: number) => {
    if (title.includes("CPA") || title.includes("$")) {
      return `$${val.toFixed(2)}`;
    }
    if (title.includes("ROAS")) {
      return `${val.toFixed(2)}x`;
    }
    if (title.includes("CTR") || title.includes("%")) {
      return `${val.toFixed(2)}%`;
    }
    return val.toLocaleString();
  };

  const getTrendIcon = () => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return "border-green-200 bg-green-50";
      case "yellow":
        return "border-yellow-200 bg-yellow-50";
      case "red":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <Card className={`${getColorClasses()} transition-colors`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">
          {formatValue(value)}
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={change >= 0 ? "text-green-600" : "text-red-600"}>
              {change >= 0 ? "+" : ""}{change.toFixed(1)}%
            </span>
          </div>
          <div className="text-gray-500">
            vs {formatValue(benchmark)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
