import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { sendGridService } from '@/lib/sendgrid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);

    // Handle successful payment
    if (event.event === 'charge.success') {
      const { reference, customer, amount, metadata } = event.data;

      // Find the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('paystack_reference', reference)
        .single();

      if (orderError || !order) {
        console.error('Order not found:', reference);
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
          payment_data: event.data,
        })
        .eq('id', order.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
      }

      // Generate user tickets
      const ticketNumber = `AETC${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const qrData = JSON.stringify({
        ticketNumber,
        orderId: order.id,
        attendeeName: order.customer_name,
        attendeeEmail: order.customer_email,
      });

      for (let i = 0; i < order.quantity; i++) {
        await supabase.from('user_tickets').insert([
          {
            order_id: order.id,
            user_id: order.user_id,
            ticket_id: order.ticket_id,
            qr_code: qrData,
            ticket_number: `${ticketNumber}-${i + 1}`,
            attendee_name: order.customer_name,
            attendee_email: order.customer_email,
          },
        ]);
      }

      // Get ticket details
      const { data: ticket } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', order.ticket_id)
        .single();

      // Send confirmation email
      try {
        await sendGridService.sendTicketConfirmation(order.customer_email, {
          name: order.customer_name,
          ticketType: ticket?.name || 'Conference Ticket',
          ticketNumber,
          quantity: order.quantity,
          totalAmount: order.total_amount,
          orderRef: reference,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the webhook if email fails
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

