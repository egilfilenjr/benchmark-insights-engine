
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Shield } from 'lucide-react';

const integrations = [
  { 
    name: 'Google Ads', 
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', 
    metrics: ['CPA', 'ROAS', 'CTR', 'Conversions'],
    color: 'bg-blue-50'
  },
  { 
    name: 'Meta Ads', 
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', 
    metrics: ['CPA', 'ROAS', 'CTR', 'Impressions'],
    color: 'bg-indigo-50'
  },
  { 
    name: 'TikTok Ads', 
    logo: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', 
    metrics: ['CPA', 'CTR', 'Spend'],
    color: 'bg-zinc-50'
  },
  { 
    name: 'LinkedIn Ads', 
    logo: 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png', 
    metrics: ['Lead CPA', 'CTR', 'Spend'],
    color: 'bg-sky-50'
  },
  { 
    name: 'HubSpot', 
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968872.png', 
    metrics: ['Conversions', 'Lifecycle Stage', 'Source'],
    color: 'bg-orange-50'
  },
  { 
    name: 'Shopify', 
    logo: 'https://cdn-icons-png.flaticon.com/512/825/825500.png', 
    metrics: ['Orders', 'Conversion Rate', 'Revenue'],
    color: 'bg-green-50'
  },
  { 
    name: 'GA4', 
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991112.png', 
    metrics: ['Sessions', 'Bounce Rate', 'Goal Completions'],
    color: 'bg-yellow-50'
  }
];

export function IntegrationsDisplay() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Connect your marketing platforms with ease
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto mb-6">
            Benchmarketing integrates with all major ad platforms and analytics tools. No coding required.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-softgray-50 rounded-full text-navy-700 text-sm">
            <Shield className="w-4 h-4 text-navy-500 mr-2" />
            Benchmarketing pulls only performance data — never creative or billing information.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {integrations.slice(0, 3).map((integration) => (
            <Card key={integration.name} className="overflow-hidden border">
              <CardContent className="p-0">
                <div className={cn("p-6", integration.color)}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src={integration.logo} 
                        alt={integration.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{integration.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-medium mb-3">Metrics Synchronized:</h4>
                  <ul className="space-y-2">
                    {integration.metrics.map((metric) => (
                      <li key={metric} className="flex items-center">
                        <Check className="w-4 h-4 text-success mr-2" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {integrations.slice(3).map((integration) => (
              <div 
                key={integration.name} 
                className={cn(
                  "flex items-center px-4 py-2 rounded-full", 
                  integration.color
                )}
              >
                <img 
                  src={integration.logo} 
                  alt={integration.name} 
                  className="w-5 h-5 mr-2"
                />
                <span className="text-sm font-medium">{integration.name}</span>
              </div>
            ))}
            <div className="px-4 py-2 rounded-full bg-softgray-50 text-sm font-medium">
              + More
            </div>
          </div>
          
          <a 
            href="/integrations" 
            className="text-lilac hover:text-lilac-700 text-md font-medium inline-flex items-center"
          >
            View all integrations
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
