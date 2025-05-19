import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BreakEvenRoas() {
  const [cogs, setCogs] = useState("");
  const [margin, setMargin] = useState("");

  const roas =
    parseFloat(cogs) > 0 && parseFloat(margin) > 0
      ? (1 / (parseFloat(margin) / 100)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Breakeven ROAS Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Use your margin to calculate minimum ROAS needed to break even.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Business Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Product Margin (%)</Label>
              <Input value={margin} onChange={(e) => setMargin(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {roas && (
          <div className="text-center mt-6">
            <p className="text-lg">
              You need a minimum ROAS of:{" "}
              <span className="font-semibold">{roas}x</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
