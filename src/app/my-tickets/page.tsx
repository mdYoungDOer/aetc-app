'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useUserTickets } from '@/hooks/useTickets';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCards from '@/components/dashboard/StatsCards';
import QuickActions from '@/components/dashboard/QuickActions';
import TicketCards from '@/components/dashboard/TicketCards';

interface UserTicket {
  id: string;
  order_id: string;
  ticket_name: string;
  ticket_type: string;
  quantity: number;
  total_amount: number;
  status: string;
  qr_code: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  attendee_info?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    form_completed_at: string;
    is_verified: boolean;
  } | null;
}

export default function MyTicketsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { tickets, loading, error, refreshTickets } = useUserTickets(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/user-login');
      return;
    }
  }, [user, authLoading, router]);

  const downloadQRCode = async (qrCodeData: string, ticketName: string) => {
    try {
      const link = document.createElement('a');
      link.href = qrCodeData;
      link.download = `aetc-2026-${ticketName.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const handleDownloadAll = () => {
    tickets.forEach((ticket) => {
      if (ticket.qr_code) {
        setTimeout(() => {
          downloadQRCode(ticket.qr_code, ticket.ticket_name);
        }, tickets.indexOf(ticket) * 500); // Stagger downloads
      }
    });
  };

  // Calculate statistics
  const totalTickets = tickets.length;
  const completedForms = tickets.filter(ticket => ticket.attendee_info).length;
  const pendingForms = totalTickets - completedForms;
  const conferenceDate = "March 2026";

  if (authLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <DashboardLayout
      title="My Tickets"
      subtitle="Here's an overview of your AETC 2026 conference passes and attendee information"
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress size={40} />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button
            variant="outlined"
            onClick={refreshTickets}
          >
            Try Again
          </Button>
        </Box>
      ) : (
        <Box>
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
                Good evening, {user?.email?.split('@')[0] || 'User'}!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                Here's an overview of your AETC 2026 conference passes and attendee information status.
              </Typography>
            </Box>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatsCards
              totalTickets={totalTickets}
              completedForms={completedForms}
              pendingForms={pendingForms}
              conferenceDate={conferenceDate}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <QuickActions
              tickets={tickets}
              onDownloadAll={handleDownloadAll}
            />
          </motion.div>

          {/* Ticket Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TicketCards
              tickets={tickets}
              onDownloadQR={downloadQRCode}
            />
          </motion.div>
        </Box>
      )}
    </DashboardLayout>
  );
}