'use client';

import {
  Box,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { useTickets } from '@/hooks/useTickets';
import TicketCard from '@/components/TicketCard';
import { TicketGridSkeleton } from '@/components/ui/TicketCardSkeleton';
import CustomButton from '@/components/ui/CustomButton';
import Section from '@/components/ui/Section';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export default function RegistrationPage() {
  const { tickets, loading, error } = useTickets();

  const handleBuyTicket = (ticket: any) => {
    window.location.href = `/purchase/${ticket.id}`;
  };

  const isPopular = (type: string) => type === 'earlybird';

  return (
    <>
      <PageBreadcrumb 
        title="Registration & Tickets"
        subtitle="Secure your spot at Africa's premier energy technology conference"
        backgroundImage="/Images/AETC 2025 PICS 1-59 (1).JPG"
        breadcrumbItems={[
          { label: 'Registration', href: '/registration' }
        ]}
      />

      <main>
        {/* Ticket Selection */}
        <Section id="ticket-types" title="Choose Your Pass" subtitle="All prices in Ghana Cedis (₵)" py={10}>
          {loading ? (
            <Grid container spacing={4}>
              <TicketGridSkeleton count={4} />
            </Grid>
          ) : error ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
              <CustomButton
                variant="outlined"
                onClick={() => window.location.reload()}
              >
                Try Again
              </CustomButton>
            </Box>
          ) : tickets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
                Tickets Not Available Yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Registration will open soon. Check back for updates!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {tickets.map((ticket, index) => (
                <Grid item xs={12} md={6} lg={3} key={ticket.id}>
                  <TicketCard
                    ticket={ticket}
                    variant="registration"
                    onBuyClick={handleBuyTicket}
                    isPopular={isPopular(ticket.type)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Registration Benefits */}
          <Box sx={{ mt: 8, p: 4, backgroundColor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
              What's Included in Your Pass
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🎯 Full Conference Access
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access to all sessions, workshops, and networking events
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    🍽️ Catered Meals
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Breakfast, lunch, and refreshments throughout the conference
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    📱 Digital Materials
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Conference app, presentation slides, and networking directory
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Payment Information */}
          <Box sx={{ mt: 6, p: 4, backgroundColor: 'primary.light', borderRadius: 2, color: 'primary.contrastText' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              💳 Secure Payment Options
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We accept all major payment methods through our secure Paystack payment gateway:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {['💳 Credit/Debit Cards', '🏦 Bank Transfer', '📱 Mobile Money', '🌍 International Cards'].map((method, index) => (
                <Typography key={index} variant="body2" sx={{ fontWeight: 500 }}>
                  {method}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Contact Information */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Need Help with Registration?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Our support team is here to assist you with any questions about registration or payments.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <CustomButton
                variant="outlined"
                href="mailto:support@aetc.africa"
              >
                📧 Email Support
              </CustomButton>
              <CustomButton
                variant="outlined"
                href="tel:+233502519909"
              >
                📞 Call Support
              </CustomButton>
              <CustomButton
                variant="outlined"
                href="/contact"
              >
                💬 Contact Form
              </CustomButton>
            </Box>
          </Box>
        </Section>
      </main>
    </>
  );
}