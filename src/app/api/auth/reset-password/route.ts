import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendGridService } from '@/lib/sendgrid';
import { cleanEmailTemplates } from '@/lib/email-templates-clean';

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

    // Generate a new password
    const newPassword = `AETC${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 1000)}`;

    // Try to reset password using Supabase auth
    const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://aetc.africa'}/auth/user-login`,
    });

    if (resetError) {
      console.error('Password reset error:', resetError);
      return NextResponse.json({ 
        error: 'Failed to reset password. Please check if the email address is correct.' 
      }, { status: 400 });
    }

    // Send password reset email with new credentials
    try {
      const resetEmailHtml = cleanEmailTemplates.passwordReset({
        customerName: 'Valued Customer',
        customerEmail: email,
        newPassword,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://aetc.africa'}/auth/user-login`
      });

      await sendGridService.sendEmail({
        to: email,
        subject: 'Your AETC 2026 Password Has Been Reset',
        html: resetEmailHtml
      });
    } catch (emailError) {
      console.error('Error sending reset email:', emailError);
      return NextResponse.json({ 
        error: 'Password reset successful but failed to send email' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Password reset instructions have been sent to your email'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
