
import { Progress } from '@/components/ui/progress';

const AecrDemo = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Your AECR Score™ at a Glance
          </h2>
          <p className="text-lg text-navy-600 max-w-2xl mx-auto">
            One simple score to understand your marketing performance against industry benchmarks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-navy-100 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
              <div>
                <span className="text-sm font-medium text-navy-500">Marketing Benchmark</span>
                <h3 className="text-2xl font-bold text-navy-900">AECR Score™</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-softgray-100 text-navy-700 text-sm py-1 px-3 rounded-full">
                  Last 30 Days
                </span>
                <span className="bg-success-100 text-success-700 text-sm py-1 px-3 rounded-full flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Up 12%
                </span>
              </div>
            </div>

            {/* Score Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-navy-50 rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-navy-600 text-sm">Your Score</span>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-navy-900">78</span>
                    <span className="text-navy-600 ml-1">/100</span>
                  </div>
                  <div className="mt-4">
                    <Progress value={78} className="h-2 bg-navy-200" indicatorClassName="bg-lilac" />
                  </div>
                  <p className="text-sm text-navy-600 mt-2">
                    Better than 68% of peers
                  </p>
                </div>
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-lilac/10 to-transparent" />
              </div>

              <div className="bg-white border border-navy-100 rounded-xl p-6">
                <span className="text-navy-600 text-sm">Your CPA</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-navy-900">$24.50</span>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="w-full bg-navy-100 h-1.5 rounded overflow-hidden">
                    <div className="h-full bg-success-500 rounded" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <p className="text-success-700">35% below average</p>
                  <p className="text-navy-600">Avg: $38.20</p>
                </div>
              </div>

              <div className="bg-white border border-navy-100 rounded-xl p-6">
                <span className="text-navy-600 text-sm">ROAS Percentile</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-3xl font-bold text-navy-900">76th</span>
                </div>
                <div className="mt-4 bg-navy-100 h-1.5 rounded-full">
                  <div className="h-full bg-lilac rounded-full" style={{ width: '76%' }}></div>
                </div>
                <p className="flex items-center text-sm text-navy-600 mt-2">
                  <span className="h-2 w-2 rounded-full bg-lilac mr-2"></span>
                  Top quarter of your industry
                </p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-navy-100 rounded-xl p-5">
                <h4 className="font-medium text-navy-900 mb-2">Channel Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-navy-700">Google Ads</span>
                    <span className="badge-success">Top 10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-navy-700">Meta Ads</span>
                    <span className="badge-primary">Above Avg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-navy-700">LinkedIn Ads</span>
                    <span className="badge-alert">Needs Work</span>
                  </div>
                </div>
              </div>
              <div className="border border-navy-100 rounded-xl p-5">
                <h4 className="font-medium text-navy-900 mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lilac mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-navy-700 text-sm">Improve LinkedIn ad creative</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lilac mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-navy-700 text-sm">Adjust bidding strategy for Google</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-lilac mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-navy-700 text-sm">Reallocate budget from TikTok to Meta</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-lilac/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-aqua/5 rounded-full blur-3xl z-0"></div>
      </div>
    </section>
  );
};

export default AecrDemo;
