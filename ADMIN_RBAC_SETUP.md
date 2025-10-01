# AETC 2026 - Admin RBAC (Role-Based Access Control) Setup Guide

## 🔐 Overview

The AETC 2026 platform now includes a comprehensive Role-Based Access Control (RBAC) system with two admin roles:

- **Super Admin**: Full system access including user management, role assignment, audit logs, and all content management capabilities
- **Admin**: Content management, ticket management, and analytics access (cannot manage other users or system settings)

## 🚀 Quick Setup

### 1. Database Setup
Run the SQL script in your Supabase SQL Editor:

```sql
-- Execute supabase/admin-rbac-setup.sql
```

This creates:
- `admin_roles` table with role assignments
- `admin_audit_log` table for tracking admin actions
- RLS policies for security
- Helper functions for role checking

### 2. Create First Super Admin
Follow these steps to create your first Super Admin:

**Step 1: Create User Account**
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add user" and create a user with email/password
3. Copy the user ID from the user list

**Step 2: Run the Setup Script**
1. Open the SQL Editor in Supabase
2. Run the script: `supabase/create-first-super-admin.sql`
3. Replace `'YOUR_USER_ID_HERE'` with your actual user ID (from Step 1)
4. Execute the script

This will:
- Create the `user_profiles` table
- Set up RLS policies
- Create your Super Admin role
- Create your user profile

## 🔧 Admin System Features

### **Super Admin Capabilities**
- ✅ Create and manage other admin accounts
- ✅ Assign roles (Super Admin or Admin)
- ✅ View and manage all users
- ✅ Access audit logs
- ✅ Manage system settings
- ✅ Full content management (create, edit, delete, publish)
- ✅ Full ticket management (create, edit, delete, manage stock)
- ✅ Full form management (create, edit, delete, export)
- ✅ Order management (view, update, refund, export)
- ✅ Analytics access (view, export)

### **Admin Capabilities**
- ✅ Content management (create, edit, publish - cannot delete)
- ✅ Ticket management (create, edit, manage stock - cannot delete)
- ✅ Form management (create, edit, export - cannot delete)
- ✅ Order management (view, export - cannot refund)
- ✅ Analytics access (view, export)
- ❌ Cannot manage other users
- ❌ Cannot access audit logs
- ❌ Cannot manage system settings

## 📱 User Interface

### **Admin Signup Page** (`/auth/admin-signup`)
- Only accessible by Super Admins
- Role selection (Super Admin or Admin)
- Form validation with Zod
- Terms acceptance required
- Automatic account creation with proper permissions

### **Admin Navigation**
- Role-based menu items
- Super Admin badge for restricted features
- Visual indicators for permission levels
- Mobile-responsive design

### **User Management** (`/admin/users`)
- List all admin users
- Role indicators
- Edit/delete capabilities (Super Admin only)
- Organization information
- Creation date tracking

## 🔒 Security Features

### **Authentication & Authorization**
- Supabase Row Level Security (RLS)
- Middleware-based route protection
- Role-based API access control
- Session management

### **Permission System**
- Granular permissions per resource
- Action-based access control
- Permission inheritance (Super Admin > Admin)
- Real-time permission checking

### **Audit Logging**
- All admin actions logged
- IP address tracking
- User agent recording
- Resource-specific logging
- Timestamp tracking

## 🛠️ Technical Implementation

### **Database Schema**
```sql
-- Admin roles table
admin_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  role VARCHAR(20) CHECK (role IN ('super_admin', 'admin')),
  permissions JSONB,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Audit log table
admin_audit_log (
  id UUID PRIMARY KEY,
  admin_id UUID REFERENCES auth.users(id),
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP
)
```

### **API Functions**
- `is_admin(user_id)` - Check if user is admin
- `is_super_admin(user_id)` - Check if user is super admin
- `get_user_role(user_id)` - Get user's role
- `get_user_permissions(user_id)` - Get user's permissions
- `log_admin_action(...)` - Log admin actions

### **React Hooks**
- `useAdmin()` - Admin state and permissions
- `useAuth()` - Authentication state
- Permission checking helpers
- Role-based UI rendering

## 📊 Permission Matrix

| Feature | Super Admin | Admin |
|---------|-------------|-------|
| **Pages** | Create, Read, Update, Delete, Publish | Create, Read, Update, Publish |
| **Forms** | Create, Read, Update, Delete, Export | Create, Read, Update, Export |
| **Tickets** | Create, Read, Update, Delete, Manage Stock | Create, Read, Update, Manage Stock |
| **Orders** | Read, Update, Export, Refund | Read, Export |
| **Users** | Create, Read, Update, Delete, Manage Roles | - |
| **Analytics** | Read, Export | Read, Export |
| **Settings** | Read, Update | - |
| **Audit Logs** | Read | - |

## 🚀 Usage Examples

### **Creating a New Admin**
1. Super Admin logs in
2. Navigates to `/admin/users`
3. Clicks "Add Admin"
4. Fills out the form with role selection
5. New admin account created with proper permissions

### **Permission Checking in Components**
```typescript
const { canManageUsers, canDeleteContent, isSuperAdmin } = useAdmin();

// Show/hide UI elements based on permissions
{canManageUsers() && <UserManagementButton />}
{canDeleteContent('pages') && <DeleteButton />}
{isSuperAdmin && <SuperAdminFeatures />}
```

### **API Route Protection**
```typescript
// Check permissions in API routes
const isAdmin = await AdminService.isAdmin(userId);
if (!isAdmin) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}

const isSuperAdmin = await AdminService.isSuperAdmin(userId);
if (requiresSuperAdmin && !isSuperAdmin) {
  return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
}
```

## 🔧 Troubleshooting

### **Common Issues**

1. **"You do not have permission" error**
   - Check if user has admin role in `admin_roles` table
   - Verify RLS policies are correct
   - Check middleware configuration

2. **Super Admin features not showing**
   - Verify user has `super_admin` role
   - Check `useAdmin` hook is working
   - Refresh admin data

3. **Cannot create admin accounts**
   - Only Super Admins can create admin accounts
   - Check if current user is Super Admin
   - Verify form validation

4. **Audit logs not appearing**
   - Check if user has `audit_logs.read` permission
   - Verify `log_admin_action` function is working
   - Check database permissions

### **Debug Steps**
1. Check user role in Supabase Dashboard
2. Verify RLS policies are active
3. Test API functions in SQL Editor
4. Check browser console for errors
5. Verify environment variables

## 📈 Monitoring & Analytics

### **Admin Activity Tracking**
- All admin actions logged automatically
- IP address and user agent tracking
- Resource-specific action logging
- Timestamp and duration tracking

### **Security Monitoring**
- Failed login attempts
- Permission denied events
- Unauthorized access attempts
- Role escalation attempts

## 🎯 Best Practices

### **Role Assignment**
- Assign minimum required permissions
- Regular permission audits
- Principle of least privilege
- Regular role reviews

### **Security**
- Strong password requirements
- Regular security audits
- Monitor admin activity
- Backup admin accounts

### **User Management**
- Document admin responsibilities
- Regular training sessions
- Clear permission guidelines
- Incident response procedures

---

## 🚀 Next Steps

1. **Run the database setup script**
2. **Create your first Super Admin account**
3. **Test the admin signup flow**
4. **Configure additional permissions as needed**
5. **Train your admin team on the new system**

Your AETC 2026 platform now has enterprise-grade admin management with proper role-based access control! 🎉
