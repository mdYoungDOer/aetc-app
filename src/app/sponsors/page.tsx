import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import { ArrowRight, Award, Users, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';
import SponsorsCarousel from '@/components/SponsorsCarousel';

export const metadata: Metadata = {
  title: 'Sponsors & Partners | Africa Energy Technology Conference 2026',
  description: 'Meet our sponsors and partners supporting AETC 2026. Learn about sponsorship opportunities.',
};

const sponsorshipTiers = [
  {
    tier: 'Platinum',
    price: '₵150,000',
    color: '#293972',
    benefits: [
      'Premier exhibition booth (20sqm)',
      'Keynote speaking slot (20 mins)',
      '15 complimentary conference passes',
      'Logo on all marketing materials',
      'Exclusive VIP dinner table (10 seats)',
      'Brand placement in main hall',
      'Promotional insert in delegate bags',
      'Social media promotion',
      'Logo on conference website',
    ],
  },
  {
    tier: 'Gold',
    price: '₵100,000',
    color: '#FBA91E',
    benefits: [
      'Premium exhibition booth (15sqm)',
      'Workshop speaking opportunity (15 mins)',
      '10 complimentary conference passes',
      'Logo on conference materials',
      'VIP reception access (8 seats)',
      'Brand mention in opening ceremony',
      'Social media promotion',
      'Logo on conference website',
    ],
  },
  {
    tier: 'Silver',
    price: '₵50,000',
    color: '#78C044',
    benefits: [
      'Standard exhibition booth (10sqm)',
      '6 complimentary conference passes',
      'Logo on website and programme',
      'Conference bag insert',
      'Social media mention',
      'Networking events access',
    ],
  },
];

const sponsorshipBenefits = [
  {
    icon: Users,
    title: 'Brand Visibility',
    description: 'Reach 1000+ decision-makers, policymakers, and industry leaders across Africa.',
  },
  {
    icon: TrendingUp,
    title: 'Thought Leadership',
    description: 'Position your organization as a leader in Africa\'s energy technology sector.',
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description: 'Connect with potential clients, partners, and investors in a targeted environment.',
  },
  {
    icon: Award,
    title: 'Market Intelligence',
    description: 'Gain insights into market trends, policies, and opportunities in African energy.',
  },
];

export default function SponsorsPage() {
  return (
    <>
      <Hero
        title="Sponsors & Partners"
        subtitle="Supporting innovation and sustainable energy across Africa"
        height="40vh"
      />

      <main>
        {/* Current Sponsors */}
        <Section
          id="current-sponsors"
          title="Our Sponsors"
          subtitle="Thank you to our partners supporting AETC 2026"
          py={8}
        >
          <SponsorsCarousel />
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              backgroundColor: 'background.paper',
              borderRadius: '8px',
              mt: 6,
            }}
          >
            <Award size={64} color="#FBA91E" style={{ marginBottom: 16 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Become a Founding Sponsor
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Join us as a founding sponsor and gain premier visibility at Africa's leading energy
              technology conference.
            </Typography>
          </Box>
        </Section>

        {/* Why Sponsor */}
        <Section
          id="why-sponsor"
          title="Why Sponsor AETC 2026?"
          subtitle="Unlock exceptional opportunities for your organization"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {sponsorshipBenefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CustomCard accentColor="secondary" sx={{ height: '100%' }}>
                  <Box sx={{ p: 4, display: 'flex', gap: 3 }}>
                    <Box
                      sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      <benefit.icon size={32} color="#FBA91E" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {benefit.description}
                      </Typography>
                    </Box>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Sponsorship Packages */}
        <Section
          id="packages"
          title="Sponsorship Packages"
          subtitle="Choose the package that fits your marketing objectives"
          py={10}
        >
          <Grid container spacing={4}>
            {sponsorshipTiers.map((tier, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CustomCard
                  sx={{
                    height: '100%',
                    borderTop: `4px solid ${tier.color}`,
                  }}
                  hoverEffect={index === 1}
                >
                  <Box sx={{ p: 4 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: tier.color,
                      }}
                    >
                      {tier.tier}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: 'text.primary',
                      }}
                    >
                      {tier.price}
                    </Typography>
                    <Box component="ul" sx={{ pl: 0, listStyle: 'none', mb: 3 }}>
                      {tier.benefits.map((benefit, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            display: 'flex',
                            gap: 1.5,
                            mb: 1.5,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: tier.color,
                              mt: 1,
                              flexShrink: 0,
                            }}
                          />
                          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* CTA Section */}
        <Section backgroundColor="dark" py={10}>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
              Interested in Sponsoring?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255, 255, 255, 0.87)', mb: 4, lineHeight: 1.8 }}
            >
              Contact our partnerships team to discuss custom sponsorship packages tailored to your
              organization's goals, budget, and target audience.
            </Typography>
            <CustomButton
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#FBA91E',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#e59915',
                },
              }}
            >
              Contact Partnerships Team <ArrowRight size={20} style={{ marginLeft: 8 }} />
            </CustomButton>
          </Box>
        </Section>

        {/* Custom Packages */}
        <Section py={8}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Custom Sponsorship Opportunities
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
              Beyond our standard packages, we offer custom sponsorship opportunities including coffee
              breaks, networking events, conference bags, lanyards, and more.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Let's work together to create a sponsorship package that delivers maximum value for your
              investment.
            </Typography>
          </Box>
        </Section>
      </main>
    </>
  );
}
