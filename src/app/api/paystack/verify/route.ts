import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { paystackService } from '@/lib/paystack';
import { sendGridService } from '@/lib/sendgrid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { reference, orderId } = await request.json();

    if (!reference || !orderId) {
      return NextResponse.json({ error: 'Missing reference or orderId' }, { status: 400 });
    }

    // Verify payment with Paystack
    const verification = await paystackService.verifyPayment(reference);

    if (!verification.status) {
      return NextResponse.json({ 
        success: false, 
        error: 'Payment verification failed' 
      }, { status: 400 });
    }

    // Find the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('paystack_reference', reference)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ 
        success: false, 
        error: 'Order not found' 
      }, { status: 404 });
    }

    // Update order status if not already paid
    if (order.status !== 'paid') {
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          payment_data: verification.data,
        })
        .eq('id', order.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to update order' 
        }, { status: 500 });
      }
    }

    // Generate QR codes for tickets
    const ticketNumber = `AETC${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const qrData = JSON.stringify({
      ticketNumber,
      orderId: order.id,
      attendeeName: order.customer_name,
      attendeeEmail: order.customer_email,
    });

    // Create user tickets
    const userTickets = [];
    for (let i = 0; i < order.quantity; i++) {
      const { data: userTicket, error: ticketError } = await supabase
        .from('user_tickets')
        .insert([{
          order_id: order.id,
          user_id: order.user_id,
          ticket_id: order.ticket_id,
          qr_code: qrData,
          ticket_number: `${ticketNumber}-${i + 1}`,
          attendee_name: order.customer_name,
          attendee_email: order.customer_email,
        }])
        .select()
        .single();

      if (ticketError) {
        console.error('Error creating user ticket:', ticketError);
      } else {
        userTickets.push(userTicket);
      }
    }

    // Generate QR code image (you can use a QR code library here)
    const qrCodeImage = `data:image/svg+xml;base64,${Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <rect width="200" height="200" fill="white"/>
        <text x="100" y="100" text-anchor="middle" font-family="Arial" font-size="12">
          ${ticketNumber}
        </text>
      </svg>
    `).toString('base64')}`;

    // Check if user exists, if not, create account and send OTP
    let sendOtp = false;
    if (!order.user_id) {
      try {
        // Create user account
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: order.customer_email,
          password: Math.random().toString(36).slice(-8), // Random password
          email_confirm: false,
        });

        if (authData.user) {
          // Update order with user ID
          await supabase
            .from('orders')
            .update({ user_id: authData.user.id })
            .eq('id', order.id);

          // Update user tickets with user ID
          await supabase
            .from('user_tickets')
            .update({ user_id: authData.user.id })
            .eq('order_id', order.id);

          // Send OTP
          const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
          
          // Store OTP in database (you might want to create an otp table)
          await supabase
            .from('user_tickets')
            .update({ 
              qr_code: JSON.stringify({ ...JSON.parse(qrData), otp: otpCode })
            })
            .eq('order_id', order.id);

          // Send OTP email with professional template
          try {
            await sendGridService.sendOTP(
              order.customer_email,
              otpCode,
              order.customer_name
            );
          } catch (emailError) {
            console.error('Error sending OTP email:', emailError);
          }

          sendOtp = true;
        }
      } catch (error) {
        console.error('Error creating user account:', error);
      }
    }

    // Send purchase confirmation email
    try {
      await sendGridService.sendTicketConfirmation(
        order.customer_email,
        {
          orderId: order.id,
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          totalAmount: order.total_amount,
          quantity: order.quantity,
          ticketType: 'Conference Pass', // You might want to get this from ticket data
        },
        qrCodeImage
      );
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        total_amount: order.total_amount,
        quantity: order.quantity,
      },
      qrCode: qrCodeImage,
      sendOtp,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
