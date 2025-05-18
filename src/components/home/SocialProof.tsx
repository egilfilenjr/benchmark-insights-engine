
import { cn } from '@/lib/utils';

const companySizes = [
  { id: 'enterprise', name: 'Enterprise', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Enterprise' },
  { id: 'agency', name: 'Agency', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Agency' },
  { id: 'ecommerce', name: 'E-commerce', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=E-commerce' },
  { id: 'smb', name: 'SMB', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=SMB' },
  { id: 'startup', name: 'Startup', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Startup' },
];

const brands = [
  { name: 'Adobe', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Adobe' },
  { name: 'Salesforce', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Salesforce' },
  { name: 'Microsoft', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Microsoft' },
  { name: 'IBM', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=IBM' },
  { name: 'Amazon', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Amazon' },
  { name: 'HubSpot', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=HubSpot' },
];

const SocialProof = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-lg text-navy-700 font-medium">
            Helping 10,000+ marketers improve performance across all industries
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 mb-12">
          {companySizes.map((company, index) => (
            <div 
              key={company.id} 
              className={cn(
                "flex flex-col items-center",
                index >= 5 && "hidden md:flex" // Hide on mobile if more than 4
              )}
            >
              <div className="w-16 h-16 rounded-full bg-softgray-100 flex items-center justify-center mb-2">
                <img 
                  src={company.logo} 
                  alt={company.name}
                  className="w-10 h-10 object-contain opacity-70"
                />
              </div>
              <span className="text-sm text-navy-600">{company.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div key={brand.name} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="h-8 md:h-10"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-navy-500">
            Benchmarketing pulls only performance data — never creative or billing information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
