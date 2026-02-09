-- Dhaka Bus Service Database Schema
-- This schema supports direct routes and multi-bus transfer routes

CREATE DATABASE IF NOT EXISTS dhaka_bus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE dhaka_bus_db;

-- Table: buses
-- Stores information about each bus service
CREATE TABLE buses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT 'Bus name (e.g., Moumita, Thikana)',
    company VARCHAR(100) COMMENT 'Operating company name',
    bus_number VARCHAR(50) COMMENT 'Bus identification number',
    color VARCHAR(50) COMMENT 'Bus color for UI display',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: stops
-- Stores bus stop locations across Dhaka
CREATE TABLE stops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL COMMENT 'Bus stop name',
    area VARCHAR(100) NOT NULL COMMENT 'Area/locality name (e.g., Gulshan, Dhanmondi)',
    landmark VARCHAR(200) COMMENT 'Nearby landmark for easy identification',
    latitude DECIMAL(10, 8) NOT NULL COMMENT 'GPS latitude',
    longitude DECIMAL(11, 8) NOT NULL COMMENT 'GPS longitude',
    description TEXT COMMENT 'Additional information about the stop',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_area (area),
    INDEX idx_name (name),
    INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: routes
-- Stores route information for each bus
CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bus_id INT NOT NULL,
    route_name VARCHAR(200) NOT NULL COMMENT 'Route description (e.g., Gulshan to Motijheel)',
    start_point VARCHAR(100) NOT NULL,
    end_point VARCHAR(100) NOT NULL,
    base_fare DECIMAL(6, 2) NOT NULL COMMENT 'Starting fare in BDT',
    total_distance DECIMAL(8, 2) COMMENT 'Total route distance in km',
    avg_duration INT COMMENT 'Average travel time in minutes',
    operating_hours VARCHAR(50) COMMENT 'Operating time (e.g., 6:00 AM - 10:00 PM)',
    frequency INT COMMENT 'Bus frequency in minutes',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
    INDEX idx_bus_id (bus_id),
    INDEX idx_active (is_active),
    INDEX idx_route_points (start_point, end_point)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: route_stops
-- Junction table linking routes to stops with order information
CREATE TABLE route_stops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT NOT NULL,
    stop_id INT NOT NULL,
    stop_order INT NOT NULL COMMENT 'Order of stop in the route (1, 2, 3...)',
    time_from_start INT COMMENT 'Minutes from route start to this stop',
    fare_from_start DECIMAL(6, 2) COMMENT 'Fare from route start to this stop in BDT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    FOREIGN KEY (stop_id) REFERENCES stops(id) ON DELETE CASCADE,
    UNIQUE KEY unique_route_stop_order (route_id, stop_order),
    INDEX idx_route_id (route_id),
    INDEX idx_stop_id (stop_id),
    INDEX idx_order (stop_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: fare_settings
-- Global fare calculation settings
CREATE TABLE fare_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    base_fare DECIMAL(6, 2) NOT NULL DEFAULT 20.00 COMMENT 'Minimum fare in BDT',
    per_km_rate DECIMAL(6, 2) NOT NULL DEFAULT 2.50 COMMENT 'Rate per kilometer',
    per_stop_rate DECIMAL(6, 2) NOT NULL DEFAULT 3.00 COMMENT 'Additional fare per stop',
    avg_time_per_stop INT NOT NULL DEFAULT 3 COMMENT 'Average time spent per stop in minutes',
    avg_speed DECIMAL(5, 2) NOT NULL DEFAULT 15.00 COMMENT 'Average bus speed in km/h',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default fare settings
INSERT INTO fare_settings (base_fare, per_km_rate, per_stop_rate, avg_time_per_stop, avg_speed) 
VALUES (20.00, 2.50, 3.00, 3, 15.00);

-- Table: search_logs (Optional - for analytics)
CREATE TABLE search_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_location VARCHAR(200),
    to_location VARCHAR(200),
    search_type ENUM('direct', 'transfer', 'ai') DEFAULT 'direct',
    results_found INT,
    search_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_timestamp (search_timestamp),
    INDEX idx_locations (from_location, to_location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
