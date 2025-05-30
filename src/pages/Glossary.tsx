
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');

  const terms = [
    {
      term: "CECR Score™",
      category: "Metrics",
      definition: "Creative, Engagement, Conversion, Revenue Score - A comprehensive 0-100 metric that evaluates marketing performance across four key dimensions."
    },
    {
      term: "CTR (Click-Through Rate)",
      category: "Metrics",
      definition: "The percentage of people who click on your ad after seeing it. Calculated as clicks divided by impressions."
    },
    {
      term: "CVR (Conversion Rate)",
      category: "Metrics", 
      definition: "The percentage of visitors who complete a desired action. Calculated as conversions divided by total visitors."
    },
    {
      term: "ROAS (Return on Ad Spend)",
      category: "Metrics",
      definition: "Revenue generated for every dollar spent on advertising. Calculated as revenue divided by ad spend."
    },
    {
      term: "CPA (Cost Per Acquisition)",
      category: "Metrics",
      definition: "The average cost to acquire one customer or conversion. Calculated as total ad spend divided by conversions."
    },
    {
      term: "Attribution Modeling",
      category: "Analytics",
      definition: "The process of assigning credit to different touchpoints in the customer journey that lead to a conversion."
    },
    {
      term: "Frequency",
      category: "Campaign Management",
      definition: "The average number of times your ad is shown to the same person over a given time period."
    },
    {
      term: "Lookalike Audience",
      category: "Targeting",
      definition: "A targeting option that finds people similar to your existing customers based on their characteristics and behaviors."
    },
    {
      term: "Retargeting",
      category: "Targeting",
      definition: "Showing ads to people who have previously interacted with your website, app, or other digital properties."
    },
    {
      term: "Impression",
      category: "Metrics",
      definition: "Each time your ad is displayed, regardless of whether it's clicked or not."
    }
  ];

  const categories = [...new Set(terms.map(term => term.category))];

  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Marketing Dictionary</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Marketing <span className="gradient-text">Glossary</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto mb-8">
              Comprehensive definitions of marketing terms, metrics, and concepts to help you understand industry terminology.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-navy-400" />
              <Input
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-navy-100">
                {category}
              </Badge>
            ))}
          </div>

          {/* Terms */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTerms.map((item, index) => (
              <Card key={index} className="feature-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.term}</CardTitle>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{item.definition}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-navy-600">No terms found matching your search.</p>
            </div>
          )}

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mt-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Missing a Term?</h2>
            <p className="text-navy-600 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Let us know and we'll add it to our glossary.
            </p>
            <Badge variant="outline" className="cursor-pointer hover:bg-navy-100">
              Suggest a Term
            </Badge>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
