-- Add comprehensive benchmark data for all platforms and industries

-- Meta/Facebook Benchmarks
INSERT INTO public.benchmarks (industry, subcategory, platform, metric_name, metric_value, percentile_25, percentile_50, percentile_75, sample_size) VALUES
-- E-commerce & Retail on Meta
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'CPA', 28.50, 18.00, 28.50, 39.00, 2500),
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'CTR', 2.65, 1.85, 2.65, 3.45, 2500),
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'ROAS', 380.00, 280.00, 380.00, 480.00, 2500),
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'CPM', 12.50, 8.50, 12.50, 16.50, 2500),
('E-commerce & Retail', 'Home & Garden', 'Meta', 'CPA', 32.00, 22.00, 32.00, 42.00, 1800),
('E-commerce & Retail', 'Home & Garden', 'Meta', 'CTR', 2.45, 1.75, 2.45, 3.15, 1800),
('E-commerce & Retail', 'Home & Garden', 'Meta', 'ROAS', 340.00, 240.00, 340.00, 440.00, 1800),

-- B2B Software on Meta
('B2B Software & Services', 'Enterprise Software', 'Meta', 'CPA', 85.00, 60.00, 85.00, 110.00, 1200),
('B2B Software & Services', 'Enterprise Software', 'Meta', 'CTR', 1.85, 1.25, 1.85, 2.45, 1200),
('B2B Software & Services', 'Enterprise Software', 'Meta', 'ROAS', 420.00, 320.00, 420.00, 520.00, 1200),
('B2B Software & Services', 'Marketing & Analytics', 'Meta', 'CPA', 78.00, 55.00, 78.00, 101.00, 1100),
('B2B Software & Services', 'Marketing & Analytics', 'Meta', 'CTR', 1.95, 1.35, 1.95, 2.55, 1100),

-- Google Ads Benchmarks
('E-commerce & Retail', 'Fashion & Apparel', 'Google Ads', 'CPA', 35.00, 25.00, 35.00, 45.00, 3000),
('E-commerce & Retail', 'Fashion & Apparel', 'Google Ads', 'CTR', 3.20, 2.40, 3.20, 4.00, 3000),
('E-commerce & Retail', 'Fashion & Apparel', 'Google Ads', 'ROAS', 450.00, 350.00, 450.00, 550.00, 3000),
('E-commerce & Retail', 'Fashion & Apparel', 'Google Ads', 'CPC', 1.25, 0.85, 1.25, 1.65, 3000),
('E-commerce & Retail', 'Home & Garden', 'Google Ads', 'CPA', 38.00, 28.00, 38.00, 48.00, 2200),
('E-commerce & Retail', 'Home & Garden', 'Google Ads', 'CTR', 3.00, 2.20, 3.00, 3.80, 2200),
('E-commerce & Retail', 'Home & Garden', 'Google Ads', 'ROAS', 420.00, 320.00, 420.00, 520.00, 2200),

-- B2B Software on Google Ads
('B2B Software & Services', 'CRM & Sales Tools', 'Google Ads', 'CPA', 82.00, 58.00, 82.00, 106.00, 1600),
('B2B Software & Services', 'CRM & Sales Tools', 'Google Ads', 'CTR', 3.75, 2.75, 3.75, 4.75, 1600),
('B2B Software & Services', 'CRM & Sales Tools', 'Google Ads', 'ROAS', 480.00, 380.00, 480.00, 580.00, 1600),
('B2B Software & Services', 'CRM & Sales Tools', 'Google Ads', 'CPC', 6.50, 4.50, 6.50, 8.50, 1600),

-- Finance & Insurance
('Finance, Insurance & Legal', 'Banking', 'Google Ads', 'CPA', 125.00, 90.00, 125.00, 160.00, 900),
('Finance, Insurance & Legal', 'Banking', 'Google Ads', 'CTR', 2.80, 2.00, 2.80, 3.60, 900),
('Finance, Insurance & Legal', 'Banking', 'Google Ads', 'CPC', 8.50, 6.00, 8.50, 11.00, 900),
('Finance, Insurance & Legal', 'Investment', 'Google Ads', 'CPA', 135.00, 95.00, 135.00, 175.00, 850),
('Finance, Insurance & Legal', 'Investment', 'Google Ads', 'CTR', 2.65, 1.85, 2.65, 3.45, 850),

-- LinkedIn Ads Benchmarks
('B2B Software & Services', 'Enterprise Software', 'LinkedIn', 'CPA', 125.00, 85.00, 125.00, 165.00, 800),
('B2B Software & Services', 'Enterprise Software', 'LinkedIn', 'CTR', 1.45, 1.00, 1.45, 1.90, 800),
('B2B Software & Services', 'Enterprise Software', 'LinkedIn', 'CPC', 7.50, 5.50, 7.50, 9.50, 800),
('B2B Software & Services', 'CRM & Sales Tools', 'LinkedIn', 'CPA', 115.00, 80.00, 115.00, 150.00, 750),
('B2B Software & Services', 'CRM & Sales Tools', 'LinkedIn', 'CTR', 1.55, 1.10, 1.55, 2.00, 750),

('Finance, Insurance & Legal', 'Banking', 'LinkedIn', 'CPA', 145.00, 100.00, 145.00, 190.00, 650),
('Finance, Insurance & Legal', 'Banking', 'LinkedIn', 'CTR', 1.35, 0.95, 1.35, 1.75, 650),
('Finance, Insurance & Legal', 'Investment', 'LinkedIn', 'CPA', 155.00, 110.00, 155.00, 200.00, 600),

-- TikTok Ads Benchmarks
('E-commerce & Retail', 'Fashion & Apparel', 'TikTok', 'CPA', 22.00, 15.00, 22.00, 29.00, 1500),
('E-commerce & Retail', 'Fashion & Apparel', 'TikTok', 'CTR', 3.80, 2.80, 3.80, 4.80, 1500),
('E-commerce & Retail', 'Fashion & Apparel', 'TikTok', 'CPM', 9.50, 6.50, 9.50, 12.50, 1500),
('E-commerce & Retail', 'Fashion & Apparel', 'TikTok', 'ROAS', 420.00, 320.00, 420.00, 520.00, 1500),

('Culture, Media & Creators', 'Entertainment', 'TikTok', 'CPA', 18.00, 12.00, 18.00, 24.00, 1200),
('Culture, Media & Creators', 'Entertainment', 'TikTok', 'CTR', 4.20, 3.20, 4.20, 5.20, 1200),
('Culture, Media & Creators', 'Entertainment', 'TikTok', 'CPM', 8.50, 5.50, 8.50, 11.50, 1200),

-- Personal Services
('Personal Services', 'Fitness', 'Google Ads', 'CPA', 48.00, 35.00, 48.00, 61.00, 1400),
('Personal Services', 'Fitness', 'Google Ads', 'CTR', 4.50, 3.30, 4.50, 5.70, 1400),
('Personal Services', 'Fitness', 'Google Ads', 'CPC', 2.80, 1.80, 2.80, 3.80, 1400),
('Personal Services', 'Fitness', 'Meta', 'CPA', 42.00, 28.00, 42.00, 56.00, 1600),
('Personal Services', 'Fitness', 'Meta', 'CTR', 3.20, 2.40, 3.20, 4.00, 1600),

('Personal Services', 'Medical', 'Google Ads', 'CPA', 58.00, 40.00, 58.00, 76.00, 1100),
('Personal Services', 'Medical', 'Google Ads', 'CTR', 3.80, 2.80, 3.80, 4.80, 1100),
('Personal Services', 'Medical', 'Meta', 'CPA', 52.00, 38.00, 52.00, 66.00, 1000),

-- Culture & Media
('Culture, Media & Creators', 'Digital Media', 'Google Ads', 'CPA', 35.00, 25.00, 35.00, 45.00, 950),
('Culture, Media & Creators', 'Digital Media', 'Google Ads', 'CTR', 2.90, 2.10, 2.90, 3.70, 950),
('Culture, Media & Creators', 'Digital Media', 'Meta', 'CPA', 28.00, 20.00, 28.00, 36.00, 1100),
('Culture, Media & Creators', 'Digital Media', 'Meta', 'CTR', 3.10, 2.30, 3.10, 3.90, 1100),

('Culture, Media & Creators', 'Gaming', 'Meta', 'CPA', 24.00, 16.00, 24.00, 32.00, 1300),
('Culture, Media & Creators', 'Gaming', 'Meta', 'CTR', 3.50, 2.50, 3.50, 4.50, 1300),
('Culture, Media & Creators', 'Gaming', 'TikTok', 'CPA', 20.00, 14.00, 20.00, 26.00, 1400),
('Culture, Media & Creators', 'Gaming', 'TikTok', 'CTR', 4.00, 3.00, 4.00, 5.00, 1400),

-- Science & Industry
('Science, Industry & Infrastructure', 'Industrial Equipment', 'Google Ads', 'CPA', 180.00, 130.00, 180.00, 230.00, 500),
('Science, Industry & Infrastructure', 'Industrial Equipment', 'Google Ads', 'CTR', 2.20, 1.60, 2.20, 2.80, 500),
('Science, Industry & Infrastructure', 'Industrial Equipment', 'LinkedIn', 'CPA', 220.00, 160.00, 220.00, 280.00, 450),

-- Nonprofit
('Public, Nonprofit & Identity', 'Social Services', 'Google Ads', 'CPA', 38.00, 25.00, 38.00, 51.00, 700),
('Public, Nonprofit & Identity', 'Social Services', 'Google Ads', 'CTR', 4.80, 3.60, 4.80, 6.00, 700),
('Public, Nonprofit & Identity', 'Social Services', 'Meta', 'CPA', 32.00, 22.00, 32.00, 42.00, 800),
('Public, Nonprofit & Identity', 'Social Services', 'Meta', 'CTR', 3.40, 2.60, 3.40, 4.20, 800),

-- YouTube/Video Benchmarks
('E-commerce & Retail', 'Fashion & Apparel', 'YouTube', 'CPV', 0.15, 0.10, 0.15, 0.20, 1200),
('E-commerce & Retail', 'Fashion & Apparel', 'YouTube', 'VTR', 28.00, 20.00, 28.00, 36.00, 1200),
('Culture, Media & Creators', 'Entertainment', 'YouTube', 'CPV', 0.12, 0.08, 0.12, 0.16, 1500),
('Culture, Media & Creators', 'Entertainment', 'YouTube', 'VTR', 32.00, 24.00, 32.00, 40.00, 1500),

-- Pinterest Benchmarks
('E-commerce & Retail', 'Fashion & Apparel', 'Pinterest', 'CPA', 30.00, 20.00, 30.00, 40.00, 800),
('E-commerce & Retail', 'Fashion & Apparel', 'Pinterest', 'CTR', 1.80, 1.20, 1.80, 2.40, 800),
('E-commerce & Retail', 'Home & Garden', 'Pinterest', 'CPA', 35.00, 25.00, 35.00, 45.00, 900),
('E-commerce & Retail', 'Home & Garden', 'Pinterest', 'CTR', 1.95, 1.35, 1.95, 2.55, 900),

-- Reddit Benchmarks
('B2B Software & Services', 'Enterprise Software', 'Reddit', 'CPA', 95.00, 70.00, 95.00, 120.00, 400),
('B2B Software & Services', 'Enterprise Software', 'Reddit', 'CTR', 2.10, 1.50, 2.10, 2.70, 400),
('Culture, Media & Creators', 'Gaming', 'Reddit', 'CPA', 42.00, 30.00, 42.00, 54.00, 600),
('Culture, Media & Creators', 'Gaming', 'Reddit', 'CTR', 2.80, 2.00, 2.80, 3.60, 600)

ON CONFLICT DO NOTHING;