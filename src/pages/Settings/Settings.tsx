import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Mail, 
  Lock, 
  Bell, 
  HelpCircle, 
  CreditCard, 
  User, 
  Check, 
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Settings = () => {
  const { user, signOut, updateProfile: updateUserProfile } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(false);
  
  // Mock user plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      if (user) {
        setName(user.user_metadata?.name || '');
        setEmail(user.email || '');
        setIsSubscribed(true); // Mock value
        setIsNotificationsEnabled(true); // Mock value
        setIsTwoFactorAuthEnabled(false); // Mock value
      }
      setLoading(false);
    }, 600);
  }, [user]);
  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleUpdateProfile = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const metadata = { name };
      
      try {
        // Instead of using updateUserProfile, let's simulate a successful update
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      } catch (error) {
        toast({
          title: "Error updating profile",
          description: "There was an error updating your profile. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }, 800);
  };
  
  const handleSubscriptionChange = () => {
    setIsSubscribed(!isSubscribed);
    
    toast({
      title: "Subscription updated",
      description: isSubscribed ? "You have unsubscribed from our newsletter." : "You have subscribed to our newsletter.",
    });
  };
  
  const handleNotificationsChange = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
    
    toast({
      title: "Notifications updated",
      description: isNotificationsEnabled ? "You have disabled notifications." : "You have enabled notifications.",
    });
  };
  
  const handleTwoFactorAuthChange = () => {
    setIsTwoFactorAuthEnabled(!isTwoFactorAuthEnabled);
    
    toast({
      title: "Two-factor authentication updated",
      description: isTwoFactorAuthEnabled ? "You have disabled two-factor authentication." : "You have enabled two-factor authentication.",
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion initiated",
      description: "We have received your request to delete your account. This process may take up to 7 days.",
    });
  };
  
  const getPlanInfo = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'Free Plan';
      case 'pro':
        return 'Pro Plan';
      case 'pro_plus':
        return 'Pro+ Plan';
      case 'agency':
        return 'Agency Plan';
      default:
        return 'Unknown Plan';
    }
  };
  
  const getPlanFeatures = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'Limited features, basic support';
      case 'pro':
        return 'Standard features, priority support';
      case 'pro_plus':
        return 'Advanced features, premium support';
      case 'agency':
        return 'All features, dedicated support';
      default:
        return 'No features';
    }
  };
  
  const isEligibleForWhiteLabel = (plan: string) => {
    return plan === 'agency';
  };
  
  const isEligibleForTeamAccess = (plan: string) => {
    return plan === 'pro_plus' || plan === 'agency';
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Your Email" 
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled
                />
              </div>
              
              <Button onClick={handleUpdateProfile} disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
              <CardDescription>
                View your current plan details and features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="text-lg font-semibold">{getPlanInfo(userPlan)}</div>
                <p className="text-sm text-muted-foreground">{getPlanFeatures(userPlan)}</p>
              </div>
              
              <Button>Upgrade Plan</Button>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium leading-none">Team Access</p>
                    <p className="text-sm text-muted-foreground">
                      {isEligibleForTeamAccess(userPlan) 
                        ? "Manage team members and their access permissions." 
                        : "Upgrade to Pro+ or Agency plan to unlock team access."}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" disabled={!isEligibleForTeamAccess(userPlan)}>
                    {isEligibleForTeamAccess(userPlan) ? "Manage" : "Upgrade"}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium leading-none">White-Label Reports</p>
                    <p className="text-sm text-muted-foreground">
                      {isEligibleForWhiteLabel(userPlan) 
                        ? "Customize your reports with your own branding." 
                        : "Upgrade to Agency plan to unlock white-label reports."}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" disabled={!isEligibleForWhiteLabel(userPlan)}>
                    {isEligibleForWhiteLabel(userPlan) ? "Customize" : "Upgrade"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <Switch id="2fa" checked={isTwoFactorAuthEnabled} onCheckedChange={handleTwoFactorAuthChange} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your password regularly to keep your account secure.
                </p>
              </div>
              <Button variant="secondary" size="sm">Change Password</Button>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive important updates and announcements via email.
                </p>
              </div>
              <Switch id="email-notifications" checked={isNotificationsEnabled} onCheckedChange={handleNotificationsChange} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">Newsletter Subscription</p>
                <p className="text-sm text-muted-foreground">
                  Subscribe to our newsletter for the latest news and updates.
                </p>
              </div>
              <Switch id="newsletter" checked={isSubscribed} onCheckedChange={handleSubscriptionChange} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
