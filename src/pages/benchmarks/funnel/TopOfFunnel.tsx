
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye, Users, TrendingUp, Target } from 'lucide-react';

export default function TopOfFunnelBenchmarks() {
  const keyMetrics = [
    { metric: "Average CPM", value: "$8.50", description: "Cost per 1,000 impressions" },
    { metric: "Average Reach", value: "85%", description: "% of target audience reached" },
    { metric: "Brand Lift", value: "12%", description: "Increase in brand awareness" },
    { metric: "Video Completion", value: "68%", description: "Average view-through rate" }
  ];

  const platformPerformance = [
    { platform: "Facebook", cpm: "$7.25", reach: "88%", engagement: "3.2%" },
    { platform: "Instagram", cpm: "$9.15", reach: "82%", engagement: "4.1%" },
    { platform: "TikTok", cpm: "$6.95", reach: "79%", engagement: "5.8%" },
    { platform: "YouTube", cpm: "$11.50", reach: "91%", engagement: "2.8%" },
    { platform: "LinkedIn", cpm: "$15.25", reach: "76%", engagement: "2.1%" }
  ];

  const objectives = [
    {
      title: "Brand Awareness",
      description: "Maximize reach and frequency among target audience",
      kpis: ["CPM", "Reach", "Frequency", "Brand Lift"],
      benchmarks: "CPM: $6-12, Reach: 75-90%, Frequency: 2-4x"
    },
    {
      title: "Video Views",
      description: "Drive video content consumption and engagement",
      kpis: ["CPV", "VTR", "View Duration", "Engagement Rate"],
      benchmarks: "CPV: $0.02-0.08, VTR: 60-80%, Duration: 15-30s"
    },
    {
      title: "Traffic Generation",
      description: "Drive qualified traffic to website or landing pages",
      kpis: ["CPC", "CTR", "Landing Page Views", "Bounce Rate"],
      benchmarks: "CPC: $0.50-2.50, CTR: 1.5-3.5%, Bounce: <60%"
    }
  ];

  return (
    <MainLayout>
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">Funnel Stage</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-navy-900 mb-6">
              Top of Funnel <span className="gradient-text">Benchmarks</span>
            </h1>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Performance benchmarks for awareness, reach, and traffic generation campaigns. 
              Optimize your top-funnel marketing for maximum brand exposure.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {keyMetrics.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-center">{item.value}</CardTitle>
                  <CardDescription className="text-center font-medium">{item.metric}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-navy-600 text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Platform Performance */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Top-Funnel Performance by Platform
              </CardTitle>
              <CardDescription>
                Compare awareness and reach metrics across advertising platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Platform</th>
                      <th className="text-left py-3 px-4 font-semibold">CPM</th>
                      <th className="text-left py-3 px-4 font-semibold">Reach</th>
                      <th className="text-left py-3 px-4 font-semibold">Engagement Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformPerformance.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{item.platform}</td>
                        <td className="py-3 px-4">{item.cpm}</td>
                        <td className="py-3 px-4">{item.reach}</td>
                        <td className="py-3 px-4">{item.engagement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Objectives */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Top-Funnel Campaign Objectives
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {objectives.map((objective, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {objective.title}
                    </CardTitle>
                    <CardDescription>{objective.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-navy-900 mb-2">Key KPIs</h4>
                        <div className="flex flex-wrap gap-1">
                          {objective.kpis.map((kpi, kpiIndex) => (
                            <Badge key={kpiIndex} variant="outline" className="text-xs">
                              {kpi}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy-900 mb-2">Benchmarks</h4>
                        <p className="text-sm text-navy-600">{objective.benchmarks}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Optimization Tips */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top-Funnel Optimization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Creative Best Practices</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Use bright, attention-grabbing visuals</li>
                    <li>• Keep video content under 30 seconds</li>
                    <li>• Include brand logo within first 3 seconds</li>
                    <li>• Test static vs video creative formats</li>
                    <li>• Use captions for silent video viewing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy-900 mb-4">Targeting & Frequency</h4>
                  <ul className="space-y-2 text-navy-600">
                    <li>• Target broad audiences for maximum reach</li>
                    <li>• Cap frequency at 3-4 impressions per user</li>
                    <li>• Use lookalike audiences at 5-10% similarity</li>
                    <li>• Exclude existing customers from awareness campaigns</li>
                    <li>• Test different demographic segments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              Optimize Your Brand Awareness
            </h2>
            <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
              Compare your top-funnel performance against industry benchmarks and 
              discover strategies to maximize your brand reach and awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/signup">Start Free Analysis</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
