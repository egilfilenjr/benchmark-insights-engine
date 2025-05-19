
import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert as UiAlert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Bell,
  PlusCircle,
  Trash,
  Mail,
  BellRing,
  Clock,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type AlertConfig = {
  id: string;
  name: string;
  kpi: string;
  trigger: "increase" | "decrease";
  threshold: number;
  platform: string;
  channel: string;
  delivery: "email" | "in-app";
  lastTriggered: Date | null;
  active: boolean;
};

export default function Alerts() {
  const { plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);

  const canAccess = ["pro_plus", "agency"].includes(plan);

  useEffect(() => {
    if (!canAccess) return;

    // TODO: Replace with Supabase fetch
    const mockAlerts: AlertConfig[] = [
      {
        id: "1",
        name: "CPA Spike Alert",
        trigger: "increase",
        kpi: "CPA",
        threshold: 20,
        platform: "Meta",
        channel: "Retargeting",
        delivery: "email",
        lastTriggered: new Date(),
        active: true,
      },
      {
        id: "2",
        name: "AECR Drop Alert",
        trigger: "decrease",
        kpi: "AECR",
        threshold: 10,
        platform: "Google",
        channel: "Search",
        delivery: "in-app",
        lastTriggered: null,
        active: false,
      },
    ];

    setAlerts(mockAlerts);
    setLoading(false);
  }, [canAccess]);

  const toggleAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
    toast({ title: "Alert status updated." });
  };

  if (!canAccess) {
    return (
      <AppLayout>
        <div className="text-center max-w-lg mx-auto mt-24">
          <h1 className="text-2xl font-semibold">Upgrade Required</h1>
          <p className="text-muted-foreground mt-2">
            Alerts are only available on Pro+ and Agency plans.
          </p>
          <Button className="mt-4">Upgrade Plan</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Performance Alerts</h1>
            <p className="text-muted-foreground">
              Set triggers for KPIs to monitor key changes automatically.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Define a KPI trigger and alert method.
                </DialogDescription>
              </DialogHeader>
              <form>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Alert Name</Label>
                    <Input id="name" />
                  </div>
                  <div>
                    <Label htmlFor="threshold">Threshold %</Label>
                    <Input id="threshold" type="number" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Alert</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {alerts.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <CardTitle>{a.name}</CardTitle>
                <CardDescription>
                  {a.kpi} {a.trigger} &gt; {a.threshold}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-sm">
                  <div>
                    <strong>Platform:</strong> {a.platform}
                  </div>
                  <div>
                    <strong>Channel:</strong> {a.channel}
                  </div>
                  <div className="flex items-center gap-2">
                    <strong>Delivery:</strong>
                    <Badge variant="outline">
                      {a.delivery === "email" ? <Mail className="w-3 h-3 mr-1" /> : <Bell className="w-3 h-3 mr-1" />}
                      {a.delivery}
                    </Badge>
                  </div>
                  {a.lastTriggered && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      Last Triggered: {format(a.lastTriggered, "PPpp")}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleAlert(a.id)}
                >
                  {a.active ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Disable
                    </>
                  ) : (
                    <>
                      <BellRing className="w-4 h-4 mr-1" />
                      Enable
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
