
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Zap, DollarSign, Users, Eye, MousePointer } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
  benchmark?: string;
  progress?: number;
}

const MetricCard = ({ title, value, change, trend, icon: Icon, color, benchmark, progress }: MetricCardProps) => (
  <Card className="feature-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-navy-600">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-navy-900">{value}</div>
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        </div>
        
        {benchmark && (
          <div className="text-sm text-navy-600">
            Benchmark: <span className="font-medium">{benchmark}</span>
          </div>
        )}
        
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>vs. Industry</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export const EnhancedAnalyticsDashboard = () => {
  const metrics = [
    {
      title: "ROAS",
      value: "4.8x",
      change: "+12%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-success",
      benchmark: "4.2x",
      progress: 85
    },
    {
      title: "CTR",
      value: "3.2%",
      change: "+8%",
      trend: "up" as const,
      icon: MousePointer,
      color: "text-lilac",
      benchmark: "2.4%",
      progress: 78
    },
    {
      title: "CPA",
      value: "$38",
      change: "-15%",
      trend: "up" as const,
      icon: Target,
      color: "text-aqua",
      benchmark: "$42",
      progress: 92
    },
    {
      title: "CVR",
      value: "4.1%",
      change: "+5%",
      trend: "up" as const,
      icon: Zap,
      color: "text-orange-500",
      benchmark: "3.1%",
      progress: 82
    }
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.title} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <MetricCard {...metric} />
          </div>
        ))}
      </div>

      {/* AECR Score Display */}
      <Card className="bg-gradient-to-br from-lilac-50 to-aqua-50 border-2 border-lilac/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Your AECR Score</CardTitle>
              <CardDescription className="text-base">
                Advanced Engagement, Conversion & Revenue Score
              </CardDescription>
            </div>
            <Badge className="text-lg px-4 py-2">Premium</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold gradient-text mb-2">84</div>
              <div className="text-navy-600">Your Score</div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Performance Percentile</span>
                <span className="font-medium">84th percentile</span>
              </div>
              <Progress value={84} className="h-3" />
              <div className="text-sm text-navy-600">
                You're performing better than 84% of similar campaigns in your industry
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
