// Admin RBAC Types for AETC 2026

export type AdminRole = 'super_admin' | 'admin';

export interface AdminPermissions {
  pages: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    publish: boolean;
  };
  forms: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    export: boolean;
  };
  tickets: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    manage_stock: boolean;
  };
  orders: {
    read: boolean;
    update: boolean;
    export: boolean;
    refund: boolean;
  };
  users: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    manage_roles: boolean;
  };
  analytics: {
    read: boolean;
    export: boolean;
  };
  settings: {
    read: boolean;
    update: boolean;
  };
  audit_logs: {
    read: boolean;
  };
}

export interface AdminRoleData {
  id: string;
  user_id: string;
  role: AdminRole;
  permissions: AdminPermissions;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminAuditLog {
  id: string;
  admin_id: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  details: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface AdminSignupData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  phone?: string;
  organization?: string;
  terms: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  organization?: string;
  role: AdminRole;
  permissions: AdminPermissions;
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

// Permission check helpers
export const hasPermission = (
  permissions: AdminPermissions,
  resource: keyof AdminPermissions,
  action: string
): boolean => {
  return permissions[resource]?.[action as keyof AdminPermissions[typeof resource]] || false;
};

export const isSuperAdmin = (role: AdminRole): boolean => {
  return role === 'super_admin';
};

export const canManageUsers = (permissions: AdminPermissions): boolean => {
  return permissions.users.manage_roles;
};

export const canDeleteContent = (permissions: AdminPermissions, resource: 'pages' | 'forms' | 'tickets'): boolean => {
  return permissions[resource].delete;
};

export const canManageSettings = (permissions: AdminPermissions): boolean => {
  return permissions.settings.update;
};

export const canViewAuditLogs = (permissions: AdminPermissions): boolean => {
  return permissions.audit_logs.read;
};
