
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AecrScoreDemo() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Your CECR Score™
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            See how your campaigns perform with our CECR Score™ — a comprehensive benchmark across Creative, Engagement, Conversion, and Revenue.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* CECR Score Panel */}
                <div className="bg-gradient-to-br from-lilac to-lilac-700 text-white p-8 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-medium mb-3 opacity-90">Your CECR Score™</h3>
                  <div className="relative mb-4">
                    <div className="text-6xl font-bold">82</div>
                    <div className="text-xl">/100</div>
                    <div className="absolute -right-4 -top-2">
                      <span className="bg-white text-lilac-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                        <ArrowUpCircle size={12} className="mr-1" /> +6
                      </span>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 text-center">
                    Better than 74% of companies in your industry
                  </p>
                </div>
                
                {/* CECR Metrics */}
                <div className="p-8 bg-white col-span-2">
                  <div className="space-y-6">
                    {/* Creative - CTR */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Creative (CTR)</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">2.4%</span>
                          <span className="ml-2 text-success text-sm font-medium">+15% vs industry</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={75} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[60%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>0%</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: 2.1%</span>
                          <span>4%+</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Engagement - Bounce Rate */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Engagement (Bounce Rate)</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">32%</span>
                          <span className="ml-2 text-success text-sm font-medium">-18% vs industry</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={68} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[50%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>0%</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: 39%</span>
                          <span>80%+</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Conversion - CVR */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Conversion (CVR)</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">4.2%</span>
                          <span className="ml-2 text-success text-sm font-medium">Top 20%</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={80} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[45%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>0%</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: 3.1%</span>
                          <span>8%+</span>
                        </div>
                      </div>
                    </div>

                    {/* Revenue - ROAS */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Revenue (ROAS)</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">3.8x</span>
                          <span className="ml-2 text-success text-sm font-medium">+42% vs industry</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={85} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[45%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>0x</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: 2.7x</span>
                          <span>6x+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/signup">
                      <Button className="w-full bg-lilac hover:bg-lilac-700 text-white py-6">
                        See Your CECR Score
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8 text-sm text-navy-600">
          <p>Based on anonymized data from 10,000+ marketing campaigns across 20+ industries.</p>
        </div>
      </div>
    </section>
  );
}
