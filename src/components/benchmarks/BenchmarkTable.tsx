
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface BenchmarkTableProps {
  data: BenchmarkData[];
  loading?: boolean;
}

export default function BenchmarkTable({ data, loading = false }: BenchmarkTableProps) {
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Benchmark Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Benchmark Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            No benchmark data available for the selected filters.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Benchmark Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>KPI</TableHead>
              <TableHead>25th Percentile</TableHead>
              <TableHead>Median</TableHead>
              <TableHead>75th Percentile</TableHead>
              <TableHead>Sample Size</TableHead>
              <TableHead>Region</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Badge variant="outline">{item.platform}</Badge>
                </TableCell>
                <TableCell>{item.channel}</TableCell>
                <TableCell>{item.kpi}</TableCell>
                <TableCell>{formatValue(item.percentile_25, item.kpi)}</TableCell>
                <TableCell className="font-medium">{formatValue(item.median, item.kpi)}</TableCell>
                <TableCell>{formatValue(item.percentile_75, item.kpi)}</TableCell>
                <TableCell>{item.sample_size.toLocaleString()}</TableCell>
                <TableCell>{item.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
