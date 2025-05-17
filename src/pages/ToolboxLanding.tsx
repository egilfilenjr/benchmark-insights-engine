import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const tools = [
  {
    title: "CPA Calculator",
    slug: "cpa-calculator",
    category: "KPI",
    description: "Calculate cost per acquisition from spend and conversions.",
  },
  {
    title: "CTR Calculator",
    slug: "ctr-calculator",
    category: "KPI",
    description: "Measure your click-through rate as a % of impressions.",
  },
  {
    title: "CPM Calculator",
    slug: "cpm-calculator",
    category: "KPI",
    description: "Estimate your cost per 1,000 impressions.",
  },
  {
    title: "LTV Calculator",
    slug: "ltv-calculator",
    category: "Forecasting",
    description: "Project lifetime value using AOV, frequency, and duration.",
  },
  {
    title: "Media Mix Planner",
    slug: "media-mix-planner",
    category: "Budgeting",
    description: "Model how your budget is allocated across channels.",
  },
  {
    title: "AECR Explainer",
    slug: "aecr-explainer",
    category: "Strategy",
    description: "Understand how your AECR Score is calculated and used.",
  },
  {
    title: "Promo Impact",
    slug: "promo-impact",
    category: "Forecasting",
    description: "Estimate sales increase from a campaign promotion.",
  },
  {
    title: "Budget Pacing",
    slug: "budget-pacing",
    category: "Budgeting",
    description: "See if you're overspending or underspending by day.",
  },
  {
    title: "Breakeven ROAS",
    slug: "breakeven-roas",
    category: "KPI",
    description: "Calculate the ROAS needed to cover your margin.",
  },
  {
    title: "Funnel Forecast",
    slug: "funnel-forecast",
    category: "Funnel",
    description: "Predict how many MQLs and conversions your leads generate.",
  },
  {
    title: "Creative Lift",
    slug: "creative-lift",
    category: "Lift Models",
    description: "Compare ROAS from test vs control to calculate lift.",
  },
  {
    title: "Funnel Dropoff",
    slug: "funnel-dropoff",
    category: "Funnel",
    description: "See what % of users are dropping before converting.",
  },
  {
    title: "Incremental Lift",
    slug: "incremental-lift",
    category: "Lift Models",
    description: "Calculate lift between test and control campaigns.",
  },
  {
    title: "LTV to CPA Ratio",
    slug: "ltv-to-cpa-ratio",
    category: "KPI",
    description: "Compare customer lifetime value to your acquisition cost.",
  },
  {
    title: "Lead to MQL Forecast",
    slug: "lead-mql-forecast",
    category: "Funnel",
    description: "Project MQLs based on your lead count and funnel rate.",
  },
  {
    title: "Retargeting Efficiency",
    slug: "retargeting-efficiency",
    category: "Performance",
    description: "Compare prospecting vs retargeting CPA performance.",
  },
  {
    title: "CPL Calculator",
    slug: "cpl-calculator",
    category: "KPI",
    description: "Calculate your cost per lead.",
  },
  {
    title: "ROI Calculator",
    slug: "roi-calculator",
    category: "Performance",
    description: "Calculate return on investment as a percentage.",
  },
  {
    title: "Revenue per Click",
    slug: "revenue-per-click",
    category: "KPI",
    description: "See how much revenue you're generating per click.",
  },
  {
    title: "Value per Visit",
    slug: "conversion-value-per-visit",
    category: "KPI",
    description: "Estimate revenue per visit/session.",
  },
  {
    title: "Bid Impact",
    slug: "bid-impact",
    category: "Strategy",
    description: "Project change in CPC based on bid adjustment.",
  },
  {
    title: "AECR Change",
    slug: "aecr-change",
    category: "KPI",
    description: "Measure % change between AECR scores.",
  },
  {
    title: "Frequency Fatigue",
    slug: "frequency-fatigue",
    category: "Lift Models",
    description: "Model how higher frequency increases CPA.",
  },
  {
    title: "CPA Projection",
    slug: "cpa-projection",
    category: "Forecasting",
    description: "Estimate CPA using CPC and conversion rate.",
  },
  {
    title: "Impression to Reach",
    slug: "impression-to-reach",
    category: "Forecasting",
    description: "Estimate reach from impressions and frequency.",
  },
];

const categories = ["All", "KPI", "Budgeting", "Forecasting", "Funnel", "Lift Models", "Performance", "Strategy"];

export default function ToolboxLanding() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Marketing Toolbox</h1>
          <p className="text-muted-foreground text-lg">
            50+ calculators and tools for performance marketers. Use them free, no login required.
          </p>
        </header>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Input
            type="text"
            placeholder="Search tools…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm px-3 py-1 rounded-full border ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-muted hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <a
              key={tool.slug}
              href={`/toolbox/${tool.slug}`}
              className="block hover:shadow-lg transition"
            >
              <Card className="h-full">
                <CardContent className="p-4 space-y-1">
                  <CardTitle>{tool.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
