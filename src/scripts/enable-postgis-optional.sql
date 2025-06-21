-- Optional: Enable PostGIS for advanced spatial features
-- Run this script only if you want to use PostGIS features
-- Make sure PostGIS extension is installed on your PostgreSQL server

-- Enable PostGIS extension (requires superuser privileges)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- If PostGIS is enabled, you can add these enhanced spatial features:

-- Add geometry column for vendors (more efficient than lat/lng for spatial queries)
-- ALTER TABLE vendors ADD COLUMN IF NOT EXISTS location GEOMETRY(POINT, 4326);

-- Update geometry column with existing lat/lng data
-- UPDATE vendors SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

-- Create spatial index for better performance
-- CREATE INDEX IF NOT EXISTS idx_vendors_location_gist ON vendors USING GIST (location);

-- Enhanced function using PostGIS (more accurate and faster)
-- CREATE OR REPLACE FUNCTION find_nearby_vendors_postgis(
--     center_lat DECIMAL,
--     center_lng DECIMAL,
--     max_distance_meters INTEGER DEFAULT 1000,
--     exclude_category VARCHAR DEFAULT NULL
-- ) RETURNS TABLE (
--     vendor_id INTEGER,
--     vendor_name VARCHAR,
--     vendor_category VARCHAR,
--     distance_meters DECIMAL,
--     latitude DECIMAL,
--     longitude DECIMAL
-- ) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT 
--         v.id,
--         v.name,
--         v.category,
--         ST_Distance(
--             ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography,
--             v.location::geography
--         ) as distance,
--         v.latitude,
--         v.longitude
--     FROM vendors v
--     WHERE v.is_active = true
--     AND (exclude_category IS NULL OR v.category != exclude_category)
--     AND ST_DWithin(
--         ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326)::geography,
--         v.location::geography,
--         max_distance_meters
--     )
--     ORDER BY distance;
-- END;
-- $$ LANGUAGE plpgsql;

DO $$
BEGIN
    RAISE NOTICE 'PostGIS setup script completed.';
    RAISE NOTICE 'Uncomment the lines above to enable PostGIS features.';
    RAISE NOTICE 'Make sure PostGIS extension is installed before enabling.';
END $$;
