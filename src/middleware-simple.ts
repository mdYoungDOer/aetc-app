import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Protect admin routes with role-based access
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Check if user is admin using direct table query
    try {
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      if (rolesError) {
        console.error('Middleware roles check error:', rolesError);
        return NextResponse.redirect(new URL('/auth/login?error=system_error', req.url));
      }

      if (!userRoles || userRoles.length === 0) {
        return NextResponse.redirect(new URL('/auth/login?error=unauthorized', req.url));
      }

      const hasAdminRole = userRoles.some(role => ['admin', 'super_admin'].includes(role.role));
      
      if (!hasAdminRole) {
        return NextResponse.redirect(new URL('/auth/login?error=unauthorized', req.url));
      }

      // Check super admin access for specific routes
      if (req.nextUrl.pathname.includes('/admin/users') || 
          req.nextUrl.pathname.includes('/admin/audit-logs') ||
          req.nextUrl.pathname.includes('/admin/settings')) {
        
        const hasSuperAdminRole = userRoles.some(role => role.role === 'super_admin');
        
        if (!hasSuperAdminRole) {
          return NextResponse.redirect(new URL('/admin?error=insufficient_permissions', req.url));
        }
      }
    } catch (error) {
      console.error('Middleware admin check error:', error);
      return NextResponse.redirect(new URL('/auth/login?error=system_error', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
