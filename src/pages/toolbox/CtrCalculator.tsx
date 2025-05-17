import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CtrCalculator() {
  const [clicks, setClicks] = useState("");
  const [impressions, setImpressions] = useState("");

  const ctr =
    parseFloat(impressions) > 0
      ? ((parseFloat(clicks) / parseFloat(impressions)) * 100).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">CTR Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate your Click-Through Rate as a percentage of impressions that generate clicks.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Clicks</Label>
              <Input
                type="number"
                placeholder="e.g. 500"
                value={clicks}
                onChange={(e) => setClicks(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Impressions</Label>
              <Input
                type="number"
                placeholder="e.g. 10000"
                value={impressions}
                onChange={(e) => setImpressions(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {ctr && (
          <div className="text-center mt-6">
            <p className="text-lg">Your CTR is: <span className="font-semibold">{ctr}%</span></p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to know if your CTR is high or low?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            Compare to industry →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
