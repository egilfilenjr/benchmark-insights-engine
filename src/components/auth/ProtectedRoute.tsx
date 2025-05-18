
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const check = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
          setAllowed(false);
          setChecking(false);
          return;
        }

        // For now, since the tables don't exist, we'll just allow access
        // In a real implementation, we would check for onboarding completion
        setAllowed(true);
        setChecking(false);
      } catch (err) {
        console.error("Authentication check failed:", err);
        setAllowed(false);
        setChecking(false);
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive"
        });
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setAllowed(true);
          setChecking(false);
        } else if (event === 'SIGNED_OUT') {
          setAllowed(false);
          setChecking(false);
        }
      }
    );

    check();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Shows a loading message while checking
  if (checking) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-lilac border-r-transparent mb-4"></div>
        <p className="text-navy-600">Checking access...</p>
      </div>
    </div>
  );

  if (!allowed) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
