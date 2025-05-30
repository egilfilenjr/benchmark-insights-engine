
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
      term: "AECR",
      definition: "Advertising Efficiency and Competitive Rank - Benchmarketing's proprietary metric that measures your campaign performance against industry standards.",
      category: "Metrics"
    },
    {
      term: "Benchmark",
      definition: "A standard or point of reference against which things may be compared or assessed. In marketing, industry averages for key performance metrics.",
      category: "General"
    },
    {
      term: "Click-Through Rate (CTR)",
      definition: "The percentage of people who click on an ad after seeing it. Calculated as clicks divided by impressions.",
      category: "Metrics"
    },
    {
      term: "CompScore",
      definition: "A 0-100 score that shows how your marketing performance compares to industry benchmarks across key metrics.",
      category: "Metrics"
    },
    {
      term: "Conversion Rate (CVR)",
      definition: "The percentage of visitors who complete a desired action. Calculated as conversions divided by total visitors.",
      category: "Metrics"
    },
    {
      term: "Cost Per Acquisition (CPA)",
      definition: "The cost of acquiring one customer. Calculated as total ad spend divided by the number of acquisitions.",
      category: "Metrics"
    },
    {
      term: "Cost Per Click (CPC)",
      definition: "The average amount paid for each click on your ads. Calculated as total ad spend divided by total clicks.",
      category: "Metrics"
    },
    {
      term: "Cost Per Mille (CPM)",
      definition: "The cost per thousand impressions. A common metric for measuring the cost efficiency of advertising campaigns.",
      category: "Metrics"
    },
    {
      term: "Customer Acquisition Cost (CAC)",
      definition: "The total cost of acquiring a new customer, including all marketing and sales expenses.",
      category: "Business"
    },
    {
      term: "Customer Lifetime Value (LTV)",
      definition: "The predicted net profit attributed to the entire future relationship with a customer.",
      category: "Business"
    },
    {
      term: "Frequency",
      definition: "The average number of times an individual sees your ad. Calculated as impressions divided by reach.",
      category: "Advertising"
    },
    {
      term: "Impressions",
      definition: "The number of times your ad is displayed, regardless of whether it's clicked or not.",
      category: "Advertising"
    },
    {
      term: "Key Performance Indicator (KPI)",
      definition: "A measurable value that demonstrates how effectively a company is achieving key business objectives.",
      category: "General"
    },
    {
      term: "Reach",
      definition: "The total number of unique people who see your ad content.",
      category: "Advertising"
    },
    {
      term: "Return on Ad Spend (ROAS)",
      definition: "Revenue generated for every dollar spent on advertising. Calculated as revenue divided by ad spend.",
      category: "Metrics"
    },
    {
      term: "Return on Investment (ROI)",
      definition: "A measure used to evaluate the efficiency of an investment. Calculated as (gain - cost) / cost.",
      category: "Business"
    }
  ];

  const categories = ["All", "Metrics", "Advertising", "Business", "General"];

  const filteredTerms = terms.filter(term => 
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTerms = categories.reduce((acc, category) => {
    if (category === "All") return acc;
    acc[category] = filteredTerms.filter(term => term.category === category);
    return acc;
  }, {} as Record<string, typeof terms>);

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Definitions</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Marketing <span className="gradient-text">Glossary</span>
            </h1>
            <p className="text-xl text-navy-600 mb-8">
              Understand key marketing terms and metrics used throughout Benchmarketing.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400 h-4 w-4" />
                <Input 
                  placeholder="Search terms..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-lilac mb-2">{terms.length}</div>
                <div className="text-navy-700 font-semibold">Total Terms</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-aqua mb-2">{categories.length - 1}</div>
                <div className="text-navy-700 font-semibold">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">{filteredTerms.length}</div>
                <div className="text-navy-700 font-semibold">Results</div>
              </div>
            </div>
          </div>

          {/* Terms by Category */}
          {Object.entries(groupedTerms).map(([category, categoryTerms]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">{category}</h2>
              <div className="space-y-4">
                {categoryTerms.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-navy-900">{item.term}</CardTitle>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-navy-600">
                        {item.definition}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* No Results */}
          {filteredTerms.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-navy-600 text-lg">No terms found matching "{searchTerm}"</p>
              <p className="text-navy-500 mt-2">Try a different search term or browse by category.</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-navy-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Missing a Term?
            </h2>
            <p className="text-navy-600 mb-6">
              Can't find what you're looking for? Let us know and we'll add it to our glossary.
            </p>
            <button className="px-6 py-3 bg-lilac text-white rounded-lg hover:bg-lilac/90 transition-colors">
              Suggest a Term
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
