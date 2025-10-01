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
} from '@mui/material';
import { Plus, Edit, Download, TrendingUp } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const dynamic = 'force-dynamic';

interface Ticket {
  id: string;
  name: string;
  type: string;
  price: number;
  stock: number;
  available: number;
  description: string;
  features: string[];
  active: boolean;
}

export default function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, ticketsSold: 0 });
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'standard',
    price: 0,
    stock: 100,
    available: 100,
    description: '',
    features: '',
    active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load tickets
      const { data: ticketsData } = await supabase.from('tickets').select('*').order('price');
      setTickets(ticketsData || []);

      // Load stats
      const { data: ordersData } = await supabase.from('orders').select('*');
      const paidOrders = ordersData?.filter((o) => o.status === 'paid') || [];
      
      setStats({
        totalOrders: ordersData?.length || 0,
        totalRevenue: paidOrders.reduce((sum, o) => sum + Number(o.total_amount), 0),
        ticketsSold: paidOrders.reduce((sum, o) => sum + o.quantity, 0),
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (ticket?: Ticket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setFormData({
        name: ticket.name,
        type: ticket.type,
        price: ticket.price,
        stock: ticket.stock,
        available: ticket.available,
        description: ticket.description,
        features: Array.isArray(ticket.features) ? ticket.features.join('\n') : '',
        active: ticket.active,
      });
    } else {
      setEditingTicket(null);
      setFormData({
        name: '',
        type: 'standard',
        price: 0,
        stock: 100,
        available: 100,
        description: '',
        features: '',
        active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      const ticketData = {
        ...formData,
        features: formData.features.split('\n').filter((f) => f.trim()),
      };

      if (editingTicket) {
        await supabase.from('tickets').update(ticketData).eq('id', editingTicket.id);
      } else {
        await supabase.from('tickets').insert([ticketData]);
      }

      setOpenDialog(false);
      loadData();
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const exportOrders = async () => {
    try {
      const { data } = await supabase
        .from('orders')
        .select('*, tickets(*), user_tickets(*)')
        .eq('status', 'paid')
        .order('created_at', { ascending: false });

      if (!data) return;

      // Convert to CSV
      const headers = ['Order Ref', 'Customer Name', 'Email', 'Ticket Type', 'Quantity', 'Amount', 'Date'];
      const rows = data.map((order) => [
        order.paystack_reference,
        order.customer_name,
        order.customer_email,
        order.tickets?.name || '',
        order.quantity,
        `₵${order.total_amount}`,
        new Date(order.created_at).toLocaleDateString(),
      ]);

      const csv = [
        headers.join(','),
        ...rows.map((row) => row.join(',')),
      ].join('\n');

      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AETC-2026-Orders-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error('Error exporting orders:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Ticket Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Download size={20} />}
            onClick={exportOrders}
          >
            Export Orders
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: '#1f2a5a' },
            }}
          >
            New Ticket Type
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderLeft: '4px solid #FBA91E' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Total Revenue
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#FBA91E' }}>
              ₵{stats.totalRevenue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderLeft: '4px solid #78C044' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Tickets Sold
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#78C044' }}>
              {stats.ticketsSold}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderLeft: '4px solid #293972' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Total Orders
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#293972' }}>
              {stats.totalOrders}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tickets Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Available</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} hover>
                  <TableCell>{ticket.name}</TableCell>
                  <TableCell>
                    <code style={{ fontSize: '0.875rem' }}>{ticket.type}</code>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>₵{ticket.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.available}
                      size="small"
                      color={ticket.available > 10 ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{ticket.stock}</TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.active ? 'Active' : 'Inactive'}
                      size="small"
                      color={ticket.active ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(ticket)}
                      title="Edit"
                    >
                      <Edit size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Grid container spacing={2}>
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
                  label="Type"
                  fullWidth
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Price (₵)"
                  type="number"
                  fullWidth
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Stock"
                  type="number"
                  fullWidth
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Available"
                  type="number"
                  fullWidth
                  value={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: Number(e.target.value) })}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              label="Description"
              fullWidth
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={2}
            />

            <TextField
              label="Features (one per line)"
              fullWidth
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              multiline
              rows={4}
              helperText="Enter each feature on a new line"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              }
              label="Active (visible on registration page)"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: '#1f2a5a' },
            }}
          >
            {editingTicket ? 'Update' : 'Create'} Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

