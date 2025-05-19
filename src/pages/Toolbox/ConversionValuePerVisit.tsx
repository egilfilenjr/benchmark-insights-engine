import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ConversionValuePerVisit() {
  const [revenue, setRevenue] = useState("");
  const [visits, setVisits] = useState("");

  const value =
    parseFloat(visits) > 0
      ? (parseFloat(revenue) / parseFloat(visits)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Value per Visit</h1>
          <p className="text-muted-foreground text-lg">
            Estimate how much revenue each website visit generates.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Visit Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Revenue</Label>
              <Input value={revenue} onChange={(e) => setRevenue(e.target.value)} />
            </div>
            <div>
              <Label>Total Visits</Label>
              <Input value={visits} onChange={(e) => setVisits(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {value && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Value per Visit: <span className="font-semibold">${value}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
