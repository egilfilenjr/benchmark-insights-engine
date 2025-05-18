
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      // For now, since the tables don't exist, we'll just allow access
      // In a real implementation, we would check for onboarding completion
      setAllowed(true);
      setChecking(false);
    };

    check();
  }, []);

  // Shows a message while checking
  if (checking) return <div className="text-center py-8">Checking access…</div>;

  if (!allowed) return <Navigate to="/onboarding" replace />;

  return <Outlet />;
}
