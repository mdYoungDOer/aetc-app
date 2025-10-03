'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Ticket {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  features: string[];
  active: boolean;
  stock?: number;
  created_at?: string;
  updated_at?: string;
}

// Global cache for tickets
let ticketsCache: Ticket[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadTickets = useCallback(async (forceRefresh = false) => {
    // Check cache first
    const now = Date.now();
    if (!forceRefresh && ticketsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      setTickets(ticketsCache);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { data, error: supabaseError } = await supabase
        .from('tickets')
        .select('*')
        .eq('active', true)
        .order('price');

      if (supabaseError) throw supabaseError;

      const ticketsData = data || [];
      
      // Update cache
      ticketsCache = ticketsData;
      cacheTimestamp = now;
      
      setTickets(ticketsData);
    } catch (err: any) {
      console.error('Error loading tickets:', err);
      setError(err.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const refreshTickets = useCallback(() => {
    loadTickets(true);
  }, [loadTickets]);

  return {
    tickets,
    loading,
    error,
    refreshTickets,
  };
}

export function useUserTickets(userId?: string) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadUserTickets = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { data, error: supabaseError } = await supabase
        .from('user_tickets')
        .select(`
          id,
          qr_code,
          created_at,
          orders!inner(
            id,
            customer_name,
            customer_email,
            customer_phone,
            total_amount,
            status,
            created_at,
            tickets!inner(
              name,
              type
            )
          ),
          attendees(
            id,
            first_name,
            last_name,
            email,
            form_completed_at,
            is_verified
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      const formattedTickets = data?.map(ticket => ({
        id: ticket.id,
        order_id: (ticket.orders as any).id,
        ticket_name: (ticket.orders as any).tickets.name,
        ticket_type: (ticket.orders as any).tickets.type,
        quantity: (ticket.orders as any).quantity || 1,
        total_amount: (ticket.orders as any).total_amount,
        status: (ticket.orders as any).status,
        qr_code: ticket.qr_code,
        created_at: (ticket.orders as any).created_at,
        customer_name: (ticket.orders as any).customer_name,
        customer_email: (ticket.orders as any).customer_email,
        customer_phone: (ticket.orders as any).customer_phone,
        attendee_info: ticket.attendees?.[0] || null,
      })) || [];

      setTickets(formattedTickets);
    } catch (err: any) {
      console.error('Error loading user tickets:', err);
      setError(err.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadUserTickets();
  }, [loadUserTickets]);

  return {
    tickets,
    loading,
    error,
    refreshTickets: loadUserTickets,
  };
}
