import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FrequencyFatigue() {
  const [initialCpa, setInitialCpa] = useState("");
  const [finalCpa, setFinalCpa] = useState("");
  const [frequencyChange, setFrequencyChange] = useState("");

  const cpaChange =
    parseFloat(initialCpa) > 0 && parseFloat(finalCpa) > 0
      ? (((parseFloat(finalCpa) - parseFloat(initialCpa)) / parseFloat(initialCpa)) * 100).toFixed(1)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Frequency Fatigue Estimator</h1>
          <p className="text-muted-foreground text-lg">
            See how rising ad frequency affects CPA.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Frequency Window</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Initial CPA</Label>
              <Input value={initialCpa} onChange={(e) => setInitialCpa(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Final CPA</Label>
              <Input value={finalCpa} onChange={(e) => setFinalCpa(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Impression Frequency Change (Optional)</Label>
              <Input value={frequencyChange} onChange={(e) => setFrequencyChange(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {cpaChange && (
          <div className="text-center mt-6">
            <p className="text-lg">
              CPA increased <span className="font-semibold">{cpaChange}%</span>{" "}
              {frequencyChange && <>as frequency rose to {frequencyChange}×</>}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
