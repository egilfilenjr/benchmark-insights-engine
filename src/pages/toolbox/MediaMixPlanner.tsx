import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MediaMixPlanner() {
  const [google, setGoogle] = useState("");
  const [meta, setMeta] = useState("");
  const [tiktok, setTikTok] = useState("");

  const total = [google, meta, tiktok].reduce((sum, val) => sum + parseFloat(val || "0"), 0);

  const percent = (val: string) =>
    total > 0 ? ((parseFloat(val || "0") / total) * 100).toFixed(1) + "%" : "—";

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Media Mix Planner</h1>
          <p className="text-muted-foreground text-lg">
            Enter projected spend per channel to see your mix by percentage.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Projected Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Google Ads</Label>
              <Input type="number" value={google} onChange={(e) => setGoogle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Meta Ads</Label>
              <Input type="number" value={meta} onChange={(e) => setMeta(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>TikTok Ads</Label>
              <Input type="number" value={tiktok} onChange={(e) => setTikTok(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="text-center pt-6 space-y-1">
          <p>Total Spend: <strong>${total.toLocaleString()}</strong></p>
          <p>Google: {percent(google)} | Meta: {percent(meta)} | TikTok: {percent(tiktok)}</p>
        </div>

        <footer className="text-center pt-8 text-sm text-muted-foreground">
          Want to model impact of reallocation?{" "}
          <a href="/signup" className="text-blue-600 hover:underline font-medium">
            View trend graphs →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
