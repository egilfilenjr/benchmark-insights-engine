
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const guides = [
  {
    title: "How to Improve ROAS",
    slug: "improve-roas",
    description: "Step-by-step guide to optimizing your return on ad spend",
    difficulty: "Intermediate",
    readTime: "8 min read",
    category: "Optimization",
    topics: ["Campaign optimization", "Audience targeting", "Bid strategies", "Creative testing"]
  },
  {
    title: "Benchmark vs Goal Setting",
    slug: "benchmark-vs-goal",
    description: "Understanding the difference between benchmarks and goals in marketing",
    difficulty: "Beginner", 
    readTime: "5 min read",
    category: "Strategy",
    topics: ["Goal setting", "Benchmark analysis", "KPI planning", "Performance tracking"]
  },
  {
    title: "How to Read Benchmark Data",
    slug: "how-to-read-benchmark-data",
    description: "Complete guide to interpreting and applying benchmark data effectively",
    difficulty: "Beginner",
    readTime: "6 min read", 
    category: "Analytics",
    topics: ["Data interpretation", "Statistical significance", "Industry comparison", "Performance analysis"]
  },
  {
    title: "Ecommerce Marketing Metrics",
    slug: "ecommerce-metrics",
    description: "Essential metrics every ecommerce marketer should track",
    difficulty: "Intermediate",
    readTime: "10 min read",
    category: "Ecommerce",
    topics: ["AOV", "Customer LTV", "Retention rate", "Purchase funnel"]
  },
  {
    title: "Budget Forecasting for Ads",
    slug: "budget-forecasting-ads",
    description: "How to forecast and allocate advertising budgets effectively",
    difficulty: "Advanced",
    readTime: "12 min read",
    category: "Planning", 
    topics: ["Budget planning", "Forecasting models", "Channel allocation", "ROI prediction"]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-100 text-green-800";
    case "Intermediate": return "bg-yellow-100 text-yellow-800"; 
    case "Advanced": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function Guides() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Marketing Guides</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth guides to help you master marketing analytics and optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {guides.map((guide) => (
            <Card key={guide.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{guide.category}</Badge>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(guide.difficulty)} variant="outline">
                      {guide.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {guide.topics.map((topic, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/guides/${guide.slug}`}>
                      Read Guide
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-2">Need a Custom Guide?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Let us know what guide would help your marketing efforts.
            </p>
            <Button asChild>
              <Link to="/contact">Request a Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
