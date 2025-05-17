import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/custom-badge"; 
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  UserPlus, 
  Mail, 
  Check, 
  Shield, 
  EyeIcon, 
  Pencil,
  Clock,
  Trash,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subDays, subHours } from "date-fns";

// Define the TeamMember type
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "removed";
  lastActive: Date | null;
}

// Define DateRange type for consistency
interface DateRange {
  from: Date;
  to: Date;
}

export default function TeamAccess() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Mock team plan for test purposes
  const userPlan = 'agency'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
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
  const [activityLogs, setActivityLogs] = useState([
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
  const [invitation, setInvitation] = useState({
    email: "",
    role: "viewer",
  });
  
  // Role edit state
  const [editRole, setEditRole] = useState({
    userId: "",
    role: "",
  });
  
  useEffect(() => {
    // Simulating API loading
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);
  
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
    const planLimits = {
      free: 1,
      pro: 1,
      pro_plus: 5,
      agency: 100
    };
    
    if (activeMembers >= planLimits[userPlan as keyof typeof planLimits]) {
      toast({
        title: "Team member limit reached",
        description: `Your ${userPlan} plan allows a maximum of ${planLimits[userPlan as keyof typeof planLimits]} team members.`,
        variant: "destructive",
      });
      return;
    }
    
    // Create new team member object
    const newMember = {
      id: Math.random().toString(36).substring(7),
      name: invitation.email.split('@')[0], // Placeholder name from email
      email: invitation.email,
      role: invitation.role as "admin" | "editor" | "viewer",
      status: "pending" as const,
      lastActive: null,
    };
    
    // Add to team members list
    setTeamMembers([...teamMembers, newMember]);
    
    // Add activity log
    const newLog = {
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
  
  const handleUpdateRole = () => {
    if (!editRole.userId || !editRole.role) return;
    
    setTeamMembers(prev => 
      prev.map(member => 
        member.id === editRole.userId 
          ? { ...member, role: editRole.role as "admin" | "editor" | "viewer" } 
          : member
      )
    );
    
    const member = teamMembers.find(m => m.id === editRole.userId);
    
    // Add activity log
    const newLog = {
      id: Math.random().toString(36).substring(7),
      userId: "1", // Current user ID
      userName: user?.user_metadata?.name || "You",
      action: "changed_role",
      details: `Changed ${member?.name}'s role to ${editRole.role}`,
      timestamp: new Date(),
    };
    
    setActivityLogs([newLog, ...activityLogs]);
    
    // Reset edit state
    setEditRole({
      userId: "",
      role: "",
    });
    
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
    const newLog = {
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
  
  // Check if user is eligible for team access based on plan
  const isEligibleForTeamAccess = (plan: string) => {
    if (plan === 'agency' || plan === 'free' || plan === 'pro') return true;
    if (plan === 'pro_plus' || plan === 'agency') return teamMembers.length <= 1;
    return false;
  };
  
  const getTeamLimitInfo = (plan: string) => {
    switch (plan) {
      case 'free':
      case 'pro':
        return '1 user (yourself)';
      case 'pro_plus':
        return '5 users';
      case 'agency':
        return '100 users';
      default:
        return '1 user';
    }
  };
  
  if (!isEligibleForTeamAccess(userPlan) && !testMode) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Team Access</h1>
          </div>
          
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold mb-2">Pro+ or Agency Plan Required</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Multiple team members are available with Pro+ (5 users) and Agency (100 users) plans. Upgrade to add team members.
              </p>
              <Button className="w-full sm:w-auto">Upgrade Plan</Button>
            </CardContent>
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
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to a new team member. They'll receive an email with a link to join.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={invitation.email}
                    onChange={(e) => setInvitation(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="colleague@example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={invitation.role}
                    onValueChange={(value) => setInvitation(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin (Full access)</SelectItem>
                      <SelectItem value="editor">Editor (Can edit, but not manage team)</SelectItem>
                      <SelectItem value="viewer">Viewer (View only)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {invitation.role === "admin" 
                      ? "Admins can manage team members and have full access to all features." 
                      : invitation.role === "editor" 
                        ? "Editors can create and modify content, but cannot manage team access." 
                        : "Viewers can only view dashboards and reports, but cannot make changes."}
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>Cancel</Button>
                <Button onClick={handleInviteMember}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              {loading ? (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3].map(i => (
                          <TableRow key={i} className="animate-pulse">
                            <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-40"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-16"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-16"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teamMembers
                          .filter(member => member.status !== "removed")
                          .map(member => (
                            <TeamMemberRow 
                              key={member.id} 
                              member={member} 
                              onRemove={() => handleRemoveMember(member.id)} 
                              onChangeRole={(role: string) => setEditRole({ userId: member.id, role })}
                              isCurrentUser={user?.user_metadata?.name === member.name}
                            />
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="activity" className="mt-4">
              {loading ? (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3, 4, 5].map(i => (
                          <TableRow key={i} className="animate-pulse">
                            <TableCell><div className="h-4 bg-gray-200 rounded w-24"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-32"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-48"></div></TableCell>
                            <TableCell><div className="h-4 bg-gray-200 rounded w-32"></div></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activityLogs.map(log => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">{log.userName}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {log.action.replace(/_/g, ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>{log.details}</TableCell>
                            <TableCell className="text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {format(log.timestamp, "MMM d, h:mm a")}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppLayout>
  );
}

interface TeamMemberRowProps {
  member: TeamMember;
  onRemove: () => void;
  onChangeRole: (role: string) => void;
  isCurrentUser: boolean;
}

const TeamMemberRow = ({ 
  member, 
  onRemove, 
  onChangeRole, 
  isCurrentUser 
}: TeamMemberRowProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium flex items-center">
            {member.name} 
            {isCurrentUser && <span className="text-xs text-muted-foreground ml-2">(You)</span>}
          </div>
          <div className="text-sm text-muted-foreground">{member.email}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {member.status === "pending" ? (
          <CustomBadge variant="outline" className="flex items-center gap-1 text-amber-500 border-amber-200 bg-amber-50">
            <Clock size={12} />
            Pending
          </CustomBadge>
        ) : (
          <CustomBadge 
            variant={member.role === "admin" ? "secondary" : "success"} 
            className="flex items-center gap-1"
          >
            {member.role === "admin" ? (
              <Shield size={12} />
            ) : member.role === "editor" ? (
              <Pencil size={12} />
            ) : (
              <EyeIcon size={12} />
            )}
            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
          </CustomBadge>
        )}
        
        {!isCurrentUser && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <span className="sr-only">Change role</span>
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change user role</DialogTitle>
                  <DialogDescription>
                    Select a new role for {member.name}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      variant={member.role === "admin" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => onChangeRole("admin")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                      <span className="ml-auto text-xs text-muted-foreground">Full access</span>
                    </Button>
                    <Button 
                      variant={member.role === "editor" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => onChangeRole("editor")}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editor
                      <span className="ml-auto text-xs text-muted-foreground">Can edit data</span>
                    </Button>
                    <Button 
                      variant={member.role === "viewer" ? "default" : "outline"} 
                      className="justify-start"
                      onClick={() => onChangeRole("viewer")}
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Viewer
                      <span className="ml-auto text-xs text-muted-foreground">Read-only</span>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                  <span className="sr-only">Remove user</span>
                  <Trash className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove team member</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to remove {member.name} from your team?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={onRemove}>Remove</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};
