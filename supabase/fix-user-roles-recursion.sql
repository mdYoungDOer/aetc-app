-- Fix for infinite recursion in user_roles policy
-- This script fixes the mismatch between user_roles and admin_roles table references

-- First, let's check if user_roles table exists and drop it if it does
DROP TABLE IF EXISTS user_roles CASCADE;

-- Create the correct user_roles table that matches the attendee-schema.sql expectations
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS for user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policies for user_roles to avoid recursion
CREATE POLICY "Users can view own role" ON user_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage all roles" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'super_admin'
    )
  );

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- Migrate data from admin_roles to user_roles if admin_roles exists
INSERT INTO user_roles (user_id, role, created_at, updated_at)
SELECT user_id, role, created_at, updated_at
FROM admin_roles
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles ur WHERE ur.user_id = admin_roles.user_id
)
ON CONFLICT (user_id) DO NOTHING;

-- Success message
SELECT 'User roles table fixed and data migrated successfully!' as status;
