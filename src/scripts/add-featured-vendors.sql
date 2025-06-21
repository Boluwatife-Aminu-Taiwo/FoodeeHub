-- Add featured vendors functionality to the database

-- Add featured column to vendors table
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 0;
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS approval_status VARCHAR(20) DEFAULT 'pending';

-- Create index for featured vendors
CREATE INDEX IF NOT EXISTS idx_vendors_featured ON vendors(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_vendors_approval_status ON vendors(approval_status);

-- Update existing vendors to approved status
UPDATE vendors SET approval_status = 'approved' WHERE approval_status = 'pending';

-- Add some featured vendors for demo
UPDATE vendors SET is_featured = true, featured_order = 1 WHERE name = 'Chicken Republic';
UPDATE vendors SET is_featured = true, featured_order = 2 WHERE name = 'Cold Stone Creamery';
UPDATE vendors SET is_featured = true, featured_order = 3 WHERE name = 'Dominos Pizza';

-- Function to get featured vendors
CREATE OR REPLACE FUNCTION get_featured_vendors()
RETURNS TABLE (
    vendor_id INTEGER,
    vendor_name VARCHAR,
    vendor_category VARCHAR,
    vendor_rating DECIMAL,
    vendor_description TEXT,
    vendor_address TEXT,
    delivery_fee INTEGER,
    total_orders INTEGER,
    featured_order INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.name,
        v.category,
        v.rating,
        v.description,
        v.address,
        v.delivery_fee,
        v.total_orders,
        v.featured_order
    FROM vendors v
    WHERE v.is_featured = true 
    AND v.is_active = true 
    AND v.approval_status = 'approved'
    ORDER BY v.featured_order ASC, v.rating DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to search vendors
CREATE OR REPLACE FUNCTION search_vendors(
    search_term VARCHAR DEFAULT '',
    category_filter VARCHAR DEFAULT '',
    location_lat DECIMAL DEFAULT NULL,
    location_lng DECIMAL DEFAULT NULL,
    max_distance INTEGER DEFAULT 5000,
    limit_count INTEGER DEFAULT 20,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    vendor_id INTEGER,
    vendor_name VARCHAR,
    vendor_category VARCHAR,
    vendor_rating DECIMAL,
    vendor_description TEXT,
    vendor_address TEXT,
    delivery_fee INTEGER,
    total_orders INTEGER,
    distance_meters DECIMAL,
    is_featured BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.name,
        v.category,
        v.rating,
        v.description,
        v.address,
        v.delivery_fee,
        v.total_orders,
        CASE 
            WHEN location_lat IS NOT NULL AND location_lng IS NOT NULL 
            THEN calculate_distance(location_lat, location_lng, v.latitude, v.longitude)
            ELSE 0
        END as distance,
        v.is_featured
    FROM vendors v
    WHERE v.is_active = true 
    AND v.approval_status = 'approved'
    AND (search_term = '' OR 
         v.name ILIKE '%' || search_term || '%' OR 
         v.description ILIKE '%' || search_term || '%' OR
         v.category ILIKE '%' || search_term || '%')
    AND (category_filter = '' OR v.category = category_filter)
    AND (location_lat IS NULL OR location_lng IS NULL OR 
         calculate_distance(location_lat, location_lng, v.latitude, v.longitude) <= max_distance)
    ORDER BY 
        v.is_featured DESC,
        CASE 
            WHEN location_lat IS NOT NULL AND location_lng IS NOT NULL 
            THEN calculate_distance(location_lat, location_lng, v.latitude, v.longitude)
            ELSE v.rating
        END ASC,
        v.rating DESC
    LIMIT limit_count OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get vendor categories
CREATE OR REPLACE FUNCTION get_vendor_categories()
RETURNS TABLE (
    category VARCHAR,
    vendor_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.category,
        COUNT(*) as count
    FROM vendors v
    WHERE v.is_active = true 
    AND v.approval_status = 'approved'
    GROUP BY v.category
    ORDER BY count DESC, v.category ASC;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    RAISE NOTICE 'Featured vendors functionality added successfully!';
    RAISE NOTICE 'New columns: is_featured, featured_order, approval_status';
    RAISE NOTICE 'New functions: get_featured_vendors, search_vendors, get_vendor_categories';
END $$;
