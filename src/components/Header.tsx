'use client';

import * as React from 'react';
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
import { Menu as MenuIcon, X, ChevronDown, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme as useNextTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'About the Conference',
    path: '/about',
    children: [
      { label: 'Overview', path: '/about#overview' },
      { label: 'Themes', path: '/about#themes' },
      { label: 'Objectives', path: '/about#objectives' },
    ],
  },
  {
    label: 'Programme',
    path: '/programme',
    children: [
      { label: 'Schedule', path: '/programme#schedule' },
      { label: 'Sessions', path: '/programme#sessions' },
    ],
  },
  { label: 'Speakers', path: '/speakers' },
  { label: 'Venue & Logistics', path: '/venue' },
  {
    label: 'Registration & Tickets',
    path: '/registration',
    children: [
      { label: 'Ticket Types', path: '/registration#ticket-types' },
      { label: 'Buy Tickets', path: '/registration#buy-tickets' },
    ],
  },
  { label: 'Sponsors & Partners', path: '/sponsors' },
  { label: 'News & Updates', path: '/news' },
  { label: 'Contact Us', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEls, setAnchorEls] = React.useState<{ [key: string]: HTMLElement | null }>({});
  const [mobileExpanded, setMobileExpanded] = React.useState<{ [key: string]: boolean }>({});
  const { theme, setTheme } = useNextTheme();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const pathname = usePathname();

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
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          AET Conference 2026
        </Typography>
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
                      component={Link}
                      href={child.path}
                      onClick={(e: any) => {
                        if (child.path.includes('#')) {
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
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, mr: 4 }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Image
                src="/AETC_Logo-main.png"
                alt="AET Conference Logo"
                width={50}
                height={50}
                priority
                style={{ objectFit: 'contain' }}
              />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  ml: 2,
                  fontWeight: 700,
                  color: 'primary.main',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                AET Conference 2026
              </Typography>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Box key={item.label}>
                {item.children ? (
                  <>
                    <Button
                      onClick={(e) => handleMenuOpen(e, item.label)}
                      sx={{ color: 'text.primary' }}
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
                      }}
                    >
                      {item.children.map((child) => (
                        <MenuItem
                          key={child.label}
                          component={Link}
                          href={child.path}
                          onClick={(e: any) => {
                            if (child.path.includes('#')) {
                              handleSmoothScroll(e, child.path);
                            }
                            handleMenuClose(item.label);
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
                      fontWeight: isActive(item.path) ? 600 : 400,
                      position: 'relative',
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

          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} sx={{ mr: { xs: 1, md: 0 } }}>
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
          </IconButton>

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
    </AppBar>
  );
}

