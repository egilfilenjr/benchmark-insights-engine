
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
            Your marketing, measured in seconds
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            See how your campaigns perform with our AECR Score™ — a comprehensive benchmark of your marketing efficiency.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* AECR Score Panel */}
                <div className="bg-gradient-to-br from-lilac to-lilac-700 text-white p-8 flex flex-col items-center justify-center">
                  <h3 className="text-lg font-medium mb-3 opacity-90">Your AECR Score™</h3>
                  <div className="relative mb-4">
                    <div className="text-6xl font-bold">78</div>
                    <div className="text-xl">/100</div>
                    <div className="absolute -right-4 -top-2">
                      <span className="bg-white text-lilac-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                        <ArrowUpCircle size={12} className="mr-1" /> +4
                      </span>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 text-center">
                    Better than 68% of companies in your industry
                  </p>
                </div>
                
                {/* KPI Comparisons */}
                <div className="p-8 bg-white col-span-2">
                  <div className="space-y-6">
                    {/* CPA Comparison */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Your CPA</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">$42.80</span>
                          <span className="ml-2 text-success text-sm font-medium">-12% vs industry</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={42} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[68%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>$0</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: $48.90</span>
                          <span>$100</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* ROAS Percentile */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">ROAS Percentile</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">3.2x</span>
                          <span className="ml-2 text-success text-sm font-medium">Top 15%</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={85} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[50%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>0x</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: 2.1x</span>
                          <span>5x+</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTR Gap */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">CTR Gap</div>
                        <div className="flex items-center">
                          <span className="font-medium text-navy-900">1.8%</span>
                          <span className="ml-2 text-alert text-sm font-medium">-0.4% vs benchmark</span>
                        </div>
                      </div>
                      <div className="relative pt-4">
                        <Progress value={60} className="h-2 bg-gray-200" />
                        <div className="absolute h-4 w-0.5 bg-navy-900 top-3 left-[73%]"></div>
                        <div className="flex justify-between text-xs text-navy-600 mt-1">
                          <span>0%</span>
                          <span className="text-navy-900 text-xs font-medium">Industry avg: 2.2%</span>
                          <span>3%+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Link to="/signup">
                      <Button className="w-full bg-lilac hover:bg-lilac-700 text-white py-6">
                        See Your Score
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
