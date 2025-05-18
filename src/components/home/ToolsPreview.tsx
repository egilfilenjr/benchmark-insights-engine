
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, PieChart, LineChart, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ToolsPreview() {
  const tools = [
    { 
      id: 1, 
      name: 'CPA Calculator', 
      description: 'Calculate cost per acquisition from spend and conversions',
      icon: <PieChart className="w-8 h-8 text-lilac" />,
      url: '/toolbox/cpa-calculator'
    },
    { 
      id: 2, 
      name: 'AECR Explainer', 
      description: 'Understand how your AECR Score is calculated and used',
      icon: <LineChart className="w-8 h-8 text-aqua" />,
      url: '/toolbox/aecr-explainer'
    },
    { 
      id: 3, 
      name: 'Media Mix Planner', 
      description: 'Model how your budget is allocated across channels',
      icon: <BarChart className="w-8 h-8 text-success" />,
      url: '/toolbox/media-mix-planner'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Marketing tools that deliver results
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Explore our free marketing calculators and planning tools designed to help you optimize your campaigns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tools.map((tool) => (
            <Card key={tool.id} className="border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-navy-600 mb-4 flex-grow">{tool.description}</p>
                <Link to={tool.url} className="text-lilac font-medium flex items-center hover:text-lilac-700 transition-colors">
                  Try it free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/toolbox">
            <Button size="lg" variant="outline" className="text-navy-700 font-semibold px-8 py-6 text-base rounded-lg group">
              View all 50+ marketing tools
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
