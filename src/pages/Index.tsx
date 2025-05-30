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
  const {
    user
  } = useUserProfile();
  useEffect(() => {
    const checkOnboardingStep = async () => {
      if (!user) return;
      const {
        data,
        error
      } = await supabase.from("profiles").select("onboarding_step").eq("id", user.id).single();
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
  return <MainLayout>
      {/* Hero CTA for Login/Dashboard */}
      

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
    </MainLayout>;
}