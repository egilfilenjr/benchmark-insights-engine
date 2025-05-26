
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Building2 } from 'lucide-react';

interface IndustryBadgeProps {
  domain?: string;
  category?: string;
  subcategory?: string;
  detail?: string;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
}

export function IndustryBadge({ 
  domain, 
  category, 
  subcategory, 
  detail, 
  className,
  variant = 'secondary'
}: IndustryBadgeProps) {
  const parts = [domain, category, subcategory, detail].filter(Boolean);
  
  if (parts.length === 0) {
    return null;
  }

  return (
    <Badge variant={variant} className={className}>
      <Building2 className="h-3 w-3 mr-1" />
      <span className="text-xs">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && <ChevronRight className="h-2 w-2 mx-1 inline" />}
          </span>
        ))}
      </span>
    </Badge>
  );
}
