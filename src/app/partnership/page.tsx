import { Metadata } from 'next';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check, Users, Globe, TrendingUp, Lightbulb, Target, Handshake } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';

export const metadata: Metadata = {
  title: 'Partner With Us | AETC 2026',
  description: 'Become a strategic partner of AETC 2026 and help shape Africa\'s energy future. Explore partnership opportunities and benefits.',
};

export default function PartnershipPage() {
  const partnershipTypes = [
    {
      icon: Handshake,
      title: 'Strategic Partners',
      description: 'Long-term partnerships with organizations that share our vision for Africa\'s energy transformation.',
      benefits: [
        'Co-branding opportunities',
        'Speaking opportunities',
        'Exclusive networking events',
        'Content collaboration',
        'Market research insights'
      ]
    },
    {
      icon: Users,
      title: 'Media Partners',
      description: 'Collaborate with us to amplify the conference message and reach a wider audience.',
      benefits: [
        'Press release distribution',
        'Media coverage opportunities',
        'Interview opportunities',
        'Content sharing',
        'Social media promotion'
      ]
    },
    {
      icon: Globe,
      title: 'International Partners',
      description: 'Global organizations supporting Africa\'s energy development and technology transfer.',
      benefits: [
        'International exposure',
        'Cross-border networking',
        'Technology transfer opportunities',
        'Global best practices sharing',
        'International market access'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Technology Partners',
      description: 'Innovation leaders providing cutting-edge solutions for Africa\'s energy challenges.',
      benefits: [
        'Technology showcase opportunities',
        'Innovation awards',
        'Startup pitch sessions',
        'R&D collaboration',
        'Patent and IP support'
      ]
    }
  ];

  const partnershipLevels = [
    {
      name: 'Platinum Partner',
      investment: '₵100,000+',
      benefits: [
        'Keynote speaking opportunity',
        'Exclusive branding rights',
        'VIP networking events',
        'Media coverage',
        '20 conference passes',
        'Custom exhibition space'
      ]
    },
    {
      name: 'Gold Partner',
      investment: '₵75,000',
      benefits: [
        'Panel speaking opportunity',
        'Premium branding',
        'Networking events',
        'Press opportunities',
        '15 conference passes',
        'Standard exhibition space'
      ]
    },
    {
      name: 'Silver Partner',
      investment: '₵50,000',
      benefits: [
        'Breakout session opportunity',
        'Brand visibility',
        'Networking access',
        'Media mentions',
        '10 conference passes',
        'Shared exhibition space'
      ]
    },
    {
      name: 'Bronze Partner',
      investment: '₵25,000',
      benefits: [
        'Poster presentation',
        'Logo placement',
        'Basic networking',
        'Digital promotion',
        '5 conference passes',
        'Table display'
      ]
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="Partner With Us"
        subtitle="Join us in shaping Africa's energy future"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        breadcrumbItems={[
          { label: 'Get Involved', href: '#' },
          { label: 'Partner With Us', href: '/partnership' }
        ]}
      />

      <main>
        <Section id="partnership-overview" title="Why Partner With AETC?" subtitle="Be part of Africa's energy transformation" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                AETC 2026 is more than just a conference - it's a movement to accelerate Africa's energy transformation. 
                We bring together the continent's most influential energy leaders, innovators, and decision-makers 
                to drive sustainable energy solutions.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Partnership Benefits
              </Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Check size={20} color="#78C044" />
                  </ListItemIcon>
                  <ListItemText primary="Access to Africa's energy ecosystem" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Check size={20} color="#78C044" />
                  </ListItemIcon>
                  <ListItemText primary="Thought leadership opportunities" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Check size={20} color="#78C044" />
                  </ListItemIcon>
                  <ListItemText primary="Brand visibility and recognition" />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Check size={20} color="#78C044" />
                  </ListItemIcon>
                  <ListItemText primary="Networking with key stakeholders" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCard sx={{ height: '100%' }}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Ready to Partner?
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                    Join us in creating a sustainable energy future for Africa. 
                    Contact our partnerships team to discuss opportunities.
                  </Typography>
                  <CustomButton
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mb: 3 }}
                  >
                    Contact Partnerships Team
                  </CustomButton>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Email: partnerships@aetconference.com<br />
                    Phone: +233 502 519 909
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        <Section id="partnership-types" title="Partnership Categories" subtitle="Choose the partnership that aligns with your goals" backgroundColor="paper" py={10}>
          <Grid container spacing={4}>
            {partnershipTypes.map((type, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CustomCard sx={{ height: '100%' }}>
                  <Box sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          width: 64,
                          height: 64,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <type.icon size={32} color="#FBA91E" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {type.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                      {type.description}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Benefits Include:
                    </Typography>
                    <List dense>
                      {type.benefits.map((benefit, benefitIndex) => (
                        <ListItem key={benefitIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check size={20} color="#78C044" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="partnership-levels" title="Partnership Investment Levels" subtitle="Flexible options to suit your organization" py={10}>
          <Grid container spacing={4}>
            {partnershipLevels.map((level, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CustomCard 
                  sx={{ 
                    height: '100%',
                    ...(index === 0 && {
                      border: '2px solid',
                      borderColor: 'secondary.main',
                      transform: 'scale(1.05)',
                      zIndex: 2,
                    })
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                      {level.name}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'secondary.main' }}>
                      {level.investment}
                    </Typography>
                    <List dense>
                      {level.benefits.map((benefit, benefitIndex) => (
                        <ListItem key={benefitIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check size={20} color="#78C044" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={benefit}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <CustomButton
                      variant={index === 0 ? 'contained' : 'outlined'}
                      fullWidth
                      sx={{ mt: 3 }}
                    >
                      Learn More
                    </CustomButton>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>
      </main>
    </>
  );
}
