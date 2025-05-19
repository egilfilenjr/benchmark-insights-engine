import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LeadMqlForecast() {
  const [leads, setLeads] = useState("");
  const [mqlRate, setMqlRate] = useState("");

  const mqls =
    parseFloat(leads) > 0 && parseFloat(mqlRate) > 0
      ? ((parseFloat(leads) * parseFloat(mqlRate)) / 100).toFixed(0)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Lead to MQL Forecast</h1>
          <p className="text-muted-foreground text-lg">
            Estimate how many leads will become MQLs based on your funnel rate.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Forecast Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Total Leads</Label>
              <Input value={leads} onChange={(e) => setLeads(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>MQL Rate (%)</Label>
              <Input value={mqlRate} onChange={(e) => setMqlRate(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {mqls && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Estimated MQLs: <span className="font-semibold">{mqls}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

