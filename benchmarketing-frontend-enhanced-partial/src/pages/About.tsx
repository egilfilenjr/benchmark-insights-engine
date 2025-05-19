import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Mission */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Our Mission</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe marketers deserve clarity — not confusion. Benchmarketing was built to give every team
            access to real performance benchmarks, simplified scoring, and transparent ROI signals.
          </p>
        </section>

        {/* Founders */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Meet the Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardContent className="p-4 space-y-2">
                <CardTitle>Eddy Gilfilen</CardTitle>
                <p className="text-sm text-muted-foreground">Founder & Chief Performance Officer</p>
                <p className="text-sm">Former media buyer turned product strategist. Obsessed with data, clarity, and turning insights into action.</p>
                <Button variant="link" className="p-0 text-sm" asChild>
                  <a href="https://www.linkedin.com/in/egilfilenjr" target="_blank" rel="noopener noreferrer">
                    View LinkedIn →
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* You can add additional founders here */}
          </div>
        </section>

        {/* Story */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Why We Built Benchmarketing</h2>
          <p className="text-muted-foreground text-base">
            After managing millions in ad spend and building reports for every possible KPI, we kept asking:
            “How do I know what *good* looks like?” There was no easy way to compare campaign performance
            without spreadsheets, surveys, or guesswork. So we built it.
          </p>
          <p className="text-muted-foreground text-base">
            Benchmarketing is the platform we wish we had: one that makes benchmarks simple, scores obvious,
            and optimization smarter — all from real, anonymized performance data.
          </p>
        </section>

        {/* Press Kit */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Press Kit</h2>
          <p className="text-muted-foreground text-base">
            Need brand assets, logos, or product screenshots? Grab everything you need from our downloadable
            press kit.
          </p>
          <Button variant="outline" asChild>
            <a href="/press-kit.zip" download>
              Download Press Kit
            </a>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
