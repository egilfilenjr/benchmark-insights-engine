import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfileProvider } from "@/hooks/useUserProfile";

// Public marketing pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Onboarding from "./pages/Auth/Onboarding";
import HowItWorks from "./pages/HowItWorks";
import BenchmarksLibrary from "./pages/BenchmarksLibrary";
import BenchmarksIndustry from "./pages/BenchmarksIndustry";
import BenchmarksChannel from "./pages/BenchmarksChannel";
import BenchmarksPlatform from "./pages/BenchmarksPlatform";
import BenchmarksFunnel from "./pages/BenchmarksFunnel";
import ToolboxLanding from "./pages/ToolboxLanding";
import ToolboxIndex from "./pages/Toolbox/ToolboxIndex";
import Pricing from "./pages/Pricing";
import Industries from "./pages/Industries";
import UseCases from "./pages/UseCases";
import UseCasesIndex from "./pages/UseCases/UseCasesIndex";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Integrations from "./pages/Integrations";
import Definitions from "./pages/Definitions";
import Guides from "./pages/Guides";
import Features from "./pages/Features";
import CaseStudies from "./pages/CaseStudies";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// SEO-focused pages
import MarketingBenchmarks from "./pages/seo/MarketingBenchmarks";
import CecrScoreGuide from "./pages/seo/CecrScoreGuide";
import MarketingAnalytics from "./pages/seo/MarketingAnalytics";
import AdPerformanceTracker from "./pages/seo/AdPerformanceTracker";

// New pages that need to be imported
import CompScoreOverview from "./pages/CompScoreOverview";
import AecrAlgorithm from "./pages/AecrAlgorithm";
import CompScoreExamples from "./pages/CompScoreExamples";
import Testimonials from "./pages/Testimonials";
import TrustCenter from "./pages/TrustCenter";
import Blog from "./pages/Blog";
import ApiDocs from "./pages/ApiDocs";
import Status from "./pages/Status";
import Changelog from "./pages/Changelog";
import Glossary from "./pages/Glossary";

// Platform benchmark pages
import MetaBenchmarks from "./pages/benchmarks/platform/Meta";
import GoogleBenchmarks from "./pages/benchmarks/platform/Google";
import TikTokBenchmarks from "./pages/benchmarks/platform/TikTok";
import YouTubeBenchmarks from "./pages/benchmarks/platform/YouTube";
import PinterestBenchmarks from "./pages/benchmarks/platform/Pinterest";
import RedditBenchmarks from "./pages/benchmarks/platform/Reddit";

// Industry benchmark pages
import ConsumerProductsBenchmarks from "./pages/benchmarks/industry/ConsumerProducts";
import PersonalServicesBenchmarks from "./pages/benchmarks/industry/PersonalServices";
import B2BSoftwareServicesBenchmarks from "./pages/benchmarks/industry/B2BSoftwareServices";
import EcommerceRetailBenchmarks from "./pages/benchmarks/industry/EcommerceRetail";
import CultureMediaCreatorsBenchmarks from "./pages/benchmarks/industry/CultureMediaCreators";
import FinanceInsuranceLegalBenchmarks from "./pages/benchmarks/industry/FinanceInsuranceLegal";
import ScienceIndustryInfrastructureBenchmarks from "./pages/benchmarks/industry/ScienceIndustryInfrastructure";
import PublicNonprofitIdentityBenchmarks from "./pages/benchmarks/industry/PublicNonprofitIdentity";

// Funnel stage benchmark pages
import TopOfFunnelBenchmarks from "./pages/benchmarks/funnel/TopOfFunnel";
import MidFunnelBenchmarks from "./pages/benchmarks/funnel/MidFunnel";
import BottomOfFunnelBenchmarks from "./pages/benchmarks/funnel/BottomOfFunnel";

// Placement benchmark pages
import StoriesBenchmarks from "./pages/benchmarks/placement/Stories";
import ReelsBenchmarks from "./pages/benchmarks/placement/Reels";
import FeedBenchmarks from "./pages/benchmarks/placement/Feed";

// Ad type benchmark pages
import VideoBenchmarks from "./pages/benchmarks/ad-type/Video";
import StaticBenchmarks from "./pages/benchmarks/ad-type/Static";
import CarouselBenchmarks from "./pages/benchmarks/ad-type/Carousel";

// Audience benchmark pages
import LookalikeBenchmarks from "./pages/benchmarks/audience/Lookalike";
import CustomBenchmarks from "./pages/benchmarks/audience/Custom";
import InterestBenchmarks from "./pages/benchmarks/audience/Interest";

// Specific metric benchmark pages
import RoasByChannelBenchmarks from "./pages/benchmarks/metrics/RoasByChannel";
import CtrByChannelBenchmarks from "./pages/benchmarks/metrics/CtrByChannel";
import CpcByChannelBenchmarks from "./pages/benchmarks/metrics/CpcByChannel";
import ConversionByPlatformBenchmarks from "./pages/benchmarks/metrics/ConversionByPlatform";
import DayOfWeekBenchmarks from "./pages/benchmarks/metrics/DayOfWeek";
import HourOfDayBenchmarks from "./pages/benchmarks/metrics/HourOfDay";
import FrequencyVsFatigueBenchmarks from "./pages/benchmarks/metrics/FrequencyVsFatigue";
import YoyRoasTrendsBenchmarks from "./pages/benchmarks/metrics/YoyRoasTrends";
import CostPerLeadVsLtvBenchmarks from "./pages/benchmarks/metrics/CostPerLeadVsLtv";
import IFunnelBenchmarks from "./pages/benchmarks/metrics/IFunnel";

// Protected app pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Benchmarks from "./pages/Benchmarks/Benchmarks";
import BenchmarkExplorer from "./pages/BenchmarkExplorer";
import Recommendations from "./pages/Recommendations/Recommendations";
import Opportunities from "./pages/Opportunities/Opportunities";
import Trends from "./pages/Trends/Trends";
import MediaMix from "./pages/MediaMix/MediaMix";
import MyData from "./pages/MyData/MyData";
import Reports from "./pages/Reports/Reports";
import SavedViews from "./pages/SavedViews/SavedViews";
import Alerts from "./pages/Alerts/Alerts";
import Experiments from "./pages/Experiments/Experiments";
import TeamAccess from "./pages/TeamAccess/TeamAccess";
import Settings from "./pages/Settings/Settings";
import Toolbox from "./pages/Toolbox/Toolbox";
import SyncHistory from "./pages/SyncHistory";
import OAuthCallback from "./pages/oauth/callback";

import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProfileProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/definitions" element={<Definitions />} />
            <Route path="/guides" element={<Guides />} />
            
            {/* SEO-focused pages */}
            <Route path="/marketing-benchmarks" element={<MarketingBenchmarks />} />
            <Route path="/cecr-score-guide" element={<CecrScoreGuide />} />
            <Route path="/marketing-analytics" element={<MarketingAnalytics />} />
            <Route path="/ad-performance-tracker" element={<AdPerformanceTracker />} />
            
            {/* New pages */}
            <Route path="/compscore-overview" element={<CompScoreOverview />} />
            <Route path="/AECRscore/algorithm" element={<AecrAlgorithm />} />
            <Route path="/compscore/examples" element={<CompScoreExamples />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/trust-center" element={<TrustCenter />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/status" element={<Status />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/glossary" element={<Glossary />} />
            
            {/* Industries and Use Cases */}
            <Route path="/industries" element={<Industries />} />
            <Route path="/use-cases" element={<UseCasesIndex />} />
            
            {/* Benchmarks routes */}
            <Route path="/benchmarks" element={<BenchmarksLibrary />} />
            <Route path="/benchmarks/industry" element={<BenchmarksIndustry />} />
            <Route path="/benchmarks/channel" element={<BenchmarksChannel />} />
            <Route path="/benchmarks/platform" element={<BenchmarksPlatform />} />
            <Route path="/benchmarks/funnel" element={<BenchmarksFunnel />} />
            
            {/* Toolbox routes */}
            <Route path="/toolbox" element={<ToolboxIndex />} />
            <Route path="/toolbox/:toolName" element={<ToolboxLanding />} />

            {/* OAuth callback */}
            <Route path="/oauth/callback" element={<OAuthCallback />} />

            {/* Protected app routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:platform" element={<Dashboard />} />
              <Route path="/benchmark-explorer" element={<BenchmarkExplorer />} />
              <Route path="/benchmarks/app" element={<Benchmarks />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/media-mix" element={<MediaMix />} />
              <Route path="/my-data" element={<MyData />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/saved-views" element={<SavedViews />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/experiments" element={<Experiments />} />
              <Route path="/team-access" element={<TeamAccess />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/toolbox/app" element={<Toolbox />} />
              <Route path="/sync-history" element={<SyncHistory />} />
              <Route path="/integrations" element={<Integrations />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProfileProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
