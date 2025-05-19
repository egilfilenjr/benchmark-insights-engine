import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BounceRateCalculator() {
  const [bounces, setBounces] = useState("");
  const [visits, setVisits] = useState("");

  const rate =
    parseFloat(visits) > 0
      ? ((parseFloat(bounces) / parseFloat(visits)) * 100).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Bounce Rate Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Find your site’s bounce rate by dividing bounces by total sessions.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Your Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Bounced Visits</Label>
              <Input
                type="number"
                value={bounces}
                onChange={(e) => setBounces(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Total Visits</Label>
              <Input
                type="number"
                value={visits}
                onChange={(e) => setVisits(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {rate && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Bounce Rate: <span className="font-semibold">{rate}%</span>
            </p>
          </div>
        )}

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to benchmark bounce rates by industry?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            See peer performance →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
