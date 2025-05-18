
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
import ToolboxLanding from "./pages/ToolboxLanding";
import ToolboxIndex from "./pages/Toolbox/ToolboxIndex";
import Pricing from "./pages/Pricing";
import Industries from "./pages/Industries";
import UseCases from "./pages/UseCases";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Integrations from "./pages/Integrations";

// Protected app pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Benchmarks from "./pages/Benchmarks/Benchmarks";
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
            <Route path="/benchmarks" element={<BenchmarksLibrary />} />
            <Route path="/toolbox" element={<ToolboxIndex />} /> {/* Updated toolbox route */}
            <Route path="/toolbox/:toolName" element={<ToolboxLanding />} /> {/* Individual tools */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/integrations" element={<Integrations />} />

            {/* Protected app routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:platform" element={<Dashboard />} />
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
