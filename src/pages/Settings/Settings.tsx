import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileDown, User, Mail, Check, X, AlertCircle } from "lucide-react";
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

export default function Settings() {
  const { user, updateProfile, signOut } = useUserProfile();
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  
  // Mock team plan for test purposes
  const userPlan = 'agency'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') === 'dark';
      setIsDarkTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme);
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        name: formData.name
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="hello@example.com"
                value={user?.email || ""}
                disabled
              />
            </div>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Plan & Billing</CardTitle>
            <CardDescription>
              Manage your subscription plan and billing details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For individuals getting started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    Access to basic features
                  </p>
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    Limited data storage
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={selectedPlan === "free" ? "default" : "outline"}
                    onClick={() => setSelectedPlan("free")}
                  >
                    {selectedPlan === "free" ? "Current Plan" : "Choose Free"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    All free features
                  </p>
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    Advanced analytics
                  </p>
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    Priority support
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={selectedPlan === "pro" ? "default" : "outline"}
                    onClick={() => setSelectedPlan("pro")}
                  >
                    {selectedPlan === "pro" ? "Current Plan" : "Choose Pro"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Agency</CardTitle>
                  <CardDescription>For large teams and agencies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    All pro features
                  </p>
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    Unlimited data storage
                  </p>
                  <p className="text-sm">
                    <Check className="h-4 w-4 mr-1 inline-block" />
                    Dedicated account manager
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={selectedPlan === "agency" ? "default" : "outline"}
                    onClick={() => setSelectedPlan("agency")}
                  >
                    {selectedPlan === "agency" ? "Current Plan" : "Choose Agency"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="border rounded-md p-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Next Payment</p>
                  <p className="text-xs text-muted-foreground">May 20, 2024</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Amount</p>
                  <p className="text-xs text-muted-foreground">$29.99</p>
                </div>
                <div>
                  <Button variant="outline" size="sm">Update Payment Info</Button>
                </div>
              </div>
            </div>
            
            {(userPlan === "pro_plus" || userPlan === "agency") && (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
            
            {(userPlan === "pro_plus" || userPlan === "agency") && (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Dark Mode</Label>
              <Switch id="theme" checked={isDarkTheme} onCheckedChange={handleThemeToggle} />
            </div>
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
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch
                id="notifications"
                checked={isNotificationsEnabled}
                onCheckedChange={(checked) => setIsNotificationsEnabled(checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Download Data</CardTitle>
            <CardDescription>
              Download your data in CSV format.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button>
              <FileDown className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Be careful, these actions can have consequences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignOut}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button variant="secondary" onClick={handleSignOut}>
              <FileDown className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
