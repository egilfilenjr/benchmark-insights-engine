import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/home/HeroSection";
import FeatureTeasers from "../components/home/FeatureTeasers";
import SocialProof from "../components/home/SocialProof";
import AecrDemo from "../components/home/AecrDemo";
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
      <HeroSection />

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

      <AecrDemo />
      <FeatureTeasers />
      <SocialProof />
      <IntegrationsCarousel />
      <PlanSelector />
      <FooterCTA />
    </MainLayout>
  );
}
