
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const useCases = [
  {
    title: "In-House Marketers",
    slug: "in-house-marketers",
    description: "Optimize campaigns and prove ROI to stakeholders",
    icon: "👩‍💼",
    challenges: ["Proving campaign ROI", "Budget allocation", "Performance optimization"],
    benefits: ["Data-driven decisions", "Stakeholder buy-in", "Campaign optimization"]
  },
  {
    title: "Agencies",
    slug: "agencies", 
    description: "Deliver superior results for multiple clients",
    icon: "🏢",
    challenges: ["Client reporting", "Scaling expertise", "Competitive differentiation"],
    benefits: ["Automated reporting", "Industry insights", "Client retention"]
  },
  {
    title: "Freelancers",
    slug: "freelancers",
    description: "Compete with larger agencies and prove value",
    icon: "🎯",
    challenges: ["Limited resources", "Client acquisition", "Expertise scaling"],
    benefits: ["Professional insights", "Competitive edge", "Time savings"]
  },
  {
    title: "Media Buyers",
    slug: "media-buyers",
    description: "Make data-driven buying decisions",
    icon: "📊",
    challenges: ["Platform optimization", "Budget efficiency", "Performance tracking"],
    benefits: ["Better ROAS", "Informed bidding", "Performance insights"]
  },
  {
    title: "CMOs",
    slug: "cmos",
    description: "Strategic marketing leadership and planning",
    icon: "👔",
    challenges: ["Strategic planning", "Team alignment", "Board reporting"],
    benefits: ["Strategic insights", "Team productivity", "Executive reporting"]
  },
  {
    title: "Performance Teams",
    slug: "performance-teams",
    description: "Scale high-performing campaigns",
    icon: "🚀",
    challenges: ["Campaign scaling", "Cross-platform optimization", "Performance monitoring"],
    benefits: ["Scalable insights", "Platform optimization", "Performance tracking"]
  },
  {
    title: "Startup Founders",
    slug: "startup-founders",
    description: "Efficient customer acquisition on limited budgets",
    icon: "💡",
    challenges: ["Limited budget", "CAC optimization", "Growth scaling"],
    benefits: ["Efficient spending", "Growth acceleration", "Investor metrics"]
  },
  {
    title: "DTC Brands",
    slug: "dtc-brands",
    description: "Optimize direct-to-consumer marketing",
    icon: "🛍️",
    challenges: ["Customer acquisition", "Retention marketing", "Channel optimization"],
    benefits: ["Lower CAC", "Higher LTV", "Channel insights"]
  },
  {
    title: "Enterprise Brands",
    slug: "enterprise-brands",
    description: "Scale marketing across multiple markets",
    icon: "🏭",
    challenges: ["Multi-market campaigns", "Budget allocation", "Performance standardization"],
    benefits: ["Standardized metrics", "Budget optimization", "Global insights"]
  },
  {
    title: "Ecommerce Leaders",
    slug: "ecommerce-leaders",
    description: "Drive online sales and revenue growth",
    icon: "🛒",
    challenges: ["Conversion optimization", "ROAS improvement", "Customer journey"],
    benefits: ["Better conversions", "Higher ROAS", "Journey optimization"]
  }
];

export default function UseCasesIndex() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Use Cases</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how different marketing professionals use Benchmarketing to achieve their goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <Card key={useCase.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{useCase.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Challenges:</h4>
                    <ul className="text-sm space-y-1">
                      {useCase.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      {useCase.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/use-cases/${useCase.slug}`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
