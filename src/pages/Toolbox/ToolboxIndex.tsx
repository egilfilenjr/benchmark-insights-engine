
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  BarChart, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Search, 
  Filter 
} from "lucide-react";
import { useState } from "react";

// Tool categories and their associated tools
const toolsByCategory = {
  all: [],
  kpi: [
    { name: 'CTR Calculator', path: '/toolbox/ctr-calculator', icon: <Calculator size={20} /> },
    { name: 'CPA Calculator', path: '/toolbox/cpa-calculator', icon: <Calculator size={20} /> },
    { name: 'ROAS Calculator', path: '/toolbox/roas-calculator', icon: <Calculator size={20} /> },
    { name: 'CPM Calculator', path: '/toolbox/cpm-calculator', icon: <Calculator size={20} /> },
    { name: 'Conversion Rate Calculator', path: '/toolbox/conversion-rate-calculator', icon: <Calculator size={20} /> },
    { name: 'Bounce Rate Calculator', path: '/toolbox/bounce-rate-calculator', icon: <Calculator size={20} /> },
    { name: 'Revenue Per Click', path: '/toolbox/revenue-per-click', icon: <Calculator size={20} /> },
  ],
  budgeting: [
    { name: 'Media Mix Planner', path: '/toolbox/media-mix-planner', icon: <PieChart size={20} /> },
    { name: 'Promo Impact Calculator', path: '/toolbox/promo-impact', icon: <BarChart size={20} /> },
    { name: 'Budget Pacing Tool', path: '/toolbox/budget-pacing', icon: <TrendingUp size={20} /> },
    { name: 'Break-Even ROAS', path: '/toolbox/breakeven-roas', icon: <LineChart size={20} /> },
    { name: 'LTV Calculator', path: '/toolbox/ltv-calculator', icon: <LineChart size={20} /> },
  ],
  funnel: [
    { name: 'Funnel Forecast', path: '/toolbox/funnel-forecast', icon: <LineChart size={20} /> },
    { name: 'Lead-MQL Forecast', path: '/toolbox/lead-mql-forecast', icon: <LineChart size={20} /> },
    { name: 'Funnel Dropoff Analyzer', path: '/toolbox/funnel-dropoff', icon: <BarChart size={20} /> },
    { name: 'Retargeting Efficiency', path: '/toolbox/retargeting-efficiency', icon: <LineChart size={20} /> },
    { name: 'Frequency Fatigue Calculator', path: '/toolbox/frequency-fatigue', icon: <LineChart size={20} /> },
  ],
  forecast: [
    { name: 'Creative Lift Calculator', path: '/toolbox/creative-lift', icon: <TrendingUp size={20} /> },
    { name: 'AECR Change Predictor', path: '/toolbox/aecr-change', icon: <LineChart size={20} /> },
    { name: 'CPA Projection Tool', path: '/toolbox/cpa-projection', icon: <LineChart size={20} /> },
    { name: 'Bid Impact Calculator', path: '/toolbox/bid-impact', icon: <TrendingUp size={20} /> },
    { name: 'Incremental Lift Estimator', path: '/toolbox/incremental-lift', icon: <LineChart size={20} /> },
  ],
};

// Generate the 'all' category by combining all tools
toolsByCategory.all = [
  ...toolsByCategory.kpi,
  ...toolsByCategory.budgeting,
  ...toolsByCategory.funnel,
  ...toolsByCategory.forecast,
];

export default function ToolboxIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');
  
  // Filter tools based on search query
  const filteredTools = toolsByCategory[currentCategory as keyof typeof toolsByCategory].filter(
    tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div className="py-12 bg-gradient-to-b from-softgray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Marketing Calculator Toolbox
            </h1>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              50+ free calculators and planning tools for marketers. No signup required.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" />
              <Input
                type="text"
                placeholder="Search for a calculator or tool..."
                className="pl-10 py-6 text-lg rounded-lg shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setCurrentCategory}>
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white shadow-sm border border-gray-100">
                <TabsTrigger value="all" className="text-sm md:text-base">All Tools</TabsTrigger>
                <TabsTrigger value="kpi" className="text-sm md:text-base">KPI</TabsTrigger>
                <TabsTrigger value="budgeting" className="text-sm md:text-base">Budgeting</TabsTrigger>
                <TabsTrigger value="funnel" className="text-sm md:text-base">Funnel</TabsTrigger>
                <TabsTrigger value="forecast" className="text-sm md:text-base">Forecasting</TabsTrigger>
              </TabsList>
            </div>
            
            {['all', 'kpi', 'budgeting', 'funnel', 'forecast'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTools.map((tool) => (
                    <Link to={tool.path} key={tool.path}>
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-lilac/10 text-lilac">
                              {tool.icon}
                            </div>
                            <h3 className="font-medium text-navy-900">{tool.name}</h3>
                          </div>
                          
                          <div className="flex-grow">
                            {/* Description would go here */}
                          </div>
                          
                          <div className="mt-4 text-right">
                            <span className="text-lilac text-sm">Use Tool →</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                
                {filteredTools.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-navy-600">No tools match your search. Try another term.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 bg-softgray-50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-900 mb-3">Want to benchmark your marketing metrics?</h2>
            <p className="text-navy-600 mb-6">
              See how your actual campaign performance compares to industry standards and get AI-driven recommendations.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/signup">
                <Button size="lg" className="bg-lilac hover:bg-lilac-700 text-white font-semibold">
                  See Your AECR Score
                </Button>
              </Link>
              <Link to="/benchmarks">
                <Button size="lg" variant="outline" className="text-navy-700 font-semibold">
                  Explore Benchmarks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
