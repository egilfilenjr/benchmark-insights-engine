import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoasCalculator() {
  const [revenue, setRevenue] = useState("");
  const [spend, setSpend] = useState("");

  const roas =
    parseFloat(spend) > 0
      ? (parseFloat(revenue) / parseFloat(spend)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">ROAS Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate your Return on Ad Spend (ROAS) by dividing revenue by spend.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Revenue</Label>
              <Input
                type="number"
                placeholder="e.g. 5000"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Ad Spend</Label>
              <Input
                type="number"
                placeholder="e.g. 1000"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {roas && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Your ROAS is: <span className="font-semibold">{roas}x</span>
            </p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to compare this to your industry?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Benchmark your ROAS →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
