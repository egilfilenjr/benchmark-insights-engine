import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BidImpact() {
  const [currentCpc, setCurrentCpc] = useState("");
  const [bidChange, setBidChange] = useState("");

  const newCpc =
    parseFloat(currentCpc) > 0 && parseFloat(bidChange)
      ? (
          parseFloat(currentCpc) *
          (1 + parseFloat(bidChange) / 100)
        ).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Bid Impact Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Estimate the change in CPC from adjusting your bid.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Input Bid Adjustment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current CPC ($)</Label>
              <Input value={currentCpc} onChange={(e) => setCurrentCpc(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Bid Adjustment (%)</Label>
              <Input value={bidChange} onChange={(e) => setBidChange(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {newCpc && (
          <div className="text-center mt-6">
            <p className="text-lg">
              New estimated CPC: <span className="font-semibold">${newCpc}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
