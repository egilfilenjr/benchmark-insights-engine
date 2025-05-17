import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FunnelDropoff() {
  const [visits, setVisits] = useState("");
  const [conversions, setConversions] = useState("");

  const dropoff =
    parseFloat(visits) > 0 && parseFloat(conversions) >= 0
      ? (((parseFloat(visits) - parseFloat(conversions)) / parseFloat(visits)) * 100).toFixed(1)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Funnel Dropoff Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Identify what % of users drop off before converting.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Funnel Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Total Funnel Entrants</Label>
              <Input value={visits} onChange={(e) => setVisits(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Conversions</Label>
              <Input value={conversions} onChange={(e) => setConversions(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {dropoff && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Dropoff Rate: <span className="font-semibold">{dropoff}%</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
