
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-softgray-50 to-white pt-24 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-lilac-100 text-lilac rounded-full mb-2">
                #1 Marketing Analytics Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
              Marketing performance <span className="gradient-text">insights</span> that drive growth
            </h1>
            <p className="text-lg md:text-xl text-navy-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Compare your marketing metrics against industry benchmarks and get AI-powered recommendations.
            </p>
            
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col sm:flex-row items-center mb-8 relative">
              <div className="flex items-center w-full">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 sm:relative sm:left-0" />
                <Input 
                  type="text" 
                  placeholder="Enter your website or domain..." 
                  className="border-0 shadow-none pl-10 sm:pl-2 flex-grow focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="lg" className="bg-lilac hover:bg-lilac-700 text-white font-semibold px-8 text-base rounded-lg w-full sm:w-auto mt-2 sm:mt-0">
                Analyze Now
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button size="lg" className="bg-lilac hover:bg-lilac-700 text-white font-semibold px-8 py-6 text-base rounded-lg w-full sm:w-auto">
                  See Your Score
                </Button>
              </Link>
              <Link to="/benchmarks">
                <Button size="lg" variant="outline" className="text-navy-700 font-semibold px-8 py-6 text-base rounded-lg group w-full sm:w-auto">
                  Explore Benchmarks
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                alt="Marketing dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/10 to-transparent"></div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-lilac/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-aqua/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
