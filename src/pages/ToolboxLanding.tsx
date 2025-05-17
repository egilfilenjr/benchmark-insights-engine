import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

const allTools = [
  {
    id: "roas",
    name: "ROAS Calculator",
    description: "Calculate return on ad spend from revenue and spend.",
    category: "kpi",
    url: "/toolbox/roas-calculator",
  },
  {
    id: "cpa",
    name: "CPA Calculator",
    description: "Determine cost per acquisition across channels.",
    category: "kpi",
    url: "/toolbox/cpa-calculator",
  },
  {
    id: "ctr",
    name: "CTR Calculator",
    description: "Measure click-through rate efficiency.",
    category: "kpi",
    url: "/toolbox/ctr-calculator",
  },
  {
    id: "media-mix",
    name: "Media Mix Planner",
    description: "Visualize and plan ad spend by platform.",
    category: "budget",
    url: "/toolbox/media-mix-planner",
  },
  {
    id: "ltv",
    name: "LTV Calculator",
    description: "Estimate lifetime value of a customer.",
    category: "forecasting",
    url: "/toolbox/ltv-calculator",
  },
  {
    id: "funnel",
    name: "Funnel Forecast Tool",
    description: "Project leads, MQLs, and conversions over time.",
    category: "funnel",
    url: "/toolbox/funnel-forecast",
  },
  {
    id: "aecr",
    name: "AECR Explainer",
    description: "Understand your Acquisition Efficiency to Conversion Ratio.",
    category: "lift",
    url: "/toolbox/aecr-explainer",
  },
  // ... You can add 40+ more tools over time here
];

export default function ToolboxLanding() {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allTools.filter((tool) => {
    const matchesCategory = category === "all" || tool.category === category;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Toolbox</h1>
          <p className="text-muted-foreground">
            50+ free marketing calculators and planners for media pros.
          </p>
        </header>

        <Input
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="kpi">KPI</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="lift">Lift</TabsTrigger>
          </TabsList>

          <TabsContent value={category}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filtered.map((tool) => (
                <Link to={tool.url} key={tool.id}>
                  <Card className="hover:shadow-lg transition">
                    <CardHeader>
                      <CardTitle>{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-10 space-y-2">
          <h2 className="text-xl font-semibold">Want your numbers benchmarked?</h2>
          <p className="text-muted-foreground">Start free and get your AECR Score™ today.</p>
          <Link to="/signup" className="inline-block mt-2 px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800">
            See Your Score
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
