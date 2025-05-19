import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ImpressionToReach() {
  const [impressions, setImpressions] = useState("");
  const [frequency, setFrequency] = useState("");

  const reach =
    parseFloat(impressions) > 0 && parseFloat(frequency) > 0
      ? (parseFloat(impressions) / parseFloat(frequency)).toFixed(0)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Impression → Reach</h1>
          <p className="text-muted-foreground text-lg">
            Estimate reach based on your total impressions and ad frequency.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Impressions</Label>
              <Input value={impressions} onChange={(e) => setImpressions(e.target.value)} />
            </div>
            <div>
              <Label>Average Frequency</Label>
              <Input value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {reach && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Estimated Reach: <span className="font-semibold">{reach}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
