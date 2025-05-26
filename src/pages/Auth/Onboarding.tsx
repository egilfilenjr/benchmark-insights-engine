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
  const [connected, setConnected] = useState<string[]>([]);

  useEffect(() => {
    const fetchStepAndConnections = async () => {
      if (!user) return;

      const [{ data: profile }, { data: integrations }] = await Promise.all([
        supabase
          .from("profiles")
          .select("onboarding_step")
          .eq("id", user.id)
          .single(),
        supabase
          .from("oauth_accounts")
          .select("provider")
          .eq("user_id", user.id),
      ]);

      if (profile?.onboarding_step) setStep(profile.onboarding_step);
      if (integrations?.length) {
        setConnected(integrations.map((i: any) => i.provider));
      }
    };

    fetchStepAndConnections();
  }, [user]);

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const saveToSupabase = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({
        company_name: companyName,
        industry,
        timezone,
        onboarding_step: step,
        goals,
      })
      .eq("id", user.id);
  };

  const nextStep = async () => {
    if (step === 4) await saveToSupabase();
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const connectGoogleOAuth = async (scopes: string) => {
    const redirectTo = window.location.origin + "/oauth/callback";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { scopes, redirectTo },
    });
  };

  const syncGoogleAnalyticsAccounts = async () => {
    const res = await fetch("/api/sync-integration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user?.id, provider: "google_analytics" }),
    });

    const message = await res.text();
    alert(res.ok ? `✅ ${message}` : `❌ ${message}`);
  };

  const placeholderOAuth = (platform: string) => {
    alert(`TODO: Connect ${platform}. Requires external OAuth setup or token input.`);
  };

  const renderIntegration = (
    label: string,
    key: string,
    handler: () => void
  ) => {
    return connected.includes(key) ? (
      <>
        <Button variant="outline" className="w-full text-green-600" disabled>
          ✅ {label} Connected
        </Button>
        {key === "google_analytics" && (
          <Button
            variant="secondary"
            className="w-full text-sm mt-1"
            onClick={syncGoogleAnalyticsAccounts}
          >
            🔄 Sync Google Analytics Accounts
          </Button>
        )}
      </>
    ) : (
      <Button variant="outline" className="w-full" onClick={handler}>
        Connect {label}
      </Button>
    );
  };

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
              {renderIntegration(
                "Google Analytics",
                "google_analytics",
                () =>
                  connectGoogleOAuth(
                    "https://www.googleapis.com/auth/analytics.readonly"
                  )
              )}

              {renderIntegration(
                "Google Ads",
                "google_ads",
                () =>
                  connectGoogleOAuth(
                    "https://www.googleapis.com/auth/adwords"
                  )
              )}

              {renderIntegration("Meta Ads", "meta_ads", () =>
                placeholderOAuth("Meta Ads")
              )}

              {renderIntegration("LinkedIn Ads", "linkedin_ads", () =>
                placeholderOAuth("LinkedIn Ads")
              )}

              {renderIntegration("TikTok Ads", "tiktok_ads", () =>
                placeholderOAuth("TikTok Ads")
              )}

              <p className="text-sm text-muted-foreground text-center">
                More integrations coming soon.
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <p className="text-green-600 font-medium">🎉 Onboarding Complete!</p>
              <p className="text-sm text-gray-600">
                You’re ready to explore your performance insights.
              </p>
              <ul className="text-sm text-left text-gray-600 space-y-1 pt-4">
                <li>
                  <strong>Company:</strong> {companyName}
                </li>
                <li>
                  <strong>Industry:</strong> {industry}
                </li>
                <li>
                  <strong>Timezone:</strong> {timezone}
                </li>
                <li>
                  <strong>Goals:</strong>{" "}
                  {goals.length > 0 ? goals.join(", ") : "None selected"}
                </li>
              </ul>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="ghost" disabled={step === 1} onClick={prevStep}>
              Back
            </Button>
            {step < 5 && (
              <Button onClick={nextStep}>
                {step === 4 ? "Finish" : "Next"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
