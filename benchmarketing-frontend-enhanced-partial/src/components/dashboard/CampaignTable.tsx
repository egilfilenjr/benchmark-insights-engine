
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Campaign, CampaignTableProps } from "./types";

export default function CampaignTable({
  title,
  campaigns = [],
  sortBy = "vsBenchmark",
  ascending = false,
  loading = false,
  dateRange,
  onSort,
}: CampaignTableProps) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const renderBenchmarkComparison = (value: number) => {
    const isPositive = value > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <div
        className={cn(
          "flex items-center",
          isPositive ? "text-green-500" : "text-red-500"
        )}
      >
        <Icon className="h-4 w-4 mr-1" />
        <span>{isPositive ? "+" : ""}{value.toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Loading campaigns...
          </div>
        ) : campaigns.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No campaign data available for the selected date range.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("name")}
                  >
                    Campaign
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("platform")}
                  >
                    Platform
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("spend")}
                  >
                    Spend
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("cpa")}
                  >
                    CPA
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("roas")}
                  >
                    ROAS
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("ctr")}
                  >
                    CTR
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => onSort && onSort("vsBenchmark")}
                  >
                    vs Benchmark
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>{campaign.platform}</TableCell>
                    <TableCell className="text-right">{formatCurrency(campaign.spend)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(campaign.cpa)}</TableCell>
                    <TableCell className="text-right">{campaign.roas.toFixed(2)}x</TableCell>
                    <TableCell className="text-right">{formatPercentage(campaign.ctr)}</TableCell>
                    <TableCell className="text-right">
                      {renderBenchmarkComparison(campaign.vsBenchmark)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
