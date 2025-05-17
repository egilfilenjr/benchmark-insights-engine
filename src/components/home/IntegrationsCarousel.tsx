
import { useState, useEffect, useRef } from 'react';

const IntegrationsCarousel = () => {
  const platforms = [
    { name: 'Google Ads', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Google+Ads' },
    { name: 'Meta', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Meta' },
    { name: 'TikTok', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=TikTok' },
    { name: 'LinkedIn', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=LinkedIn' },
    { name: 'HubSpot', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=HubSpot' },
    { name: 'Shopify', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Shopify' },
    { name: 'GA4', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=GA4' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % platforms.length);
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    stopAutoPlay();
    startAutoPlay();
  };

  return (
    <section className="py-20 bg-softgray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Integrations that just work
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto mb-4">
            Connect all your marketing platforms in minutes. No coding required.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-navy-200 text-navy-700 text-sm">
            <svg className="w-4 h-4 text-navy-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Benchmarketing pulls only performance data — never creative or billing.
          </div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl border border-navy-100 bg-white p-8 shadow-md">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {platforms.map((platform, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 flex flex-col items-center"
                >
                  <img 
                    src={platform.logo} 
                    alt={platform.name} 
                    className="h-16 md:h-20 mb-6"
                  />
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{platform.name}</h3>
                  <p className="text-navy-600 text-center max-w-md">
                    Connect your {platform.name} account to automatically import campaigns, ad sets, and performance metrics.
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {platforms.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-lilac' : 'bg-navy-200'
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`View ${platforms[index].name} integration`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-lilac-50 transition-colors text-navy-700 hover:text-lilac"
            onClick={() => {
              setActiveIndex((prevIndex) => (prevIndex - 1 + platforms.length) % platforms.length);
              stopAutoPlay();
              startAutoPlay();
            }}
            aria-label="Previous integration"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-lilac-50 transition-colors text-navy-700 hover:text-lilac"
            onClick={() => {
              setActiveIndex((prevIndex) => (prevIndex + 1) % platforms.length);
              stopAutoPlay();
              startAutoPlay();
            }}
            aria-label="Next integration"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsCarousel;
