'use client';

import { Box, Typography, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TicketSalesChartProps {
  data: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}

export default function TicketSalesChart({ data }: TicketSalesChartProps) {
  return (
    <Paper sx={{ p: 3, borderRadius: '8px' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Ticket Sales by Type
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="sales" fill="#293972" name="Tickets Sold" radius={[8, 8, 0, 0]} />
          <Bar dataKey="revenue" fill="#FBA91E" name="Revenue (₵)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

