'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import { 
  QrCode, 
  Download, 
  Calendar, 
  MapPin, 
  Ticket, 
  CheckCircle,
  Clock,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@supabase/supabase-js';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  attendee_info?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    form_completed_at: string;
    is_verified: boolean;
  };
  customer_email: string;
  customer_phone: string;
}

export default function MyTicketsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUserTickets = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('user_tickets')
        .select(`
          *,
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
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedTickets = data?.map(ticket => ({
        id: ticket.id,
        order_id: ticket.orders.id,
        ticket_name: ticket.orders.tickets.name,
        ticket_type: ticket.orders.tickets.type,
        quantity: ticket.orders.quantity || 1,
        total_amount: ticket.orders.total_amount,
        status: ticket.orders.status,
        qr_code: ticket.qr_code,
        created_at: ticket.orders.created_at,
        customer_name: ticket.orders.customer_name,
        customer_email: ticket.orders.customer_email,
        customer_phone: ticket.orders.customer_phone,
      })) || [];

      setTickets(formattedTickets);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/user-login');
      return;
    }
    
    if (user) {
      loadUserTickets();
    }
  }, [user, authLoading, router, loadUserTickets]);

  const downloadTicket = (ticket: UserTicket) => {
    // Create a simple ticket PDF content
    const ticketContent = `
AETC 2026 TICKET
================

Ticket Holder: ${ticket.customer_name}
Email: ${ticket.customer_email}
Phone: ${ticket.customer_phone}

Ticket Type: ${ticket.ticket_name}
Quantity: ${ticket.quantity}
Total Paid: ₵${ticket.total_amount.toLocaleString()}

Order ID: ${ticket.order_id}
Purchase Date: ${new Date(ticket.created_at).toLocaleDateString()}

Status: ${ticket.status.toUpperCase()}

Please bring this ticket and a valid ID to the conference.
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aetc-2026-ticket-${ticket.order_id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <PageBreadcrumb
        title="My Tickets"
        subtitle="Manage your AETC 2026 conference tickets"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        breadcrumbItems={[
          { label: 'My Tickets', href: '/my-tickets' }
        ]}
      />

      <main>
        <Section py={10}>
          <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Welcome Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                Welcome back, {user.email}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Here are your AETC 2026 conference tickets and important information.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {tickets.length === 0 ? (
              <CustomCard sx={{ p: 4, textAlign: 'center' }}>
                <Ticket size={60} color="#FBA91E" style={{ marginBottom: 16 }} />
                <Typography variant="h6" gutterBottom>
                  No tickets found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  You haven't purchased any tickets yet. Browse our available ticket types and secure your spot at AETC 2026.
                </Typography>
                <CustomButton
                  variant="contained"
                  onClick={() => router.push('/registration')}
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                  }}
                >
                  Browse Tickets
                </CustomButton>
              </CustomCard>
            ) : (
              <Grid container spacing={3}>
                {/* Tickets List */}
                <Grid item xs={12} lg={8}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                    Your Tickets ({tickets.length})
                  </Typography>
                  
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CustomCard sx={{ mb: 3, p: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} md={8}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                <Ticket size={24} />
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {ticket.ticket_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Order #{ticket.order_id}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <List dense>
                              <ListItem sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <User size={16} color="#FBA91E" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={ticket.customer_name}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                              <ListItem sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <Mail size={16} color="#FBA91E" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={ticket.customer_email}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                              <ListItem sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <Calendar size={16} color="#FBA91E" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={`Purchased: ${new Date(ticket.created_at).toLocaleDateString()}`}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            </List>
                          </Grid>
                          
                          <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                              <Chip 
                                label={ticket.status.toUpperCase()} 
                                color={ticket.status === 'completed' ? 'success' : 'warning'}
                                sx={{ mb: 2 }}
                              />
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                ₵{ticket.total_amount.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {ticket.quantity} ticket(s)
                              </Typography>
                              
                              <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'row', md: 'column' } }}>
                                <CustomButton
                                  variant="outlined"
                                  size="small"
                                  startIcon={<Download size={16} />}
                                  onClick={() => downloadTicket(ticket)}
                                  fullWidth
                                >
                                  Download
                                </CustomButton>
                                {ticket.qr_code && (
                                  <CustomButton
                                    variant="contained"
                                    size="small"
                                    startIcon={<QrCode size={16} />}
                                    onClick={() => {
                                      // Create a new window with the QR code
                                      const qrWindow = window.open('', '_blank', 'width=400,height=400');
                                      if (qrWindow) {
                                        qrWindow.document.write(`
                                          <html>
                                            <head><title>QR Code - ${ticket.ticket_name}</title></head>
                                            <body style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
                                              <h2>AETC 2026 Ticket QR Code</h2>
                                              <img src="${ticket.qr_code}" alt="QR Code" style="max-width: 300px; height: auto;">
                                              <p><strong>Ticket:</strong> ${ticket.ticket_name}</p>
                                              <p><strong>Order:</strong> ${ticket.order_id}</p>
                                              <p><strong>Attendee:</strong> ${ticket.customer_name}</p>
                                            </body>
                                          </html>
                                        `);
                                      }
                                    }}
                                    fullWidth
                                    sx={{
                                      backgroundColor: 'primary.main',
                                      '&:hover': {
                                        backgroundColor: 'primary.dark',
                                      },
                                    }}
                                  >
                                    View QR
                                  </CustomButton>
                                )}
                                
                                {/* Attendee Information Button */}
                                <CustomButton
                                  component={Link}
                                  href={`/my-tickets/attendee-info/${ticket.id}`}
                                  variant={ticket.attendee_info ? "outlined" : "contained"}
                                  size="small"
                                  startIcon={<User size={16} />}
                                  fullWidth
                                  sx={{
                                    mt: 1,
                                    backgroundColor: ticket.attendee_info ? 'transparent' : 'primary.main',
                                    color: ticket.attendee_info ? 'primary.main' : 'white',
                                    borderColor: 'primary.main',
                                    '&:hover': {
                                      backgroundColor: ticket.attendee_info ? 'primary.light' : 'primary.dark',
                                      color: 'white',
                                    },
                                  }}
                                >
                                  {ticket.attendee_info ? 'Update Attendee Info' : 'Add Attendee Info'}
                                </CustomButton>
                                
                                {ticket.attendee_info && (
                                  <Box sx={{ mt: 1, p: 2, backgroundColor: 'success.light', borderRadius: 1 }}>
                                    <Typography variant="caption" color="success.dark" sx={{ fontWeight: 600 }}>
                                      ✓ Attendee information completed
                                    </Typography>
                                    <Typography variant="caption" display="block" color="success.dark">
                                      {ticket.attendee_info.first_name} {ticket.attendee_info.last_name}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </CustomCard>
                    </motion.div>
                  ))}
                </Grid>

                {/* Conference Info Sidebar */}
                <Grid item xs={12} lg={4}>
                  <CustomCard sx={{ p: 3, position: 'sticky', top: 20 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Conference Information
                    </Typography>
                    
                    <List>
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Calendar size={20} color="#FBA91E" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="March 2026"
                          secondary="Conference Dates"
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <MapPin size={20} color="#FBA91E" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Labadi Beach Hotel"
                          secondary="Accra, Ghana"
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle size={20} color="#78C044" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Registration Complete"
                          secondary="You're all set!"
                        />
                      </ListItem>
                    </List>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Need help? Contact our support team:
                    </Typography>
                    
                    <List dense>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Mail size={16} color="#FBA91E" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="support@aetconference.com"
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Phone size={16} color="#FBA91E" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="+233 502 519 909"
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    </List>
                  </CustomCard>
                </Grid>
              </Grid>
            )}
          </Box>
        </Section>
      </main>

    </>
  );
}
