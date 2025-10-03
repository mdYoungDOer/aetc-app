'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Heart,
  MessageCircle,
  Ticket,
  User,
  Settings,
  LogOut,
  Calendar,
  MapPin,
  Star,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardSidebarProps {
  onClose?: () => void;
}

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Overview',
      icon: Home,
      href: '/my-tickets',
      active: pathname === '/my-tickets',
    },
    {
      label: 'My Tickets',
      icon: Ticket,
      href: '/my-tickets',
      active: pathname === '/my-tickets',
    },
    {
      label: 'Conference Info',
      icon: Calendar,
      href: '/programme',
      active: pathname === '/programme',
    },
    {
      label: 'Venue Details',
      icon: MapPin,
      href: '/venue',
      active: pathname === '/venue',
    },
    {
      label: 'Speakers',
      icon: Star,
      href: '/speakers',
      active: pathname === '/speakers',
    },
    {
      label: 'Support',
      icon: MessageCircle,
      href: '/contact',
      active: pathname === '/contact',
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserInitials = (email: string) => {
    return email?.split('@')[0]?.substring(0, 2).toUpperCase() || 'U';
  };

  const getUserName = (email: string) => {
    return email?.split('@')[0] || 'User';
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', lg: 280 },
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        position: { xs: 'fixed', lg: 'relative' },
        top: 0,
        left: 0,
        zIndex: { xs: 1200, lg: 'auto' },
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#293972' }}>
            AETC 2026
          </Typography>
          {isMobile && (
            <IconButton onClick={onClose} size="small">
              <LogOut size={20} />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: '#293972',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {getUserInitials(user?.email || '')}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              {getUserName(user?.email || '')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Conference Attendee
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, py: 1 }}>
        <List dense>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.active;
            
            return (
              <ListItem key={item.label} sx={{ px: 2 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={onClose}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#f8f9fa' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    },
                    '&.Mui-selected': {
                      backgroundColor: '#f8f9fa',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <IconComponent 
                      size={20} 
                      color={isActive ? '#293972' : '#666'} 
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#293972' : '#333',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
        <List dense>
          <ListItem sx={{ px: 2 }}>
            <ListItemButton
              onClick={handleSignOut}
              sx={{
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#f8f9fa',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <LogOut size={20} color="#666" />
              </ListItemIcon>
              <ListItemText
                primary="Sign Out"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#333',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
