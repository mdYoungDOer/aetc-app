'use client';

import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import {
  Bell,
  LogOut,
  Menu,
  User,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ 
  children, 
  title = "Dashboard",
  subtitle = "Welcome back!"
}: DashboardLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserName = (email: string) => {
    return email?.split('@')[0] || 'User';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <DashboardSidebar />
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
            },
          }}
        >
          <DashboardSidebar onClose={() => setSidebarOpen(false)} />
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            backgroundColor: 'white',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <IconButton
                  edge="start"
                  onClick={handleSidebarToggle}
                  sx={{ mr: 2 }}
                >
                  <Menu size={24} color="#333" />
                </IconButton>
              )}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>
                  {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {subtitle}, {getUserName(user?.email || '')}!
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Notifications */}
              <IconButton sx={{ color: '#333' }}>
                <Badge badgeContent={0} color="error">
                  <Bell size={24} />
                </Badge>
              </IconButton>

              {/* Logout Button */}
              <Button
                variant="text"
                startIcon={<LogOut size={18} />}
                onClick={handleSignOut}
                sx={{ 
                  color: '#333',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
