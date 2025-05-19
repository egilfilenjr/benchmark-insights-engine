
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

// Define a clear type for the user profile context
type UserProfile = {
  userId?: string;
  teamId?: string;
  plan?: "free" | "pro" | "pro_plus" | "agency";
  role?: "admin" | "editor" | "viewer";
  user?: User | null;
};

export interface UserProfileContextType extends UserProfile {
  signOut?: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | null>(null);

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfileContextType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) return;

      // For now, just set up a mock profile since we don't have the actual tables
      // In a real implementation, we would fetch the user's team membership
      setProfile({
        userId: user.id,
        teamId: "mock-team-id",
        role: "admin",
        plan: "agency", // Mock plan
        user,
        signOut: async () => {
          await supabase.auth.signOut();
          setProfile(null);
        }
      });
    };

    fetchData();
  }, []);

  return <UserProfileContext.Provider value={profile}>{children}</UserProfileContext.Provider>;
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  
  // Return a default object if the context is null
  return {
    userId: context?.userId,
    teamId: context?.teamId,
    plan: context?.plan || "free", 
    role: context?.role || "viewer",
    user: context?.user || null,
    signOut: context?.signOut || (async () => {
      console.log("Sign out not implemented");
    })
  };
};
