import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const industries = [
  {
    id: "saas",
    name: "SaaS",
    kpis: ["Lead Gen CPA", "Demo Requests", "MQL Conversion"],
    channels: ["Google Search", "LinkedIn Ads", "Meta Retargeting"],
    useCase: "Track CAC efficiency across funnel stages",
    url: "/benchmarks/saas-meta-cpa",
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    kpis: ["ROAS", "Cart Abandonment", "Repeat Purchases"],
    channels: ["Google Shopping", "Meta Ads", "Email Retargeting"],
    useCase: "Optimize blended CAC and increase repeat sales",
    url: "/benchmarks/ecommerce-google-roas",
  },
  {
    id: "finance",
    name: "Finance",
    kpis: ["CPA", "ROAS", "Application Rate"],
    channels: ["Google Search", "TikTok Ads", "Display Retargeting"],
    useCase: "Lower acquisition cost for credit or services",
    url: "/benchmarks/finance-tiktok-ctr",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    kpis: ["Cost per Appointment", "Conversion Rate", "CTR"],
    channels: ["Meta Ads", "Google Local", "YouTube"],
    useCase: "Drive more booked consults with less waste",
    url: "/benchmarks/healthcare-meta-cpa",
  },
  {
    id: "education",
    name: "Education",
    kpis: ["Lead CPA", "Application Rate", "Enrollment ROAS"],
    channels: ["LinkedIn", "Google Search", "Meta Ads"],
    useCase: "Increase enrollments while keeping CAC low",
    url: "/benchmarks/education-google-cpa",
  },
  {
    id: "localservices",
    name: "Local Services",
    kpis: ["CTR", "CPA", "Form Fill Rate"],
    channels: ["Google Local", "Meta Lead Ads", "Display"],
    useCase: "Convert more local leads at lower cost",
    url: "/benchmarks/localservices-google-ctr",
  },
];

export default function Industries() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Industry-Specific Insights</h1>
          <p className="text-muted-foreground text-lg">
            Benchmarketing shows you the KPIs and trends that matter most for your vertical.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <Link to={industry.url} key={industry.id}>
              <Card className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>{industry.name}</CardTitle>
                  <CardDescription>
                    KPIs: {industry.kpis.join(", ")}<br />
                    Channels: {industry.channels.join(", ")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{industry.useCase}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/signup" className="inline-block mt-4 px-6 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800">
            Start Free & See Your Industry Benchmarks
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
