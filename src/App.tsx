
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Add routes for other pages when they're created */}
          {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
          {/* <Route path="/benchmarks" element={<Benchmarks />} /> */}
          {/* <Route path="/industries" element={<Industries />} /> */}
          {/* <Route path="/use-cases" element={<UseCases />} /> */}
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          {/* <Route path="/integrations" element={<Integrations />} /> */}
          {/* <Route path="/resources" element={<Resources />} /> */}
          {/* <Route path="/toolbox" element={<Toolbox />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
