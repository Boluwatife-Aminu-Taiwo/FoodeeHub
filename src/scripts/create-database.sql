-- FoodeeHub Database Schema
-- Create database tables for the multi-vendor food delivery app
CREATE EXTENSION postgis;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendors table with geolocation
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    category VARCHAR(100) NOT NULL, -- food, ice_cream, dessert, groceries, etc.
    description TEXT,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    delivery_fee INTEGER DEFAULT 500, -- in kobo (₦5.00)
    is_active BOOLEAN DEFAULT true,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- in kobo
    category VARCHAR(100),
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    order_type VARCHAR(20) DEFAULT 'single', -- single or group
    total_amount INTEGER NOT NULL, -- in kobo
    delivery_fee INTEGER NOT NULL,
    delivery_address TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, preparing, ready, delivered, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    user_id INTEGER REFERENCES users(id), -- for group orders to track who ordered what
    vendor_id INTEGER REFERENCES vendors(id),
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL, -- price at time of order in kobo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group orders table
CREATE TABLE group_orders (
    id SERIAL PRIMARY KEY,
    host_id INTEGER REFERENCES users(id),
    order_id INTEGER REFERENCES orders(id),
    group_code VARCHAR(20) UNIQUE NOT NULL,
    max_participants INTEGER DEFAULT 5,
    expires_at TIMESTAMP NOT NULL,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, expired, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group order participants table
CREATE TABLE group_participants (
    id SERIAL PRIMARY KEY,
    group_order_id INTEGER REFERENCES group_orders(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    total_amount INTEGER DEFAULT 0, -- in kobo
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Category pairing rules table
CREATE TABLE category_pairings (
    id SERIAL PRIMARY KEY,
    primary_category VARCHAR(100) NOT NULL,
    secondary_category VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    max_distance_meters INTEGER DEFAULT 300,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(primary_category, secondary_category)
);

-- Vendor pairings table (for tracking successful pairings)
CREATE TABLE vendor_pairings (
    id SERIAL PRIMARY KEY,
    vendor1_id INTEGER REFERENCES vendors(id),
    vendor2_id INTEGER REFERENCES vendors(id),
    total_orders INTEGER DEFAULT 0,
    last_order_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(vendor1_id, vendor2_id)
);




-- Create indexes for better performance
CREATE INDEX idx_vendors_location ON vendors USING GIST (ST_Point(longitude, latitude));
CREATE INDEX idx_vendors_category ON vendors(category);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_group_orders_status ON group_orders(status);
CREATE INDEX idx_group_orders_expires_at ON group_orders(expires_at);

-- Function to calculate distance between two points (Haversine formula)
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 DECIMAL, lng1 DECIMAL, 
    lat2 DECIMAL, lng2 DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
    R DECIMAL := 6371000; -- Earth's radius in meters
    dLat DECIMAL;
    dLng DECIMAL;
    a DECIMAL;
    c DECIMAL;
BEGIN
    dLat := RADIANS(lat2 - lat1);
    dLng := RADIANS(lng2 - lng1);
    
    a := SIN(dLat/2) * SIN(dLat/2) + 
         COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * 
         SIN(dLng/2) * SIN(dLng/2);
    
    c := 2 * ATAN2(SQRT(a), SQRT(1-a));
    
    RETURN R * c;
END;
$$ LANGUAGE plpgsql;
