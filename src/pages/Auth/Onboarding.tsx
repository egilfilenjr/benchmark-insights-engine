// src/pages/Onboarding.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const goalsList = [
  "Benchmarking",
  "Campaign Optimization",
  "ROI Analysis",
  "Competitor Insights",
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [goals, setGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {step === 1 && "Welcome to Benchmarketing"}
            {step === 2 && "Tell Us About Your Company"}
            {step === 3 && "What Are Your Goals?"}
            {step === 4 && "Connect Your Integrations"}
            {step === 5 && "You're All Set!"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="text-gray-600 text-sm">
              Let’s set up your account to unlock insights, benchmarks, and automation.
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Input
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Input
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <Input
                placeholder="Timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {goalsList.map((goal) => (
                <label key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    checked={goals.includes(goal)}
                    onCheckedChange={() => toggleGoal(goal)}
                  />
                  <span>{goal}</span>
                </label>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <Button variant="outline" className="w-full" onClick={() => alert("Connect GA")}>
                Connect Google Analytics
              </Button>
              <Button variant="outline" className="w-full" onClick={() => alert("Connect Google Ads")}>
                Connect Google Ads
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                We’ll fetch your campaigns, KPIs, and performance data automatically.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="text-center space-y-2">
              <p className="text-green-600 font-medium">🎉 Onboarding Complete!</p>
              <p className="text-sm text-gray-600">Redirecting you to your dashboard...</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="ghost" disabled={step === 1} onClick={prevStep}>
              Back
            </Button>
            {step < 5 ? (
              <Button onClick={nextStep}>
                {step === 4 ? "Finish" : "Next"}
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
