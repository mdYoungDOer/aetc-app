import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, token, type } = await request.json();

    if (!email || !token) {
      return NextResponse.json({ error: 'Email and token are required' }, { status: 400 });
    }

    // Verify OTP using Supabase auth
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: type || 'email',
    });

    if (error) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

