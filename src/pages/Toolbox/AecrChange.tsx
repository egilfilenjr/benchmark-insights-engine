import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AecrChange() {
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");

  const change =
    parseFloat(before) > 0 && parseFloat(after) > 0
      ? (((parseFloat(after) - parseFloat(before)) / parseFloat(before)) * 100).toFixed(1)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">AECR Change Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Measure performance delta between two AECR periods.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Compare Two AECR Scores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Previous AECR</Label>
              <Input value={before} onChange={(e) => setBefore(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Current AECR</Label>
              <Input value={after} onChange={(e) => setAfter(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {change && (
          <div className="text-center mt-6">
            <p className="text-lg">
              AECR Change: <span className="font-semibold">{change}%</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
