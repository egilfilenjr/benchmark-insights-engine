
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const definitions = [
  {
    term: "ROAS",
    slug: "roas",
    fullName: "Return on Ad Spend",
    definition: "A marketing metric that measures the revenue generated for every dollar spent on advertising.",
    formula: "ROAS = Revenue from Ads / Cost of Ads",
    example: "If you spend $100 on ads and generate $400 in revenue, your ROAS is 4:1 or 400%",
    benchmarks: "Good ROAS varies by industry, typically 3:1 to 5:1",
    icon: "💰"
  },
  {
    term: "CTR",
    slug: "ctr", 
    fullName: "Click-Through Rate",
    definition: "The percentage of people who click on your ad after seeing it.",
    formula: "CTR = (Clicks / Impressions) × 100",
    example: "If your ad is shown 1,000 times and 20 people click, your CTR is 2%",
    benchmarks: "Average CTR varies by platform: Google Ads ~2%, Facebook ~1.8%",
    icon: "👆"
  },
  {
    term: "CPA",
    slug: "cpa",
    fullName: "Cost Per Acquisition", 
    definition: "The average cost to acquire one customer or conversion.",
    formula: "CPA = Total Ad Spend / Number of Conversions",
    example: "If you spend $500 and get 10 conversions, your CPA is $50",
    benchmarks: "Good CPA should be lower than your customer lifetime value",
    icon: "🎯"
  },
  {
    term: "LTV",
    slug: "ltv",
    fullName: "Lifetime Value",
    definition: "The total revenue a customer generates throughout their relationship with your business.",
    formula: "LTV = Average Purchase Value × Purchase Frequency × Customer Lifespan",
    example: "Customer spends $50, buys 4 times/year for 3 years = $600 LTV",
    benchmarks: "LTV should be 3-5x higher than CAC for healthy unit economics",
    icon: "⏰"
  },
  {
    term: "CAC",
    slug: "cac",
    fullName: "Customer Acquisition Cost",
    definition: "The total cost of acquiring a new customer, including all marketing and sales expenses.",
    formula: "CAC = (Marketing + Sales Costs) / Number of New Customers",
    example: "Spend $1,000 to acquire 20 customers = $50 CAC",
    benchmarks: "CAC should be recovered within 12 months of customer acquisition",
    icon: "💸"
  }
];

export default function Definitions() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Marketing Definitions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential marketing terms and metrics every marketer should understand
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {definitions.map((def) => (
            <Card key={def.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{def.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{def.term}</CardTitle>
                    <CardDescription className="text-base">{def.fullName}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Definition:</h4>
                  <p className="text-sm text-muted-foreground">{def.definition}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Formula:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">{def.formula}</code>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Example:</h4>
                  <p className="text-sm text-muted-foreground">{def.example}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Benchmarks:</h4>
                  <p className="text-sm text-muted-foreground">{def.benchmarks}</p>
                </div>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/definitions/${def.slug}`}>
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
