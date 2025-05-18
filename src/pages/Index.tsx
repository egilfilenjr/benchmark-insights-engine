
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeatureTeasers from "@/components/home/FeatureTeasers";
import SocialProof from "@/components/home/SocialProof";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { ToolsPreview } from "@/components/home/ToolsPreview";
import { PlatformsSupported } from "@/components/home/PlatformsSupported";
import { MarketingSolutions } from "@/components/home/MarketingSolutions";

export default function Index() {
  return (
    <MainLayout>
      <HeroSection />
      <SocialProof />
      <MarketingSolutions />
      <FeatureTeasers />
      <PlatformsSupported />
      <ToolsPreview />
      <TestimonialCarousel />
    </MainLayout>
  );
}
