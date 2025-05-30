
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

const industryCategories = [
  {
    domain: "Consumer Products",
    categories: [
      {
        name: "Food & Beverage",
        subcategories: ["Packaged Goods", "Beverages", "Alcoholic Beverages", "Restaurants", "Pet Food & Accessories"],
        benchmarkCount: "45+"
      },
      {
        name: "Beauty & Personal Care", 
        subcategories: ["Skincare", "Cosmetics", "Haircare", "Hygiene", "Fragrance"],
        benchmarkCount: "38+"
      },
      {
        name: "Apparel & Accessories",
        subcategories: ["Fashion", "Footwear", "Accessories", "Undergarments"],
        benchmarkCount: "32+"
      },
      {
        name: "Home Goods & Lifestyle",
        subcategories: ["Furniture", "Decor", "Appliances", "DIY & Tools", "Subscriptions"],
        benchmarkCount: "28+"
      }
    ]
  },
  {
    domain: "Personal Services", 
    categories: [
      {
        name: "Healthcare & Wellness",
        subcategories: ["Vision Care", "Dental", "Primary Care", "Mental Health", "Reproductive Health"],
        benchmarkCount: "52+"
      },
      {
        name: "Fitness & Wellness",
        subcategories: ["Studios", "Personal Training", "Coaching", "Retreats", "Spas"],
        benchmarkCount: "25+"
      },
      {
        name: "Education & Learning", 
        subcategories: ["Online Courses", "Bootcamps", "K–12", "Test Prep", "EdTech"],
        benchmarkCount: "31+"
      }
    ]
  },
  {
    domain: "B2B Software & Services",
    categories: [
      {
        name: "B2B SaaS",
        subcategories: ["Marketing", "Sales", "Finance", "HR", "LegalTech", "Cybersecurity"],
        benchmarkCount: "67+"
      },
      {
        name: "B2B Agencies & Services", 
        subcategories: ["Creative Agencies", "SEO", "Paid Media", "Consulting", "Professional Services"],
        benchmarkCount: "29+"
      }
    ]
  }
];

export default function BenchmarksIndustry() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCategories = industryCategories.map(domain => ({
    ...domain,
    categories: domain.categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(domain => domain.categories.length > 0);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Benchmarks by Industry</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Deep performance metrics across 500+ industry categories and subcategories. 
            Find your exact vertical for the most relevant benchmarks.
          </p>
        </section>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Industry Categories */}
        <section className="space-y-8">
          {filteredCategories.map((domain, domainIndex) => (
            <div key={domainIndex} className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">{domain.domain}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {domain.categories.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          {category.benchmarkCount}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Subcategories:</p>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                            <span key={subIndex} className="text-xs bg-muted px-2 py-1 rounded">
                              {sub}
                            </span>
                          ))}
                          {category.subcategories.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{category.subcategories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => navigate("/signup")}
                      >
                        View Benchmarks <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 bg-muted/50 rounded-xl p-8">
          <h2 className="text-2xl font-bold">Can't Find Your Industry?</h2>
          <p className="text-muted-foreground">
            We're constantly adding new industry categories. Connect your data to get personalized benchmarks.
          </p>
          <Button onClick={() => navigate("/signup")}>
            Get Custom Benchmarks
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
