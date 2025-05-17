
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PlanSelector = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Free',
      description: 'For individuals just starting out',
      priceMonthly: '$0',
      priceYearly: '$0',
      features: [
        'Benchmarks Explorer',
        'Basic reporting',
        'Limitless curiosity',
        '1 user',
      ],
      cta: 'Start Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'For serious marketers',
      priceMonthly: '$99',
      priceYearly: '$79',
      yearlyBilling: '$948 billed annually',
      features: [
        'Everything in Free +',
        'Real data via OAuth',
        'Compare your metrics',
        '1 user',
      ],
      cta: 'Upgrade Now',
      highlighted: true,
    },
    {
      name: 'Pro+',
      description: 'For marketing teams',
      priceMonthly: '$149',
      priceYearly: '$119',
      yearlyBilling: '$1,428 billed annually',
      features: [
        'Everything in Pro +',
        'AI recommendations',
        'Export reports',
        '5 users',
      ],
      cta: 'Upgrade Now',
      highlighted: false,
    },
    {
      name: 'Agency',
      description: 'For agencies & enterprises',
      priceMonthly: '$299',
      priceYearly: '$239',
      yearlyBilling: '$2,868 billed annually',
      features: [
        'Everything in Pro+ +',
        'White-label reports',
        'Client management',
        '100 users',
      ],
      cta: 'Upgrade Now',
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Choose the right plan for your needs
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Start with our free forever plan or get more features with our paid options.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-navy-900' : 'text-navy-500'}`}>
              Monthly
            </span>
            <button 
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              aria-pressed={billingCycle === 'yearly'}
            >
              <span 
                className={`inline-block w-11 h-6 rounded-full transition-colors ${billingCycle === 'yearly' ? 'bg-lilac' : 'bg-navy-300'}`}
              />
              <span 
                className={`absolute inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center ${billingCycle === 'yearly' ? 'text-navy-900' : 'text-navy-500'}`}>
              Yearly
              <span className="ml-1.5 bg-success-100 text-success-800 text-xs px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-xl border ${plan.highlighted ? 'border-lilac shadow-lg shadow-lilac/10' : 'border-navy-100'} bg-white p-6 flex flex-col h-full transition-all duration-300 hover:shadow-md`}
            >
              {plan.highlighted && (
                <div className="bg-lilac text-white text-xs font-medium px-3 py-1 rounded-full self-start mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-navy-900">{plan.name}</h3>
              <p className="text-navy-600 text-sm mt-1 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-navy-900">
                    {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                  </span>
                  <span className="text-navy-500 ml-1">/mo</span>
                </div>
                {billingCycle === 'yearly' && plan.yearlyBilling && (
                  <p className="text-navy-500 text-xs mt-1">{plan.yearlyBilling}</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check size={18} className="text-lilac mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-navy-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <Link to="/signup">
                  <Button 
                    className={`w-full ${plan.highlighted ? 'bg-lilac hover:bg-lilac-700 text-white' : 'bg-white border border-navy-200 hover:border-navy-300 text-navy-800'}`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-navy-600">
          Need something custom? <a href="/contact" className="text-lilac hover:underline">Contact us</a> for enterprise pricing.
        </div>
      </div>
    </section>
  );
};

export default PlanSelector;
