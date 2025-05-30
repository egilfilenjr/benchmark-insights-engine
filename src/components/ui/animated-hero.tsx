
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  badge?: string;
  stats?: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType<any>;
  }>;
}

export const AnimatedHero = ({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  badge,
  stats
}: AnimatedHeroProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy-50 via-white to-lilac-50 py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lilac/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-aqua/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-lilac/5 to-aqua/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        {badge && (
          <Badge className="mb-6 animate-fade-in" variant="outline">
            {badge}
          </Badge>
        )}

        {/* Main Title */}
        <h1 className="text-4xl md:text-7xl font-bold text-navy-900 mb-6 animate-scale-in">
          {title} <span className="gradient-text">{subtitle}</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-navy-600 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Button size="lg" className="text-lg px-8 py-4" asChild>
            <Link to={primaryCta.href}>
              {primaryCta.text}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link to={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          )}
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in hover-scale" 
                style={{animationDelay: `${0.8 + index * 0.2}s`}}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  {stat.icon && <stat.icon className="h-6 w-6 text-lilac" />}
                  <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                </div>
                <div className="text-navy-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
