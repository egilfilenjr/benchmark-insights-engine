import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RevenuePerClick() {
  const [revenue, setRevenue] = useState("");
  const [clicks, setClicks] = useState("");

  const rpc =
    parseFloat(clicks) > 0
      ? (parseFloat(revenue) / parseFloat(clicks)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Revenue per Click</h1>
          <p className="text-muted-foreground text-lg">
            See how much revenue you're generating per ad click.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Revenue</Label>
              <Input value={revenue} onChange={(e) => setRevenue(e.target.value)} />
            </div>
            <div>
              <Label>Total Clicks</Label>
              <Input value={clicks} onChange={(e) => setClicks(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {rpc && (
          <div className="text-center mt-6">
            <p className="text-lg">
              RPC: <span className="font-semibold">${rpc}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
