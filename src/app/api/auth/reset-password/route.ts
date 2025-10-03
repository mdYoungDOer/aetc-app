import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendGridService } from '@/lib/sendgrid';
import { cleanEmailTemplates } from '@/lib/email-templates-clean';
import crypto from 'crypto';

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

    // Check if user exists by listing users and filtering by email
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ 
        error: 'Failed to verify account. Please try again.' 
      }, { status: 500 });
    }

    const user = usersData.users.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json({ 
        error: 'No account found with this email address. Please check your email or contact support.' 
      }, { status: 404 });
    }

    // Generate a secure new password
    const newPassword = `AETC${crypto.randomInt(10000, 99999)}${crypto.randomInt(100, 999)}`;

    // Update user password directly using admin API
    const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Password update error:', updateError);
      return NextResponse.json({ 
        error: 'Failed to reset password. Please try again or contact support.' 
      }, { status: 500 });
    }

    // Send custom password reset email with new credentials
    try {
      const resetEmailHtml = cleanEmailTemplates.passwordReset({
        customerName: user.user_metadata?.full_name || 'Valued Customer',
        customerEmail: email,
        newPassword,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://aetc.africa'}/auth/user-login`,
        resetUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://aetc.africa'}/auth/reset-password?email=${encodeURIComponent(email)}`
      });

      await sendGridService.sendEmail({
        to: email,
        subject: 'Your AETC 2026 Password Has Been Reset',
        html: resetEmailHtml
      });

      return NextResponse.json({ 
        success: true,
        message: 'Your password has been reset and sent to your email address. Please check your inbox and use the new password to sign in.'
      });

    } catch (emailError) {
      console.error('Error sending reset email:', emailError);
      return NextResponse.json({ 
        error: 'Password was reset but failed to send email. Please contact support for assistance.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ 
      error: 'Internal server error. Please try again later.' 
    }, { status: 500 });
  }
}
