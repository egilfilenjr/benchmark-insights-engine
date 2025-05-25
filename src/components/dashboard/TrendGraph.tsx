
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parseISO } from "date-fns";
import { DataPoint, TrendGraphProps } from "./types";

export default function TrendGraph({
  title,
  data,
  valueLabel,
  benchmarkLabel,
  valueFormat = "number",
  loading = false,
}: TrendGraphProps) {
  const formatValue = (value: number): string => {
    // Ensure value is a valid number
    const numVal = Number(value);
    if (isNaN(numVal)) return "N/A";
    
    switch (valueFormat) {
      case "currency":
        return `$${numVal.toFixed(2)}`;
      case "percentage":
        return `${numVal.toFixed(2)}%`;
      default:
        return numVal.toFixed(2);
    }
  };

  // Transform data for recharts - handle both Date objects and ISO strings
  const chartData = data.map((point) => {
    const dateObj = typeof point.date === 'string' ? new Date(point.date) : point.date;
    return {
      date: format(dateObj, "MMM dd"),
      [valueLabel]: Number(point.value) || 0,
      ...(point.benchmark !== undefined && { [benchmarkLabel || "Benchmark"]: Number(point.benchmark) || 0 }),
    };
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[250px] text-muted-foreground">
            Loading chart data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatValue} />
              <Tooltip
                formatter={(value: number) => [formatValue(value)]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={valueLabel}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              {benchmarkLabel && (
                <Line
                  type="monotone"
                  dataKey={benchmarkLabel}
                  stroke="#82ca9d"
                  strokeDasharray="5 5"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
