-- Fix for infinite recursion in user_roles policy
-- Run this in Supabase SQL Editor to resolve the infinite recursion error

-- Step 1: Drop any existing problematic policies
DROP POLICY IF EXISTS "Admins can view all attendees" ON attendees;
DROP POLICY IF EXISTS "Admins can update all attendees" ON attendees;
DROP POLICY IF EXISTS "Admins can delete any attendee" ON attendees;
DROP POLICY IF EXISTS "Admins can insert attendees" ON attendees;

-- Step 2: Create a simple function to check admin status without recursion
CREATE OR REPLACE FUNCTION is_user_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user exists in admin_roles table
  RETURN EXISTS (
    SELECT 1 FROM admin_roles 
    WHERE admin_roles.user_id = user_id 
    AND role IN ('super_admin', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 3: Recreate the attendee policies using the simple function
CREATE POLICY "Admins can view all attendees" ON attendees
  FOR SELECT USING (is_user_admin(auth.uid()));

CREATE POLICY "Admins can update all attendees" ON attendees
  FOR UPDATE USING (is_user_admin(auth.uid()));

CREATE POLICY "Admins can delete any attendee" ON attendees
  FOR DELETE USING (is_user_admin(auth.uid()));

CREATE POLICY "Admins can insert attendees" ON attendees
  FOR INSERT WITH CHECK (is_user_admin(auth.uid()));

-- Step 4: Ensure admin_roles table has proper RLS policies
-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Super admins can manage all roles" ON admin_roles;
DROP POLICY IF EXISTS "Admins can view own role" ON admin_roles;

-- Create simple, non-recursive policies for admin_roles
CREATE POLICY "Users can view own admin role" ON admin_roles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage roles" ON admin_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_roles ar 
      WHERE ar.user_id = auth.uid() 
      AND ar.role = 'super_admin'
    )
  );

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON admin_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_roles_role ON admin_roles(role);

-- Success message
SELECT 'Infinite recursion issue fixed successfully!' as status;
