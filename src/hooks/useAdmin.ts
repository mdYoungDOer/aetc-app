'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { AdminUser, AdminRole, AdminPermissions } from '@/types/admin';
import { AdminService } from '@/lib/admin';

export function useAdmin() {
  const { user } = useAuth();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [permissions, setPermissions] = useState<AdminPermissions | null>(null);

  useEffect(() => {
    if (user) {
      loadAdminData();
    } else {
      setAdminUser(null);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setPermissions(null);
      setLoading(false);
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAdminData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Check if user is admin
      const adminStatus = await AdminService.isAdmin(user.id);
      setIsAdmin(adminStatus);

      if (adminStatus) {
        // Get full admin data
        const adminData = await AdminService.getAdminUser(user.id);
        setAdminUser(adminData);

        if (adminData) {
          setPermissions(adminData.permissions);
          setIsSuperAdmin(adminData.role === 'super_admin');
        }
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (resource: keyof AdminPermissions, action: string): boolean => {
    if (!permissions) return false;
    return permissions[resource]?.[action as keyof AdminPermissions[typeof resource]] || false;
  };

  const canManageUsers = (): boolean => {
    return hasPermission('users', 'manage_roles');
  };

  const canDeleteContent = (resource: 'pages' | 'forms' | 'tickets'): boolean => {
    return hasPermission(resource, 'delete');
  };

  const canManageSettings = (): boolean => {
    return hasPermission('settings', 'update');
  };

  const canViewAuditLogs = (): boolean => {
    return hasPermission('audit_logs', 'read');
  };

  const canCreateContent = (resource: 'pages' | 'forms' | 'tickets'): boolean => {
    return hasPermission(resource, 'create');
  };

  const canUpdateContent = (resource: 'pages' | 'forms' | 'tickets'): boolean => {
    return hasPermission(resource, 'update');
  };

  const canExportData = (resource: 'forms' | 'orders' | 'analytics'): boolean => {
    return hasPermission(resource, 'export');
  };

  const canRefundOrders = (): boolean => {
    return hasPermission('orders', 'refund');
  };

  const canManageStock = (): boolean => {
    return hasPermission('tickets', 'manage_stock');
  };

  const canPublishContent = (): boolean => {
    return hasPermission('pages', 'publish');
  };

  return {
    adminUser,
    isAdmin,
    isSuperAdmin,
    permissions,
    loading,
    hasPermission,
    canManageUsers,
    canDeleteContent,
    canManageSettings,
    canViewAuditLogs,
    canCreateContent,
    canUpdateContent,
    canExportData,
    canRefundOrders,
    canManageStock,
    canPublishContent,
    refreshAdminData: loadAdminData,
  };
}
