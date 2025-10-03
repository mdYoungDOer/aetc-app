'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Avatar,
} from '@mui/material';
import {
  Ticket,
  QrCode,
  Download,
  User,
  CheckCircle,
  Clock,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TicketCardsProps {
  tickets: any[];
  onDownloadQR: (qrCode: string, ticketName: string) => void;
}

export default function TicketCards({ tickets, onDownloadQR }: TicketCardsProps) {
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

  if (tickets.length === 0) {
    return (
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
        <Button
          variant="contained"
          component={Link}
          href="/registration"
          size="large"
          sx={{
            backgroundColor: '#293972',
            '&:hover': { backgroundColor: '#1e2a5e' },
          }}
        >
          Buy Your Pass
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#333' }}>
        Your Conference Passes
      </Typography>
      <Grid container spacing={3}>
        {tickets.map((ticket, index) => (
          <Grid item xs={12} md={6} lg={4} key={ticket.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ backgroundColor: '#293972', mr: 2 }}>
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
                          width: 120,
                          height: 120,
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          mx: 'auto',
                          display: 'block',
                        }}
                      />
                    </Box>
                  )}

                  {/* Conference Info */}
                  <Box sx={{ flexGrow: 1, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Calendar size={16} color="#FBA91E" style={{ marginRight: 8 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        March 2026
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <User size={16} color="#FBA91E" style={{ marginRight: 8 }} />
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {ticket.customer_name}
                      </Typography>
                    </Box>
                    {ticket.attendee_info ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircle size={16} color="#4caf50" style={{ marginRight: 8 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#4caf50' }}>
                          Form completed
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Clock size={16} color="#ff9800" style={{ marginRight: 8 }} />
                        <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#ff9800' }}>
                          Form pending
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Download size={16} />}
                      onClick={() => onDownloadQR(ticket.qr_code, ticket.ticket_name)}
                      sx={{ flexGrow: 1, borderRadius: '8px' }}
                    >
                      Download
                    </Button>
                    <Button
                      component={Link}
                      href={`/my-tickets/attendee-info/${ticket.id}`}
                      variant={ticket.attendee_info ? "outlined" : "contained"}
                      size="small"
                      startIcon={<User size={16} />}
                      sx={{
                        flexGrow: 1,
                        borderRadius: '8px',
                        backgroundColor: ticket.attendee_info ? 'transparent' : '#293972',
                        color: ticket.attendee_info ? '#293972' : 'white',
                        borderColor: '#293972',
                        '&:hover': {
                          backgroundColor: ticket.attendee_info ? '#f8f9fa' : '#1e2a5e',
                          borderColor: '#293972',
                        },
                      }}
                    >
                      {ticket.attendee_info ? 'Update' : 'Add Info'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
