
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format, subDays, subHours } from "date-fns";

// Import types
import { TeamMember, ActivityLog, Invitation, EditRole } from "./types/teamTypes";
import { PlanType, isEligibleForTeamAccess, getTeamLimitInfo, getPlanLimits } from "./utils/planUtils";

// Import components
import TeamMembersTable from "./components/TeamMembersTable";
import ActivityLogTable from "./components/ActivityLogTable";
import InviteMemberDialog from "./components/InviteMemberDialog";

export default function TeamAccess() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock team plan for test purposes
  const userPlan: PlanType = 'agency'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  // Mock data for team members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
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
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "editor",
      status: "active",
      lastActive: subHours(new Date(), 5),
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "viewer",
      status: "active",
      lastActive: subDays(new Date(), 2),
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@example.com",
      role: "editor",
      status: "pending",
      lastActive: null,
    },
  ]);
  
  // Mock data for activity logs
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "l1",
      userId: "1",
      userName: "John Smith",
      action: "created_report",
      details: "Created monthly performance report",
      timestamp: subHours(new Date(), 2),
    },
    {
      id: "l2",
      userId: "2",
      userName: "Sarah Johnson",
      action: "modified_alert",
      details: "Updated CPA increase alert settings",
      timestamp: subHours(new Date(), 8),
    },
    {
      id: "l3",
      userId: "1",
      userName: "John Smith",
      action: "added_member",
      details: "Added Emma Wilson as editor",
      timestamp: subDays(new Date(), 1),
    },
    {
      id: "l4",
      userId: "3",
      userName: "Michael Brown",
      action: "viewed_dashboard",
      details: "Viewed Meta performance dashboard",
      timestamp: subDays(new Date(), 2),
    },
    {
      id: "l5",
      userId: "2",
      userName: "Sarah Johnson",
      action: "created_experiment",
      details: "Created A/B test for video creative",
      timestamp: subDays(new Date(), 3),
    },
  ]);
  
  // Invitation state
  const [invitation, setInvitation] = useState<Invitation>({
    email: "",
    role: "viewer",
  });
  
  // Role edit state
  const [editRole, setEditRole] = useState<EditRole>({
    userId: "",
    role: "",
  });
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
  const handleInvitationChange = (field: keyof Invitation, value: string) => {
    setInvitation(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleInviteMember = () => {
    // Validate email
    if (!invitation.email || !invitation.email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    // Check user limits based on plan
    const activeMembers = teamMembers.filter(m => m.status !== "removed").length;
    const planLimit = getPlanLimits(userPlan);
    
    if (activeMembers >= planLimit) {
      toast({
        title: "Team member limit reached",
        description: `Your ${userPlan} plan allows a maximum of ${planLimit} team members.`,
        variant: "destructive",
      });
      return;
    }
    
    // Create new team member object
    const newMember: TeamMember = {
      id: Math.random().toString(36).substring(7),
      name: invitation.email.split('@')[0], // Placeholder name from email
      email: invitation.email,
      role: invitation.role as "admin" | "editor" | "viewer",
      status: "pending",
      lastActive: null,
    };
    
    // Add to team members list
    setTeamMembers([...teamMembers, newMember]);
    
    // Add activity log
    const newLog: ActivityLog = {
      id: Math.random().toString(36).substring(7),
      userId: "1", // Current user ID
      userName: user?.user_metadata?.name || "You",
      action: "invited_member",
      details: `Invited ${invitation.email} as ${invitation.role}`,
      timestamp: new Date(),
    };
    
    setActivityLogs([newLog, ...activityLogs]);
    
    // Reset invitation form
    setInvitation({
      email: "",
      role: "viewer",
    });
    
    // Show success toast
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${invitation.email}.`,
    });
  };
  
  const handleUpdateRole = (userId: string, role: string) => {
    if (!userId || !role) return;
    
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === userId 
          ? { ...member, role: role as "admin" | "editor" | "viewer" } 
          : member
      )
    );
    
    const member = teamMembers.find(m => m.id === userId);
    
    // Add activity log
    const newLog: ActivityLog = {
      id: Math.random().toString(36).substring(7),
      userId: "1", // Current user ID
      userName: user?.user_metadata?.name || "You",
      action: "changed_role",
      details: `Changed ${member?.name}'s role to ${role}`,
      timestamp: new Date(),
    };
    
    setActivityLogs([newLog, ...activityLogs]);
    
    // Show success toast
    toast({
      title: "Role updated",
      description: `The team member's role has been updated.`,
    });
  };
  
  const handleRemoveMember = (id: string) => {
    const member = teamMembers.find(m => m.id === id);
    
    if (!member) return;
    
    setTeamMembers(prev => 
      prev.map(m => 
        m.id === id ? { ...m, status: "removed" as const } : m
      )
    );
    
    // Add activity log
    const newLog: ActivityLog = {
      id: Math.random().toString(36).substring(7),
      userId: "1", // Current user ID
      userName: user?.user_metadata?.name || "You",
      action: "removed_member",
      details: `Removed ${member.name} from team`,
      timestamp: new Date(),
    };
    
    setActivityLogs([newLog, ...activityLogs]);
    
    // Show success toast
    toast({
      title: "Member removed",
      description: `${member.name} has been removed from the team.`,
    });
  };
  
  // Check eligibility with current team count
  const activeTeamMembersCount = teamMembers.filter(m => m.status !== "removed").length;
  
  if (!isEligibleForTeamAccess(userPlan, activeTeamMembersCount) && !testMode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Team Access</h1>
          </div>
          
          <Card className="py-12">
            <div className="flex flex-col items-center justify-center px-6">
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Multiple team members are available with Pro+ (5 users) and Agency (100 users) plans. Upgrade to add team members.
              </p>
              <Button className="w-full sm:w-auto">Upgrade Plan</Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Team Access</h1>
            <p className="text-muted-foreground">
              Manage team members and their access permissions.
            </p>
          </div>
          
          <InviteMemberDialog 
            invitation={invitation}
            onInvitationChange={handleInvitationChange}
            onInviteMember={handleInviteMember}
          />
        </div>
        
        {userPlan === "free" || userPlan === "pro" ? (
          <Alert>
            <Users className="h-4 w-4" />
            <AlertTitle>Team Access</AlertTitle>
            <AlertDescription className="flex items-center">
              Your {userPlan} plan includes {getTeamLimitInfo(userPlan)}.
              {(userPlan === 'free' || userPlan === 'pro') && (
                <Button variant="link" className="h-auto p-0 ml-1">
                  Upgrade for more team members
                </Button>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <Tabs defaultValue="members">
            <TabsList>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="members" className="mt-4">
              <TeamMembersTable 
                teamMembers={teamMembers}
                onRemove={handleRemoveMember}
                onChangeRole={handleUpdateRole}
                currentUserName={user?.user_metadata?.name}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4">
              <ActivityLogTable 
                activityLogs={activityLogs} 
                loading={loading} 
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
}
