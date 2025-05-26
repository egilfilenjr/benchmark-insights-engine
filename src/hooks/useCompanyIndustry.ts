
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserProfile } from '@/hooks/useUserProfile';

interface CompanyIndustry {
  id?: string;
  company_id: string;
  domain?: string;
  category?: string;
  subcategory?: string;
  detail?: string;
  created_at?: string;
  updated_at?: string;
}

interface IndustrySelection {
  domain?: string;
  category?: string;
  subcategory?: string;
  detail?: string;
}

export function useCompanyIndustry() {
  const { user } = useUserProfile();
  const [companyIndustry, setCompanyIndustry] = useState<CompanyIndustry | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadCompanyIndustry();
    }
  }, [user?.id]);

  const loadCompanyIndustry = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('company_industry')
        .select('*')
        .eq('company_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading company industry:', error);
      } else {
        setCompanyIndustry(data);
      }
    } catch (error) {
      console.error('Error loading company industry:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCompanyIndustry = async (selection: IndustrySelection) => {
    if (!user?.id) return false;

    setSaving(true);
    try {
      const industryData = {
        company_id: user.id,
        domain: selection.domain || null,
        category: selection.category || null,
        subcategory: selection.subcategory || null,
        detail: selection.detail || null,
      };

      const { error } = await supabase
        .from('company_industry')
        .upsert(industryData, {
          onConflict: 'company_id'
        });

      if (error) {
        console.error('Error saving company industry:', error);
        return false;
      }

      await loadCompanyIndustry();
      return true;
    } catch (error) {
      console.error('Error saving company industry:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getIndustryBreadcrumb = (): string => {
    if (!companyIndustry) return '';
    
    const parts = [
      companyIndustry.domain,
      companyIndustry.category,
      companyIndustry.subcategory,
      companyIndustry.detail
    ].filter(Boolean);
    
    return parts.join(' → ');
  };

  return {
    companyIndustry,
    loading,
    saving,
    saveCompanyIndustry,
    getIndustryBreadcrumb,
    refetch: loadCompanyIndustry
  };
}
