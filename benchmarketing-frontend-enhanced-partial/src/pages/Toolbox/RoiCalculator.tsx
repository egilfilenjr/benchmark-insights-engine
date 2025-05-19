import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RoiCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");

  const roi =
    parseFloat(cost) > 0
      ? (((parseFloat(revenue) - parseFloat(cost)) / parseFloat(cost)) * 100).toFixed(1)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">ROI Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate return on investment as a percentage.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Revenue and Cost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Revenue ($)</Label>
              <Input value={revenue} onChange={(e) => setRevenue(e.target.value)} />
            </div>
            <div>
              <Label>Total Cost ($)</Label>
              <Input value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {roi && (
          <div className="text-center mt-6">
            <p className="text-lg">
              ROI: <span className="font-semibold">{roi}%</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
