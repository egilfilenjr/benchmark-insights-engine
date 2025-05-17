import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    yearly: "$0",
    features: [
      "Benchmark Explorer access",
      "Industry KPI data",
      "Demo data preview",
    ],
    cta: "Start Free",
    url: "/signup",
  },
  {
    name: "Pro",
    price: "$99",
    yearly: "$79/mo",
    features: [
      "OAuth data sync",
      "1 user seat",
      "See personal KPIs",
    ],
    cta: "Upgrade to Pro",
    url: "/signup",
  },
  {
    name: "Pro+",
    price: "$149",
    yearly: "$119/mo",
    features: [
      "AI recommendations",
      "5 user seats",
      "Reports and exports",
    ],
    cta: "Upgrade to Pro+",
    url: "/signup",
  },
  {
    name: "Agency",
    price: "$299",
    yearly: "$239/mo",
    features: [
      "White-label reports",
      "100 user seats",
      "Client dashboard sharing",
    ],
    cta: "Upgrade to Agency",
    url: "/signup",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Simple pricing for every type of marketer</h1>
          <p className="text-muted-foreground text-lg">
            Start free. Upgrade when you're ready to benchmark your actual results.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              variant={billing === "monthly" ? "default" : "outline"}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billing === "yearly" ? "default" : "outline"}
              onClick={() => setBilling("yearly")}
            >
              Yearly (save 20%)
            </Button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card key={plan.name} className="border rounded-xl">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {billing === "monthly" ? plan.price : plan.yearly}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-muted-foreground space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link to={plan.url}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="text-center text-sm text-muted-foreground mt-10">
          No contracts. Cancel anytime. GDPR compliant.
        </footer>
      </div>
    </MainLayout>
  );
}

