'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Plus, Edit, Trash2, Download, TrendingUp, Eye } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Ticket {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  features: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
  paystack_reference: string;
}

export default function AdminTicketsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: 0,
    description: '',
    features: '',
    active: true,
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    loadTickets();
    loadOrders();
  }, [user, router]);

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setOrders(data || []);
    } catch (err: any) {
      console.error('Error loading orders:', err);
    }
  };

  const handleCreateTicket = () => {
    setEditingTicket(null);
    setFormData({
      name: '',
      type: '',
      price: 0,
      description: '',
      features: '',
      active: true,
    });
    setDialogOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setFormData({
      name: ticket.name,
      type: ticket.type,
      price: ticket.price,
      description: ticket.description,
      features: ticket.features.join('\n'),
      active: ticket.active,
    });
    setDialogOpen(true);
  };

  const handleSaveTicket = async () => {
    try {
      setError('');
      setSuccess('');

      const ticketData = {
        name: formData.name,
        type: formData.type,
        price: formData.price,
        description: formData.description,
        features: formData.features.split('\n').filter(f => f.trim()),
        active: formData.active,
      };

      if (editingTicket) {
        // Update existing ticket
        const { error } = await supabase
          .from('tickets')
          .update(ticketData)
          .eq('id', editingTicket.id);

        if (error) throw error;
        setSuccess('Ticket updated successfully');
      } else {
        // Create new ticket
        const { error } = await supabase
          .from('tickets')
          .insert([ticketData]);

        if (error) throw error;
        setSuccess('Ticket created successfully');
      }

      setDialogOpen(false);
      loadTickets();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('tickets')
        .delete()
        .eq('id', ticketId);

      if (error) throw error;
      setSuccess('Ticket deleted successfully');
      loadTickets();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleActive = async (ticket: Ticket) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ active: !ticket.active })
        .eq('id', ticket.id);

      if (error) throw error;
      setSuccess(`Ticket ${!ticket.active ? 'activated' : 'deactivated'} successfully`);
      loadTickets();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const exportOrders = () => {
    // Create CSV content
    const headers = ['ID', 'Customer Name', 'Email', 'Quantity', 'Total Amount', 'Status', 'Date', 'Reference'];
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.id,
        `"${order.customer_name}"`,
        order.customer_email,
        order.quantity,
        order.total_amount,
        order.status,
        new Date(order.created_at).toLocaleDateString(),
        order.paystack_reference
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Ticket Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={handleCreateTicket}
          sx={{
            backgroundColor: 'secondary.main',
            color: '#000',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }}
        >
          Add New Ticket
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Tickets Table */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                All Tickets
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {ticket.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {ticket.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={ticket.type} 
                            size="small" 
                            color={ticket.type === 'earlybird' ? 'secondary' : 'primary'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            ₵{ticket.price.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={ticket.active ? 'Active' : 'Inactive'} 
                            color={ticket.active ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleEditTicket(ticket)}
                              color="primary"
                            >
                              <Edit size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleToggleActive(ticket)}
                              color={ticket.active ? 'warning' : 'success'}
                            >
                              <Switch />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteTicket(ticket.id)}
                              color="error"
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Orders
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Download size={16} />}
                  onClick={exportOrders}
                >
                  Export
                </Button>
              </Box>
              
              <List>
                {orders.map((order) => (
                  <ListItem key={order.id} sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {order.customer_name}
                          </Typography>
                          <Chip 
                            label={order.status} 
                            size="small" 
                            color={order.status === 'completed' ? 'success' : 'warning'}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {order.customer_email}
                          </Typography>
                          <Typography variant="caption" display="block">
                            ₵{order.total_amount.toLocaleString()} • {order.quantity} ticket(s)
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(order.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Create/Edit Ticket Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ticket Name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ticket Type"
                fullWidth
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., earlybird, vip, student"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price (₵)"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Features (one per line)"
                fullWidth
                multiline
                rows={4}
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Access to all sessions&#10;Networking opportunities&#10;Conference materials"
                helperText="Enter each feature on a new line"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTicket}
            sx={{
              backgroundColor: 'secondary.main',
              color: '#000',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
            }}
          >
            {editingTicket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}