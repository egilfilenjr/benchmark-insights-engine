
import { LineChart, PieChart, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Compare Your KPIs',
    description: 'See CPA, ROAS, CTR vs peers across your industry',
    icon: <LineChart size={28} className="text-lilac" />,
    color: 'border-lilac/30 bg-lilac/5'
  },
  {
    title: 'Visualize Your Trends',
    description: 'Understand performance changes over time',
    icon: <TrendingUp size={28} className="text-aqua" />,
    color: 'border-aqua/30 bg-aqua/5'
  },
  {
    title: 'Fix What\'s Not Working',
    description: 'AI tips for campaigns below benchmark',
    icon: <CheckCircle size={28} className="text-success" />,
    color: 'border-success/30 bg-success/5'
  },
  {
    title: 'Export & Share Results',
    description: 'Branded reports and trend decks in one click',
    icon: <PieChart size={28} className="text-navy-600" />,
    color: 'border-navy-600/30 bg-navy-600/5'
  },
];

const FeatureTeasers = () => {
  return (
    <section className="py-24 bg-softgray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Turn marketing data into decisions
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Benchmarketing gives you the tools to understand and improve your marketing performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={cn(
                "border h-full hover:shadow-md transition-shadow",
                feature.color
              )}
            >
              <CardContent className="p-6">
                <div className="mb-5 rounded-full w-12 h-12 flex items-center justify-center bg-white border border-gray-100 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">{feature.title}</h3>
                <p className="text-navy-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl p-8 shadow-md border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-5xl font-bold text-lilac mb-2">500+</h3>
              <p className="text-navy-700">industry benchmarks</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-bold text-aqua mb-2">$2.1B</h3>
              <p className="text-navy-700">ad spend analyzed</p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-5xl font-bold text-success mb-2">32%</h3>
              <p className="text-navy-700">average ROAS improvement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTeasers;
