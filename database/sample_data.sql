-- Sample Data for Dhaka Bus Service
-- This file contains realistic sample data for major bus routes in Dhaka

USE dhaka_bus_db;

-- Insert Bus Companies/Services
INSERT INTO buses (name, company, bus_number, color, status) VALUES
('Moumita Paribahan', 'Moumita Transport Ltd', 'MOU-101', '#FF5733', 'active'),
('Thikana', 'Thikana Bus Service', 'THK-205', '#3498DB', 'active'),
('Bolaka', 'Bolaka Transport', 'BOL-301', '#2ECC71', 'active'),
('Nirala', 'Nirala Paribahan', 'NIR-152', '#F39C12', 'active'),
('Rupantor', 'Rupantor Services', 'RUP-420', '#9B59B6', 'active'),
('Sohag', 'Sohag Paribahan', 'SOH-315', '#E74C3C', 'active'),
('Projapoti', 'Projapoti Transport', 'PRO-210', '#1ABC9C', 'active'),
('Shikhor', 'Shikhor Bus Service', 'SHK-180', '#E67E22', 'active'),
('Suprobhat', 'Suprobhat Paribahan', 'SUP-275', '#34495E', 'active'),
('Dhrubotara', 'Dhrubotara Services', 'DHR-390', '#16A085', 'active');

-- Insert Bus Stops (Major locations in Dhaka)
INSERT INTO stops (name, area, landmark, latitude, longitude, description) VALUES
-- Gulshan Area
('Gulshan 1', 'Gulshan', 'Gulshan Circle 1', 23.7808, 90.4172, 'Major circular intersection in Gulshan'),
('Gulshan 2', 'Gulshan', 'Gulshan Circle 2', 23.7925, 90.4143, 'Near Gulshan Lake'),

-- Banani Area
('Banani', 'Banani', 'Banani Chairmanbari', 23.7937, 90.4066, 'Main Banani bus stop'),

-- Mohakhali Area
('Mohakhali', 'Mohakhali', 'Mohakhali Bus Terminal', 23.7808, 90.4028, 'Major bus terminal'),

-- Farmgate Area
('Farmgate', 'Farmgate', 'Farmgate Footbridge', 23.7575, 90.3889, 'Busy commercial area'),

-- Karwan Bazar Area
('Karwan Bazar', 'Karwan Bazar', 'Sonargaon Hotel', 23.7503, 90.3932, 'Wholesale market area'),

-- Shahbag Area
('Shahbag', 'Shahbag', 'Shahbag Square', 23.7389, 90.3950, 'Cultural and educational hub'),

-- Dhanmondi Area
('Dhanmondi 27', 'Dhanmondi', 'Rabindra Sarobar', 23.7465, 90.3754, 'Residential area near lake'),
('Dhanmondi 32', 'Dhanmondi', 'Bangabandhu Memorial', 23.7394, 90.3783, 'Historic location'),

-- New Market Area
('New Market', 'New Market', 'Chandni Chowk', 23.7340, 90.3845, 'Popular shopping area'),

-- Nilkhet Area
('Nilkhet', 'Nilkhet', 'Nilkhet Book Market', 23.7285, 90.3850, 'Book market'),

-- Science Lab Area
('Science Lab', 'Science Lab', 'Kaliabor', 23.7352, 90.3802, 'Near DU campus'),

-- Kalabagan Area
('Kalabagan', 'Kalabagan', 'Bashir Uddin Road', 23.7381, 90.3828, 'Residential area'),

-- Shyamoli Area
('Shyamoli', 'Shyamoli', 'Shyamoli Square', 23.7678, 90.3675, 'Western residential area'),
('Shyamoli Ring Road', 'Shyamoli', 'Ring Road Intersection', 23.7655, 90.3702, 'Major intersection'),

-- Mirpur Area
('Mirpur 10', 'Mirpur', 'Mirpur 10 Roundabout', 23.8069, 90.3683, 'Major Mirpur intersection'),
('Mirpur 11', 'Mirpur', 'Mirpur 11 Bus Stand', 23.8156, 90.3741, 'Residential area'),
('Mirpur 12', 'Mirpur', 'Mirpur 12 Petrol Pump', 23.8235, 90.3794, 'Northern Mirpur'),

-- Gabtoli Area
('Gabtoli', 'Gabtoli', 'Gabtoli Bus Terminal', 23.7792, 90.3539, 'Major bus terminal'),

-- Ashulia Area
('Ashulia', 'Ashulia', 'EPZ Area', 23.8867, 90.3194, 'Industrial zone'),

-- Motijheel Area
('Motijheel', 'Motijheel', 'Shapla Chattar', 23.7330, 90.4172, 'Commercial center'),

-- Paltan Area
('Paltan', 'Paltan', 'Paltan Maidan', 23.7367, 90.4137, 'Central Dhaka'),

-- Gulistan Area
('Gulistan', 'Gulistan', 'Fulbaria Bus Stand', 23.7269, 90.4125, 'Major bus stand'),

-- Sadarghat Area
('Sadarghat', 'Sadarghat', 'Sadarghat Launch Terminal', 23.7104, 90.4097, 'River port area'),

-- Jatrabari Area
('Jatrabari', 'Jatrabari', 'Jatrabari Intersection', 23.7112, 90.4314, 'Major intersection'),

-- Uttara Area
('Uttara Sector 3', 'Uttara', 'Jasimuddin', 23.8759, 90.3964, 'Planned residential'),
('Uttara Sector 7', 'Uttara', 'Sector 7 Circle', 23.8686, 90.3897, 'Uttara center'),

-- Tejgaon Area
('Tejgaon', 'Tejgaon', 'Tejgaon Industrial Area', 23.7644, 90.3897, 'Industrial area');

-- Insert Routes
INSERT INTO routes (bus_id, route_name, start_point, end_point, base_fare, total_distance, avg_duration, operating_hours, frequency, is_active) VALUES
-- Route 1: Moumita - Gulshan to Motijheel
(1, 'Gulshan - Motijheel via Farmgate', 'Gulshan', 'Motijheel', 25.00, 12.5, 45, '6:00 AM - 11:00 PM', 15, TRUE),

-- Route 2: Thikana - Mirpur to Motijheel
(2, 'Mirpur - Motijheel via Farmgate', 'Mirpur', 'Motijheel', 30.00, 18.0, 60, '5:30 AM - 11:30 PM', 12, TRUE),

-- Route 3: Bolaka - Uttara to Gulistan
(3, 'Uttara - Gulistan via Mohakhali', 'Uttara', 'Gulistan', 35.00, 22.0, 70, '6:00 AM - 10:00 PM', 20, TRUE),

-- Route 4: Nirala - New Market to Shyamoli
(4, 'New Market - Shyamoli via Dhanmondi', 'New Market', 'Shyamoli', 20.00, 8.0, 30, '6:30 AM - 10:30 PM', 18, TRUE),

-- Route 5: Rupantor - Gabtoli to Motijheel
(5, 'Gabtoli - Motijheel via Farmgate', 'Gabtoli', 'Motijheel', 30.00, 15.0, 55, '5:00 AM - 11:00 PM', 10, TRUE),

-- Route 6: Sohag - Mirpur to Gulistan
(6, 'Mirpur - Gulistan via Shahbag', 'Mirpur', 'Gulistan', 28.00, 16.0, 50, '6:00 AM - 10:30 PM', 15, TRUE),

-- Route 7: Projapoti - Uttara to Jatrabari
(7, 'Uttara - Jatrabari via Farmgate', 'Uttara', 'Jatrabari', 40.00, 25.0, 80, '5:30 AM - 10:00 PM', 25, TRUE),

-- Route 8: Shikhor - Dhanmondi to Gulshan
(8, 'Dhanmondi - Gulshan via Mohakhali', 'Dhanmondi', 'Gulshan', 22.00, 10.0, 35, '7:00 AM - 9:00 PM', 20, TRUE),

-- Route 9: Suprobhat - Ashulia to Gabtoli
(9, 'Ashulia - Gabtoli Direct', 'Ashulia', 'Gabtoli', 35.00, 20.0, 50, '5:00 AM - 9:00 PM', 30, TRUE),

-- Route 10: Dhrubotara - Shahbag to Uttara
(10, 'Shahbag - Uttara via Mohakhali', 'Shahbag', 'Uttara', 32.00, 18.0, 55, '6:00 AM - 10:00 PM', 18, TRUE);

-- Insert Route Stops (Route 1: Moumita - Gulshan to Motijheel)
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(1, 1, 1, 0, 0),      -- Gulshan 1
(1, 3, 2, 5, 25),     -- Banani
(1, 4, 3, 10, 28),    -- Mohakhali
(1, 5, 4, 20, 32),    -- Farmgate
(1, 6, 5, 28, 36),    -- Karwan Bazar
(1, 7, 6, 35, 40),    -- Shahbag
(1, 22, 7, 40, 45),   -- Paltan
(1, 21, 8, 45, 50);   -- Motijheel

-- Route 2: Thikana - Mirpur to Motijheel
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(2, 16, 1, 0, 0),     -- Mirpur 10
(2, 14, 2, 8, 30),    -- Shyamoli
(2, 5, 3, 18, 35),    -- Farmgate
(2, 6, 4, 28, 40),    -- Karwan Bazar
(2, 7, 5, 38, 45),    -- Shahbag
(2, 22, 6, 50, 50),   -- Paltan
(2, 21, 7, 60, 60);   -- Motijheel

-- Route 3: Bolaka - Uttara to Gulistan
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(3, 26, 1, 0, 0),     -- Uttara Sector 3
(3, 27, 2, 8, 35),    -- Uttara Sector 7
(3, 4, 3, 25, 40),    -- Mohakhali
(3, 5, 4, 35, 45),    -- Farmgate
(3, 7, 5, 50, 50),    -- Shahbag
(3, 22, 6, 62, 55),   -- Paltan
(3, 23, 7, 70, 60);   -- Gulistan

-- Route 4: Nirala - New Market to Shyamoli
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(4, 10, 1, 0, 0),     -- New Market
(4, 12, 2, 5, 20),    -- Science Lab
(4, 8, 3, 12, 25),    -- Dhanmondi 27
(4, 14, 4, 22, 30),   -- Shyamoli
(4, 15, 5, 30, 35);   -- Shyamoli Ring Road

-- Route 5: Rupantor - Gabtoli to Motijheel
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(5, 19, 1, 0, 0),     -- Gabtoli
(5, 14, 2, 10, 30),   -- Shyamoli
(5, 5, 3, 25, 35),    -- Farmgate
(5, 6, 4, 35, 40),    -- Karwan Bazar
(5, 7, 5, 43, 45),    -- Shahbag
(5, 21, 6, 55, 55);   -- Motijheel

-- Route 6: Sohag - Mirpur to Gulistan
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(6, 16, 1, 0, 0),     -- Mirpur 10
(6, 5, 2, 15, 28),    -- Farmgate
(6, 7, 3, 28, 32),    -- Shahbag
(6, 10, 4, 38, 36),   -- New Market
(6, 23, 5, 50, 42);   -- Gulistan

-- Route 7: Projapoti - Uttara to Jatrabari
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(7, 26, 1, 0, 0),     -- Uttara Sector 3
(7, 4, 2, 20, 40),    -- Mohakhali
(7, 5, 3, 32, 45),    -- Farmgate
(7, 7, 4, 48, 50),    -- Shahbag
(7, 23, 5, 65, 55),   -- Gulistan
(7, 25, 6, 80, 65);   -- Jatrabari

-- Route 8: Shikhor - Dhanmondi to Gulshan
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(8, 8, 1, 0, 0),      -- Dhanmondi 27
(8, 5, 2, 12, 22),    -- Farmgate
(8, 4, 3, 20, 26),    -- Mohakhali
(8, 3, 4, 28, 30),    -- Banani
(8, 1, 5, 35, 35);    -- Gulshan 1

-- Route 9: Suprobhat - Ashulia to Gabtoli
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(9, 20, 1, 0, 0),     -- Ashulia
(9, 19, 2, 50, 50);   -- Gabtoli

-- Route 10: Dhrubotara - Shahbag to Uttara
INSERT INTO route_stops (route_id, stop_id, stop_order, time_from_start, fare_from_start) VALUES
(10, 7, 1, 0, 0),     -- Shahbag
(10, 5, 2, 12, 32),   -- Farmgate
(10, 4, 3, 22, 36),   -- Mohakhali
(10, 27, 4, 42, 42),  -- Uttara Sector 7
(10, 26, 5, 55, 50);  -- Uttara Sector 3
