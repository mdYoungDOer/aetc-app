'use client';

import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { FileText, FormInput, Users, Ticket } from 'lucide-react';

export const dynamic = 'force-dynamic';

const stats = [
  { label: 'Total Pages', value: '12', icon: FileText, color: '#293972' },
  { label: 'Forms', value: '5', icon: FormInput, color: '#FBA91E' },
  { label: 'Users', value: '148', icon: Users, color: '#78C044' },
  { label: 'Tickets Sold', value: '342', icon: Ticket, color: '#EB4824' },
];

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Quick Actions
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Navigate using the sidebar to manage pages, forms, tickets, and users.
        </Typography>
      </Box>
    </Box>
  );
}

