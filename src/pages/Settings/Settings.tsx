
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CreditCard, Bell, Upload, ShieldCheck, Lock, LogOut, Trash2, Building, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, updateProfile, signOut, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    timezone: "America/New_York",
  });
  
  // Company profile state
  const [company, setCompany] = useState({
    name: "Demo Marketing Team",
    industry: "E-commerce",
    industry_category: "Apparel & Accessories",
    business_model: "B2C",
    company_type: "Direct-to-Consumer",
    conversion_type: "Purchase",
    avg_order_value: 75.5,
    avg_sales_cycle_days: 1,
    monthly_ad_budget: "$15,000 - $30,000",
    geo_scope: "North America",
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email_digest: true,
    performance_alerts: true,
    benchmark_updates: true,
    product_updates: false,
    team_activity: true,
  });
  
  // Mock team plan for test purposes
  const userPlan = 'pro_plus'; // Possible values: 'free', 'pro', 'pro_plus', 'agency'
  
  // Mock billing info
  const [billing, setBilling] = useState({
    plan: userPlan,
    renewalDate: new Date(2025, 8, 15),
    paymentMethod: "Visa ending in 4242",
    billingEmail: "",
  });
  
  useEffect(() => {
    // Initialize profile with user data
    if (user) {
      setProfile({
        name: user.user_metadata?.name || "",
        email: user.email || "",
        company: user.user_metadata?.company || "Demo Marketing Team",
        role: user.user_metadata?.role || "Marketing Manager",
        timezone: user.user_metadata?.timezone || "America/New_York",
      });
      
      setBilling(prev => ({
        ...prev,
        billingEmail: user.email || "",
      }));
    }
    
    setLoading(false);
  }, [user]);
  
  const handleUpdateProfile = async () => {
    try {
      await updateProfile({
        name: profile.name,
        company: profile.company,
        role: profile.role,
        timezone: profile.timezone,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateCompany = () => {
    // In a real implementation, this would update the company profile in Supabase
    toast({
      title: "Company profile updated",
      description: "Your company information has been saved.",
    });
  };
  
  const handleUpdateNotifications = () => {
    // In a real implementation, this would update notification preferences in Supabase
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  const handleChangePlan = () => {
    toast({
      title: "Redirecting to billing portal",
      description: "You will be redirected to update your subscription.",
    });
  };
  
  const handleDeleteAccount = () => {
    // This would delete the user's account after confirmation
    toast({
      title: "Account deletion requested",
      description: "Your account will be deleted within 24 hours.",
      variant: "destructive",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, company profile, and notification preferences.
          </p>
        </div>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={profile.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed. Contact support for assistance.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={profile.company}
                      onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Title</Label>
                    <Input 
                      id="role" 
                      value={profile.role}
                      onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={profile.timezone}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateProfile}>
                  <User className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>
                  Control which emails and notifications you receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Performance Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your marketing performance.
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.email_digest}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email_digest: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Performance Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your KPIs change significantly.
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.performance_alerts}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, performance_alerts: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Benchmark Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Be informed when industry benchmarks are updated.
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.benchmark_updates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, benchmark_updates: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Product Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and improvements.
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.product_updates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, product_updates: checked }))
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Team Activity</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about team member actions and changes.
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.team_activity}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, team_activity: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateNotifications}>
                  <Bell className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="company" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Profile</CardTitle>
                <CardDescription>
                  These details help us customize benchmarks and recommendations for your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={company.name}
                      onChange={(e) => setCompany(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select 
                      value={company.industry}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, industry: value }))}
                    >
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry-category">Industry Category</Label>
                    <Select 
                      value={company.industry_category}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, industry_category: value }))}
                    >
                      <SelectTrigger id="industry-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apparel & Accessories">Apparel & Accessories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                        <SelectItem value="Beauty & Personal Care">Beauty & Personal Care</SelectItem>
                        <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="business-model">Business Model</Label>
                    <Select 
                      value={company.business_model}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, business_model: value }))}
                    >
                      <SelectTrigger id="business-model">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B2C">B2C</SelectItem>
                        <SelectItem value="B2B">B2B</SelectItem>
                        <SelectItem value="D2C">D2C</SelectItem>
                        <SelectItem value="Marketplace">Marketplace</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-type">Company Type</Label>
                    <Select 
                      value={company.company_type}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, company_type: value }))}
                    >
                      <SelectTrigger id="company-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direct-to-Consumer">Direct-to-Consumer</SelectItem>
                        <SelectItem value="SMB">Small/Medium Business</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                        <SelectItem value="Agency">Agency</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="conversion-type">Primary Conversion Type</Label>
                    <Select 
                      value={company.conversion_type}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, conversion_type: value }))}
                    >
                      <SelectTrigger id="conversion-type">
                        <SelectValue placeholder="Select conversion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Purchase">Purchase</SelectItem>
                        <SelectItem value="Lead">Lead Generation</SelectItem>
                        <SelectItem value="Subscription">Subscription</SelectItem>
                        <SelectItem value="Registration">Registration</SelectItem>
                        <SelectItem value="App Install">App Install</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="avg-order-value">Average Order Value ($)</Label>
                    <Input 
                      id="avg-order-value" 
                      type="number"
                      value={company.avg_order_value}
                      onChange={(e) => setCompany(prev => ({ ...prev, avg_order_value: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sales-cycle">Average Sales Cycle (days)</Label>
                    <Input 
                      id="sales-cycle" 
                      type="number"
                      value={company.avg_sales_cycle_days}
                      onChange={(e) => setCompany(prev => ({ ...prev, avg_sales_cycle_days: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ad-budget">Monthly Ad Budget</Label>
                    <Select 
                      value={company.monthly_ad_budget}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, monthly_ad_budget: value }))}
                    >
                      <SelectTrigger id="ad-budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under $5,000">Under $5,000</SelectItem>
                        <SelectItem value="$5,000 - $15,000">$5,000 - $15,000</SelectItem>
                        <SelectItem value="$15,000 - $30,000">$15,000 - $30,000</SelectItem>
                        <SelectItem value="$30,000 - $100,000">$30,000 - $100,000</SelectItem>
                        <SelectItem value="$100,000+">$100,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="geo-scope">Geographic Scope</Label>
                    <Select 
                      value={company.geo_scope}
                      onValueChange={(value) => setCompany(prev => ({ ...prev, geo_scope: value }))}
                    >
                      <SelectTrigger id="geo-scope">
                        <SelectValue placeholder="Select scope" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North America">North America</SelectItem>
                        <SelectItem value="Europe">Europe</SelectItem>
                        <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
                        <SelectItem value="Global">Global</SelectItem>
                        <SelectItem value="United States">United States Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateCompany}>
                  <Building className="mr-2 h-4 w-4" />
                  Save Company Profile
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connect Data Sources</CardTitle>
                <CardDescription>
                  Connect your marketing platforms to import performance data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Upload className="h-5 w-5 mb-1" />
                      Connect Google Ads
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Upload className="h-5 w-5 mb-1" />
                      Connect Meta Ads
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Upload className="h-5 w-5 mb-1" />
                      Connect LinkedIn Ads
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Upload className="h-5 w-5 mb-1" />
                      Connect TikTok Ads
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Connect your advertising accounts to automatically import performance data. 
                    We only access reporting metrics, not creative assets or billing details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium capitalize">{billing.plan} Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Renews on {billing.renewalDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Button onClick={handleChangePlan}>
                      Change Plan
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label>Payment Method</Label>
                  <div className="flex items-center p-3 border rounded-md">
                    <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{billing.paymentMethod}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input 
                    id="billing-email" 
                    value={billing.billingEmail}
                    onChange={(e) => setBilling(prev => ({ ...prev, billingEmail: e.target.value }))}
                  />
                </div>
                
                <div className="pt-2">
                  <Button variant="outline">
                    Update Payment Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Billing History</CardTitle>
                <CardDescription>
                  View your past invoices and payment history.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Invoice #INV-1234</p>
                      <p className="text-sm text-muted-foreground">April 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${userPlan === 'pro' ? '99.00' : userPlan === 'pro_plus' ? '149.00' : '299.00'}</p>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Invoice #INV-1123</p>
                      <p className="text-sm text-muted-foreground">March 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${userPlan === 'pro' ? '99.00' : userPlan === 'pro_plus' ? '149.00' : '299.00'}</p>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button>
                    <Lock className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Actions</CardTitle>
                <CardDescription>
                  Manage your account status and data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium">Sign Out</h3>
                      <p className="text-sm text-muted-foreground">
                        Sign out from your current session
                      </p>
                    </div>
                    <Button variant="outline" onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium">Export Your Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Download all your data and reports
                      </p>
                    </div>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium text-destructive">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
                
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Deleting your account is permanent. All of your data will be permanently removed
                    and cannot be recovered.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
