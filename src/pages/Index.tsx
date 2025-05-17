
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import AecrDemo from '@/components/home/AecrDemo';
import FeatureTeasers from '@/components/home/FeatureTeasers';
import SocialProof from '@/components/home/SocialProof';
import IntegrationsCarousel from '@/components/home/IntegrationsCarousel';
import PlanSelector from '@/components/home/PlanSelector';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection />
      
      {/* AECR Score Demo */}
      <AecrDemo />
      
      {/* Feature Teasers */}
      <FeatureTeasers />
      
      {/* Social Proof / Logos */}
      <SocialProof />
      
      {/* Integrations Carousel */}
      <IntegrationsCarousel />
      
      {/* Plan Selector Preview */}
      <PlanSelector />
    </MainLayout>
  );
};

export default Index;
