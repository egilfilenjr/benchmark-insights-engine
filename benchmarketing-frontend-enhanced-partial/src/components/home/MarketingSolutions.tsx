
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const solutions = [
  {
    id: 'benchmarks',
    title: 'Benchmarks',
    description: 'Compare performance to industry & competitors',
    features: [
      'Performance by channel & industry',
      'CPA, ROAS & CTR comparisons',
      'Performance percentile rankings',
      'Customizable benchmark data'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    href: '/benchmarks'
  },
  {
    id: 'insights',
    title: 'Marketing Insights',
    description: 'Get AI-powered recommendations & analyses',
    features: [
      'Campaign performance analysis',
      'Opportunity identification',
      'Trend detection & forecasting',
      'Automated insights & alerts'
    ],
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1000',
    href: '/recommendations'
  },
  {
    id: 'toolbox',
    title: 'Marketing Tools',
    description: '50+ calculators & planning tools',
    features: [
      'ROI & CPA calculators',
      'AECR score analysis',
      'Media mix modeling',
      'Funnel optimization tools'
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000',
    href: '/toolbox'
  }
];

export function MarketingSolutions() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Marketing solutions for every need
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Everything you need to analyze, compare, and optimize your marketing efforts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution) => (
            <Card key={solution.id} className="overflow-hidden border-0 shadow-lg h-full">
              <div className="h-48 overflow-hidden">
                <img 
                  src={solution.image} 
                  alt={solution.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-navy-600 mb-4">{solution.description}</p>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-navy-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={solution.href}
                  className="text-lilac font-medium hover:text-lilac-700 transition-colors"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
