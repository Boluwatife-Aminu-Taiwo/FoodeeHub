-- FoodeeHub Database Schema (Fixed - No PostGIS dependency)
-- Create database tables for the multi-vendor food delivery app

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendors table with geolocation (using standard DECIMAL columns)
CREATE TABLE IF NOT EXISTS vendors (
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
CREATE TABLE IF NOT EXISTS products (
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
CREATE TABLE IF NOT EXISTS orders (
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
CREATE TABLE IF NOT EXISTS order_items (
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
CREATE TABLE IF NOT EXISTS group_orders (
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
CREATE TABLE IF NOT EXISTS group_participants (
    id SERIAL PRIMARY KEY,
    group_order_id INTEGER REFERENCES group_orders(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    total_amount INTEGER DEFAULT 0, -- in kobo
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Category pairing rules table
CREATE TABLE IF NOT EXISTS category_pairings (
    id SERIAL PRIMARY KEY,
    primary_category VARCHAR(100) NOT NULL,
    secondary_category VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    max_distance_meters INTEGER DEFAULT 300,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(primary_category, secondary_category)
);

-- Vendor pairings table (for tracking successful pairings)
CREATE TABLE IF NOT EXISTS vendor_pairings (
    id SERIAL PRIMARY KEY,
    vendor1_id INTEGER REFERENCES vendors(id),
    vendor2_id INTEGER REFERENCES vendors(id),
    total_orders INTEGER DEFAULT 0,
    last_order_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(vendor1_id, vendor2_id)
);

-- Create indexes for better performance (using standard B-tree indexes instead of GIST)
CREATE INDEX IF NOT EXISTS idx_vendors_latitude ON vendors(latitude);
CREATE INDEX IF NOT EXISTS idx_vendors_longitude ON vendors(longitude);
CREATE INDEX IF NOT EXISTS idx_vendors_lat_lng ON vendors(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_vendors_category ON vendors(category);
CREATE INDEX IF NOT EXISTS idx_vendors_is_active ON vendors(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_group_orders_status ON group_orders(status);
CREATE INDEX IF NOT EXISTS idx_group_orders_expires_at ON group_orders(expires_at);
CREATE INDEX IF NOT EXISTS idx_group_orders_group_code ON group_orders(group_code);

-- Function to calculate distance between two points (Haversine formula)
-- This replaces the PostGIS ST_Distance function
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
    lat1_rad DECIMAL;
    lat2_rad DECIMAL;
BEGIN
    -- Convert degrees to radians
    lat1_rad := lat1 * PI() / 180;
    lat2_rad := lat2 * PI() / 180;
    dLat := (lat2 - lat1) * PI() / 180;
    dLng := (lng2 - lng1) * PI() / 180;
    
    a := SIN(dLat/2) * SIN(dLat/2) + 
         COS(lat1_rad) * COS(lat2_rad) * 
         SIN(dLng/2) * SIN(dLng/2);
    
    c := 2 * ATAN2(SQRT(a), SQRT(1-a));
    
    RETURN R * c;
END;
$$ LANGUAGE plpgsql;

-- Function to find nearby vendors within a certain distance
CREATE OR REPLACE FUNCTION find_nearby_vendors(
    center_lat DECIMAL,
    center_lng DECIMAL,
    max_distance_meters INTEGER DEFAULT 1000,
    exclude_category VARCHAR DEFAULT NULL
) RETURNS TABLE (
    vendor_id INTEGER,
    vendor_name VARCHAR,
    vendor_category VARCHAR,
    distance_meters DECIMAL,
    latitude DECIMAL,
    longitude DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.name,
        v.category,
        calculate_distance(center_lat, center_lng, v.latitude, v.longitude) as distance,
        v.latitude,
        v.longitude
    FROM vendors v
    WHERE v.is_active = true
    AND (exclude_category IS NULL OR v.category != exclude_category)
    AND calculate_distance(center_lat, center_lng, v.latitude, v.longitude) <= max_distance_meters
    ORDER BY distance;
END;
$$ LANGUAGE plpgsql;

-- Function to find pairable vendors for a given vendor
CREATE OR REPLACE FUNCTION find_pairable_vendors(
    vendor_id_param INTEGER,
    max_distance_meters INTEGER DEFAULT 300
) RETURNS TABLE (
    pairable_vendor_id INTEGER,
    pairable_vendor_name VARCHAR,
    pairable_vendor_category VARCHAR,
    distance_meters DECIMAL,
    pairing_enabled BOOLEAN
) AS $$
DECLARE
    vendor_lat DECIMAL;
    vendor_lng DECIMAL;
    vendor_cat VARCHAR;
BEGIN
    -- Get the vendor's location and category
    SELECT latitude, longitude, category 
    INTO vendor_lat, vendor_lng, vendor_cat
    FROM vendors 
    WHERE id = vendor_id_param;
    
    -- Return pairable vendors
    RETURN QUERY
    SELECT 
        v.id,
        v.name,
        v.category,
        calculate_distance(vendor_lat, vendor_lng, v.latitude, v.longitude) as distance,
        COALESCE(cp.is_enabled, false) as pairing_enabled
    FROM vendors v
    LEFT JOIN category_pairings cp ON (
        (cp.primary_category = vendor_cat AND cp.secondary_category = v.category) OR
        (cp.primary_category = v.category AND cp.secondary_category = vendor_cat)
    )
    WHERE v.id != vendor_id_param
    AND v.is_active = true
    AND calculate_distance(vendor_lat, vendor_lng, v.latitude, v.longitude) <= max_distance_meters
    AND (cp.is_enabled = true OR cp.is_enabled IS NULL)
    ORDER BY distance;
END;
$$ LANGUAGE plpgsql;

-- Add some useful views for common queries
CREATE OR REPLACE VIEW active_vendors AS
SELECT 
    id,
    name,
    email,
    category,
    description,
    address,
    latitude,
    longitude,
    delivery_fee,
    rating,
    total_orders,
    created_at
FROM vendors 
WHERE is_active = true;

CREATE OR REPLACE VIEW vendor_performance AS
SELECT 
    v.id,
    v.name,
    v.category,
    COUNT(DISTINCT o.id) as total_orders,
    COALESCE(SUM(o.total_amount), 0) as total_revenue,
    COALESCE(AVG(o.total_amount), 0) as avg_order_value,
    COUNT(DISTINCT CASE WHEN o.order_type = 'group' THEN o.id END) as group_orders
FROM vendors v
LEFT JOIN order_items oi ON v.id = oi.vendor_id
LEFT JOIN orders o ON oi.order_id = o.id
WHERE v.is_active = true
GROUP BY v.id, v.name, v.category;

-- Add triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to tables with updated_at columns
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vendors_updated_at ON vendors;
CREATE TRIGGER update_vendors_updated_at 
    BEFORE UPDATE ON vendors 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_group_orders_updated_at ON group_orders;
CREATE TRIGGER update_group_orders_updated_at 
    BEFORE UPDATE ON group_orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'FoodeeHub database schema created successfully!';
    RAISE NOTICE 'Tables created: users, vendors, products, orders, order_items, group_orders, group_participants, category_pairings, vendor_pairings';
    RAISE NOTICE 'Functions created: calculate_distance, find_nearby_vendors, find_pairable_vendors';
    RAISE NOTICE 'Views created: active_vendors, vendor_performance';
    RAISE NOTICE 'Ready for seed data insertion.';
END $$;
