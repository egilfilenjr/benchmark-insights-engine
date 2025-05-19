import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CpmCalculator() {
  const [spend, setSpend] = useState("");
  const [impressions, setImpressions] = useState("");

  const cpm =
    parseFloat(impressions) > 0
      ? ((parseFloat(spend) / parseFloat(impressions)) * 1000).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">CPM Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate Cost per 1,000 Impressions (CPM).
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Ad Spend</Label>
              <Input
                type="number"
                placeholder="e.g. 1500"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Total Impressions</Label>
              <Input
                type="number"
                placeholder="e.g. 500000"
                value={impressions}
                onChange={(e) => setImpressions(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {cpm && (
          <div className="text-center mt-6">
            <p className="text-lg">Your CPM is: <span className="font-semibold">${cpm}</span></p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to lower your CPM?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Get recommendations →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
