-- Seed data for FoodeeHub

-- Insert sample users
INSERT INTO users (email, name, phone) VALUES
('john.doe@email.com', 'John Doe', '+2348012345678'),
('sarah.johnson@email.com', 'Sarah Johnson', '+2348012345679'),
('mike.chen@email.com', 'Mike Chen', '+2348012345680'),
('tunde.adebayo@email.com', 'Tunde Adebayo', '+2348012345681'),
('zainab.ibrahim@email.com', 'Zainab Ibrahim', '+2348012345682');

-- Insert sample vendors with Lagos coordinates
INSERT INTO vendors (name, email, phone, category, description, address, latitude, longitude, delivery_fee, rating, total_orders) VALUES
('Chicken Republic', 'orders@chickenrepublic.com', '+2348012345690', 'fast_food', 'Delicious fried chicken and local favorites', 'Victoria Island, Lagos', 6.4281, 3.4219, 500, 4.5, 234),
('Cold Stone Creamery', 'orders@coldstone.com', '+2348012345691', 'ice_cream', 'Premium ice cream and desserts', 'Victoria Island, Lagos', 6.4285, 3.4225, 400, 4.3, 156),
('Dominos Pizza', 'orders@dominos.com', '+2348012345692', 'pizza', 'Fresh pizza delivered hot', 'Lekki Phase 1, Lagos', 6.4698, 3.5852, 600, 4.2, 189),
('Mr. Biggs', 'orders@mrbiggs.com', '+2348012345693', 'local_cuisine', 'Nigerian fast food and local dishes', 'Ikeja, Lagos', 6.6018, 3.3515, 450, 4.1, 167),
('Yogurt Factory', 'orders@yogurtfactory.com', '+2348012345694', 'dessert', 'Fresh yogurt and healthy treats', 'Lekki Phase 1, Lagos', 6.4702, 3.5858, 350, 4.4, 98),
('Pie Express', 'orders@pieexpress.com', '+2348012345695', 'bakery', 'Fresh pies and baked goods', 'Ikeja, Lagos', 6.6022, 3.3520, 400, 4.0, 87);

-- Insert sample products
INSERT INTO products (vendor_id, name, description, price, category, is_available) VALUES
-- Chicken Republic products
(1, 'Refuel Max', 'Chicken, rice, plantain, coleslaw', 350000, 'meals', true),
(1, 'Chicken Royale', 'Spicy fried chicken with sides', 280000, 'meals', true),
(1, 'Jollof Rice', 'Nigerian jollof rice with chicken', 220000, 'rice', true),
(1, 'Chicken Wrap', 'Grilled chicken wrap with vegetables', 180000, 'wraps', true),

-- Cold Stone Creamery products
(2, 'Vanilla Ice Cream', 'Premium vanilla ice cream', 150000, 'ice_cream', true),
(2, 'Chocolate Sundae', 'Rich chocolate sundae with toppings', 200000, 'sundae', true),
(2, 'Strawberry Shake', 'Fresh strawberry milkshake', 180000, 'shakes', true),

-- Dominos Pizza products
(3, 'Margherita Pizza', 'Classic margherita with fresh basil', 320000, 'pizza', true),
(3, 'Pepperoni Pizza', 'Pepperoni with mozzarella cheese', 380000, 'pizza', true),
(3, 'Chicken Supreme', 'Chicken with vegetables and cheese', 420000, 'pizza', true),

-- Mr. Biggs products
(4, 'Meat Pie', 'Traditional Nigerian meat pie', 80000, 'snacks', true),
(4, 'Jollof Rice Special', 'Jollof rice with beef and plantain', 250000, 'meals', true),
(4, 'Fried Rice', 'Nigerian fried rice with chicken', 230000, 'rice', true),

-- Yogurt Factory products
(5, 'Greek Yogurt', 'Thick Greek yogurt with honey', 120000, 'yogurt', true),
(5, 'Berry Parfait', 'Yogurt parfait with mixed berries', 160000, 'parfait', true),
(5, 'Smoothie Bowl', 'Acai smoothie bowl with toppings', 180000, 'smoothie', true),

-- Pie Express products
(6, 'Chicken Pie', 'Homemade chicken pie', 90000, 'pies', true),
(6, 'Beef Pie', 'Savory beef pie with vegetables', 95000, 'pies', true),
(6, 'Apple Pie', 'Sweet apple pie with cinnamon', 85000, 'dessert', true);

-- Insert category pairing rules
INSERT INTO category_pairings (primary_category, secondary_category, is_enabled, max_distance_meters) VALUES
('fast_food', 'ice_cream', true, 300),
('fast_food', 'dessert', true, 300),
('pizza', 'ice_cream', true, 300),
('pizza', 'dessert', true, 300),
('local_cuisine', 'dessert', true, 300),
('local_cuisine', 'bakery', true, 300),
('fast_food', 'bakery', true, 300),
-- Disable same category pairings
('fast_food', 'fast_food', false, 0),
('ice_cream', 'ice_cream', false, 0),
('pizza', 'pizza', false, 0);

-- Insert sample orders
INSERT INTO orders (user_id, order_type, total_amount, delivery_fee, delivery_address, status) VALUES
(1, 'single', 380000, 50000, '15 Admiralty Way, Lekki Phase 1, Lagos', 'delivered'),
(2, 'group', 125000, 50000, '23 Ozumba Mbadiwe, Victoria Island, Lagos', 'delivered'),
(3, 'single', 56000, 60000, '45 Allen Avenue, Ikeja, Lagos', 'preparing'),
(4, 'group', 189000, 45000, '12 Adeola Odeku, Victoria Island, Lagos', 'confirmed');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, user_id, vendor_id, quantity, price) VALUES
-- Order 1 (John's single order)
(1, 1, 1, 1, 1, 350000), -- Refuel Max
(1, 7, 1, 2, 1, 150000), -- Vanilla Ice Cream

-- Order 2 (Sarah's group order)
(2, 3, 2, 1, 2, 220000), -- Jollof Rice x2
(2, 8, 2, 2, 1, 200000), -- Chocolate Sundae
(2, 3, 3, 1, 1, 220000), -- Jollof Rice (Mike's item)

-- Order 3 (Mike's single order)
(3, 10, 3, 3, 1, 320000), -- Margherita Pizza

-- Order 4 (Tunde's group order)
(4, 2, 4, 1, 2, 280000), -- Chicken Royale x2
(4, 16, 4, 5, 1, 120000), -- Greek Yogurt
(4, 2, 5, 1, 1, 280000); -- Chicken Royale (Zainab's item)

-- Insert sample group orders
INSERT INTO group_orders (host_id, order_id, group_code, max_participants, expires_at, status) VALUES
(2, 2, 'GO-ABC123', 5, NOW() + INTERVAL '30 minutes', 'completed'),
(4, 4, 'GO-XYZ789', 5, NOW() + INTERVAL '25 minutes', 'active');

-- Insert group participants
INSERT INTO group_participants (group_order_id, user_id, total_amount, payment_status, paid_at) VALUES
-- Group order 1 participants
(1, 2, 64000, 'paid', NOW() - INTERVAL '10 minutes'), -- Sarah (host)
(1, 3, 22000, 'paid', NOW() - INTERVAL '8 minutes'),  -- Mike

-- Group order 2 participants  
(2, 4, 68000, 'paid', NOW() - INTERVAL '5 minutes'),  -- Tunde (host)
(2, 5, 28000, 'pending', NULL);                       -- Zainab

-- Insert vendor pairings based on successful orders
INSERT INTO vendor_pairings (vendor1_id, vendor2_id, total_orders, last_order_at) VALUES
(1, 2, 45, NOW() - INTERVAL '2 hours'), -- Chicken Republic + Cold Stone
(3, 2, 23, NOW() - INTERVAL '1 day'),   -- Dominos + Cold Stone  
(4, 6, 18, NOW() - INTERVAL '3 hours'), -- Mr. Biggs + Pie Express
(1, 5, 12, NOW() - INTERVAL '6 hours'); -- Chicken Republic + Yogurt Factory
