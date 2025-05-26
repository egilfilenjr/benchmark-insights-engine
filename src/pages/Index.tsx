// src/pages/index.tsx

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeatureTeasers from "@/components/home/FeatureTeasers";
import SocialProof from "@/components/home/SocialProof";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { ToolsPreview } from "@/components/home/ToolsPreview";
import { PlatformsSupported } from "@/components/home/PlatformsSupported";
import { MarketingSolutions } from "@/components/home/MarketingSolutions";
import { AecrScoreDemo } from "@/components/home/AecrScoreDemo";
import { PlanSelectorPreview } from "@/components/home/PlanSelectorPreview";
import { IntegrationsDisplay } from "@/components/home/IntegrationsDisplay";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/lib/supabase";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useUserProfile();

  useEffect(() => {
    const checkOnboardingStep = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("onboarding_step")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("❌ Failed to fetch onboarding step:", error.message);
        return;
      }

      const step = data?.onboarding_step || 1;

      if (step < 5) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    };

    checkOnboardingStep();
  }, [user, navigate]);

  return (
    <MainLayout>
      {/* Hero CTA for Login/Dashboard */}
      <div className="bg-gradient-to-r from-lilac/10 to-blue-50 py-4 text-center">
        <div className="container mx-auto">
          {user ? (
            <Button
              className="bg-lilac hover:bg-lilac-700 text-white font-medium"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              className="bg-lilac hover:bg-lilac-700 text-white font-medium"
              onClick={() => navigate("/login")}
            >
              Login to See Your Dashboard
            </Button>
          )}
        </div>
      </div>

      <HeroSection />
      <SocialProof />
      <AecrScoreDemo />
      <MarketingSolutions />
      <FeatureTeasers />
      <PlatformsSupported />
      <IntegrationsDisplay />
      <PlanSelectorPreview />
      <ToolsPreview />
      <TestimonialCarousel />
    </MainLayout>
  );
}
