import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RetargetingEfficiency() {
  const [retSpend, setRetSpend] = useState("");
  const [retConversions, setRetConversions] = useState("");
  const [prosSpend, setProsSpend] = useState("");
  const [prosConversions, setProsConversions] = useState("");

  const retCpa = parseFloat(retSpend) / parseFloat(retConversions);
  const prosCpa = parseFloat(prosSpend) / parseFloat(prosConversions);

  const efficiency = prosCpa && retCpa ? ((prosCpa - retCpa) / prosCpa) * 100 : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Retargeting Efficiency</h1>
          <p className="text-muted-foreground text-lg">
            Compare CPA between retargeting and prospecting.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter CPA Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Retargeting Spend</Label>
              <Input value={retSpend} onChange={(e) => setRetSpend(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Retargeting Conversions</Label>
              <Input value={retConversions} onChange={(e) => setRetConversions(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Prospecting Spend</Label>
              <Input value={prosSpend} onChange={(e) => setProsSpend(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Prospecting Conversions</Label>
              <Input value={prosConversions} onChange={(e) => setProsConversions(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {efficiency && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Retargeting is <span className="font-semibold">{efficiency.toFixed(1)}%</span> more efficient.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
