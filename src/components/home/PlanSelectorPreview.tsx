
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const plans = [
  {
    name: 'Free',
    price: {
      monthly: '$0',
      yearly: '$0'
    },
    description: 'Benchmarks + demo data',
    features: [
      'Full access to industry KPIs',
      'Benchmarks explorer',
      'Access to calculators',
      'Limited to 1 user'
    ],
    cta: 'Start Free',
    ctaLink: '/signup',
    popular: false
  },
  {
    name: 'Pro',
    price: {
      monthly: '$99',
      yearly: '$79'
    },
    description: 'Real data + 1 user',
    features: [
      'Everything in Free plus:',
      'OAuth platform integrations',
      'Personal data overlay',
      'Basic KPI tracking'
    ],
    cta: 'Upgrade to Pro',
    ctaLink: '/signup',
    popular: false
  },
  {
    name: 'Pro+',
    price: {
      monthly: '$149',
      yearly: '$119'
    },
    description: 'AI recs + 5 users',
    features: [
      'Everything in Pro plus:',
      'AI recommendations',
      'Reports & exports',
      'Up to 5 team seats'
    ],
    cta: 'Choose Pro+',
    ctaLink: '/signup',
    popular: true
  },
  {
    name: 'Agency',
    price: {
      monthly: '$299',
      yearly: '$239'
    },
    description: 'Reports + white-label + 100 users',
    features: [
      'Everything in Pro+ plus:',
      'White-labeled reports',
      'Client dashboards',
      'Up to 100 team seats'
    ],
    cta: 'Get Agency',
    ctaLink: '/signup',
    popular: false
  }
];

export function PlanSelectorPreview() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <section className="py-24 bg-softgray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Choose the right plan for your team
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Start with our free forever plan or upgrade for advanced features.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <div className="bg-white rounded-full p-1 inline-flex shadow-sm border border-gray-200">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-lilac text-white'
                    : 'bg-transparent text-navy-700 hover:bg-gray-100'
                }`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  billingCycle === 'yearly'
                    ? 'bg-lilac text-white'
                    : 'bg-transparent text-navy-700 hover:bg-gray-100'
                }`}
                onClick={() => setBillingCycle('yearly')}
              >
                Yearly
                <span className="ml-1 bg-success-100 text-success text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`overflow-hidden ${
                plan.popular 
                  ? 'border-lilac ring-2 ring-lilac ring-opacity-20 shadow-xl' 
                  : 'border-gray-200 shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="bg-lilac text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardContent className={`p-6 ${plan.popular ? 'pt-4' : 'pt-6'}`}>
                <h3 className="text-xl font-bold text-navy-900 mb-1">{plan.name}</h3>
                <p className="text-navy-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold text-navy-900">
                      {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="text-navy-600 ml-1 mb-0.5">/mo</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-success">Billed annually</p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-navy-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={plan.ctaLink}>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-lilac hover:bg-lilac-700 text-white' 
                        : 'bg-white border border-lilac text-lilac hover:bg-lilac/10'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center gap-1 text-navy-600 text-sm cursor-help">
                  <Info size={16} className="text-navy-400" />
                  <span>All plans include 14-day free trial. No credit card required.</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>You can cancel anytime. After the trial period, you'll be charged at the selected plan rate.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/pricing" className="text-lilac hover:text-lilac-700 text-sm font-medium mt-4 inline-block">
            View full plan comparison →
          </Link>
        </div>
      </div>
    </section>
  );
}
