import { useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import AppLayout from "@/components/layout/AppLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Calculator,
  DollarSign,
  BarChart,
  TrendingUp,
  Target,
  Clock,
  Search,
} from "lucide-react";
import Link from "next/link";

export default function Toolbox() {
  const { user } = useUserProfile();
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allTools = [
    {
      id: "roas",
      name: "ROAS Calculator",
      description: "Calculate return on ad spend from revenue and spend",
      category: "kpi",
      icon: <Calculator />,
      url: "/toolbox/roas-calculator",
    },
    {
      id: "cpa",
      name: "CPA Calculator",
      description: "Determine cost per acquisition across channels",
      category: "kpi",
      icon: <DollarSign />,
      url: "/toolbox/cpa-calculator",
    },
    {
      id: "ctr",
      name: "CTR Calculator",
      description: "Measure click-through rate efficiency",
      category: "kpi",
      icon: <BarChart />,
      url: "/toolbox/ctr-calculator",
    },
    {
      id: "aecr",
      name: "AECR Explainer",
      description: "Understand your Acquisition Efficiency to Conversion Ratio",
      category: "lift",
      icon: <TrendingUp />,
      url: "/toolbox/aecr-explainer",
    },
    {
      id: "media",
      name: "Media Mix Planner",
      description: "Visualize budget allocation by channel",
      category: "budget",
      icon: <Target />,
      url: "/toolbox/media-mix-planner",
    },
    {
      id: "forecast",
      name: "Funnel Forecast Tool",
      description: "Forecast leads and conversions over time",
      category: "forecasting",
      icon: <Clock />,
      url: "/toolbox/funnel-forecast",
    },
    // TODO: Add the other 40+ tools dynamically or from DB
  ];

  const filteredTools = allTools.filter(
    (tool) =>
      (category === "all" || tool.category === category) &&
      tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Toolbox</h1>
            <p className="text-muted-foreground">
              50+ free calculators and planners for media pros
            </p>
          </div>
        </div>

        <Input
          placeholder="Search tools..."
          icon={<Search />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="kpi">KPI</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="lift">Lift</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value={category}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <Link key={tool.id} href={tool.url}>
                  <Card className="hover:shadow-md transition">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {tool.icon}
                        {tool.name}
                      </CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Want your numbers benchmarked?</CardTitle>
            <CardDescription>
              Get personalized AECR scores and see where you stand.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>See Your Score</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
