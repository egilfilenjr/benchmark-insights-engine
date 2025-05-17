import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Info } from "lucide-react";
import { subDays, format } from "date-fns";

export default function Trends() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [selectedKpi, setSelectedKpi] = useState("roas");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [showBenchmark, setShowBenchmark] = useState(true);
  
  // Generate mock trend data
  const generateTrendData = (kpi: string, days: number) => {
    let baseValue = 0;
    let benchmarkValue = 0;
    
    switch (kpi) {
      case "roas":
        baseValue = 3.5;
        benchmarkValue = 3.2;
        break;
      case "cpa":
        baseValue = 30;
        benchmarkValue = 32;
        break;
      case "ctr":
        baseValue = 2.2;
        benchmarkValue = 2.0;
        break;
      case "aecr":
        baseValue = 76;
        benchmarkValue = 70;
        break;
      case "spend":
        baseValue = 1000;
        benchmarkValue = 1200;
        break;
      default:
        baseValue = 2;
        benchmarkValue = 2.2;
    }
    
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      
      // Create random fluctuations
      const randomFactor = 0.85 + Math.random() * 0.3;
      const anomalyDay = Math.floor(days * 0.7); // Create an anomaly at 70% of the timeline
      
      // Apply the anomaly on a specific day for certain metrics
      const anomalyFactor = i === anomalyDay && (kpi === "cpa" || kpi === "ctr") ? 1.5 : 1;
      
      const value = baseValue * randomFactor * anomalyFactor;
      const benchmark = benchmarkValue * (0.95 + Math.random() * 0.1);
      
      return {
        date: format(date, "MMM dd"),
        value: Number(value.toFixed(2)),
        benchmark: Number(benchmark.toFixed(2)),
        fullDate: date
      };
    });
  };
  
  const [trendData, setTrendData] = useState(generateTrendData(selectedKpi, parseInt(selectedPeriod)));
  
  // Find anomalies
  const findAnomalies = (data: any[], kpi: string) => {
    if (data.length < 5) return [];
    
    // Calculate mean and standard deviation
    const values = data.map(item => item.value);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / values.length);
    
    // Find points that deviate significantly
    const threshold = 1.5; // Number of standard deviations to consider an anomaly
    
    return data
      .filter(item => Math.abs(item.value - mean) > stdDev * threshold)
      .map(item => {
        const percentChange = (((item.value - mean) / mean) * 100).toFixed(0);
        const direction = item.value > mean ? 'increase' : 'decrease';
        
        let message = '';
        switch (kpi) {
          case "roas":
            message = `Significant ROAS ${direction} detected: ${Math.abs(parseInt(percentChange))}%`;
            break;
          case "cpa":
            message = `Significant CPA ${direction} detected: ${Math.abs(parseInt(percentChange))}%`;
            break;
          case "ctr":
            message = `Significant CTR ${direction} detected: ${Math.abs(parseInt(percentChange))}%`;
            break;
          case "aecr":
            message = `Significant AECR Score ${direction} detected: ${Math.abs(parseInt(percentChange))}%`;
            break;
          case "spend":
            message = `Significant spend ${direction} detected: ${Math.abs(parseInt(percentChange))}%`;
            break;
        }
        
        return {
          date: item.date,
          fullDate: item.fullDate,
          value: item.value,
          message,
          percentChange,
          direction
        };
      });
  };
  
  const [anomalies, setAnomalies] = useState<any[]>([]);
  
  useEffect(() => {
    setLoading(true);
    
    // In a real implementation, this would fetch data from Supabase based on the selected parameters
    setTimeout(() => {
      const newData = generateTrendData(selectedKpi, parseInt(selectedPeriod));
      setTrendData(newData);
      setAnomalies(findAnomalies(newData, selectedKpi));
      setLoading(false);
    }, 500);
  }, [selectedKpi, selectedPeriod]);

  // Fix the YAxis formatter to return strings
  const formatYAxis = (value: number): string => {
    switch (selectedKpi) {
      case "roas":
        return `${value.toFixed(1)}x`;
      case "cpa":
        return `$${value.toFixed(0)}`;
      case "ctr":
        return `${value.toFixed(1)}%`;
      case "aecr":
        return `${value.toFixed(0)}`;
      case "spend":
        return `$${value}`;
      default:
        return `${value}`;
    }
  };
  
  const getKpiName = (kpi: string) => {
    switch (kpi) {
      case "roas": return "ROAS";
      case "cpa": return "CPA";
      case "ctr": return "CTR";
      case "aecr": return "AECR Score";
      case "spend": return "Spend";
      default: return kpi.toUpperCase();
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Trends</h1>
            <p className="text-muted-foreground">
              Visualize short and long-term performance trends across key metrics.
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <CardTitle>Performance Trends</CardTitle>
              <div className="flex flex-wrap gap-2 items-center">
                <Select value={selectedKpi} onValueChange={setSelectedKpi}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select KPI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roas">ROAS</SelectItem>
                    <SelectItem value="cpa">CPA</SelectItem>
                    <SelectItem value="ctr">CTR</SelectItem>
                    <SelectItem value="aecr">AECR Score</SelectItem>
                    <SelectItem value="spend">Spend</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 Days</SelectItem>
                    <SelectItem value="14">Last 14 Days</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="benchmark-toggle" 
                    checked={showBenchmark} 
                    onCheckedChange={setShowBenchmark} 
                  />
                  <Label htmlFor="benchmark-toggle">Show Benchmark</Label>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loading ? (
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === getKpiName(selectedKpi)) {
                          return [formatYAxis(value as number), name];
                        }
                        return [formatYAxis(value as number), "Benchmark"];
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name={getKpiName(selectedKpi)} 
                      stroke="#7667e2" 
                      strokeWidth={2} 
                      dot={true} 
                      activeDot={{ r: 8 }} 
                    />
                    {showBenchmark && (
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        name="Benchmark" 
                        stroke="#94A3B8" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        dot={false} 
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              {anomalies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Detected Anomalies:</h4>
                  {anomalies.map((anomaly, index) => (
                    <Alert key={index} variant={anomaly.direction === 'increase' ? 'default' : 'destructive'}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>
                        {anomaly.date}
                      </AlertTitle>
                      <AlertDescription>
                        {anomaly.message}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Analysis Insight</AlertTitle>
                <AlertDescription>
                  {selectedKpi === 'roas' && 'Your ROAS is consistently above benchmark, with notable improvement in recent periods.'}
                  {selectedKpi === 'cpa' && 'Your CPA shows a concerning spike at times. Review campaign targeting and creative performance.'}
                  {selectedKpi === 'ctr' && 'CTR is trending below benchmark. Consider refreshing ad creative and improving ad relevance.'}
                  {selectedKpi === 'aecr' && 'Your AECR Score is outperforming industry benchmark by 8.5% over the selected period.'}
                  {selectedKpi === 'spend' && 'Spend patterns show consistent execution, staying below industry average for similar outcomes.'}
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="weekly">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly {getKpiName(selectedKpi)} Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Fix the YAxis formatter here as well */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={trendData.filter((_, i) => i % 7 === 0 || i === trendData.length - 1)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={formatYAxis} />
                      <Tooltip formatter={(value) => [formatYAxis(value as number), "Weekly Avg"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Weekly Avg" 
                        stroke="#4ade80" 
                        strokeWidth={2} 
                        dot={true} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="monthly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly {getKpiName(selectedKpi)} Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Fix the YAxis formatter here as well */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { date: "Jan", value: selectedKpi === "cpa" ? 28.4 : selectedKpi === "roas" ? 3.2 : 2.1 },
                        { date: "Feb", value: selectedKpi === "cpa" ? 32.1 : selectedKpi === "roas" ? 2.9 : 1.9 },
                        { date: "Mar", value: selectedKpi === "cpa" ? 30.5 : selectedKpi === "roas" ? 3.1 : 2.0 },
                        { date: "Apr", value: selectedKpi === "cpa" ? 27.8 : selectedKpi === "roas" ? 3.4 : 2.3 },
                        { date: "May", value: selectedKpi === "cpa" ? 31.2 : selectedKpi === "roas" ? 3.5 : 2.2 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={formatYAxis} />
                      <Tooltip formatter={(value) => [formatYAxis(value as number), "Monthly Avg"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Monthly Avg" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={true} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quarterly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly {getKpiName(selectedKpi)} Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Fix the YAxis formatter here as well */}
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={[
                        { date: "Q1", value: selectedKpi === "cpa" ? 30.2 : selectedKpi === "roas" ? 3.1 : 2.0 },
                        { date: "Q2", value: selectedKpi === "cpa" ? 29.5 : selectedKpi === "roas" ? 3.3 : 2.1 },
                        { date: "Q3", value: selectedKpi === "cpa" ? 28.7 : selectedKpi === "roas" ? 3.4 : 2.2 },
                        { date: "Q4", value: selectedKpi === "cpa" ? 26.9 : selectedKpi === "roas" ? 3.7 : 2.4 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis tickFormatter={formatYAxis} />
                      <Tooltip formatter={(value) => [formatYAxis(value as number), "Quarterly Avg"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Quarterly Avg" 
                        stroke="#8b5cf6" 
                        strokeWidth={2} 
                        dot={true} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
