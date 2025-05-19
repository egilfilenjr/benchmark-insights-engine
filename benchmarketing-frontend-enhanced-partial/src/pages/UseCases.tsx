import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const useCases = [
  {
    persona: "In-House Marketer",
    value: "Monitor ROAS and CPA vs competitors weekly.",
    cta: "Stay on top of your paid performance.",
  },
  {
    persona: "CMO",
    value: "Get a quick AECR Score across all media.",
    cta: "Simplify board-ready performance reviews.",
  },
  {
    persona: "Agency Strategist",
    value: "Benchmark client results + deliver white-labeled reports.",
    cta: "Impress clients with exportable industry proof.",
  },
  {
    persona: "Performance Marketer",
    value: "Instantly find underperforming channels by ROI gap.",
    cta: "Prioritize media spend where it counts.",
  },
  {
    persona: "Freelancer / Consultant",
    value: "Use real benchmarks to pitch smarter strategies.",
    cta: "Build trust with real data from day one.",
  },
  {
    persona: "Growth Hacker",
    value: "Surface quick wins from channel-level trends.",
    cta: "Go from insight to impact in hours, not weeks.",
  },
  {
    persona: "Paid Media Buyer",
    value: "Compare CPA and ROAS across similar accounts.",
    cta: "Buy smarter. Spend better. Prove ROI.",
  },
  {
    persona: "Data Analyst",
    value: "Blend benchmarked KPIs with internal trends.",
    cta: "Spot anomalies faster. Validate internal insights.",
  },
];

export default function UseCases() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Use Cases</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how different marketers use Benchmarketing to get clarity, outperform, and grow.
          </p>
        </section>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((u, i) => (
            <Card key={i} className="h-full hover:shadow transition">
              <CardContent className="p-4 space-y-2">
                <CardTitle>{u.persona}</CardTitle>
                <p className="text-sm text-muted-foreground">{u.value}</p>
                <p className="text-sm">{u.cta}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 mt-2"
                  onClick={() => navigate("/signup")}
                >
                  Try it free →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
