-- Create OAuth providers table for managing supported platforms
CREATE TABLE IF NOT EXISTS public.oauth_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  client_id TEXT,
  client_secret TEXT,
  auth_url TEXT NOT NULL,
  token_url TEXT NOT NULL,
  scope TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert supported OAuth providers
INSERT INTO public.oauth_providers (platform, name, auth_url, token_url, scope) VALUES
('google_ads', 'Google Ads', 'https://accounts.google.com/oauth/v2/auth', 'https://oauth2.googleapis.com/token', 'https://www.googleapis.com/auth/adwords'),
('meta_ads', 'Meta Ads', 'https://www.facebook.com/dialog/oauth', 'https://graph.facebook.com/oauth/access_token', 'ads_management,ads_read'),
('linkedin_ads', 'LinkedIn Ads', 'https://www.linkedin.com/oauth/v2/authorization', 'https://www.linkedin.com/oauth/v2/accessToken', 'r_ads,rw_ads'),
('tiktok_ads', 'TikTok Ads', 'https://ads.tiktok.com/marketing_api/auth', 'https://business-api.tiktok.com/open_api/oauth2/access_token/', 'advertisement_management,advertiser_info');

-- Enable RLS
ALTER TABLE public.oauth_providers ENABLE ROW LEVEL SECURITY;

-- Allow all users to read provider info (needed for OAuth setup)
CREATE POLICY "Allow public read on oauth_providers" ON public.oauth_providers FOR SELECT USING (true);

-- Create campaign_benchmarks table for storing relevant benchmarks for users
CREATE TABLE IF NOT EXISTS public.campaign_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL,
  campaign_id UUID,
  benchmark_id UUID REFERENCES public.benchmarks(id),
  user_value DOUBLE PRECISION,
  benchmark_percentile DOUBLE PRECISION,
  performance_score INTEGER, -- 1-100 score relative to benchmark
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS and create policies
ALTER TABLE public.campaign_benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their team's campaign benchmarks" 
ON public.campaign_benchmarks FOR SELECT 
USING (team_id IN (
  SELECT team_id FROM team_members WHERE user_id = auth.uid()
));

CREATE POLICY "Users can insert their team's campaign benchmarks" 
ON public.campaign_benchmarks FOR INSERT 
WITH CHECK (team_id IN (
  SELECT team_id FROM team_members WHERE user_id = auth.uid()
));

CREATE POLICY "Users can update their team's campaign benchmarks" 
ON public.campaign_benchmarks FOR UPDATE 
USING (team_id IN (
  SELECT team_id FROM team_members WHERE user_id = auth.uid()
));

-- Create auto-update trigger for campaign_benchmarks
CREATE TRIGGER update_campaign_benchmarks_updated_at
  BEFORE UPDATE ON public.campaign_benchmarks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update campaigns table to include more performance metrics
ALTER TABLE public.campaigns 
ADD COLUMN IF NOT EXISTS conversion_rate DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS cost_per_click DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS cost_per_mille DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS frequency DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS reach INTEGER;