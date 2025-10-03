'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, X, ChevronDown, Moon, Sun, Search, Ticket, User, LogIn } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import TopBar from './TopBar';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme as useNextTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@supabase/supabase-js';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'About AETC',
    path: '/about',
    children: [
      { label: 'About The Conference', path: '/about' },
      { label: 'Key Topics', path: '/about/key-topics' },
      { label: 'Why Attend AETC', path: '/about/why' },
      { label: 'AETC FAQs', path: '/about/faqs' },
    ],
  },
  {
    label: 'Programme',
    path: '/programme',
    children: [
      { label: 'Schedule', path: '/programme#schedule' },
      { label: 'Sessions', path: '/programme#sessions' },
      { label: '2025 Programme', path: 'https://dkgtromwsfhdpwjixoua.supabase.co/storage/v1/object/public/aetc-files/2025-programme.pdf' },
      { label: '2024 Programme', path: 'https://dkgtromwsfhdpwjixoua.supabase.co/storage/v1/object/public/aetc-files/AETC-Conference-Agenda.pdf' },
    ],
  },
  { label: 'Speakers', path: '/speakers' },
  {
    label: 'Get Involved',
    path: '#',
    children: [
      { label: 'Apply To Sponsor', path: '/sponsors' },
      { label: 'Apply To Exhibit', path: '/exhibit' },
      { label: 'Apply To Speak', path: '/speakers#call-for-speakers' },
      { label: 'Partner With Us', path: '/partnership' },
      { label: 'Apply for Press & Media Pass', path: '/media-pass' },
      { label: 'Calls For Abstracts', path: '/abstracts' },
    ],
  },
  {
    label: 'Travel',
    path: '#',
    children: [
      { label: 'Conference Venue', path: '/venue' },
      { label: 'VISA Support Letter Request', path: '/visa-support' },
      { label: 'Travel & Accommodation', path: '/travel' },
      { label: 'Accra, Ghana', path: '/accra' },
    ],
  },
  {
    label: 'Media',
    path: '#',
    children: [
      { label: 'Press Releases', path: '/news' },
      { label: '2025 Photo Gallery', path: '/gallery/2025' },
      { label: '2024 Photo Gallery', path: '/gallery/2024' },
    ],
  },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [anchorEls, setAnchorEls] = React.useState<{ [key: string]: HTMLElement | null }>({});
  const [mobileExpanded, setMobileExpanded] = React.useState<{ [key: string]: boolean }>({});
  const { theme, setTheme } = useNextTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hasIncompleteForms, setHasIncompleteForms] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for incomplete attendee forms
  useEffect(() => {
    const checkIncompleteForms = async () => {
      if (user) {
        try {
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );
          
          const { data: userTickets } = await supabase
            .from('user_tickets')
            .select(`
              id,
              attendees(id)
            `)
            .eq('user_id', user.id);
          
          const hasIncomplete = userTickets?.some(ticket => !ticket.attendees || ticket.attendees.length === 0);
          setHasIncompleteForms(hasIncomplete || false);
        } catch (error) {
          console.error('Error checking incomplete forms:', error);
        }
      }
    };

    checkIncompleteForms();
  }, [user]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, label: string) => {
    setAnchorEls({ ...anchorEls, [label]: event.currentTarget });
  };

  const handleMenuClose = (label: string) => {
    setAnchorEls({ ...anchorEls, [label]: null });
  };

  const handleMobileExpand = (label: string) => {
    setMobileExpanded({ ...mobileExpanded, [label]: !mobileExpanded[label] });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      if (path === pathname || path === '') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.location.href = href;
      }
    }
  };

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/AETC_Logo-main.png"
            alt="AET Conference Logo"
            width={60}
            height={60}
            priority
            style={{ 
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
            }}
          />
        </Link>
        <IconButton onClick={handleDrawerToggle}>
          <X size={24} />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <Box key={item.label}>
            <ListItem disablePadding>
              <ListItemButton
                component={item.children ? 'div' : Link}
                href={!item.children ? item.path : undefined}
                onClick={(e: any) => {
                  if (item.children) {
                    handleMobileExpand(item.label);
                  } else {
                    if (item.path.includes('#')) {
                      handleSmoothScroll(e, item.path);
                    }
                    setMobileOpen(false);
                  }
                }}
                selected={isActive(item.path)}
              >
                <ListItemText primary={item.label} />
                {item.children && <ChevronDown size={20} />}
              </ListItemButton>
            </ListItem>
            {item.children && (
              <Collapse in={mobileExpanded[item.label]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.label}
                      sx={{ pl: 4 }}
                      component={child.path.startsWith('http') ? 'a' : Link}
                      href={child.path}
                      target={child.path.startsWith('http') ? '_blank' : undefined}
                      rel={child.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={(e: any) => {
                        if (child.path.includes('#') && !child.path.startsWith('http')) {
                          handleSmoothScroll(e, child.path);
                        }
                        setMobileOpen(false);
                      }}
                    >
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
        
        {/* User Account Section */}
        {!authLoading && (
          <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button
              component={Link}
              href={user ? "/my-tickets" : "/auth/user-login"}
              variant={user ? "contained" : "outlined"}
              fullWidth
              startIcon={
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  {user ? <Ticket size={18} /> : <LogIn size={18} />}
                  {user && hasIncompleteForms && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: 6,
                        height: 6,
                        backgroundColor: '#FBA91E',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': { opacity: 1 },
                          '50%': { opacity: 0.5 },
                          '100%': { opacity: 1 },
                        },
                      }}
                    />
                  )}
                </Box>
              }
              sx={{
                backgroundColor: user ? 'primary.main' : 'transparent',
                color: user ? 'white' : 'primary.main',
                borderColor: 'primary.main',
                fontWeight: 600,
                py: 1.5,
                mb: 2,
                '&:hover': {
                  backgroundColor: user ? 'primary.dark' : 'primary.light',
                  color: 'white',
                  transform: 'translateY(-1px)',
                },
              }}
              onClick={() => setMobileOpen(false)}
            >
              {user ? (hasIncompleteForms ? "Complete Attendee Info" : "My Tickets") : "Login to Access Tickets"}
            </Button>
          </Box>
        )}
        
        {/* Mobile Buy Pass Button */}
        <Box sx={{ p: 2, mt: 2 }}>
          <Button
            component={Link}
            href="/registration"
            variant="contained"
            fullWidth
            startIcon={<Ticket size={18} />}
            sx={{
              backgroundColor: '#FBA91E',
              color: '#000000',
              fontWeight: 600,
              py: 2,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '16px',
              boxShadow: '0 2px 8px rgba(251, 169, 30, 0.3)',
              '&:hover': {
                backgroundColor: '#e59915',
                boxShadow: '0 4px 12px rgba(251, 169, 30, 0.4)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease',
            }}
            onClick={() => setMobileOpen(false)}
          >
            Buy Your 2026 Pass
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          top: 0, // Remove topbar offset since it's now included
        }}
      >
        {/* TopBar content integrated into sticky header */}
        <Box
          sx={{
            backgroundColor: '#293972',
            color: '#FFFFFF',
            py: 1.5,
            display: { xs: 'none', md: 'block' },
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Contact Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: '#FFFFFF'
                  }}>
                    +233 502 519 909
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: '#FFFFFF'
                  }}>
                    info@aetconference.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: '#FFFFFF'
                  }}>
                    Labadi Beach Hotel, Accra, Ghana
                  </Typography>
                </Box>
              </Box>

              {/* Social Media Links */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ 
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  mr: 1
                }}>
                  Follow Us:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main',
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </Box>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main',
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </Box>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main',
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </Box>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main',
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48"></polygon>
                    </svg>
                  </Box>
                  <Box sx={{ 
                    width: 20, 
                    height: 20, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'secondary.main',
                    }
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 0 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, mr: 4 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src="/AETC_Logo-main.png"
                alt="AET Conference Logo"
                width={156}
                height={90}
                priority
                style={{ 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                }}
              />
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Box 
                key={item.label}
                sx={{
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (item.children) {
                    handleMenuOpen(e, item.label);
                  }
                }}
                onMouseLeave={() => {
                  if (item.children) {
                    handleMenuClose(item.label);
                  }
                }}
              >
                {item.children ? (
                  <>
                    <Button
                      onClick={(e) => handleMenuOpen(e, item.label)}
                      sx={{ 
                        color: 'text.primary',
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(41, 57, 114, 0.2)',
                        },
                      }}
                      endIcon={<ChevronDown size={16} />}
                    >
                      {item.label}
                    </Button>
                    <Menu
                      anchorEl={anchorEls[item.label]}
                      open={Boolean(anchorEls[item.label])}
                      onClose={() => handleMenuClose(item.label)}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        onMouseLeave: () => handleMenuClose(item.label),
                      }}
                      sx={{
                        pointerEvents: 'auto',
                        '& .MuiPaper-root': {
                          mt: 1,
                          borderRadius: '12px',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          minWidth: 220,
                          overflow: 'hidden',
                        },
                      }}
                      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    >
                      {item.children.map((child, index) => (
                        <MenuItem
                          key={child.label}
                          component={child.path.startsWith('http') ? 'a' : Link}
                          href={child.path}
                          target={child.path.startsWith('http') ? '_blank' : undefined}
                          rel={child.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={(e: any) => {
                            if (child.path.includes('#') && !child.path.startsWith('http')) {
                              handleSmoothScroll(e, child.path);
                            }
                            handleMenuClose(item.label);
                          }}
                          sx={{
                            py: 1.5,
                            px: 2,
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: 'text.primary',
                            borderBottom: index < item.children!.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white',
                              transform: 'translateX(4px)',
                            },
                            '&:first-of-type': {
                              borderTopLeftRadius: '12px',
                              borderTopRightRadius: '12px',
                            },
                            '&:last-of-type': {
                              borderBottomLeftRadius: '12px',
                              borderBottomRightRadius: '12px',
                            },
                          }}
                        >
                          {child.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    href={item.path}
                    onClick={(e: any) => {
                      if (item.path.includes('#')) {
                        handleSmoothScroll(e, item.path);
                      }
                    }}
                    sx={{
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                      fontWeight: isActive(item.path) ? 600 : 500,
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(41, 57, 114, 0.2)',
                      },
                      '&::after': isActive(item.path)
                        ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '20%',
                            right: '20%',
                            height: '2px',
                            backgroundColor: 'primary.main',
                          }
                        : {},
                    }}
                  >
                    {item.label}
                  </Button>
                )}
              </Box>
            ))}
          </Box>

          {/* Search Button */}
          <IconButton onClick={() => setSearchOpen(true)} sx={{ mr: 1 }} title="Search">
            <Search size={20} />
          </IconButton>

          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} sx={{ mr: 1 }} title="Toggle theme">
            {mounted && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            )}
          </IconButton>

          {/* User Account/Ticket Access */}
          {!authLoading && (
            <Box sx={{ position: 'relative', mr: 1 }}>
              <IconButton 
                component={Link} 
                href={user ? "/my-tickets" : "/auth/user-login"}
                sx={{ 
                  backgroundColor: user ? 'primary.main' : 'transparent',
                  color: user ? 'white' : 'text.primary',
                  border: user ? 'none' : '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: user ? 'primary.dark' : 'action.hover',
                    color: user ? 'white' : 'primary.main',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }} 
                title={user ? (hasIncompleteForms ? "Complete Attendee Information" : "View My Tickets") : "Login to Access Tickets"}
              >
                {user ? <Ticket size={20} /> : <LogIn size={20} />}
              </IconButton>
              
              {/* Notification Badge */}
              {user && hasIncompleteForms && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 8,
                    height: 8,
                    backgroundColor: '#FBA91E',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                      '100%': { opacity: 1 },
                    },
                  }}
                />
              )}
            </Box>
          )}

          {/* Buy Pass Button */}
          <Button
            component={Link}
            href="/registration"
            variant="contained"
            startIcon={<Ticket size={18} />}
            sx={{
              backgroundColor: '#FBA91E',
              color: '#000000',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(251, 169, 30, 0.3)',
              '&:hover': {
                backgroundColor: '#e59915',
                boxShadow: '0 4px 12px rgba(251, 169, 30, 0.4)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.3s ease',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Buy Your 2026 Pass
          </Button>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon size={24} />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Global Search */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      </AppBar>
    </>
  );
}

