import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LtvToCpaRatio() {
  const [ltv, setLtv] = useState("");
  const [cpa, setCpa] = useState("");

  const ratio =
    parseFloat(ltv) > 0 && parseFloat(cpa) > 0
      ? (parseFloat(ltv) / parseFloat(cpa)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">LTV to CPA Ratio</h1>
          <p className="text-muted-foreground text-lg">
            Compare customer lifetime value to your average acquisition cost.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Customer LTV ($)</Label>
              <Input value={ltv} onChange={(e) => setLtv(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Average CPA ($)</Label>
              <Input value={cpa} onChange={(e) => setCpa(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {ratio && (
          <div className="text-center mt-6">
            <p className="text-lg">
              LTV:CAC Ratio = <span className="font-semibold">{ratio}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
