import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@supabase/auth-helpers-react";
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
  const user = useUser();

  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [goals, setGoals] = useState<string[]>([]);

  // Load saved onboarding_step from Supabase on mount
  useEffect(() => {
    const fetchStep = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_step")
        .eq("id", user.id)
        .single();

      if (!error && data?.onboarding_step) {
        setStep(data.onboarding_step);
      }
    };

    fetchStep();
  }, [user]);

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const saveToSupabase = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        company_name: companyName,
        industry,
        timezone,
        onboarding_step: step,
        goals,
      })
      .eq("id", user.id);

    if (error) {
      console.error("❌ Error saving onboarding data:", error.message);
    } else {
      console.log("✅ Onboarding data saved to Supabase");
    }
  };

  const nextStep = async () => {
    if (step === 4) {
      await saveToSupabase();
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex justify-between text-xs font-medium text-muted-foreground px-2 mb-4">
        <span className={step >= 1 ? "text-primary" : ""}>👋 Welcome</span>
        <span className={step >= 2 ? "text-primary" : ""}>🏢 Company</span>
        <span className={step >= 3 ? "text-primary" : ""}>🎯 Goals</span>
        <span className={step >= 4 ? "text-primary" : ""}>🔌 Integrations</span>
        <span className={step >= 5 ? "text-primary" : ""}>✅ Done</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            {step === 1 && <>👋 Welcome to Benchmarketing</>}
            {step === 2 && <>🏢 Tell Us About Your Company</>}
            {step === 3 && <>🎯 What Are Your Goals?</>}
            {step === 4 && <>🔌 Connect Your Integrations</>}
            {step === 5 && <>✅ You're All Set!</>}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="text-gray-600 text-sm leading-relaxed">
              Let’s set up your workspace so we can generate performance benchmarks and
              uncover insights for your campaigns. This takes less than 2 minutes.
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
