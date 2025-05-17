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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Plus, TrendingUp, Check, X } from "lucide-react";
import { format, addDays } from "date-fns";
import { toast } from "@/hooks/use-toast";

type Experiment = {
  id: string;
  name: string;
  campaign: string;
  hypothesis: string;
  metric: string;
  expectedResult: string;
  actualResult?: string;
  status: "Active" | "Completed" | "Canceled";
  progress: number;
};

export default function Experiments() {
  const { user, testMode } = useUserProfile();
  const [loading, setLoading] = useState(true);
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  useEffect(() => {
    const loadExperiments = async () => {
      setLoading(true);

      // TODO: Replace with Supabase fetch
      const mockData: Experiment[] = [
        {
          id: "1",
          name: "Video vs Static Creative Test",
          campaign: "Summer Sale - Meta",
          hypothesis: "Video creative will drive 20% better ROAS than static images for our summer promotion.",
          metric: "ROAS",
          expectedResult: "20% improvement",
          actualResult: "18% improvement",
          status: "Completed",
          progress: 100,
        },
        {
          id: "2",
          name: "New Landing Page Test",
          campaign: "Google Search - July",
          hypothesis: "A shorter landing page will increase conversion rate.",
          metric: "Conversion Rate",
          expectedResult: "15% lift",
          status: "Active",
          progress: 45,
        },
      ];

      setExperiments(mockData);
      setLoading(false);
    };

    loadExperiments();
  }, [user]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Experiments</h1>
            <p className="text-muted-foreground">Test your marketing hypotheses</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> New Experiment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Propose a New Experiment</DialogTitle>
                <DialogDescription>
                  Share a hypothesis you want to test and track it here.
                </DialogDescription>
              </DialogHeader>
              <form>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Experiment Name</Label>
                    <Input id="name" />
                  </div
