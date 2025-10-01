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

  console.log('🔍 Middleware check for:', req.nextUrl.pathname);
  console.log('📊 Session exists:', !!session);
  if (session) {
    console.log('👤 User:', session.user.email, 'ID:', session.user.id);
  }

  // Protect dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      console.log('🚫 Dashboard access denied - no session');
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Protect admin routes with role-based access
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      console.log('🚫 Admin access denied - no session');
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Check if user is admin
    try {
      console.log('🔐 Checking admin role for user:', session.user.id);
      const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });

      if (adminError) {
        console.error('❌ Admin check error:', adminError);
        return NextResponse.redirect(new URL('/auth/login?error=system_error', req.url));
      }

      console.log('✅ Admin check result:', isAdmin);

      if (!isAdmin) {
        console.log('🚫 Admin access denied - not an admin');
        return NextResponse.redirect(new URL('/auth/login?error=unauthorized', req.url));
      }

      // Check super admin access for specific routes
      if (req.nextUrl.pathname.includes('/admin/users') || 
          req.nextUrl.pathname.includes('/admin/audit-logs') ||
          req.nextUrl.pathname.includes('/admin/settings')) {
        
        console.log('🔐 Checking super admin role for user:', session.user.id);
        const { data: isSuperAdmin, error: superAdminError } = await supabase.rpc('is_super_admin', {
          user_id: session.user.id
        });

        if (superAdminError) {
          console.error('❌ Super admin check error:', superAdminError);
          return NextResponse.redirect(new URL('/auth/login?error=system_error', req.url));
        }

        console.log('✅ Super admin check result:', isSuperAdmin);

        if (!isSuperAdmin) {
          console.log('🚫 Super admin access denied');
          return NextResponse.redirect(new URL('/admin?error=insufficient_permissions', req.url));
        }
      }

      console.log('✅ Admin access granted');
    } catch (error) {
      console.error('❌ Middleware admin check error:', error);
      return NextResponse.redirect(new URL('/auth/login?error=system_error', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
