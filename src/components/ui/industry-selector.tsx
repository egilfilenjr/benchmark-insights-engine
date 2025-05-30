
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface IndustryHierarchy {
  id: number;
  domain: string;
  category: string | null;
  subcategory: string | null;
  detail: string | null;
}

interface IndustrySelection {
  domain?: string;
  category?: string;
  subcategory?: string;
  detail?: string;
}

interface IndustrySelectorProps {
  value: IndustrySelection;
  onChange: (selection: IndustrySelection) => void;
  className?: string;
}

export function IndustrySelector({ value, onChange, className }: IndustrySelectorProps) {
  const [industryData, setIndustryData] = useState<IndustryHierarchy[]>([]);
  const [loading, setLoading] = useState(true);

  // Get unique values for each level
  const domains = [...new Set(industryData.map(item => item.domain))].sort();
  const categories = value.domain 
    ? [...new Set(industryData
        .filter(item => item.domain === value.domain && item.category)
        .map(item => item.category!))]
        .sort()
    : [];
  const subcategories = value.domain && value.category
    ? [...new Set(industryData
        .filter(item => 
          item.domain === value.domain && 
          item.category === value.category && 
          item.subcategory
        )
        .map(item => item.subcategory!))]
        .sort()
    : [];
  const details = value.domain && value.category && value.subcategory
    ? [...new Set(industryData
        .filter(item => 
          item.domain === value.domain && 
          item.category === value.category && 
          item.subcategory === value.subcategory &&
          item.detail
        )
        .map(item => item.detail!))]
        .sort()
    : [];

  useEffect(() => {
    loadIndustryData();
  }, []);

  const loadIndustryData = async () => {
    try {
      const { data, error } = await supabase
        .from('industry_hierarchy')
        .select('*')
        .order('domain, category, subcategory, detail');

      if (error) {
        console.error('Error loading industry data:', error);
        return;
      }

      setIndustryData(data || []);
    } catch (error) {
      console.error('Error loading industry data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDomainChange = (domain: string) => {
    onChange({ domain, category: undefined, subcategory: undefined, detail: undefined });
  };

  const handleCategoryChange = (category: string) => {
    onChange({ ...value, category, subcategory: undefined, detail: undefined });
  };

  const handleSubcategoryChange = (subcategory: string) => {
    onChange({ ...value, subcategory, detail: undefined });
  };

  const handleDetailChange = (detail: string) => {
    onChange({ ...value, detail });
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading industries...</div>;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Domain Selection */}
      <div>
        <Label htmlFor="domain">Industry Domain</Label>
        <Select value={value.domain || ''} onValueChange={handleDomainChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an industry domain" />
          </SelectTrigger>
          <SelectContent>
            {domains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Selection */}
      {value.domain && categories.length > 0 && (
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={value.category || ''} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Subcategory Selection */}
      {value.domain && value.category && subcategories.length > 0 && (
        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Select value={value.subcategory || ''} onValueChange={handleSubcategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Detail Selection */}
      {value.domain && value.category && value.subcategory && details.length > 0 && (
        <div>
          <Label htmlFor="detail">Specific Industry</Label>
          <Select value={value.detail || ''} onValueChange={handleDetailChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select specific industry" />
            </SelectTrigger>
            <SelectContent>
              {details.map((detail) => (
                <SelectItem key={detail} value={detail}>
                  {detail}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Selection Summary */}
      {value.domain && (
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded">
          <strong>Selected:</strong>{' '}
          {[value.domain, value.category, value.subcategory, value.detail]
            .filter(Boolean)
            .join(' → ')}
        </div>
      )}
    </div>
  );
}
