'use client';

import { memo } from 'react';
import {
  Box,
  Typography,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  Ticket, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Users,
  Zap,
  Crown,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { calculateTicketVAT, GhanaVATCalculator } from '@/lib/vat-calculator';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';

interface TicketCardProps {
  ticket: {
    id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    features: string[];
    active: boolean;
  };
  showBuyButton?: boolean;
  onBuyClick?: (ticket: any) => void;
  isPopular?: boolean;
  variant?: 'home' | 'registration';
}

const ticketIcons = {
  earlybird: <Zap size={24} color="#FBA91E" />,
  vip: <Crown size={24} color="#FBA91E" />,
  student: <GraduationCap size={24} color="#FBA91E" />,
  standard: <Ticket size={24} color="#FBA91E" />,
};

const ticketColors = {
  earlybird: {
    primary: '#FBA91E',
    secondary: '#e59915',
    background: 'linear-gradient(135deg, #FBA91E 0%, #e59915 100%)',
  },
  vip: {
    primary: '#293972',
    secondary: '#1e2a5e',
    background: 'linear-gradient(135deg, #293972 0%, #1e2a5e 100%)',
  },
  student: {
    primary: '#78C044',
    secondary: '#6ba83a',
    background: 'linear-gradient(135deg, #78C044 0%, #6ba83a 100%)',
  },
  standard: {
    primary: '#6c757d',
    secondary: '#5a6268',
    background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
  },
};

function TicketCard({ 
  ticket, 
  showBuyButton = true, 
  onBuyClick, 
  isPopular = false,
  variant = 'registration'
}: TicketCardProps) {
  const colors = ticketColors[ticket.type as keyof typeof ticketColors] || ticketColors.standard;
  const icon = ticketIcons[ticket.type as keyof typeof ticketIcons] || ticketIcons.standard;
  const vatBreakdown = calculateTicketVAT(ticket.price);
  const finalPrice = vatBreakdown.totalPrice;

  const getTicketBadge = (type: string) => {
    switch (type) {
      case 'earlybird':
        return 'BEST VALUE';
      case 'vip':
        return 'PREMIUM';
      case 'student':
        return 'SPECIAL OFFER';
      default:
        return null;
    }
  };

  const badge = getTicketBadge(ticket.type);

  const handleBuyClick = () => {
    if (onBuyClick) {
      onBuyClick(ticket);
    } else {
      window.location.href = `/purchase/${ticket.id}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CustomCard
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          ...(isPopular && {
            border: '2px solid',
            borderColor: 'secondary.main',
            transform: { md: 'scale(1.05)' },
            zIndex: 2,
          }),
        }}
        hoverEffect={!isPopular}
      >
        {/* Popular Badge */}
        {isPopular && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 3,
            }}
          >
            <Chip
              label="MOST POPULAR"
              size="small"
              sx={{
                backgroundColor: 'secondary.main',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </Box>
        )}

        {/* Type Badge */}
        {badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 3,
            }}
          >
            <Chip
              label={badge}
              size="small"
              sx={{
                backgroundColor: colors.primary,
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </Box>
        )}

        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: colors.background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              {icon}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                {ticket.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {ticket.type} Pass
              </Typography>
            </Box>
          </Box>

          {/* Price */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '1.4rem', md: '1.5rem' },
                color: colors.primary 
              }}
            >
              {GhanaVATCalculator.formatCurrency(finalPrice)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
              *Includes Ghana VAT & levies
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
            {ticket.description}
          </Typography>

          {/* Features */}
          <List dense sx={{ mb: 3, flexGrow: 1 }}>
            {ticket.features.map((feature, index) => (
              <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <CheckCircle size={16} color={colors.primary} />
                </ListItemIcon>
                <ListItemText 
                  primary={feature}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontSize: '0.9rem' }
                  }}
                />
              </ListItem>
            ))}
          </List>

          {/* Buy Button */}
          {showBuyButton && (
            <Box sx={{ mt: 'auto' }}>
              <CustomButton
                fullWidth
                variant="contained"
                size="large"
                onClick={handleBuyClick}
                endIcon={<ArrowRight size={20} />}
                sx={{
                  background: colors.background,
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  '&:hover': {
                    background: colors.secondary,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {variant === 'home' ? 'Buy Now' : 'Buy This Pass'}
              </CustomButton>
            </Box>
          )}
        </Box>
      </CustomCard>
    </motion.div>
  );
}

export default memo(TicketCard);
