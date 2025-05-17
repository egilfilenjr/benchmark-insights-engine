import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Blog",
    description: "Actionable insights on metrics, trends, and strategy.",
    items: [
      { name: "What is AECR?", url: "/blog/what-is-aecr" },
      { name: "How to read your CPA trendline", url: "/blog/cpa-trendline" },
    ],
  },
  {
    title: "Case Studies",
    description: "Real examples of results and benchmark usage.",
    items: [
      { name: "How a DTC brand reduced CPA 32% in 3 weeks", url: "/case-studies/dtc-cpa-drop" },
    ],
  },
  {
    title: "Playbooks",
    description: "Fix low ROAS campaigns with repeatable tactics.",
    items: [
      { name: "How to fix Meta campaigns with low ROAS", url: "/playbooks/fix-meta-roas" },
    ],
  },
  {
    title: "Benchmark Reports",
    description: "Downloadable KPI decks by industry and channel.",
    items: [
      { name: "2024 Media Benchmarks PDF", url: "/downloads/2024-benchmarks.pdf" },
    ],
  },
  {
    title: "Video Demos",
    description: "Walkthroughs of the app, dashboard, and AECR Score™.",
    items: [
      { name: "Intro to Benchmarketing (3-min)", url: "/videos/intro" },
      { name: "AECR Score Explainer", url: "/videos/aecr" },
    ],
  },
];

export default function Resources() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to get more from your media data — with strategies, examples, and templates.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <Card key={i} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2 space-y-2">
                {section.items.map((item, j) => (
                  <Link key={j} to={item.url} className="block text-blue-600 text-sm hover:underline">
                    {item.name}
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/signup"
            className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            Start Free & Get Your AECR Score
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
