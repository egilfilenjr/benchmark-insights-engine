import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";

export function useOnboardingRedirect() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_step")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch onboarding step", error.message);
        return;
      }

      const step = data?.onboarding_step || 1;

      if (router.pathname === "/onboarding") return;

      if (step < 5) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    };

    checkOnboarding();
  }, [user]);
}
