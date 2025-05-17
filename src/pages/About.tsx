import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">About Benchmarketing</h1>
          <p className="text-muted-foreground text-lg">
            We believe marketers deserve clarity — not confusion.
          </p>
        </header>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            We exist to give marketers the benchmarking data, tools, and insights they need to make better decisions —
            without guesswork, bias, or bloat.
          </p>
        </section>

        {/* Founders */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Founders</h2>
          <Card>
            <CardHeader>
              <CardTitle>Eddy Gilfilen</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Eddy is a performance marketer and product strategist who’s led hundreds of millions in media spend. His
                vision for Benchmarketing was born out of a simple idea: marketers need clarity, not just dashboards.
              </p>
              <p className="mt-2">
                <a
                  href="https://www.linkedin.com/in/eddy-gilfilen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View LinkedIn →
                </a>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Product Story */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why We Built This</h2>
          <p>
            Every marketer wonders: “How are we really doing?” Benchmarketing turns isolated ad metrics into
            benchmarks, trends, and recommendations that help teams focus on what’s underperforming and fix it.
          </p>
        </section>

        {/* Press Kit */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Press Kit</h2>
          <ul className="list-disc pl-5 text-muted-foreground text-sm">
            <li>
              <a
                href="/press/benchmarketing-logos.zip"
                className="text-blue-600 hover:underline"
              >
                Download Logos
              </a>
            </li>
            <li>
              <a
                href="/press/product-screenshots.zip"
                className="text-blue-600 hover:underline"
              >
                Product Screenshots
              </a>
            </li>
            <li>
              <a
                href="/press/brand-guidelines.pdf"
                className="text-blue-600 hover:underline"
              >
                Brand Guidelines
              </a>
            </li>
          </ul>
        </section>

        <div className="text-center mt-10">
          <Link
            to="/signup"
            className="inline-block px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            Start Free
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
