import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CplCalculator() {
  const [spend, setSpend] = useState("");
  const [leads, setLeads] = useState("");

  const cpl =
    parseFloat(spend) > 0 && parseFloat(leads) > 0
      ? (parseFloat(spend) / parseFloat(leads)).toFixed(2)
      : null;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">CPL Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate your cost per lead from media spend.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Total Spend</Label>
              <Input value={spend} onChange={(e) => setSpend(e.target.value)} />
            </div>
            <div>
              <Label>Number of Leads</Label>
              <Input value={leads} onChange={(e) => setLeads(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {cpl && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Cost per Lead: <span className="font-semibold">${cpl}</span>
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
