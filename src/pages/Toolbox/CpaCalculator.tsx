import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CpaCalculator() {
  const [spend, setSpend] = useState("");
  const [conversions, setConversions] = useState("");

  const cpa =
    parseFloat(conversions) > 0
      ? (parseFloat(spend) / parseFloat(conversions)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">CPA Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate Cost per Acquisition by dividing total spend by number of conversions.
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
                placeholder="e.g. 2000"
                value={spend}
                onChange={(e) => setSpend(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Conversions</Label>
              <Input
                type="number"
                placeholder="e.g. 40"
                value={conversions}
                onChange={(e) => setConversions(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {cpa && (
          <div className="text-center mt-6">
            <p className="text-lg">Your CPA is: <span className="font-semibold">${cpa}</span></p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to compare your CPA to competitors?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Get benchmarked →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
