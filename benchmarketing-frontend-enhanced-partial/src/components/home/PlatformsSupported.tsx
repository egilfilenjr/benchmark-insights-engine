
import { cn } from '@/lib/utils';

const platforms = [
  { name: 'Google Ads', logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', background: 'bg-blue-50' },
  { name: 'Facebook Ads', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', background: 'bg-indigo-50' },
  { name: 'LinkedIn Ads', logo: 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png', background: 'bg-sky-50' },
  { name: 'TikTok Ads', logo: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png', background: 'bg-zinc-50' },
  { name: 'Instagram Ads', logo: 'https://cdn-icons-png.flaticon.com/512/174/174855.png', background: 'bg-pink-50' },
  { name: 'Amazon Ads', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968217.png', background: 'bg-amber-50' },
  { name: 'Google Analytics', logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991112.png', background: 'bg-yellow-50' },
  { name: 'Shopify', logo: 'https://cdn-icons-png.flaticon.com/512/825/825500.png', background: 'bg-green-50' }
];

export function PlatformsSupported() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Connect your marketing platforms
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            Benchmarketing integrates with all major ad platforms and analytics tools.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {platforms.map((platform) => (
            <div 
              key={platform.name} 
              className={cn(
                "rounded-xl p-6 flex flex-col items-center justify-center transition-transform hover:scale-105", 
                platform.background
              )}
            >
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="w-12 h-12 mb-3"
              />
              <span className="text-sm font-medium text-center">{platform.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-navy-600">
          <p>And many more integrations available in our app</p>
        </div>
      </div>
    </section>
  );
}
