import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  try {
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

    // Protect admin routes - simplified check
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
      
      // For now, allow any authenticated user to access admin
      // Role checking will be handled in the admin components
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // Allow the request to proceed if middleware fails
    return res;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};