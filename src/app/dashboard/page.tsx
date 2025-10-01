'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Card, CardContent, Button, Chip, CircularProgress } from '@mui/material';
import { Ticket, User, Receipt, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@supabase/supabase-js';
import QRCode from 'react-qr-code';
import { jsPDF } from 'jspdf';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardPage() {
  const [value, setValue] = useState(0);
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadUserData = async () => {
    try {
      // Load tickets
      const { data: ticketsData } = await supabase
        .from('user_tickets')
        .select('*, orders(*, tickets(*))')
        .eq('user_id', user?.id);

      setUserTickets(ticketsData || []);

      // Load orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*, tickets(*)')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const downloadTicketPDF = (ticket: any) => {
    const doc = new jsPDF();
    
    // Add content
    doc.setFontSize(20);
    doc.text('Africa Energy Technology Conference 2026', 20, 20);
    
    doc.setFontSize(16);
    doc.text('Ticket', 20, 35);
    
    doc.setFontSize(12);
    doc.text(`Ticket Number: ${ticket.ticket_number}`, 20, 50);
    doc.text(`Name: ${ticket.attendee_name}`, 20, 60);
    doc.text(`Email: ${ticket.attendee_email}`, 20, 70);
    doc.text(`Type: ${ticket.orders?.tickets?.name}`, 20, 80);
    
    // Add QR code placeholder
    doc.text('Present QR code at venue', 20, 100);
    
    // Save
    doc.save(`AETC-2026-Ticket-${ticket.ticket_number}.pdf`);
  };

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Please log in to access your dashboard</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          My Dashboard
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="dashboard tabs"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
              },
            }}
          >
            <Tab icon={<Ticket size={20} />} label="My Tickets" iconPosition="start" />
            <Tab icon={<User size={20} />} label="Profile" iconPosition="start" />
            <Tab icon={<Receipt size={20} />} label="Orders" iconPosition="start" />
          </Tabs>
        </Box>

        {/* My Tickets Tab */}
        <TabPanel value={value} index={0}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : userTickets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Ticket size={64} color="#ccc" style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                No Tickets Yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Purchase a ticket to access the conference
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {userTickets.map((ticket) => (
                <Grid item xs={12} md={6} key={ticket.id}>
                  <Card
                    sx={{
                      border: '2px solid',
                      borderColor: 'secondary.main',
                      borderRadius: '8px',
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {ticket.orders?.tickets?.name || 'Conference Ticket'}
                        </Typography>
                        <Chip
                          label={ticket.checked_in ? 'Checked In' : 'Active'}
                          size="small"
                          color={ticket.checked_in ? 'success' : 'primary'}
                        />
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        <strong>Ticket #:</strong> {ticket.ticket_number}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                        <strong>Name:</strong> {ticket.attendee_name}
                      </Typography>

                      {/* QR Code */}
                      <Box
                        sx={{
                          backgroundColor: 'white',
                          p: 2,
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                        }}
                      >
                        <QRCode value={ticket.qr_code || ticket.ticket_number} size={150} />
                      </Box>

                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Download size={18} />}
                        onClick={() => downloadTicketPDF(ticket)}
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                        }}
                      >
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* Profile Tab */}
        <TabPanel value={value} index={1}>
          <Card sx={{ maxWidth: 600 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Profile Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {user?.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    User ID
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {user?.id}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel value={value} index={2}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : orders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Receipt size={64} color="#ccc" style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                No Orders Yet
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          Order Reference
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          {order.paystack_reference}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          Status
                        </Typography>
                        <Chip
                          label={order.status}
                          size="small"
                          color={
                            order.status === 'paid'
                              ? 'success'
                              : order.status === 'pending'
                              ? 'warning'
                              : 'error'
                          }
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          Ticket Type
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {order.tickets?.name || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          Total Amount
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          ₵{order.total_amount.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                          Date
                        </Typography>
                        <Typography variant="body2">
                          {new Date(order.created_at).toLocaleDateString('en-GH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </TabPanel>
      </Box>
    </Box>
  );
}

