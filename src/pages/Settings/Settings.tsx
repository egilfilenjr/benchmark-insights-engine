import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  User,
  Mail,
  Bell,
  CreditCard,
  AlertTriangle,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, signOut } = useUserProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [reportFooterNote, setReportFooterNote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
    setLoading(false);
  }, [user]);

  const handleSave = () => {
    toast({ title: "Settings saved!" });
    // TODO: Push to Supabase
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>
              <User className="w-5 h-5 inline mr-2" />
              Profile
            </CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={email} disabled />
            </div>
            <Button onClick={handleSave} className="w-fit mt-2">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Bell className="w-5 h-5 inline mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label>Enable KPI alert emails</Label>
              <Switch
                checked={isNotificationsEnabled}
                onCheckedChange={setIsNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <CreditCard className="w-5 h-5 inline mr-2" />
              Billing
            </CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              Open Billing Portal <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>White-label Report Footer (Agency Only)</CardTitle>
            <CardDescription>
              Add a custom note or footer to exported reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="e.g., Powered by Benchmarketing"
              value={reportFooterNote}
              onChange={(e) => setReportFooterNote(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Lock className="w-5 h-5 inline mr-2" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete My Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently erase your data and cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast({ title: "Account deleted" })}>
                    Confirm Deletion
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
