
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  PieChart, 
  Pie, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Info, Lightbulb } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MediaMix() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("ga4");
  
  // Mock data for media mix
  const [spendData, setSpendData] = useState([
    { name: "Google Search", value: 4500, fill: "#4285F4" },
    { name: "Meta Feed", value: 3200, fill: "#1877F2" },
    { name: "LinkedIn", value: 2800, fill: "#0A66C2" },
    { name: "TikTok", value: 1800, fill: "#000000" },
    { name: "YouTube", value: 1200, fill: "#FF0000" },
    { name: "Google Display", value: 800, fill: "#34A853" },
  ]);
  
  const [performanceData, setPerformanceData] = useState([
    { name: "Google Search", roas: 4.2, cpa: 22.5, conversions: 200, ctr: 3.2 },
    { name: "Meta Feed", roas: 3.8, cpa: 26.3, conversions: 121, ctr: 1.8 },
    { name: "LinkedIn", roas: 2.1, cpa: 86.5, conversions: 32, ctr: 0.9 },
    { name: "TikTok", roas: 3.1, cpa: 35.8, conversions: 50, ctr: 2.4 },
    { name: "YouTube", roas: 2.6, cpa: 46.2, conversions: 26, ctr: 1.2 },
    { name: "Google Display", roas: 2.3, cpa: 34.8, conversions: 23, ctr: 0.5 },
  ]);

  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return percent > 0.05 ? (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };
  
  const totalSpend = spendData.reduce((sum, item) => sum + item.value, 0);
  const totalConversions = performanceData.reduce((sum, item) => sum + item.conversions, 0);
  
  // Calculate weighted average for ROAS and CPA based on spend
  const weightedROAS = performanceData.reduce((sum, item, index) => {
    const weight = spendData[index].value / totalSpend;
    return sum + (item.roas * weight);
  }, 0);
  
  const weightedCPA = performanceData.reduce((sum, item, index) => {
    const weight = spendData[index].value / totalSpend;
    return sum + (item.cpa * weight);
  }, 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Media Mix</h1>
            <p className="text-muted-foreground">
              Understand cross-channel allocation and performance across your marketing efforts.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Data Source:</span>
            <Select value={dataSource} onValueChange={setDataSource}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Data Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ga4">Google Analytics 4</SelectItem>
                <SelectItem value="platforms">Platform Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Spend Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={spendData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {spendData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
                        itemStyle={{ color: '#000' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Total Spend</div>
                    <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Overall ROAS</div>
                    <div className="text-2xl font-bold">{weightedROAS.toFixed(1)}x</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Average CPA</div>
                    <div className="text-2xl font-bold">${weightedCPA.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Conversions</div>
                    <div className="text-2xl font-bold">{totalConversions}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="roas">
          <TabsList>
            <TabsTrigger value="roas">ROAS</TabsTrigger>
            <TabsTrigger value="cpa">CPA</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roas" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>ROAS by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}x`, 'ROAS']} />
                        <Legend />
                        <Bar dataKey="roas" name="ROAS" fill="#7667e2" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cpa" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>CPA by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'CPA']} />
                        <Legend />
                        <Bar dataKey="cpa" name="CPA" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conversions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversions by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [value, 'Conversions']} />
                        <Legend />
                        <Bar dataKey="conversions" name="Conversions" fill="#4ade80" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[200px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Spend %</TableHead>
                    <TableHead className="text-right">ROAS</TableHead>
                    <TableHead className="text-right">CPA</TableHead>
                    <TableHead className="text-right">Conversions</TableHead>
                    <TableHead className="text-right">Conv. %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spendData.map((item, index) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{((item.value / totalSpend) * 100).toFixed(1)}%</TableCell>
                      <TableCell className="text-right">{performanceData[index].roas.toFixed(1)}x</TableCell>
                      <TableCell className="text-right">${performanceData[index].cpa.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{performanceData[index].conversions}</TableCell>
                      <TableCell className="text-right">
                        {((performanceData[index].conversions / totalConversions) * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>AI Recommendation</AlertTitle>
          <AlertDescription>
            Consider reducing spend on LinkedIn by 15% and reallocating to Google Search and Meta Feed for improved overall ROAS. LinkedIn CPA is significantly higher than other channels.
          </AlertDescription>
        </Alert>
      </div>
    </AppLayout>
  );
}
