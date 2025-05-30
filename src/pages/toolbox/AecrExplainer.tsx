
import MainLayout from "@/components/layout/MainLayout";

export default function CecrExplainer() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">What is CECR?</h1>
          <p className="text-muted-foreground text-lg">
            CECR stands for Creative, Engagement, Conversion & Revenue. It's a proprietary score that summarizes how effectively your media spend translates into outcomes across these four key areas.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">🔢 CECR Formula</h2>
          <p>
            CECR is calculated using normalized media efficiency inputs across platforms and conversion types, weighted by impact. It is then compared to industry peers to generate a percentile rank.
          </p>
          <p>
            <strong>Score Range:</strong> 0–100<br />
            <strong>Benchmark Bands:</strong> Bottom 25%, Middle 50%, Top 25%
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">📊 Example</h2>
          <p>
            Your blended CPA is $89. Your peers average $102. Your ROAS is 3.1 vs 2.4 industry median.
          </p>
          <p>You'd earn a CECR score of around 78/100, placing you in the top 25%.</p>
        </section>

        <footer className="text-center pt-10">
          <a
            href="/signup"
            className="inline-block px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800"
          >
            Get Your CECR Score →
          </a>
        </footer>
      </div>
    </MainLayout>
  );
}
