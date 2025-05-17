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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  ExternalLink,
  Edit,
  Trash,
  Star,
  BarChart,
  Share2,
  PlusCircle,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

type SavedView = {
  id: string;
  title: string;
  description: string;
  dateRange: { from: Date; to: Date };
  platform: string;
  kpiFocus: string;
  filters: {
    conversionType: string;
    campaignType: string;
  };
  isPinned: boolean;
  isShared: boolean;
};

export default function SavedViews() {
  const { user, plan } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);

  useEffect(() => {
    setLoading(true);

    // TODO: Replace with Supabase fetch
    const mockViews: SavedView[] = [
      {
        id: "1",
        title: "Meta ROAS by Campaign",
        description: "ROAS benchmarks for Meta campaigns",
        dateRange: { from: new Date(2025, 3, 1), to: new Date(2025, 3, 30) },
        platform: "Meta",
        kpiFocus: "ROAS",
        filters: {
          conversionType: "Purchase",
          campaignType: "All",
        },
        isPinned: true,
        isShared: false,
      },
      {
        id: "2",
        title: "Google CPA - Lead Gen",
        description: "Filtered by search campaigns + lead goals",
        dateRange: { from: new Date(2025, 2, 1), to: new Date(2025, 2, 30) },
        platform: "Google",
        kpiFocus: "CPA",
        filters: {
          conversionType: "Lead",
          campaignType: "Search",
        },
        isPinned: false,
        isShared: true,
      },
    ];

    setSavedViews(mockViews);
    setLoading(false);
  }, [user]);

  const togglePin = (id: string) => {
    setSavedViews((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isPinned: !v.isPinned } : v))
    );
    toast({ title: "View pin updated." });
  };

  const toggleShare = (id: string) => {
    if (!["agency"].includes(plan)) {
      return toast({
        title: "Sharing requires Agency plan",
        description: "Upgrade to share views with your team.",
      });
    }

    setSavedViews((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isShared: !v.isShared } : v))
    );
    toast({ title: "View sharing updated." });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Saved Views</h1>
            <p className="text-muted-foreground">
              Quickly access your favorite filtered dashboards.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Save New View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save New Dashboard View</DialogTitle>
                <DialogDescription>
                  Title, filters, and sharing can be edited later.
                </DialogDescription>
              </DialogHeader>
              <form>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" />
                  </div>
                  <div>
                    <Label htmlFor="desc">Description</Label>
                    <Input id="desc" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {savedViews.map((view) => (
            <Card key={view.id}>
              <CardHeader>
                <CardTitle>{view.title}</CardTitle>
                <CardDescription>{view.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div>
                  <strong>Platform:</strong> {view.platform}
                </div>
                <div>
                  <strong>KPI:</strong> {view.kpiFocus}
                </div>
                <div>
                  <strong>Conversion:</strong> {view.filters.conversionType}
                </div>
                <div>
                  <strong>Dates:</strong>{" "}
                  {format(view.dateRange.from, "MM/dd")} -{" "}
                  {format(view.dateRange.to, "MM/dd")}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => togglePin(view.id)}>
                    <Star className="w-4 h-4 mr-1" />
                    {view.isPinned ? "Unpin" : "Pin"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleShare(view.id)}>
                    <Share2 className="w-4 h-4 mr-1" />
                    {view.isShared ? "Unshare" : "Share"}
                  </Button>
                </div>
                <Button variant="link" size="sm">
                  <LayoutDashboard className="w-4 h-4 mr-1" />
                  Open View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
