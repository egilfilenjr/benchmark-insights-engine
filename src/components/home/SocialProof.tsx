
const SocialProof = () => {
  const logos = [
    { name: 'Company 1', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Company+1' },
    { name: 'Company 2', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Company+2' },
    { name: 'Company 3', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Company+3' },
    { name: 'Company 4', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Company+4' },
    { name: 'Company 5', logo: 'https://placehold.co/200x80/F1F0FB/1e293b?text=Company+5' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-lg text-navy-600 font-medium">
            Trusted by marketers at
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo, index) => (
            <div key={index} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <img 
                src={logo.logo} 
                alt={logo.name}
                className="h-8 md:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
