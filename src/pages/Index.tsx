import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/home/HeroSection";
import AecrDemo from "../components/home/AecrDemo";
import FeatureTeasers from "../components/home/FeatureTeasers";
import SocialProof from "../components/home/SocialProof";
import IntegrationsCarousel from "../components/home/IntegrationsCarousel";
import PlanSelector from "../components/home/PlanSelector";
import FooterCTA from "../components/home/FooterCTA";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Button } from "@/components/ui/button";

export default function Index() {
  const { user } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* CTA Buttons */}
      <div className="flex justify-center p-6 bg-white">
        <div className="flex gap-4">
          <Button asChild size="lg" variant="default">
            <Link to="/signup">See Your Score</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/benchmarks">Explore Benchmarks</Link>
          </Button>
        </div>
      </div>

      {/* 2. AECR Score™ Demo */}
      <AecrDemo />

      {/* 3. Feature Teasers */}
      <FeatureTeasers />

      {/* 4. Social Proof / Testimonials */}
      <SocialProof />

      {/* 5. Integrations Carousel */}
      <IntegrationsCarousel />

      {/* 6. Plan Selector Preview */}
      <PlanSelector />

      {/* 7. Footer CTA Block */}
      <FooterCTA />
    </MainLayout>
  );
}
