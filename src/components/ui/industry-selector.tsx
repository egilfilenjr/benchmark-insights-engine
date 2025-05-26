
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface IndustryData {
  domain: string;
  category: string | null;
  subcategory: string | null;
  detail: string | null;
}

interface IndustrySelectorProps {
  value?: {
    domain?: string;
    category?: string;
    subcategory?: string;
    detail?: string;
  };
  onChange: (selection: {
    domain?: string;
    category?: string;
    subcategory?: string;
    detail?: string;
  }) => void;
  className?: string;
}

export function IndustrySelector({ value = {}, onChange, className }: IndustrySelectorProps) {
  const [domains, setDomains] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [details, setDetails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load domains on mount
  useEffect(() => {
    loadDomains();
  }, []);

  // Load categories when domain changes
  useEffect(() => {
    if (value.domain) {
      loadCategories(value.domain);
    } else {
      setCategories([]);
      setSubcategories([]);
      setDetails([]);
    }
  }, [value.domain]);

  // Load subcategories when category changes
  useEffect(() => {
    if (value.domain && value.category) {
      loadSubcategories(value.domain, value.category);
    } else {
      setSubcategories([]);
      setDetails([]);
    }
  }, [value.domain, value.category]);

  // Load details when subcategory changes
  useEffect(() => {
    if (value.domain && value.category && value.subcategory) {
      loadDetails(value.domain, value.category, value.subcategory);
    } else {
      setDetails([]);
    }
  }, [value.domain, value.category, value.subcategory]);

  const loadDomains = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('industry_hierarchy')
      .select('domain')
      .not('domain', 'is', null);
    
    const uniqueDomains = [...new Set(data?.map(item => item.domain) || [])].sort();
    setDomains(uniqueDomains);
    setLoading(false);
  };

  const loadCategories = async (domain: string) => {
    const { data } = await supabase
      .from('industry_hierarchy')
      .select('category')
      .eq('domain', domain)
      .not('category', 'is', null);
    
    const uniqueCategories = [...new Set(data?.map(item => item.category) || [])].sort();
    setCategories(uniqueCategories);
  };

  const loadSubcategories = async (domain: string, category: string) => {
    const { data } = await supabase
      .from('industry_hierarchy')
      .select('subcategory')
      .eq('domain', domain)
      .eq('category', category)
      .not('subcategory', 'is', null);
    
    const uniqueSubcategories = [...new Set(data?.map(item => item.subcategory) || [])].sort();
    setSubcategories(uniqueSubcategories);
  };

  const loadDetails = async (domain: string, category: string, subcategory: string) => {
    const { data } = await supabase
      .from('industry_hierarchy')
      .select('detail')
      .eq('domain', domain)
      .eq('category', category)
      .eq('subcategory', subcategory)
      .not('detail', 'is', null);
    
    const uniqueDetails = [...new Set(data?.map(item => item.detail) || [])].sort();
    setDetails(uniqueDetails);
  };

  const handleDomainChange = (newDomain: string) => {
    onChange({
      domain: newDomain,
      category: undefined,
      subcategory: undefined,
      detail: undefined
    });
  };

  const handleCategoryChange = (newCategory: string) => {
    onChange({
      ...value,
      category: newCategory,
      subcategory: undefined,
      detail: undefined
    });
  };

  const handleSubcategoryChange = (newSubcategory: string) => {
    onChange({
      ...value,
      subcategory: newSubcategory,
      detail: undefined
    });
  };

  const handleDetailChange = (newDetail: string) => {
    onChange({
      ...value,
      detail: newDetail
    });
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading industries...</div>;
  }

  return (
    <div className={className}>
      {/* Breadcrumb Preview */}
      {(value.domain || value.category || value.subcategory || value.detail) && (
        <Card className="mb-4">
          <CardContent className="p-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium">Selected:</span>
              <div className="flex items-center ml-2">
                {value.domain && (
                  <>
                    <span className="text-foreground">{value.domain}</span>
                    {value.category && <ChevronRight className="h-3 w-3 mx-1" />}
                  </>
                )}
                {value.category && (
                  <>
                    <span className="text-foreground">{value.category}</span>
                    {value.subcategory && <ChevronRight className="h-3 w-3 mx-1" />}
                  </>
                )}
                {value.subcategory && (
                  <>
                    <span className="text-foreground">{value.subcategory}</span>
                    {value.detail && <ChevronRight className="h-3 w-3 mx-1" />}
                  </>
                )}
                {value.detail && <span className="text-foreground">{value.detail}</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {/* Domain Selection */}
        <div className="space-y-2">
          <Label htmlFor="domain">Industry Domain *</Label>
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
          <div className="space-y-2">
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
        {value.category && subcategories.length > 0 && (
          <div className="space-y-2">
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
        {value.subcategory && details.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="detail">Detail</Label>
            <Select value={value.detail || ''} onValueChange={handleDetailChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a detail" />
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
      </div>
    </div>
  );
}
