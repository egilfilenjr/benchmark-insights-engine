
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Components
import TeamMembersTable from "./components/TeamMembersTable";
import ActivityLogTable from "./components/ActivityLogTable";
import InviteMemberDialog from "./components/InviteMemberDialog";

// Types + logic
import {
  TeamMember,
  ActivityLog,
  Invitation,
} from "./types/teamTypes";
import {
  PlanType,
  getPlanLimits,
  isEligibleForTeamAccess,
  getTeamLimitInfo,
} from "./utils/planUtils";

export default function TeamAccess() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const planLimits = getPlanLimits(plan as PlanType);
  const canManageTeam = isEligibleForTeamAccess(plan as PlanType);

  useEffect(() => {
    if (!canManageTeam) return;

    // TODO: Replace with Supabase fetch
    setTeamMembers([
      {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        role: "admin",
        status: "active",
        lastActive: new Date(),
      },
      {
        id: "2",
        name: "Maya Gomez",
        email: "maya@agency.com",
        role: "editor",
        status: "active",
        lastActive: new Date(),
      },
    ]);

    setInvitations([
      {
        id: "inv1",
        email: "newuser@brand.com",
        role: "viewer",
        invitedAt: new Date(),
        status: "pending",
      },
    ]);

    setActivityLog([
      {
        id: "log1",
        user: "Maya Gomez",
        event: "Updated benchmark view",
        timestamp: new Date(),
      },
    ]);

    setLoading(false);
  }, [user, canManageTeam]);

  if (!canManageTeam) {
    return (
      <AppLayout>
        <div className="text-center max-w-lg mx-auto mt-24">
          <h1 className="text-2xl font-semibold">Upgrade Required</h1>
          <p className="text-muted-foreground mt-2">
            Team access is only available on Pro+, Agency, or Enterprise plans.
          </p>
          <Button className="mt-4">Upgrade Plan</Button>
        </div>
      </AppLayout>
    );
  }

  const totalUsers = teamMembers.length + invitations.length;
  const { current, max } = getTeamLimitInfo(plan as PlanType, totalUsers);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Team Access</h1>
            <p className="text-muted-foreground">
              Invite team members, manage roles, and track activity.
            </p>
          </div>
          <InviteMemberDialog
            onInvite={(newInvite) => {
              setInvitations((prev) => [...prev, newInvite]);
              toast({ title: "Invitation sent!" });
            }}
          />
        </div>

        {current >= max && (
          <Alert variant="destructive">
            <AlertTitle>Team Limit Reached</AlertTitle>
            <AlertDescription>
              Your current plan allows up to {max} users. Upgrade to add more team members.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="log">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <TeamMembersTable
              teamMembers={teamMembers}
              currentUserName={user?.email}
              loading={loading}
              onRemove={(id) =>
                setTeamMembers((prev) => prev.filter((m) => m.id !== id))
              }
              onChangeRole={(userId, role) => {
                // Implementation for changing role
                toast({ title: `Role updated for user ${userId}` });
              }}
            />
          </TabsContent>

          <TabsContent value="log">
            <ActivityLogTable activityLogs={activityLog} loading={loading} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
