
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Database, TrendingUp, Zap, BarChart3, Target, CheckCircle, ArrowDown } from 'lucide-react';

export default function AecrAlgorithm() {
  const algorithmSteps = [
    {
      step: "1",
      title: "Data Collection & Validation",
      icon: Database,
      description: "We collect and validate your campaign performance across ROAS, CTR, CPA, and CVR metrics with real-time data processing",
      progress: 100,
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      step: "2", 
      title: "Smart Contextual Matching",
      icon: Target,
      description: "Advanced ML algorithms match your data against campaigns with similar industry, platform, audience size, and campaign objectives",
      progress: 100,
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      step: "3",
      title: "Statistical Percentile Analysis", 
      icon: Calculator,
      description: "We calculate where you rank against the benchmark distribution using advanced statistical methods (0-100th percentile)",
      progress: 100,
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      step: "4",
      title: "Dynamic Weighted Scoring",
      icon: BarChart3,
      description: "Metrics are dynamically weighted based on your campaign objective, industry importance, and seasonal factors",
      progress: 100,
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    {
      step: "5",
      title: "AECR Score Generation",
      icon: Zap,
      description: "Your final AECR Score (0-100) is generated with AI-powered insights and actionable recommendations",
      progress: 100,
      color: "bg-gradient-to-r from-lilac to-aqua"
    }
  ];

  const metricWeights = [
    { 
      metric: "ROAS", 
      weight: "35%", 
      description: "Primary indicator of campaign profitability and return on investment",
      importance: "Critical",
      benchmark: "4.2x average"
    },
    { 
      metric: "CTR", 
      weight: "25%", 
      description: "Engagement quality and audience relevance measurement",
      importance: "High",
      benchmark: "2.4% average"
    },
    { 
      metric: "CPA", 
      weight: "25%", 
      description: "Cost efficiency of customer acquisitions and lead generation",
      importance: "High",
      benchmark: "$42 average"
    },
    { 
      metric: "CVR", 
      weight: "15%", 
      description: "Landing page optimization and funnel performance indicator",
      importance: "Medium",
      benchmark: "3.1% average"
    }
  ];

  const features = [
    {
      title: "Real-time Processing",
      description: "Data processed in under 2 seconds",
      icon: Zap
    },
    {
      title: "Industry-Specific",
      description: "Benchmarks tailored to your vertical",
      icon: Target
    },
    {
      title: "AI-Powered Insights",
      description: "Machine learning recommendations",
      icon: TrendingUp
    }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <Badge className="mb-4" variant="outline">Algorithm Deep Dive v2.0</Badge>
            <h1 className="text-4xl md:text-7xl font-bold text-navy-900 mb-6 animate-scale-in">
              AECR Score <span className="gradient-text">Algorithm</span> Breakdown
            </h1>
            <p className="text-xl md:text-2xl text-navy-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Discover the science behind our proprietary AECR scoring system using advanced statistical methods 
              and industry-specific benchmarks from <span className="font-bold text-lilac">75,000+</span> campaigns.
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 justify-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                  <feature.icon className="h-5 w-5 text-lilac" />
                  <div className="text-left">
                    <div className="font-semibold text-navy-900">{feature.title}</div>
                    <div className="text-sm text-navy-600">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Try Our Algorithm</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/compscore-overview">Back to Overview</Link>
              </Button>
            </div>
          </div>

          {/* Enhanced Algorithm Steps */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-4 text-center">How Our Algorithm Works</h2>
            <p className="text-xl text-navy-600 text-center mb-16 max-w-3xl mx-auto">
              Our proprietary 5-step process combines machine learning, statistical analysis, and industry expertise
            </p>
            
            <div className="space-y-12">
              {algorithmSteps.map((step, index) => (
                <div key={index} className="animate-fade-in" style={{animationDelay: `${index * 0.3}s`}}>
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Step indicator */}
                    <div className="flex-shrink-0 relative">
                      <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg animate-scale-in`}>
                        {step.step}
                      </div>
                      {index < algorithmSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2">
                          <ArrowDown className="h-6 w-6 text-navy-300 animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    {/* Content card */}
                    <Card className="flex-1 feature-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                          <step.icon className="h-10 w-10 text-lilac" />
                          <div>
                            <CardTitle className="text-2xl">{step.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Progress value={step.progress} className="w-32" />
                              <span className="text-sm text-navy-600">{step.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-lg">{step.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Metric Weighting */}
          <div className="bg-gradient-to-br from-navy-50 to-lilac-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 text-center">Dynamic Metric Weighting System</h2>
            <p className="text-xl text-navy-600 text-center mb-12 max-w-4xl mx-auto">
              Our AI dynamically adjusts metric importance based on your campaign objectives, industry benchmarks, 
              and performance patterns to provide the most accurate scoring.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {metricWeights.map((item, index) => (
                <Card key={index} className="feature-card animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-navy-900 mb-1">{item.metric}</h3>
                        <Badge variant={item.importance === 'Critical' ? 'default' : item.importance === 'High' ? 'secondary' : 'outline'}>
                          {item.importance} Priority
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold gradient-text">{item.weight}</div>
                        <div className="text-sm text-navy-600">Weight</div>
                      </div>
                    </div>
                    <p className="text-navy-600 mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-sm text-navy-500">
                      <CheckCircle className="h-4 w-4" />
                      <span>Industry benchmark: {item.benchmark}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Mathematical Foundation */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-12 text-center">Mathematical Foundation</h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <TrendingUp className="h-8 w-8 text-lilac" />
                    Percentile Calculation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-6 text-lg">
                    For each metric, we calculate your percentile rank against our continuously updated benchmark distribution:
                  </p>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl font-mono text-sm border-l-4 border-lilac">
                    <div className="text-navy-800 font-semibold mb-2">Percentile Formula:</div>
                    <div className="text-navy-700">P = (Campaigns Below Your Value / Total Campaigns) × 100</div>
                  </div>
                  <div className="mt-4 text-sm text-navy-600">
                    <strong>Example:</strong> If your ROAS of 5.2x beats 78% of similar campaigns, your ROAS percentile = 78
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Calculator className="h-8 w-8 text-aqua" />
                    Weighted AECR Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-navy-600 mb-6 text-lg">
                    Your final AECR Score combines all metrics using our proprietary weighting system:
                  </p>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl font-mono text-sm border-l-4 border-aqua">
                    <div className="text-navy-800 font-semibold mb-2">AECR Score Formula:</div>
                    <div className="text-navy-700">AECR = Σ(Metric Percentile × Dynamic Weight)</div>
                  </div>
                  <div className="mt-4 text-sm text-navy-600">
                    <strong>Example:</strong> (ROAS: 78×0.35) + (CTR: 65×0.25) + (CPA: 82×0.25) + (CVR: 71×0.15) = 74 AECR Score
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Data Sources */}
          <div className="bg-gradient-to-br from-lilac-50 to-aqua-50 rounded-3xl p-8 md:p-12 mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-8 text-center">Data Sources & Validation</h2>
            
            <div className="grid md:grid-cols-4 gap-8 text-center mb-12">
              <div className="animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl md:text-5xl font-bold text-lilac mb-3">75,000+</div>
                <div className="text-navy-900 font-semibold text-lg">Campaigns Analyzed</div>
                <div className="text-navy-600 text-sm mt-2">Across all major advertising platforms</div>
              </div>
              <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl md:text-5xl font-bold text-aqua mb-3">35+</div>
                <div className="text-navy-900 font-semibold text-lg">Industry Verticals</div>
                <div className="text-navy-600 text-sm mt-2">From eCommerce to B2B SaaS</div>
              </div>
              <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="text-4xl md:text-5xl font-bold text-success mb-3">Real-time</div>
                <div className="text-navy-900 font-semibold text-lg">Data Updates</div>
                <div className="text-navy-600 text-sm mt-2">Benchmarks updated every hour</div>
              </div>
              <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-3">99.9%</div>
                <div className="text-navy-900 font-semibold text-lg">Accuracy Rate</div>
                <div className="text-navy-600 text-sm mt-2">Validated by independent audits</div>
              </div>
            </div>

            {/* Data quality indicators */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <h3 className="font-semibold text-navy-900">Data Validation</h3>
                </div>
                <p className="text-navy-600 text-sm">Multi-layer validation ensures data quality and removes outliers</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <h3 className="font-semibold text-navy-900">Privacy Compliant</h3>
                </div>
                <p className="text-navy-600 text-sm">All data anonymized and GDPR/CCPA compliant processing</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="h-6 w-6 text-success" />
                  <h3 className="font-semibold text-navy-900">Continuous Learning</h3>
                </div>
                <p className="text-navy-600 text-sm">Algorithm improves with each new data point added</p>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">Experience the Algorithm</h2>
            <p className="text-xl text-navy-600 mb-10 max-w-3xl mx-auto">
              Connect your campaigns and watch our advanced algorithm calculate your personalized AECR Score in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link to="/signup">Calculate My AECR Score</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                <Link to="/compscore/examples">View Score Examples <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
