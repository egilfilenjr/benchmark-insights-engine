// File: src/pages/HowItWorks.tsx

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <MainLayout>
      <div className="space-y-12 px-6 max-w-5xl mx-auto py-12">
        <section>
          <h1 className="text-3xl font-bold mb-2">How Benchmarketing Works</h1>
          <p className="text-muted-foreground text-lg">
            From data sync to insight — here's how marketers use Benchmarketing to unlock clarity.
          </p>
        </section>

        {/* AECR Score Explainer */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What is AECR?</h2>
          <p>
            AECR stands for <strong>Acquisition Efficiency to Conversion Ratio</strong>. It shows how efficiently your
            ad spend generates results — summarized as a score out of 100.
          </p>
          <div className="rounded-xl border p-4 bg-muted">🔁 Funnel logic graphic goes here</div>
        </section>

        {/* OAuth Sync Flow */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Data, Securely Connected</h2>
          <p>
            Benchmarketing uses secure OAuth connections to sync performance data — never billing or creative.
          </p>
          <div className="rounded-xl border p-4 bg-muted">➡️ Connect → Sync → Analyze → Recommend → Export</div>
        </section>

        {/* Benchmark Engine */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Benchmarks Engine</h2>
          <p>
            Your data is compared against anonymized industry cohorts — across metrics like CPA, ROAS, CTR and Spend.
          </p>
          <div className="rounded-xl border p-4 bg-muted">📊 Visual of benchmark comparison UI</div>
        </section>

        {/* AI Tips Engine */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">AI-Powered Recommendations</h2>
          <p>
            Benchmarketing highlights weak KPIs and offers targeted fixes based on spend, channel, and conversion type.
          </p>
          <div className="rounded-xl border p-4 bg-muted">🤖 Smart recs UI mockup</div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Privacy & Security</h2>
          <ul className="list-disc pl-5">
            <li>OAuth read-only access only</li>
            <li>No billing, no creative, no PII</li>
            <li>Data encrypted at rest and anonymized for benchmarks</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to see how your marketing stacks up?</h2>
          <Button asChild size="lg">
            <Link to="/signup">Start Free</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
