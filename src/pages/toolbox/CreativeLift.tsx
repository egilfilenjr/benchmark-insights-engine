import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CreativeLift() {
  const [baseline, setBaseline] = useState("");
  const [test, setTest] = useState("");

  const lift =
    parseFloat(baseline) > 0 && parseFloat(test) > 0
      ? (((parseFloat(test) - parseFloat(baseline)) / parseFloat(baseline)) * 100).toFixed(1)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Creative Lift Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate % improvement between baseline and test creative.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Baseline ROAS</Label>
              <Input value={baseline} onChange={(e) => setBaseline(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Test ROAS</Label>
              <Input value={test} onChange={(e) => setTest(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {lift && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Creative Lift: <span className="font-semibold">{lift}%</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
