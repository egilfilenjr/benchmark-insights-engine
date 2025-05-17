import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CpaProjection() {
  const [clicks, setClicks] = useState("");
  const [cvr, setCvr] = useState("");
  const [cpc, setCpc] = useState("");

  const conversions = (parseFloat(clicks) * parseFloat(cvr)) / 100 || 0;
  const spend = parseFloat(clicks) * parseFloat(cpc) || 0;
  const projectedCpa = conversions > 0 ? (spend / conversions).toFixed(2) : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">CPA Projection Tool</h1>
          <p className="text-muted-foreground text-lg">
            Forecast CPA based on CPC and conversion rate.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Projected Clicks</Label>
              <Input value={clicks} onChange={(e) => setClicks(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Conversion Rate (%)</Label>
              <Input value={cvr} onChange={(e) => setCvr(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Cost Per Click ($)</Label>
              <Input value={cpc} onChange={(e) => setCpc(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {projectedCpa && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Forecasted CPA: <span className="font-semibold">${projectedCpa}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
