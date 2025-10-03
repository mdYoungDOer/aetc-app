'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Ticket,
  User,
  Download,
  Calendar,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface QuickActionsProps {
  tickets: any[];
  onDownloadAll?: () => void;
}

export default function QuickActions({ tickets, onDownloadAll }: QuickActionsProps) {
  const { user } = useAuth();

  const actions = [
    {
      title: 'View All Tickets',
      description: 'See all your conference passes',
      icon: Ticket,
      href: '/my-tickets',
      color: '#293972',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Complete Forms',
      description: 'Add attendee information',
      icon: User,
      href: tickets.length > 0 ? `/my-tickets/attendee-info/${tickets[0].id}` : '/my-tickets',
      color: '#4caf50',
      bgColor: '#e8f5e8',
    },
    {
      title: 'Download QR Codes',
      description: 'Get all your QR codes',
      icon: Download,
      onClick: onDownloadAll,
      color: '#ff9800',
      bgColor: '#fff3e0',
    },
    {
      title: 'Conference Schedule',
      description: 'View programme details',
      icon: Calendar,
      href: '/programme',
      color: '#9c27b0',
      bgColor: '#f3e5f5',
    },
    {
      title: 'Venue Information',
      description: 'Labadi Beach Hotel details',
      icon: MapPin,
      href: '/venue',
      color: '#f44336',
      bgColor: '#ffebee',
    },
    {
      title: 'Get Support',
      description: 'Contact our team',
      icon: MessageCircle,
      href: '/contact',
      color: '#2196f3',
      bgColor: '#e3f2fd',
    },
  ];

  const handleActionClick = (action: any) => {
    if (action.onClick) {
      action.onClick();
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#333' }}>
        Quick Actions
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Card
              key={action.title}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '10px',
                      backgroundColor: action.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent size={24} color={action.color} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                      {action.description}
                    </Typography>
                  </Box>
                </Box>
                {action.href ? (
                  <Button
                    component={Link}
                    href={action.href}
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{
                      backgroundColor: action.color,
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: action.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Open
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    onClick={() => handleActionClick(action)}
                    sx={{
                      backgroundColor: action.color,
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: action.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Execute
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
