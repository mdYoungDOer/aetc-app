import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendGridService } from '@/lib/sendgrid';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, name, sendOTP } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user exists (skip for now - Supabase will handle duplicates)

    // Sign up with Supabase (will send OTP via Supabase)
    const { data, error } = await supabase.auth.signUp({
      email,
      password: crypto.randomBytes(32).toString('hex'), // Random password, user will use OTP
      options: {
        data: {
          name,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // If requested, also send custom OTP via SendGrid
    if (sendOTP && data.user) {
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      try {
        await sendGridService.sendOTP(email, otpCode);
        
        // Optionally send welcome email
        if (name) {
          await sendGridService.sendWelcomeEmail(email, name);
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail signup if email fails
      }
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      message: 'Verification email sent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

