export interface Ticket {
  id: string;
  type: 'earlybird' | 'standard' | 'student' | 'vip';
  name: string;
  price: number;
  currency: string;
  stock: number;
  available: number;
  description: string;
  features: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id?: string;
  ticket_id: string;
  quantity: number;
  total_amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  paystack_reference: string;
  payment_data?: any;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  created_at: string;
  updated_at: string;
  paid_at?: string;
}

export interface UserTicket {
  id: string;
  order_id: string;
  user_id?: string;
  ticket_id: string;
  qr_code: string;
  ticket_number: string;
  attendee_name: string;
  attendee_email: string;
  checked_in: boolean;
  checked_in_at?: string;
  created_at: string;
}

