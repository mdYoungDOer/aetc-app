-- AETC 2026 - Create First Super Admin
-- Run this AFTER creating your first admin user in Supabase Dashboard

-- Step 1: Create your first admin user in Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add user"
-- 3. Enter email and password
-- 4. Copy the user ID from the user list

-- Step 2: Replace 'YOUR_USER_ID_HERE' with the actual user ID from step 1
-- Step 3: Run this script

-- Create user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  organization VARCHAR(200),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
CREATE POLICY "Admins can view all profiles" ON user_profiles
FOR SELECT USING (is_admin(auth.uid()));

-- Insert your first super admin role
-- REPLACE 'YOUR_USER_ID_HERE' with your actual user ID
INSERT INTO admin_roles (user_id, role, permissions, created_by) VALUES
('YOUR_USER_ID_HERE', 'super_admin', 
 '{
   "pages": {"create": true, "read": true, "update": true, "delete": true, "publish": true},
   "forms": {"create": true, "read": true, "update": true, "delete": true, "export": true},
   "tickets": {"create": true, "read": true, "update": true, "delete": true, "manage_stock": true},
   "orders": {"read": true, "update": true, "export": true, "refund": true},
   "users": {"create": true, "read": true, "update": true, "delete": true, "manage_roles": true},
   "analytics": {"read": true, "export": true},
   "settings": {"read": true, "update": true},
   "audit_logs": {"read": true}
 }', 
 '2df40b25-6fe1-4c1f-b327-1c1602a65698')
ON CONFLICT (user_id) DO NOTHING;

-- Insert user profile for the super admin
-- REPLACE 'YOUR_USER_ID_HERE' with your actual user ID
INSERT INTO user_profiles (user_id, first_name, last_name, organization) VALUES
('2df40b25-6fe1-4c1f-b327-1c1602a65698', 'Super', 'Admin', 'AETC 2026')
ON CONFLICT (user_id) DO NOTHING;

-- Success message
SELECT 'First Super Admin created successfully! You can now log in and create other admin accounts.' as status;
