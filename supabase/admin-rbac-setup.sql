-- AETC 2026 - Admin RBAC (Role-Based Access Control) Setup
-- Run this in Supabase SQL Editor to set up admin roles and permissions

-- Create admin_roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('super_admin', 'admin')),
  permissions JSONB NOT NULL DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create admin_audit_log table for tracking admin actions
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create function to check admin role
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles 
    WHERE admin_roles.user_id = user_id 
    AND role IN ('super_admin', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check super admin role
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_roles 
    WHERE admin_roles.user_id = user_id 
    AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS VARCHAR AS $$
BEGIN
  RETURN (
    SELECT role FROM admin_roles 
    WHERE admin_roles.user_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user permissions
CREATE OR REPLACE FUNCTION get_user_permissions(user_id UUID)
RETURNS JSONB AS $$
BEGIN
  RETURN (
    SELECT permissions FROM admin_roles 
    WHERE admin_roles.user_id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for admin_roles table
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- Super admins can do everything
CREATE POLICY "Super admins can manage all roles" ON admin_roles
FOR ALL USING (is_super_admin(auth.uid()));

-- Admins can only view their own role
CREATE POLICY "Admins can view own role" ON admin_roles
FOR SELECT USING (
  user_id = auth.uid() OR is_super_admin(auth.uid())
);

-- RLS Policies for admin_audit_log table
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON admin_audit_log
FOR SELECT USING (is_admin(auth.uid()));

-- Only super admins can insert audit logs
CREATE POLICY "Super admins can insert audit logs" ON admin_audit_log
FOR INSERT WITH CHECK (is_super_admin(auth.uid()));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON admin_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_roles_role ON admin_roles(role);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_admin_id ON admin_audit_log(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_log_created_at ON admin_audit_log(created_at);

-- Note: Admin roles will be created through the admin signup interface
-- No default roles are inserted here to avoid foreign key constraint errors

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  action_name VARCHAR(100),
  resource_type VARCHAR(50) DEFAULT NULL,
  resource_id UUID DEFAULT NULL,
  action_details JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO admin_audit_log (
    admin_id, action, resource_type, resource_id, details, ip_address, user_agent
  ) VALUES (
    auth.uid(),
    action_name,
    resource_type,
    resource_id,
    action_details,
    inet_client_addr(),
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Success message
SELECT 'Admin RBAC system created successfully!' as status;
