import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function ProtectedRoute() {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAllowed(false);
        setChecking(false);
        return;
      }

      const { data: preferences } = await supabase
        .from("user_preferences")
        .select("onboarding_completed")
        .eq("user_id", user.id)
        .single();

      if (preferences?.onboarding_completed) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }

      setChecking(false);
    };

    check();
  }, []);

  if (checking) return null; // optionally show a loading spinner

  if (!allowed) return <Navigate to="/onboarding" replace />;

  return <Outlet />;
}
