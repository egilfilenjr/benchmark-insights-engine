
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProfileProvider } from "@/hooks/useUserProfile";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
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
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:platform" element={<Dashboard />} />
              <Route path="/benchmarks" element={<Dashboard />} />
              <Route path="/recommendations" element={<Dashboard />} />
              <Route path="/opportunities" element={<Dashboard />} />
              <Route path="/trends" element={<Dashboard />} />
              <Route path="/media-mix" element={<Dashboard />} />
              <Route path="/my-data" element={<Dashboard />} />
              <Route path="/reports" element={<Dashboard />} />
              <Route path="/saved-views" element={<Dashboard />} />
              <Route path="/alerts" element={<Dashboard />} />
              <Route path="/experiments" element={<Dashboard />} />
              <Route path="/team-access" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/toolbox" element={<Dashboard />} />
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
