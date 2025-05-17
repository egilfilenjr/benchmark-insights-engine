import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserProfile = {
  userId: string;
  teamId: string;
  plan: "free" | "pro" | "pro_plus" | "agency";
  role: "admin" | "editor" | "viewer";
};

const UserProfileContext = createContext<UserProfile | null>(null);

export const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) return;

      const { data: membership } = await supabase
        .from("team_members")
        .select("team_id, role, teams(plan)")
        .eq("user_id", user.id)
        .single();

      if (membership) {
        setProfile({
          userId: user.id,
          teamId: membership.team_id,
          role: membership.role,
          plan: membership.teams.plan,
        });
      }
    };

    fetchData();
  }, []);

  return <UserProfileContext.Provider value={profile}>{children}</UserProfileContext.Provider>;
};

export const useUserProfile = () => {
  return useContext(UserProfileContext);
};
