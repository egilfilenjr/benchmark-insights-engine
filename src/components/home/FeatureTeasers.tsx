
import { LineChart, PieChart, CheckCircle, TrendingUp } from 'lucide-react';

const FeatureTeasers = () => {
  const features = [
    {
      title: 'Compare Your KPIs',
      description: 'See CPA, ROAS, CTR vs peers across your industry',
      icon: <LineChart size={40} className="text-lilac" />,
    },
    {
      title: 'Visualize Your Trends',
      description: 'Understand performance changes over time',
      icon: <TrendingUp size={40} className="text-aqua" />,
    },
    {
      title: 'Fix What's Not Working',
      description: 'AI tips for campaigns below benchmark',
      icon: <CheckCircle size={40} className="text-success" />,
    },
    {
      title: 'Export & Share Results',
      description: 'Branded reports and trend decks in one click',
      icon: <PieChart size={40} className="text-navy-600" />,
    },
  ];

  return (
    <section className="py-20 bg-softgray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Turn data into decisions
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Benchmarketing gives you the tools to understand and improve your marketing performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card flex flex-col items-start text-left h-full transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">{feature.title}</h3>
              <p className="text-navy-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureTeasers;
