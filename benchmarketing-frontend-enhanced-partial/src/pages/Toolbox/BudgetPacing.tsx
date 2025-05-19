
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BudgetPacing() {
  const [budget, setBudget] = useState("");
  const [spend, setSpend] = useState("");
  const [day, setDay] = useState("");

  // Parse the values with defaults
  const budgetNum = parseFloat(budget) || 0;
  const spendNum = parseFloat(spend) || 0;
  const dayNum = parseFloat(day) || 0;

  // Calculate pace and delta only if day is valid
  const pace = dayNum > 0 ? ((spendNum / dayNum) * 30).toFixed(2) : null;
  const delta = pace !== null && budgetNum > 0 ? (parseFloat(pace) - budgetNum).toFixed(2) : null;
  const isOverBudget = delta !== null ? parseFloat(delta) > 0 : false;

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Budget Pacing Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Forecast total spend based on pacing.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Enter Month-To-Date Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Monthly Budget ($)</Label>
              <Input value={budget} onChange={(e) => setBudget(e.target.value)} type="number" />
            </div>
            <div className="space-y-2">
              <Label>Spend So Far ($)</Label>
              <Input value={spend} onChange={(e) => setSpend(e.target.value)} type="number" />
            </div>
            <div className="space-y-2">
              <Label>Current Day of Month</Label>
              <Input value={day} onChange={(e) => setDay(e.target.value)} type="number" />
            </div>
          </CardContent>
        </Card>

        {pace && (
          <div className="text-center mt-6 space-y-1">
            <p>
              Projected Spend: <span className="font-semibold">${pace}</span>
            </p>
            {delta && (
              <p className="text-muted-foreground">
                You are <strong>{isOverBudget ? "over" : "under"}</strong> budget by{" "}
                <strong>${Math.abs(parseFloat(delta))}</strong>.
              </p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
