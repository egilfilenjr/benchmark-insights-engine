import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LtvCalculator() {
  const [aov, setAov] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");

  const ltv =
    parseFloat(aov) * parseFloat(frequency) * parseFloat(duration) || null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">LTV Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Estimate Customer Lifetime Value based on order size, frequency, and lifespan.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Average Order Value</Label>
              <Input type="number" value={aov} onChange={(e) => setAov(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Orders per Year</Label>
              <Input type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Customer Lifespan (years)</Label>
              <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {ltv && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Estimated LTV: <span className="font-semibold">${ltv.toFixed(2)}</span>
            </p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to model breakeven ROAS with this?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Run full forecast →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
