-- FairGig Pakistan Seed Data
-- Pakistani names, cities, and currency in PKR (Pakistan Rupees)
-- 1 USD ≈ 275 PKR (approximate conversion for realistic data)

-- Clear existing test data (comment out if preserving other data)
-- DELETE FROM shifts;
-- DELETE FROM users;

-- Insert test workers (Gig economy workers in Pakistan)
INSERT INTO users (id, email, password_hash, full_name, role, city, state, country, status) VALUES
-- Delivery Riders (Lahore)
('550e8400-e29b-41d4-a716-446655440101', 'ahmed.hassan@example.pk', 'hashed_pwd_1', 'Ahmed Hassan', 'worker', 'Lahore', 'Punjab', 'Pakistan', 'active'),
('550e8400-e29b-41d4-a716-446655440102', 'fatima.khan@example.pk', 'hashed_pwd_2', 'Fatima Khan', 'worker', 'Lahore', 'Punjab', 'Pakistan', 'active'),
('550e8400-e29b-41d4-a716-446655440103', 'ali.raza@example.pk', 'hashed_pwd_3', 'Ali Raza', 'worker', 'Karachi', 'Sindh', 'Pakistan', 'active'),

-- Ride-hailing Drivers (Islamabad)
('550e8400-e29b-41d4-a716-446655440104', 'hassan.malik@example.pk', 'hashed_pwd_4', 'Hassan Malik', 'worker', 'Islamabad', 'Federal', 'Pakistan', 'active'),
('550e8400-e29b-41d4-a716-446655440105', 'amina.shah@example.pk', 'hashed_pwd_5', 'Amina Shah', 'worker', 'Rawalpindi', 'Punjab', 'Pakistan', 'active'),

-- Freelancers
('550e8400-e29b-41d4-a716-446655440106', 'zainab.hussain@example.pk', 'hashed_pwd_6', 'Zainab Hussain', 'worker', 'Lahore', 'Punjab', 'Pakistan', 'active'),
('550e8400-e29b-41d4-a716-446655440107', 'bilal.ahmad@example.pk', 'hashed_pwd_7', 'Bilal Ahmad', 'worker', 'Karachi', 'Sindh', 'Pakistan', 'active'),

-- Domestic Helpers
('550e8400-e29b-41d4-a716-446655440108', 'nadia.malik@example.pk', 'hashed_pwd_8', 'Nadia Malik', 'worker', 'Lahore', 'Punjab', 'Pakistan', 'active'),

-- Verifiers
('550e8400-e29b-41d4-a716-446655440110', 'verifier.samir@fairgig.pk', 'hashed_pwd_10', 'Samir Aslam', 'verifier', 'Lahore', 'Punjab', 'Pakistan', 'active'),
('550e8400-e29b-41d4-a716-446655440111', 'verifier.hina@fairgig.pk', 'hashed_pwd_11', 'Hina Ramzan', 'verifier', 'Karachi', 'Sindh', 'Pakistan', 'active'),

-- Labour Advocate
('550e8400-e29b-41d4-a716-446655440120', 'advocate.iqbal@fairgig.pk', 'hashed_pwd_20', 'Iqbal Masood', 'advocate', 'Lahore', 'Punjab', 'Pakistan', 'active'),
('550e8400-e29b-41d4-a716-446655440121', 'advocate.sarah@fairgig.pk', 'hashed_pwd_21', 'Sarah Khan', 'advocate', 'Karachi', 'Sindh', 'Pakistan', 'active');

-- Insert shifts for Ahmed Hassan (Lahore, delivery rider - Uber Eats, DoorDash equivalent in Pakistan)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
-- Week 1
('550e8400-e29b-41d4-a716-446655440101', 'Foodpanda', '2024-01-15', '10:00:00', '14:30:00', 4.5, 3645.00, 364.50, 3280.50, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440101', 'Daraz', '2024-01-16', '14:00:00', '18:45:00', 4.75, 2812.50, 281.25, 2531.25, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440101', 'Foodpanda', '2024-01-17', '11:00:00', '15:30:00', 4.5, 3375.00, 337.50, 3037.50, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440101', 'Careem', '2024-01-18', '08:30:00', '13:15:00', 4.75, 2937.50, 293.75, 2643.75, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440101', 'Foodpanda', '2024-01-19', '18:00:00', '22:45:00', 4.75, 4125.00, 412.50, 3712.50, 'verified', 'Lahore'),

-- Week 2
('550e8400-e29b-41d4-a716-446655440101', 'Foodpanda', '2024-01-22', '09:00:00', '13:45:00', 4.75, 3712.50, 371.25, 3341.25, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440101', 'Daraz', '2024-01-23', '15:00:00', '19:30:00', 4.5, 2700.00, 270.00, 2430.00, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440101', 'Careem', '2024-01-24', '10:00:00', '14:45:00', 4.75, 2625.00, 262.50, 2362.50, 'logged', 'Lahore');

-- Insert shifts for Fatima Khan (Lahore, delivery rider)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440102', 'Foodpanda', '2024-01-15', '12:00:00', '16:30:00', 4.5, 3375.00, 337.50, 3037.50, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440102', 'Daraz', '2024-01-16', '10:00:00', '14:45:00', 4.75, 2906.25, 290.63, 2615.62, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440102', 'Careem', '2024-01-17', '14:00:00', '18:30:00', 4.5, 2700.00, 270.00, 2430.00, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440102', 'Foodpanda', '2024-01-18', '09:00:00', '13:45:00', 4.75, 3618.75, 361.87, 3256.88, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440102', 'Daraz', '2024-01-19', '16:00:00', '20:45:00', 4.75, 3118.75, 311.88, 2806.87, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440102', 'Foodpanda', '2024-01-22', '11:00:00', '15:30:00', 4.5, 3375.00, 337.50, 3037.50, 'verified', 'Lahore');

-- Insert shifts for Ali Raza (Karachi, delivery rider)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440103', 'Foodpanda', '2024-01-15', '08:00:00', '12:30:00', 4.5, 3150.00, 315.00, 2835.00, 'verified', 'Karachi'),
('550e8400-e29b-41d4-a716-446655440103', 'Careem', '2024-01-16', '13:00:00', '17:45:00', 4.75, 2850.00, 285.00, 2565.00, 'verified', 'Karachi'),
('550e8400-e29b-41d4-a716-446655440103', 'Daraz', '2024-01-17', '10:00:00', '14:30:00', 4.5, 2700.00, 270.00, 2430.00, 'verified', 'Karachi'),
('550e8400-e29b-41d4-a716-446655440103', 'Foodpanda', '2024-01-18', '15:00:00', '19:45:00', 4.75, 3618.75, 361.88, 3256.87, 'verified', 'Karachi'),
('550e8400-e29b-41d4-a716-446655440103', 'Careem', '2024-01-19', '09:00:00', '13:45:00', 4.75, 2756.25, 275.63, 2480.62, 'logged', 'Karachi');

-- Insert shifts for Hassan Malik (Islamabad, ride-hailing driver)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440104', 'Uber', '2024-01-15', '07:00:00', '11:45:00', 4.75, 4756.25, 475.63, 4280.62, 'verified', 'Islamabad'),
('550e8400-e29b-41d4-a716-446655440104', 'Uber', '2024-01-16', '14:00:00', '18:30:00', 4.5, 4275.00, 427.50, 3847.50, 'verified', 'Islamabad'),
('550e8400-e29b-41d4-a716-446655440104', 'JazzCash Rides', '2024-01-17', '11:00:00', '15:45:00', 4.75, 2850.00, 285.00, 2565.00, 'verified', 'Islamabad'),
('550e8400-e29b-41d4-a716-446655440104', 'Uber', '2024-01-18', '18:00:00', '22:45:00', 4.75, 5062.50, 506.25, 4556.25, 'verified', 'Islamabad');

-- Insert shifts for Amina Shah (Rawalpindi, ride-hailing)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440105', 'Uber', '2024-01-15', '08:00:00', '12:30:00', 4.5, 3825.00, 382.50, 3442.50, 'verified', 'Rawalpindi'),
('550e8400-e29b-41d4-a716-446655440105', 'JazzCash Rides', '2024-01-16', '13:00:00', '17:45:00', 4.75, 2375.00, 237.50, 2137.50, 'verified', 'Rawalpindi'),
('550e8400-e29b-41d4-a716-446655440105', 'Uber', '2024-01-17', '10:00:00', '14:30:00', 4.5, 4050.00, 405.00, 3645.00, 'verified', 'Rawalpindi');

-- Insert shifts for Zainab Hussain (Lahore, freelance work - transcription, data entry)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440106', 'Upwork', '2024-01-10', '09:00:00', '17:00:00', 8.0, 4400.00, 220.00, 4180.00, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440106', 'Fiverr', '2024-01-15', '10:00:00', '14:00:00', 4.0, 2200.00, 110.00, 2090.00, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440106', 'Upwork', '2024-01-18', '08:30:00', '16:30:00', 8.0, 4400.00, 220.00, 4180.00, 'verified', 'Lahore');

-- Insert shifts for Bilal Ahmad (Karachi, freelance development)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440107', 'Upwork', '2024-01-12', '09:00:00', '17:00:00', 8.0, 5500.00, 275.00, 5225.00, 'verified', 'Karachi'),
('550e8400-e29b-41d4-a716-446655440107', 'Upwork', '2024-01-16', '09:00:00', '17:00:00', 8.0, 5500.00, 275.00, 5225.00, 'verified', 'Karachi');

-- Insert shifts for Nadia Malik (Lahore, domestic help)
INSERT INTO shifts (worker_id, platform, shift_date, start_time, end_time, duration_hours, gross_earnings, platform_fees, net_earnings, status, city) VALUES
('550e8400-e29b-41d4-a716-446655440108', 'Daraz Domestic', '2024-01-15', '08:00:00', '16:00:00', 8.0, 2400.00, 240.00, 2160.00, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440108', 'Daraz Domestic', '2024-01-17', '08:00:00', '16:00:00', 8.0, 2400.00, 240.00, 2160.00, 'verified', 'Lahore'),
('550e8400-e29b-41d4-a716-446655440108', 'Daraz Domestic', '2024-01-19', '08:00:00', '16:00:00', 8.0, 2400.00, 240.00, 2160.00, 'verified', 'Lahore');

-- City-wide earnings statistics (aggregated data for comparison)
INSERT INTO earnings_aggregation (city, province, platform, median_hourly_rate, average_hourly_rate, min_hourly_rate, max_hourly_rate, sample_size) VALUES
-- Lahore
('Lahore', 'Punjab', 'Foodpanda', 650, 687.50, 500, 900, 145),
('Lahore', 'Punjab', 'Daraz', 575, 610.00, 400, 850, 132),
('Lahore', 'Punjab', 'Careem', 575, 595.00, 450, 800, 98),
('Lahore', 'Punjab', 'Upwork', 500, 550.00, 300, 1000, 65),
('Lahore', 'Punjab', 'Fiverr', 400, 450.00, 200, 800, 48),

-- Karachi
('Karachi', 'Sindh', 'Foodpanda', 600, 650.00, 450, 900, 167),
('Karachi', 'Sindh', 'Careem', 550, 580.00, 400, 750, 89),
('Karachi', 'Sindh', 'Daraz', 525, 560.00, 350, 800, 76),
('Karachi', 'Sindh', 'Upwork', 600, 650.00, 400, 1100, 54),

-- Islamabad/Rawalpindi
('Islamabad', 'Federal', 'Uber', 875, 920.00, 700, 1200, 156),
('Rawalpindi', 'Punjab', 'Uber', 800, 850.00, 650, 1100, 89),
('Islamabad', 'Federal', 'JazzCash Rides', 500, 530.00, 350, 750, 67);

-- Insert income certificates (verified documents)
INSERT INTO income_certificates (worker_id, certificate_number, period_start, period_end, total_gross_earnings, total_platform_fees, total_net_earnings, verified_by, verification_date, status) VALUES
('550e8400-e29b-41d4-a716-446655440101', 'FG-PK-2024-001', '2024-01-01', '2024-01-31', 26212.50, 2621.25, 23591.25, '550e8400-e29b-41d4-a716-446655440110', CURRENT_TIMESTAMP, 'verified'),
('550e8400-e29b-41d4-a716-446655440102', 'FG-PK-2024-002', '2024-01-01', '2024-01-31', 22694.25, 2269.42, 20424.83, '550e8400-e29b-41d4-a716-446655440110', CURRENT_TIMESTAMP, 'verified'),
('550e8400-e29b-41d4-a716-446655440103', 'FG-PK-2024-003', '2024-01-01', '2024-01-31', 16425.00, 1642.50, 14782.50, '550e8400-e29b-41d4-a716-446655440111', CURRENT_TIMESTAMP, 'verified'),
('550e8400-e29b-41d4-a716-446655440104', 'FG-PK-2024-004', '2024-01-01', '2024-01-31', 18400.00, 1840.00, 16560.00, NULL, NULL, 'pending'),
('550e8400-e29b-41d4-a716-446655440105', 'FG-PK-2024-005', '2024-01-01', '2024-01-31', 10075.00, 1007.50, 9067.50, NULL, NULL, 'pending');

-- Insert grievances (real issues faced by gig workers in Pakistan)
INSERT INTO grievances (worker_id, platform, title, description, category, severity, status, tags, assigned_advocate_id) VALUES
('550e8400-e29b-41d4-a716-446655440101', 'Foodpanda', 'Account deactivated without explanation for 2 weeks', 'My account was deactivated on January 22 without any warning or explanation. Customer support says I violated community guidelines but no specific incident was mentioned. I had a 4.8 rating and have been delivering for 8 months without issues.', 'deactivation', 'critical', 'open', ARRAY['account_access', 'deactivation', 'no_explanation'], NULL),
('550e8400-e29b-41d4-a716-446655440102', 'Daraz', 'Commission rate increased from 15% to 25% overnight without notice', 'Daraz increased platform commission from 15% to 25% effective immediately. No prior notification was sent. This reduced my daily earnings by 1200-1500 PKR. Other riders are experiencing the same issue.', 'commission', 'high', 'in_review', ARRAY['commission_increase', 'unfair_practice', 'no_notification'], '550e8400-e29b-41d4-a716-446655440120'),
('550e8400-e29b-41d4-a716-446655440103', 'Careem', 'Unpaid earnings from 5 cancelled orders (3200 PKR missing)', 'On January 18, 5 orders were cancelled by customers after I had already traveled to pickup locations. The platform cancelled the orders but did not credit me for travel time or cancellation fees promised in their policy.', 'payment', 'high', 'resolved', ARRAY['payment_issue', 'cancelled_orders', 'travel_compensation'], '550e8400-e29b-41d4-a716-446655440121'),
('550e8400-e29b-41d4-a716-446655440104', 'Uber', 'Safety concern: Aggressive customer incident not addressed', 'A customer verbally abused me and threatened violence. I reported it through the app but Uber support response was automated and dismissive. They suggested I cancel future rides with this customer but offered no other support.', 'safety', 'high', 'open', ARRAY['safety', 'harassment', 'customer_aggression', 'support_failure'], '550e8400-e29b-41d4-a716-446655440120'),
('550e8400-e29b-41d4-a716-446655440105', 'JazzCash Rides', 'Forced to use older vehicle due to rejection of newer car documentation', 'My newer vehicle was rejected during documentation verification. Support gave no reason and no appeal process. I am forced to use my older, less fuel-efficient vehicle which costs me 200-300 PKR more per day.', 'vehicle', 'medium', 'escalated', ARRAY['vehicle_requirements', 'documentation', 'arbitrary_rejection'], NULL),
('550e8400-e29b-41d4-a716-446655440106', 'Upwork', 'Client refused to pay 4400 PKR for completed transcription work', 'Completed a 8-hour transcription project as per specifications. Client claimed "poor quality" without specific feedback and dispute remains unresolved for 3 weeks. Upwork support is slow.', 'payment', 'medium', 'open', ARRAY['non_payment', 'dispute', 'quality_claim'], NULL);

-- Insert grievance comments/discussions
INSERT INTO grievance_comments (grievance_id, user_id, content, likes_count) VALUES
(
  (SELECT id FROM grievances WHERE title LIKE '%Account deactivated%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440102',
  'Same thing happened to me last month. They never gave a reason. It took a week of messages to get my account back. Foodpanda needs transparency.',
  28
),
(
  (SELECT id FROM grievances WHERE title LIKE '%Commission rate increased%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440103',
  'They did this to all of us in Lahore. My earnings went from 15,000 to 12,000 per day overnight. This is wage theft.',
  64
),
(
  (SELECT id FROM grievances WHERE title LIKE '%Unpaid earnings from%' LIMIT 1),
  '550e8400-e29b-41d4-a716-446655440101',
  'Document everything with screenshots. Careem admits the policy but claims "technical issues" prevent payment. Keep the messages for legal action.',
  45
);

-- Insert anomaly detection flags
INSERT INTO anomaly_flags (worker_id, shift_id, flag_type, severity, description, detection_method, statistical_value) VALUES
(
  '550e8400-e29b-41d4-a716-446655440101',
  (SELECT id FROM shifts WHERE worker_id = '550e8400-e29b-41d4-a716-446655440101' AND platform = 'Foodpanda' LIMIT 1),
  'unusual_commission',
  'medium',
  'Commission rate on this shift was 10% vs typical 10% - consistent with normal operations',
  'commission_analysis',
  10.0
),
(
  '550e8400-e29b-41d4-a716-446655440102',
  (SELECT id FROM shifts WHERE worker_id = '550e8400-e29b-41d4-a716-446655440102' LIMIT 3 OFFSET 2),
  'platform_inconsistency',
  'high',
  'Daraz rate increase detected: commission rose from 10% to 20% between Jan 19-22. This matches reported commission increase.',
  'temporal_analysis',
  20.0
),
(
  '550e8400-e29b-41d4-a716-446655440104',
  (SELECT id FROM shifts WHERE worker_id = '550e8400-e29b-41d4-a716-446655440104' AND platform = 'Uber' LIMIT 1),
  'high_earnings',
  'low',
  'Earnings 15% above city median for Uber Islamabad during peak hours - expected behavior',
  'z_score_analysis',
  920.0
);
