'use client';

import { useState, useEffect } from 'react';
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
  Skeleton,
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
import { useUserTickets } from '@/hooks/useTickets';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';
import PageBreadcrumb from '@/components/PageBreadcrumb';

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <CheckCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      default:
        return <Ticket size={16} />;
    }
  };

  if (authLoading) {
    return (
      <Section py={10}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress size={40} />
        </Box>
      </Section>
    );
  }

  return (
    <>
      <PageBreadcrumb 
        title="My Tickets"
        subtitle="Manage your AETC 2026 conference passes"
        backgroundImage="/Images/AETC 2025 PICS 1-59 (1).JPG"
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'My Tickets', href: '/my-tickets' }
        ]}
      />

      <main>
        <Section py={10}>
          {loading ? (
            <Grid container spacing={4}>
              {[1, 2, 3].map((i) => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <CustomCard sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Box sx={{ ml: 2, flexGrow: 1 }}>
                        <Skeleton variant="text" width="60%" height={24} />
                        <Skeleton variant="text" width="40%" height={16} />
                      </Box>
                    </Box>
                    <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                  </CustomCard>
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
              <CustomButton
                variant="outlined"
                onClick={refreshTickets}
              >
                Try Again
              </CustomButton>
            </Box>
          ) : tickets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, backgroundColor: 'grey.200' }}>
                <Ticket size={40} color="#666" />
              </Avatar>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                No Tickets Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                You haven't purchased any tickets yet. Get your AETC 2026 pass now!
              </Typography>
              <CustomButton
                variant="contained"
                component={Link}
                href="/registration"
                size="large"
              >
                Buy Your Pass
              </CustomButton>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {tickets.map((ticket, index) => (
                <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CustomCard sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Header */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ backgroundColor: 'primary.main', mr: 2 }}>
                          <Ticket size={24} />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {ticket.ticket_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                            {ticket.ticket_type} Pass
                          </Typography>
                        </Box>
                        <Chip
                          label={ticket.status}
                          color={getStatusColor(ticket.status) as any}
                          size="small"
                          icon={getStatusIcon(ticket.status)}
                        />
                      </Box>

                      {/* QR Code */}
                      {ticket.qr_code && (
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                          <Box
                            component="img"
                            src={ticket.qr_code}
                            alt={`QR Code for ${ticket.ticket_name}`}
                            sx={{
                              width: 150,
                              height: 150,
                              border: '1px solid #e0e0e0',
                              borderRadius: 2,
                              mx: 'auto',
                              display: 'block'
                            }}
                          />
                        </Box>
                      )}

                      {/* Ticket Details */}
                      <Box sx={{ flexGrow: 1, mb: 3 }}>
                        <List dense>
                          <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Calendar size={16} color="#FBA91E" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Conference Date"
                              secondary="March 2026"
                              primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                              secondaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          
                          <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <MapPin size={16} color="#FBA91E" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Venue"
                              secondary="Labadi Beach Hotel, Accra"
                              primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                              secondaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                          
                          <ListItem sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <User size={16} color="#FBA91E" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Customer"
                              secondary={ticket.customer_name}
                              primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                              secondaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        </List>
                      </Box>

                      {/* Actions */}
                      <Box sx={{ mt: 'auto' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <CustomButton
                              variant="outlined"
                              size="small"
                              startIcon={<Download size={16} />}
                              onClick={() => downloadQRCode(ticket.qr_code, ticket.ticket_name)}
                              fullWidth
                            >
                              Download
                            </CustomButton>
                          </Grid>
                          <Grid item xs={6}>
                            <CustomButton
                              component={Link}
                              href={`/my-tickets/attendee-info/${ticket.id}`}
                              variant={ticket.attendee_info ? "outlined" : "contained"}
                              size="small"
                              startIcon={<User size={16} />}
                              fullWidth
                              sx={{
                                backgroundColor: ticket.attendee_info ? 'transparent' : 'primary.main',
                                color: ticket.attendee_info ? 'primary.main' : 'white',
                                borderColor: 'primary.main',
                                '&:hover': {
                                  backgroundColor: ticket.attendee_info ? 'primary.light' : 'primary.dark',
                                  color: 'white',
                                },
                              }}
                            >
                              {ticket.attendee_info ? 'Update Info' : 'Add Info'}
                            </CustomButton>
                          </Grid>
                        </Grid>
                        
                        {ticket.attendee_info && (
                          <Box sx={{ mt: 2, p: 2, backgroundColor: 'success.light', borderRadius: 1 }}>
                            <Typography variant="caption" color="success.dark" sx={{ fontWeight: 600 }}>
                              ✓ Attendee information completed
                            </Typography>
                            <Typography variant="caption" display="block" color="success.dark">
                              {ticket.attendee_info.first_name} {ticket.attendee_info.last_name}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CustomCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Section>
      </main>
    </>
  );
}