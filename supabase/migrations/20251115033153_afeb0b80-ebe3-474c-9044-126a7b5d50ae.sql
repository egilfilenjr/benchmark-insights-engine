-- Add comprehensive benchmark data across all industries and platforms

INSERT INTO benchmarks (industry, subcategory, platform, metric_name, metric_value, percentile_25, percentile_50, percentile_75, sample_size, metadata)
VALUES
-- E-commerce & Retail - Expanded Coverage
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'CTR', 1.85, 1.2, 1.85, 2.8, 850, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'CPC', 0.92, 0.65, 0.92, 1.35, 850, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'CPA', 28.50, 18.20, 28.50, 42.80, 850, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'Meta', 'ROAS', 3.85, 2.50, 3.85, 5.20, 850, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'Google', 'CTR', 2.15, 1.45, 2.15, 3.20, 920, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'Google', 'CPC', 1.18, 0.82, 1.18, 1.75, 920, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'TikTok', 'CTR', 2.85, 1.95, 2.85, 4.10, 640, '{"channel": "In-Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Fashion & Apparel', 'TikTok', 'CPA', 32.40, 22.10, 32.40, 48.50, 640, '{"channel": "In-Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Home & Garden', 'Meta', 'CTR', 1.62, 1.05, 1.62, 2.45, 720, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Home & Garden', 'Meta', 'CPA', 35.80, 24.50, 35.80, 52.20, 720, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Home & Garden', 'Pinterest', 'CTR', 0.95, 0.62, 0.95, 1.42, 480, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Home & Garden', 'Pinterest', 'CPC', 0.68, 0.45, 0.68, 1.02, 480, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Electronics', 'Meta', 'CTR', 1.48, 0.95, 1.48, 2.25, 680, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Electronics', 'Google', 'CTR', 1.95, 1.32, 1.95, 2.88, 780, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('E-commerce & Retail', 'Electronics', 'Google', 'ROAS', 4.25, 2.80, 4.25, 6.15, 780, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb),

-- B2B Software & Services - Expanded Coverage
('B2B Software & Services', 'SaaS - Productivity', 'LinkedIn', 'CTR', 0.68, 0.42, 0.68, 1.02, 560, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'SaaS - Productivity', 'LinkedIn', 'CPC', 5.85, 4.20, 5.85, 8.50, 560, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'SaaS - Productivity', 'LinkedIn', 'CPL', 125.50, 85.00, 125.50, 180.00, 560, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'SaaS - Productivity', 'Google', 'CTR', 3.25, 2.15, 3.25, 4.80, 640, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'SaaS - Productivity', 'Google', 'CPC', 4.50, 3.20, 4.50, 6.50, 640, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'SaaS - Marketing', 'LinkedIn', 'CTR', 0.72, 0.45, 0.72, 1.08, 520, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'SaaS - Marketing', 'LinkedIn', 'CPL', 142.00, 95.00, 142.00, 205.00, 520, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'Enterprise Software', 'LinkedIn', 'CTR', 0.55, 0.35, 0.55, 0.82, 450, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'Enterprise Software', 'LinkedIn', 'CPL', 285.00, 195.00, 285.00, 420.00, 450, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'Consulting Services', 'LinkedIn', 'CTR', 0.62, 0.38, 0.62, 0.95, 480, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('B2B Software & Services', 'Consulting Services', 'LinkedIn', 'CPL', 165.00, 110.00, 165.00, 240.00, 480, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),

-- Finance & Insurance - Expanded Coverage
('Finance & Insurance', 'Personal Banking', 'Google', 'CTR', 2.85, 1.95, 2.85, 4.10, 720, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Personal Banking', 'Google', 'CPC', 3.25, 2.25, 3.25, 4.75, 720, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Personal Banking', 'Meta', 'CTR', 1.35, 0.88, 1.35, 2.05, 580, '{"channel": "Feed", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Credit Cards', 'Google', 'CTR', 3.15, 2.12, 3.15, 4.65, 680, '{"channel": "Search", "conversion_type": "Application", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Credit Cards', 'Google', 'CPA', 95.00, 65.00, 95.00, 140.00, 680, '{"channel": "Search", "conversion_type": "Application", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Investment Services', 'LinkedIn', 'CTR', 0.58, 0.36, 0.58, 0.88, 420, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Investment Services', 'LinkedIn', 'CPL', 185.00, 125.00, 185.00, 270.00, 420, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Insurance - Auto', 'Google', 'CTR', 4.25, 2.85, 4.25, 6.20, 740, '{"channel": "Search", "conversion_type": "Quote", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Insurance - Auto', 'Meta', 'CTR', 1.55, 1.02, 1.55, 2.35, 620, '{"channel": "Feed", "conversion_type": "Quote", "region": "North America"}'::jsonb),
('Finance & Insurance', 'Insurance - Home', 'Google', 'CTR', 3.95, 2.65, 3.95, 5.80, 690, '{"channel": "Search", "conversion_type": "Quote", "region": "North America"}'::jsonb),

-- Healthcare & Wellness - New Industry
('Healthcare & Wellness', 'Telehealth', 'Google', 'CTR', 3.55, 2.38, 3.55, 5.20, 580, '{"channel": "Search", "conversion_type": "Appointment", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Telehealth', 'Google', 'CPC', 2.85, 1.95, 2.85, 4.15, 580, '{"channel": "Search", "conversion_type": "Appointment", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Telehealth', 'Meta', 'CTR', 1.42, 0.92, 1.42, 2.15, 480, '{"channel": "Feed", "conversion_type": "Appointment", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Mental Health', 'Google', 'CTR', 4.15, 2.78, 4.15, 6.05, 520, '{"channel": "Search", "conversion_type": "Appointment", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Mental Health', 'Meta', 'CTR', 1.65, 1.08, 1.65, 2.50, 440, '{"channel": "Feed", "conversion_type": "Appointment", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Fitness & Nutrition', 'Meta', 'CTR', 1.88, 1.22, 1.88, 2.85, 640, '{"channel": "Feed", "conversion_type": "SignUp", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Fitness & Nutrition', 'TikTok', 'CTR', 3.15, 2.10, 3.15, 4.65, 580, '{"channel": "In-Feed", "conversion_type": "SignUp", "region": "North America"}'::jsonb),
('Healthcare & Wellness', 'Dental Services', 'Google', 'CTR', 5.25, 3.52, 5.25, 7.65, 460, '{"channel": "Search", "conversion_type": "Appointment", "region": "North America"}'::jsonb),

-- Education & Training - New Industry
('Education & Training', 'Online Courses', 'Meta', 'CTR', 1.75, 1.15, 1.75, 2.65, 620, '{"channel": "Feed", "conversion_type": "Enrollment", "region": "North America"}'::jsonb),
('Education & Training', 'Online Courses', 'Google', 'CTR', 2.95, 1.98, 2.95, 4.35, 680, '{"channel": "Search", "conversion_type": "Enrollment", "region": "North America"}'::jsonb),
('Education & Training', 'Online Courses', 'YouTube', 'CTR', 1.25, 0.82, 1.25, 1.88, 540, '{"channel": "In-Stream", "conversion_type": "Enrollment", "region": "North America"}'::jsonb),
('Education & Training', 'Higher Education', 'Google', 'CTR', 3.45, 2.32, 3.45, 5.05, 580, '{"channel": "Search", "conversion_type": "Application", "region": "North America"}'::jsonb),
('Education & Training', 'Higher Education', 'Meta', 'CTR', 1.38, 0.90, 1.38, 2.08, 520, '{"channel": "Feed", "conversion_type": "Application", "region": "North America"}'::jsonb),
('Education & Training', 'Professional Development', 'LinkedIn', 'CTR', 0.85, 0.55, 0.85, 1.28, 480, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Education & Training', 'Professional Development', 'LinkedIn', 'CPL', 95.00, 65.00, 95.00, 140.00, 480, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),

-- Travel & Hospitality - New Industry  
('Travel & Hospitality', 'Hotels & Resorts', 'Google', 'CTR', 3.75, 2.52, 3.75, 5.48, 720, '{"channel": "Search", "conversion_type": "Booking", "region": "North America"}'::jsonb),
('Travel & Hospitality', 'Hotels & Resorts', 'Meta', 'CTR', 1.52, 0.98, 1.52, 2.30, 640, '{"channel": "Feed", "conversion_type": "Booking", "region": "North America"}'::jsonb),
('Travel & Hospitality', 'Vacation Rentals', 'Google', 'CTR', 3.25, 2.18, 3.25, 4.75, 660, '{"channel": "Search", "conversion_type": "Booking", "region": "North America"}'::jsonb),
('Travel & Hospitality', 'Vacation Rentals', 'Meta', 'CTR', 1.68, 1.10, 1.68, 2.55, 580, '{"channel": "Feed", "conversion_type": "Booking", "region": "North America"}'::jsonb),
('Travel & Hospitality', 'Tours & Activities', 'Google', 'CTR', 2.95, 1.98, 2.95, 4.32, 540, '{"channel": "Search", "conversion_type": "Booking", "region": "North America"}'::jsonb),
('Travel & Hospitality', 'Tours & Activities', 'TikTok', 'CTR', 2.45, 1.62, 2.45, 3.68, 480, '{"channel": "In-Feed", "conversion_type": "Booking", "region": "North America"}'::jsonb),
('Travel & Hospitality', 'Airlines', 'Google', 'CTR', 4.15, 2.78, 4.15, 6.05, 680, '{"channel": "Search", "conversion_type": "Booking", "region": "North America"}'::jsonb),

-- Food & Beverage - New Industry
('Food & Beverage', 'Restaurants', 'Google', 'CTR', 5.85, 3.92, 5.85, 8.52, 820, '{"channel": "Search", "conversion_type": "Reservation", "region": "North America"}'::jsonb),
('Food & Beverage', 'Restaurants', 'Meta', 'CTR', 2.15, 1.42, 2.15, 3.25, 740, '{"channel": "Feed", "conversion_type": "Reservation", "region": "North America"}'::jsonb),
('Food & Beverage', 'Food Delivery', 'Google', 'CTR', 4.25, 2.85, 4.25, 6.20, 760, '{"channel": "Search", "conversion_type": "Order", "region": "North America"}'::jsonb),
('Food & Beverage', 'Food Delivery', 'Meta', 'CTR', 1.95, 1.28, 1.95, 2.92, 680, '{"channel": "Feed", "conversion_type": "Order", "region": "North America"}'::jsonb),
('Food & Beverage', 'Meal Kits', 'Meta', 'CTR', 1.72, 1.12, 1.72, 2.60, 620, '{"channel": "Feed", "conversion_type": "Subscription", "region": "North America"}'::jsonb),
('Food & Beverage', 'Meal Kits', 'TikTok', 'CTR', 2.85, 1.88, 2.85, 4.25, 560, '{"channel": "In-Feed", "conversion_type": "Subscription", "region": "North America"}'::jsonb),

-- Real Estate - New Industry
('Real Estate', 'Residential Sales', 'Google', 'CTR', 3.15, 2.10, 3.15, 4.65, 640, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Real Estate', 'Residential Sales', 'Meta', 'CTR', 1.25, 0.82, 1.25, 1.88, 560, '{"channel": "Feed", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Real Estate', 'Commercial Real Estate', 'LinkedIn', 'CTR', 0.48, 0.30, 0.48, 0.72, 380, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Real Estate', 'Commercial Real Estate', 'LinkedIn', 'CPL', 225.00, 155.00, 225.00, 330.00, 380, '{"channel": "Sponsored Content", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Real Estate', 'Property Management', 'Google', 'CTR', 2.75, 1.85, 2.75, 4.05, 520, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),

-- Automotive - New Industry
('Automotive', 'New Car Sales', 'Google', 'CTR', 2.95, 1.98, 2.95, 4.32, 680, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Automotive', 'New Car Sales', 'Meta', 'CTR', 1.38, 0.90, 1.38, 2.08, 600, '{"channel": "Feed", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Automotive', 'Used Car Sales', 'Google', 'CTR', 3.25, 2.18, 3.25, 4.75, 720, '{"channel": "Search", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Automotive', 'Used Car Sales', 'Meta', 'CTR', 1.55, 1.02, 1.55, 2.32, 640, '{"channel": "Feed", "conversion_type": "Lead", "region": "North America"}'::jsonb),
('Automotive', 'Auto Parts & Accessories', 'Google', 'CTR', 2.45, 1.65, 2.45, 3.60, 620, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('Automotive', 'Auto Services', 'Google', 'CTR', 4.85, 3.25, 4.85, 7.08, 740, '{"channel": "Search", "conversion_type": "Appointment", "region": "North America"}'::jsonb),

-- Additional metrics for existing industries
('Consumer Products', 'Beauty & Cosmetics', 'TikTok', 'CPM', 8.50, 5.80, 8.50, 12.50, 720, '{"channel": "In-Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('Consumer Products', 'Beauty & Cosmetics', 'TikTok', 'Conversion Rate', 2.85, 1.90, 2.85, 4.20, 720, '{"channel": "In-Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('Consumer Products', 'Pet Products', 'Meta', 'CTR', 2.15, 1.42, 2.15, 3.25, 680, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('Consumer Products', 'Pet Products', 'Meta', 'CPA', 32.50, 22.00, 32.50, 48.00, 680, '{"channel": "Feed", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('Consumer Products', 'Sports Equipment', 'Google', 'CTR', 2.35, 1.58, 2.35, 3.45, 620, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb),
('Consumer Products', 'Sports Equipment', 'Google', 'ROAS', 4.50, 3.00, 4.50, 6.50, 620, '{"channel": "Search", "conversion_type": "Purchase", "region": "North America"}'::jsonb)
ON CONFLICT DO NOTHING;