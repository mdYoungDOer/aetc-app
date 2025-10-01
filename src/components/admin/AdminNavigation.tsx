'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Pages,
  Description,
  ConfirmationNumber,
  People,
  Analytics,
  Settings,
  Menu as MenuIcon,
  Close as CloseIcon,
  Security,
  History,
  Person,
} from '@mui/icons-material';
import { useAdmin } from '@/hooks/useAdmin';

interface AdminNavigationProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminNavigation({ open, onClose }: AdminNavigationProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isSuperAdmin, canManageUsers, canViewAuditLogs, canManageSettings } = useAdmin();

  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: <Dashboard />,
      show: true,
    },
    {
      title: 'Pages',
      href: '/admin/pages',
      icon: <Pages />,
      show: true,
    },
    {
      title: 'Forms',
      href: '/admin/forms',
      icon: <Description />,
      show: true,
    },
    {
      title: 'Speakers',
      href: '/admin/speakers',
      icon: <Person />,
      show: true,
    },
    {
      title: 'Tickets',
      href: '/admin/tickets',
      icon: <ConfirmationNumber />,
      show: true,
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: <People />,
      show: canManageUsers(),
      badge: 'Super Admin',
    },
    {
      title: 'Analytics',
      href: '/admin/analytics',
      icon: <Analytics />,
      show: true,
    },
    {
      title: 'Audit Logs',
      href: '/admin/audit-logs',
      icon: <History />,
      show: canViewAuditLogs(),
      badge: 'Super Admin',
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: <Settings />,
      show: canManageSettings(),
      badge: 'Super Admin',
    },
  ];

  const handleItemClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#293972', fontWeight: 600 }}>
            AETC Admin
          </Typography>
          {isMobile && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {navigationItems.map((item) => {
            if (!item.show) return null;
            
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={handleItemClick}
                  selected={isActive(item.href)}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: '#293972',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#151443',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.badge ? (
                      <Tooltip title={item.badge} placement="right">
                        <Badge
                          badgeContent=""
                          color="error"
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              right: -8,
                              top: 8,
                            },
                          }}
                        >
                          {item.icon}
                        </Badge>
                      </Tooltip>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive(item.href) ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Role Information */}
        <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: '#293972' }}>
            Your Role
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isSuperAdmin ? 'Super Administrator' : 'Administrator'}
          </Typography>
          {isSuperAdmin && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              Full system access
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
