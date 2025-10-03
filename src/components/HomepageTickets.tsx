'use client';

import {
  Box,
  Grid,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTickets } from '@/hooks/useTickets';
import TicketCard from '@/components/TicketCard';
import { TicketGridSkeleton } from '@/components/ui/TicketCardSkeleton';
import CustomButton from '@/components/ui/CustomButton';
import Section from '@/components/ui/Section';

export default function HomepageTickets() {
  const { tickets, loading, error } = useTickets();

  const isPopular = (type: string) => type === 'earlybird';

  if (error) {
    return (
      <Section py={10}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <CustomButton
          variant="outlined"
          onClick={() => window.location.reload()}
        >
          Try Again
        </CustomButton>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section py={10}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Choose Your Conference Pass
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Select the perfect pass for your AETC 2026 experience. All prices include Ghana VAT and government levies.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <TicketGridSkeleton count={4} />
        </Grid>
      </Section>
    );
  }

  if (tickets.length === 0) {
    return (
      <Section py={10}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Tickets Coming Soon
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            Registration will open soon. Check back for updates!
          </Typography>
          <CustomButton
            variant="outlined"
            component={Link}
            href="/registration"
          >
            View Registration Page
          </CustomButton>
        </Box>
      </Section>
    );
  }

  return (
    <Section py={10}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          Choose Your Conference Pass
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          Select the perfect pass for your AETC 2026 experience. All prices include Ghana VAT and government levies.
        </Typography>
        
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FBA91E' }} />
            <Typography variant="body2" color="text.secondary">
              Early Bird (Best Value)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#293972' }} />
            <Typography variant="body2" color="text.secondary">
              VIP (Premium)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#78C044' }} />
            <Typography variant="body2" color="text.secondary">
              Student (Special Offer)
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {tickets.map((ticket, index) => (
          <Grid item xs={12} md={6} lg={3} key={ticket.id}>
            <TicketCard
              ticket={ticket}
              variant="home"
              isPopular={isPopular(ticket.type)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <CustomButton
          variant="contained"
          size="large"
          component={Link}
          href="/registration"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          View All Pass Options
        </CustomButton>
      </Box>
    </Section>
  );
}