
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote: 'Benchmarketing transformed our performance metrics. We now have clear visibility into our KPIs compared to industry standards.',
    stars: 5
  },
  {
    id: 2, 
    name: 'David Chen',
    role: 'SEM Specialist',
    company: 'Growth Digital',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote: 'The platform helped us identify underperforming campaigns and make data-driven decisions that improved our ROAS by 37%.',
    stars: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'CMO',
    company: 'Shopify Plus Partner',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    quote: "We've cut our CPA by 42% after implementing the recommendations from Benchmarketing. An essential tool for our team.",
    stars: 5
  }
];

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-24 bg-softgray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Trusted by marketers worldwide
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            See why thousands of marketing professionals rely on our platform to optimize their campaigns.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border-0 overflow-hidden p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex mb-3">
                  {Array.from({ length: testimonials[activeIndex].stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-navy-800 mb-6">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-bold text-navy-900">{testimonials[activeIndex].name}</p>
                  <p className="text-navy-600">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full w-12 h-12"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full w-12 h-12"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
