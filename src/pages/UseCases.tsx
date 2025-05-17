import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const personas = [
  {
    role: "In-House Marketer",
    value: "Monitor ROAS and CPA vs competitors weekly",
    cta: "Track your weekly performance →",
    url: "/signup",
  },
  {
    role: "CMO",
    value: "Get a single AECR Score across all campaigns",
    cta: "Get your AECR Score →",
    url: "/signup",
  },
  {
    role: "Agency",
    value: "Benchmark client campaigns and deliver white-labeled reports",
    cta: "Upgrade to agency reporting →",
    url: "/signup",
  },
  {
    role: "Growth Hacker",
    value: "Spot underperforming channels instantly",
    cta: "Explore optimization ideas →",
    url: "/signup",
  },
  {
    role: "Freelancer",
    value: "Use benchmarks to pitch smarter strategy",
    cta: "Start free to build smarter decks →",
    url: "/signup",
  },
];

export default function UseCases() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">How People Use Benchmarketing</h1>
          <p className="text-muted-foreground text-lg">
            From freelancers to CMOs, see how marketers turn benchmark data into better decisions.
          </p>
        </header>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <Card key={i} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>{persona.role}</CardTitle>
                <CardDescription>{persona.value}</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <Link
                  to={persona.url}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  {persona.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/signup"
            className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            Try it Free
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
