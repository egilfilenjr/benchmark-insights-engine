
import { Badge } from '@/components/ui/badge';

interface IndustryBadgeProps {
  domain?: string;
  category?: string;
  subcategory?: string;
  detail?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export function IndustryBadge({ 
  domain, 
  category, 
  subcategory, 
  detail, 
  variant = 'secondary',
  className 
}: IndustryBadgeProps) {
  const displayText = [domain, category, subcategory, detail]
    .filter(Boolean)
    .join(' → ');

  if (!displayText) {
    return <Badge variant="outline" className={className}>No industry selected</Badge>;
  }

  return (
    <Badge variant={variant} className={className} title={displayText}>
      {displayText}
    </Badge>
  );
}
