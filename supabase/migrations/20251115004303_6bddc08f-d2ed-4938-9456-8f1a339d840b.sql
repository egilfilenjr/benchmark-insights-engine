-- Create industry_hierarchy table for the industry selector
CREATE TABLE IF NOT EXISTS public.industry_hierarchy (
  id SERIAL PRIMARY KEY,
  domain TEXT NOT NULL,
  category TEXT,
  subcategory TEXT,
  detail TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.industry_hierarchy ENABLE ROW LEVEL SECURITY;

-- Public read access for industry hierarchy
CREATE POLICY "Everyone can view industry hierarchy" ON public.industry_hierarchy FOR SELECT USING (true);

-- Add missing fields to oauth_accounts table
ALTER TABLE public.oauth_accounts 
  ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS account_id TEXT,
  ADD COLUMN IF NOT EXISTS account_name TEXT;

-- Create campaign_benchmarks junction table
CREATE TABLE IF NOT EXISTS public.campaign_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  benchmark_id UUID REFERENCES public.benchmarks(id) ON DELETE CASCADE,
  user_value NUMERIC(12,2),
  benchmark_percentile INTEGER,
  performance_score NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(campaign_id, benchmark_id)
);

-- Enable RLS
ALTER TABLE public.campaign_benchmarks ENABLE ROW LEVEL SECURITY;

-- RLS policies for campaign_benchmarks
CREATE POLICY "Users can view their campaign benchmarks" ON public.campaign_benchmarks 
FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = campaign_benchmarks.campaign_id AND campaigns.user_id = auth.uid())
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_industry_hierarchy_domain ON public.industry_hierarchy(domain);
CREATE INDEX IF NOT EXISTS idx_campaign_benchmarks_campaign ON public.campaign_benchmarks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_benchmarks_benchmark ON public.campaign_benchmarks(benchmark_id);

-- Insert sample industry hierarchy data
INSERT INTO public.industry_hierarchy (domain, category, subcategory, detail) VALUES
('B2B Software & Services', 'Enterprise Software', 'CRM & Sales Tools', 'CRM Platforms'),
('B2B Software & Services', 'Enterprise Software', 'CRM & Sales Tools', 'Sales Engagement'),
('B2B Software & Services', 'Enterprise Software', 'Marketing & Analytics', 'Marketing Automation'),
('B2B Software & Services', 'Enterprise Software', 'Marketing & Analytics', 'Analytics Platforms'),
('E-commerce & Retail', 'Consumer Goods', 'Fashion & Apparel', 'Clothing'),
('E-commerce & Retail', 'Consumer Goods', 'Fashion & Apparel', 'Accessories'),
('E-commerce & Retail', 'Consumer Goods', 'Home & Garden', 'Furniture'),
('E-commerce & Retail', 'Consumer Goods', 'Home & Garden', 'Decor'),
('Finance, Insurance & Legal', 'Financial Services', 'Banking', 'Personal Banking'),
('Finance, Insurance & Legal', 'Financial Services', 'Investment', 'Wealth Management'),
('Culture, Media & Creators', 'Media & Publishing', 'Digital Media', 'News & Journalism'),
('Culture, Media & Creators', 'Entertainment', 'Gaming', 'Mobile Games'),
('Personal Services', 'Health & Wellness', 'Fitness', 'Gyms & Studios'),
('Personal Services', 'Health & Wellness', 'Medical', 'Telemedicine'),
('Science, Industry & Infrastructure', 'Manufacturing', 'Industrial Equipment', 'Machinery'),
('Public, Nonprofit & Identity', 'Nonprofit', 'Social Services', 'Education')
ON CONFLICT DO NOTHING;

-- Insert sample benchmarks
INSERT INTO public.benchmarks (industry, subcategory, platform, metric_name, metric_value, percentile_25, percentile_50, percentile_75, sample_size) VALUES
('B2B Software & Services', 'Enterprise Software', 'Google Ads', 'CPA', 75.00, 50.00, 75.00, 100.00, 1500),
('B2B Software & Services', 'Enterprise Software', 'Google Ads', 'CTR', 3.50, 2.50, 3.50, 4.50, 1500),
('B2B Software & Services', 'Enterprise Software', 'Google Ads', 'ROAS', 450.00, 300.00, 450.00, 600.00, 1500),
('E-commerce & Retail', 'Consumer Goods', 'Meta', 'CPA', 25.00, 15.00, 25.00, 35.00, 2000),
('E-commerce & Retail', 'Consumer Goods', 'Meta', 'CTR', 2.80, 2.00, 2.80, 3.60, 2000),
('E-commerce & Retail', 'Consumer Goods', 'Meta', 'ROAS', 350.00, 250.00, 350.00, 450.00, 2000),
('Finance, Insurance & Legal', 'Financial Services', 'LinkedIn', 'CPA', 120.00, 80.00, 120.00, 160.00, 800),
('Finance, Insurance & Legal', 'Financial Services', 'LinkedIn', 'CTR', 1.50, 1.00, 1.50, 2.00, 800),
('Personal Services', 'Health & Wellness', 'Google Ads', 'CPA', 45.00, 30.00, 45.00, 60.00, 1200),
('Personal Services', 'Health & Wellness', 'Google Ads', 'CTR', 4.20, 3.00, 4.20, 5.40, 1200)
ON CONFLICT DO NOTHING;