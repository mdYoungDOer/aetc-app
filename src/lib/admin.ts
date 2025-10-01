import { createClient } from '@supabase/supabase-js';
import { AdminRole, AdminPermissions, AdminUser, AdminAuditLog } from '@/types/admin';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export class AdminService {
  // Get admin user with role and permissions
  static async getAdminUser(userId: string): Promise<AdminUser | null> {
    try {
      const { data: user, error: userError } = await supabase
        .from('auth.users')
        .select('id, email, created_at, last_sign_in_at')
        .eq('id', userId)
        .single();

      if (userError || !user) return null;

      const { data: roleData, error: roleError } = await supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (roleError || !roleData) return null;

      // Get additional user profile data
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('first_name, last_name, phone, organization')
        .eq('user_id', userId)
        .single();

      return {
        id: user.id,
        email: user.email,
        first_name: profile?.first_name || '',
        last_name: profile?.last_name || '',
        phone: profile?.phone,
        organization: profile?.organization,
        role: roleData.role as AdminRole,
        permissions: roleData.permissions as AdminPermissions,
        created_at: user.created_at,
        last_login: user.last_sign_in_at,
        is_active: true,
      };
    } catch (error) {
      console.error('Error fetching admin user:', error);
      return null;
    }
  }

  // Check if user is admin
  static async isAdmin(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('is_admin', { user_id: userId });

      return !error && data;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  // Check if user is super admin
  static async isSuperAdmin(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('is_super_admin', { user_id: userId });

      return !error && data;
    } catch (error) {
      console.error('Error checking super admin status:', error);
      return false;
    }
  }

  // Get user role
  static async getUserRole(userId: string): Promise<AdminRole | null> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_role', { user_id: userId });

      return !error && data ? data as AdminRole : null;
    } catch (error) {
      console.error('Error getting user role:', error);
      return null;
    }
  }

  // Get user permissions
  static async getUserPermissions(userId: string): Promise<AdminPermissions | null> {
    try {
      const { data, error } = await supabase
        .rpc('get_user_permissions', { user_id: userId });

      return !error && data ? data as AdminPermissions : null;
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return null;
    }
  }

  // Create admin user
  static async createAdminUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: AdminRole;
    phone?: string;
    organization?: string;
    createdBy: string;
  }): Promise<{ success: boolean; error?: string; userId?: string }> {
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
      });

      if (authError || !authData.user) {
        return { success: false, error: authError?.message || 'Failed to create user account' };
      }

      const userId = authData.user.id;

      // Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{
          user_id: userId,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          organization: userData.organization,
        }]);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }

      // Create admin role
      const { error: roleError } = await supabase
        .from('admin_roles')
        .insert([{
          user_id: userId,
          role: userData.role,
          created_by: userData.createdBy,
        }]);

      if (roleError) {
        return { success: false, error: roleError.message };
      }

      // Log admin creation
      await this.logAdminAction(
        'admin_created',
        'user',
        userId,
        { 
          created_user_email: userData.email,
          created_user_role: userData.role,
          created_by: userData.createdBy
        }
      );

      return { success: true, userId };
    } catch (error) {
      console.error('Error creating admin user:', error);
      return { success: false, error: 'Failed to create admin user' };
    }
  }

  // Update admin role
  static async updateAdminRole(
    userId: string, 
    newRole: AdminRole, 
    updatedBy: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('admin_roles')
        .update({ 
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        return { success: false, error: error.message };
      }

      // Log role update
      await this.logAdminAction(
        'role_updated',
        'user',
        userId,
        { 
          new_role: newRole,
          updated_by: updatedBy
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating admin role:', error);
      return { success: false, error: 'Failed to update admin role' };
    }
  }

  // Get all admin users
  static async getAllAdminUsers(): Promise<AdminUser[]> {
    try {
      const { data, error } = await supabase
        .from('admin_roles')
        .select(`
          *,
          user_profiles!inner (
            first_name,
            last_name,
            phone,
            organization
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin users:', error);
        return [];
      }

      return data.map((item: any) => ({
        id: item.user_id,
        email: '', // Will be fetched separately if needed
        first_name: item.user_profiles.first_name,
        last_name: item.user_profiles.last_name,
        phone: item.user_profiles.phone,
        organization: item.user_profiles.organization,
        role: item.role as AdminRole,
        permissions: item.permissions as AdminPermissions,
        created_at: item.created_at,
        is_active: true,
      }));
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return [];
    }
  }

  // Log admin action
  static async logAdminAction(
    action: string,
    resourceType?: string,
    resourceId?: string,
    details?: Record<string, any>
  ): Promise<void> {
    try {
      await supabase.rpc('log_admin_action', {
        action_name: action,
        resource_type: resourceType,
        resource_id: resourceId,
        action_details: details || {}
      });
    } catch (error) {
      console.error('Error logging admin action:', error);
    }
  }

  // Get audit logs
  static async getAuditLogs(limit: number = 50): Promise<AdminAuditLog[]> {
    try {
      const { data, error } = await supabase
        .from('admin_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching audit logs:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
  }

  // Delete admin user (Super Admin only)
  static async deleteAdminUser(
    userId: string, 
    deletedBy: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Log deletion
      await this.logAdminAction(
        'admin_deleted',
        'user',
        userId,
        { deleted_by: deletedBy }
      );

      // Delete admin role
      const { error: roleError } = await supabase
        .from('admin_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) {
        return { success: false, error: roleError.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting admin user:', error);
      return { success: false, error: 'Failed to delete admin user' };
    }
  }
}
