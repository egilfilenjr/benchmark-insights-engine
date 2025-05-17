import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FunnelForecast() {
  const [leads, setLeads] = useState("");
  const [mqlRate, setMqlRate] = useState("");
  const [conversionRate, setConversionRate] = useState("");

  const mqls = (parseFloat(leads) * (parseFloat(mqlRate) / 100)) || null;
  const conversions = mqls && (mqls * (parseFloat(conversionRate) / 100)) || null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Funnel Forecast Tool</h1>
          <p className="text-muted-foreground text-lg">
            Project MQLs and conversions based on your funnel metrics.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Funnel Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Total Leads</Label>
              <Input type="number" value={leads} onChange={(e) => setLeads(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>MQL Rate (%)</Label>
              <Input type="number" value={mqlRate} onChange={(e) => setMqlRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Conversion Rate (%)</Label>
              <Input type="number" value={conversionRate} onChange={(e) => setConversionRate(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {conversions && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Forecast: <span className="font-semibold">{mqls.toFixed(0)} MQLs</span> →{" "}
              <span className="font-semibold">{conversions.toFixed(0)} Conversions</span>
            </p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to benchmark this funnel?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            See your drop-off →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
