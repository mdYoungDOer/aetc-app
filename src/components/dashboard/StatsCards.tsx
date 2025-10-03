'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  Ticket,
  CheckCircle,
  Clock,
  Calendar,
} from 'lucide-react';

interface StatsCardsProps {
  totalTickets: number;
  completedForms: number;
  pendingForms: number;
  conferenceDate: string;
}

export default function StatsCards({ 
  totalTickets, 
  completedForms, 
  pendingForms, 
  conferenceDate 
}: StatsCardsProps) {
  const stats = [
    {
      title: 'My Tickets',
      value: totalTickets.toString(),
      description: 'Conference passes you own',
      icon: Ticket,
      color: '#293972',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Forms Completed',
      value: completedForms.toString(),
      description: 'Attendee information submitted',
      icon: CheckCircle,
      color: '#4caf50',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Pending Forms',
      value: pendingForms.toString(),
      description: 'Forms awaiting completion',
      icon: Clock,
      color: '#ff9800',
      bgColor: '#fff3e0',
    },
    {
      title: 'Conference Date',
      value: conferenceDate,
      description: 'AETC 2026 starts',
      icon: Calendar,
      color: '#9c27b0',
      bgColor: '#f3e5f5',
    },
  ];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={stat.title}
            sx={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: '1rem' }}>
                    {stat.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '12px',
                    backgroundColor: stat.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent size={28} color={stat.color} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                {stat.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
