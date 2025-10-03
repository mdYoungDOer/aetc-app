import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { paystackService } from '@/lib/paystack';
import { calculateTicketVAT } from '@/lib/vat-calculator';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticketId, quantity, customerName, customerEmail, customerPhone, userId } = body;

    // Validate input
    if (!ticketId || !quantity || !customerEmail || !customerName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get ticket details
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', ticketId)
      .eq('active', true)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json({ error: 'Ticket not found or not available' }, { status: 404 });
    }

    // No availability checks - tickets are unlimited

    // Calculate total with VAT
    const vatBreakdown = calculateTicketVAT(ticket.price);
    const totalAmount = vatBreakdown.totalPrice * quantity;

    // Generate Paystack reference
    const reference = paystackService.generateReference('AETC');

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId || null,
          ticket_id: ticketId,
          quantity,
          total_amount: totalAmount,
          currency: 'GHS',
          status: 'pending',
          paystack_reference: reference,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // No stock updates needed - tickets are unlimited

    return NextResponse.json({
      amount: paystackService.cedisToPesewas(totalAmount),
      reference,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Initialize ticket error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

