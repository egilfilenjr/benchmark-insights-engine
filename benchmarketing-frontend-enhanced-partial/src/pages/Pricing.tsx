import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      monthly: "$0",
      yearly: "$0",
      features: ["Benchmark Explorer", "Demo Data Only"],
    },
    {
      name: "Pro",
      monthly: "$99",
      yearly: "$79/mo",
      features: ["OAuth Sync", "1 User", "Personal KPI Overlay"],
    },
    {
      name: "Pro+",
      monthly: "$149",
      yearly: "$119/mo",
      features: ["AI Recommendations", "5 Users", "Reports & Exports"],
    },
    {
      name: "Agency",
      monthly: "$299",
      yearly: "$239/mo",
      features: ["White-Label Reports", "100 Users", "Team Sharing"],
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Pricing Plans</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Start free or upgrade for more power. Save 20% with annual billing.
          </p>
        </section>

        {/* Billing toggle */}
        <div className="flex justify-center items-center gap-3">
          <span className="text-sm">Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} />
          <span className="text-sm">Yearly (Save 20%)</span>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <Card key={i} className="h-full hover:shadow transition">
              <CardContent className="p-6 space-y-3">
                <CardTitle>{p.name}</CardTitle>
                <p className="text-3xl font-bold">{yearly ? p.yearly : p.monthly}</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  {p.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <Button className="w-full mt-4">
                  {p.name === "Free" ? "Start Free" : "Upgrade Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison table */}
        <section className="overflow-x-auto mt-12">
          <table className="w-full text-sm text-left border">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Free</th>
                <th className="px-4 py-2">Pro</th>
                <th className="px-4 py-2">Pro+</th>
                <th className="px-4 py-2">Agency</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Benchmark Explorer", "✅", "✅", "✅", "✅"],
                ["OAuth Integrations", "❌", "✅", "✅", "✅"],
                ["Personal KPI Overlay", "❌", "✅", "✅", "✅"],
                ["AI Recommendations", "❌", "❌", "✅", "✅"],
                ["Reports & Exports", "❌", "❌", "✅", "✅"],
                ["White-Label Branding", "❌", "❌", "❌", "✅"],
                ["Team Seats", "1", "1", "5", "100"],
              ].map(([feature, ...vals], i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 font-medium">{feature}</td>
                  {vals.map((val, j) => (
                    <td key={j} className="px-4 py-2">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </MainLayout>
  );
}
