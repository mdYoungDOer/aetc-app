import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { paystackService } from '@/lib/paystack';
import { sendGridService } from '@/lib/sendgrid';
import { cleanEmailTemplates } from '@/lib/email-templates-clean';
import { QRCodeService } from '@/lib/qr-code';

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

    // Find the order with ticket information
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        tickets!inner(
          id,
          name,
          type,
          price
        )
      `)
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
    const baseQRData = {
      orderId: order.id,
      attendeeName: order.customer_name,
      attendeeEmail: order.customer_email,
      ticketType: order.tickets.name,
      purchaseDate: new Date().toISOString(),
      eventName: 'Africa Energy Technology Conference 2026',
      eventDate: 'March 2026',
      venue: 'Labadi Beach Hotel, Accra, Ghana'
    };

    // Generate QR codes for each ticket
    const qrCodes = await QRCodeService.generateMultipleQRCodes(baseQRData, order.quantity);

    // Create user tickets with individual QR codes
    const userTickets = [];
    for (let i = 0; i < order.quantity; i++) {
      const qrCodeData = qrCodes[i];
      
      const { data: userTicket, error: ticketError } = await supabase
        .from('user_tickets')
        .insert([{
          order_id: order.id,
          user_id: order.user_id,
          ticket_id: order.ticket_id,
          qr_code: qrCodeData.qrCode,
          ticket_number: qrCodeData.ticketNumber,
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


    // Check if user exists and if they've accessed their dashboard
    let shouldSendCredentials = false;
    let userPassword = '';
    
    if (!order.user_id) {
      // New user - create account and send credentials
      try {
        userPassword = `AETC${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 1000)}`;
        
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: order.customer_email,
          password: userPassword,
          email_confirm: true,
          user_metadata: {
            name: order.customer_name,
            phone: order.customer_phone,
            role: 'user'
          }
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

          shouldSendCredentials = true;
        }
      } catch (error) {
        console.error('Error creating user account:', error);
      }
    } else {
      // Existing user - check if they've accessed dashboard before
      try {
        const { data: userTickets, error: ticketsError } = await supabase
          .from('user_tickets')
          .select('dashboard_accessed')
          .eq('user_id', order.user_id)
          .limit(1);

        // If no dashboard access recorded, send credentials
        if (!ticketsError && (!userTickets || userTickets.length === 0 || !userTickets[0].dashboard_accessed)) {
          userPassword = `AETC${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 1000)}`;
          shouldSendCredentials = true;
        }
      } catch (error) {
        console.error('Error checking dashboard access:', error);
        // If we can't check, err on the side of sending credentials
        userPassword = `AETC${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 1000)}`;
        shouldSendCredentials = true;
      }
    }

    // Send credentials email only if needed
    if (shouldSendCredentials) {
      try {
        const credentialsEmailHtml = cleanEmailTemplates.accountCredentials({
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          password: userPassword,
          loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://aetc.africa'}/auth/user-login`
        });

        await sendGridService.sendEmail({
          to: order.customer_email,
          subject: 'Your AETC 2026 Account Credentials',
          html: credentialsEmailHtml
        });
      } catch (emailError) {
        console.error('Error sending credentials email:', emailError);
      }
    }

    // Send purchase confirmation email with clean template
    try {
      // Use the first QR code for the email (or generate a summary QR)
      const primaryQRCode = qrCodes.length > 0 ? qrCodes[0].qrCode : null;
      
      console.log('QR Code for email:', primaryQRCode ? 'Present' : 'Missing');
      console.log('QR Code length:', primaryQRCode ? primaryQRCode.length : 0);
      
      const ticketEmailHtml = cleanEmailTemplates.ticketPurchaseSuccess({
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        ticketName: order.tickets.name,
        quantity: order.quantity,
        totalAmount: order.total_amount,
        orderId: order.id,
        qrCode: primaryQRCode || undefined
      });

      await sendGridService.sendEmail({
        to: order.customer_email,
        subject: 'Your AETC 2026 Tickets Are Ready!',
        html: ticketEmailHtml
      });
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
      qrCode: qrCodes.length > 0 ? qrCodes[0].qrCode : null,
      tickets: userTickets,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
