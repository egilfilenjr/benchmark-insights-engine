
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

      // Fetch user's team membership
      const { data: teamMember } = await supabase
        .from('team_members')
        .select('team_id, role, teams(plan)')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      setProfile({
        userId: user.id,
        teamId: teamMember?.team_id,
        role: (teamMember?.role as 'admin' | 'editor' | 'viewer') || 'viewer',
        plan: (teamMember?.teams as any)?.plan || 'free',
        user,
        signOut: async () => {
          await supabase.auth.signOut();
          setProfile(null);
        }
      });
    };

    fetchData();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setProfile(null);
      } else {
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
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
