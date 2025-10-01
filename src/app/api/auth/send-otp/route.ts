import { NextRequest, NextResponse } from 'next/server';
import { sendGridService } from '@/lib/sendgrid';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in user metadata or a separate table (simplified: using Supabase auth)
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      console.error('Error sending OTP:', error);
      return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }

    // Send custom OTP email via SendGrid
    try {
      await sendGridService.sendOTP(email, otp);
    } catch (emailError) {
      console.error('SendGrid error:', emailError);
      // Still return success since Supabase sent its own email
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

