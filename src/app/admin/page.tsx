'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { FileText, FormInput, Users, Ticket } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import TicketSalesChart from '@/components/Analytics/TicketSalesChart';
import FormSubmissionsChart from '@/components/Analytics/FormSubmissionsChart';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPages: 0,
    totalForms: 0,
    totalUsers: 0,
    ticketsSold: 0,
  });
  const [ticketData, setTicketData] = useState<any[]>([]);
  const [formData, setFormData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    try {
      // Load stats
      const [pagesRes, formsRes, ordersRes] = await Promise.all([
        supabase.from('pages').select('id'),
        supabase.from('forms').select('id'),
        supabase.from('orders').select('*, tickets(name, type)').eq('status', 'paid'),
      ]);

      const ticketsSold = ordersRes.data?.reduce((sum, o) => sum + o.quantity, 0) || 0;

      setStats({
        totalPages: pagesRes.data?.length || 0,
        totalForms: formsRes.data?.length || 0,
        totalUsers: 0, // Would need auth.users access
        ticketsSold,
      });

      // Process ticket sales by type
      const salesByType: Record<string, { sales: number; revenue: number }> = {};
      ordersRes.data?.forEach((order) => {
        const typeName = order.tickets?.name || 'Unknown';
        if (!salesByType[typeName]) {
          salesByType[typeName] = { sales: 0, revenue: 0 };
        }
        salesByType[typeName].sales += order.quantity;
        salesByType[typeName].revenue += Number(order.total_amount);
      });

      setTicketData(
        Object.entries(salesByType).map(([name, data]) => ({
          name,
          sales: data.sales,
          revenue: data.revenue,
        }))
      );

      // Load form submissions over time
      const { data: submissions } = await supabase
        .from('form_submissions')
        .select('submitted_at')
        .order('submitted_at');

      // Group by date
      const submissionsByDate: Record<string, number> = {};
      submissions?.forEach((sub) => {
        const date = new Date(sub.submitted_at).toLocaleDateString();
        submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
      });

      setFormData(
        Object.entries(submissionsByDate).map(([date, count]) => ({
          date,
          submissions: count,
        }))
      );
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  const statsDisplay = [
    { label: 'Total Pages', value: stats.totalPages, icon: FileText, color: '#293972' },
    { label: 'Forms', value: stats.totalForms, icon: FormInput, color: '#FBA91E' },
    { label: 'Tickets Sold', value: stats.ticketsSold, icon: Ticket, color: '#78C044' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsDisplay.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderLeft: `4px solid ${stat.color}` }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <stat.icon size={28} color={stat.color} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Analytics Charts */}
      <Grid container spacing={3}>
        {ticketData.length > 0 && (
          <Grid item xs={12} md={6}>
            <TicketSalesChart data={ticketData} />
          </Grid>
        )}
        {formData.length > 0 && (
          <Grid item xs={12} md={6}>
            <FormSubmissionsChart data={formData} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

