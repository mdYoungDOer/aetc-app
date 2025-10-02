import { Metadata } from 'next';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check, Users, Globe, TrendingUp, Lightbulb, Target } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';

export const metadata: Metadata = {
  title: 'Apply To Exhibit | AETC 2026',
  description: 'Showcase your products and services at AETC 2026. Apply to exhibit and connect with key decision makers in Africa\'s energy sector.',
};

export default function ExhibitPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Direct Access to Decision Makers',
      description: 'Connect face-to-face with industry leaders, government officials, and key decision makers from across Africa.'
    },
    {
      icon: Globe,
      title: 'Regional Market Exposure',
      description: 'Showcase your solutions to a pan-African audience of energy professionals, investors, and policymakers.'
    },
    {
      icon: TrendingUp,
      title: 'Business Development',
      description: 'Generate qualified leads, establish partnerships, and explore new business opportunities in emerging markets.'
    },
    {
      icon: Lightbulb,
      title: 'Technology Showcase',
      description: 'Demonstrate your latest innovations and technologies to a highly engaged audience of industry professionals.'
    }
  ];

  const packages = [
    {
      name: 'Standard Booth',
      price: '₵15,000',
      features: [
        '3m x 3m exhibition space',
        'Basic booth furniture',
        'Company listing in app',
        '2 conference passes',
        'Marketing materials table'
      ]
    },
    {
      name: 'Premium Booth',
      price: '₵25,000',
      features: [
        '6m x 3m exhibition space',
        'Premium booth furniture',
        'Enhanced app listing',
        '4 conference passes',
        'Presentation slot opportunity',
        'Networking event access'
      ]
    },
    {
      name: 'Platinum Booth',
      price: '₵40,000',
      features: [
        '9m x 3m exhibition space',
        'Custom booth design',
        'Featured app listing',
        '6 conference passes',
        'Keynote presentation slot',
        'VIP networking events',
        'Media coverage opportunity'
      ]
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="Apply To Exhibit"
        subtitle="Showcase your solutions at AETC 2026"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
      />

      <main>
        <Section id="exhibition-benefits" title="Why Exhibit at AETC 2026?" subtitle="Connect with Africa's energy leaders" py={10}>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
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
                        <benefit.icon size={32} color="#FBA91E" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {benefit.description}
                    </Typography>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="exhibition-packages" title="Exhibition Packages" subtitle="Choose the package that fits your needs" backgroundColor="paper" py={10}>
          <Grid container spacing={4}>
            {packages.map((pkg, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CustomCard 
                  sx={{ 
                    height: '100%',
                    ...(index === 1 && {
                      border: '2px solid',
                      borderColor: 'secondary.main',
                      transform: 'scale(1.05)',
                      zIndex: 2,
                    })
                  }}
                >
                  <Box sx={{ p: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
                      {pkg.name}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'secondary.main' }}>
                      {pkg.price}
                    </Typography>
                    <List>
                      {pkg.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check size={20} color="#78C044" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <CustomButton
                      variant={index === 1 ? 'contained' : 'outlined'}
                      fullWidth
                      sx={{ mt: 3 }}
                    >
                      Apply Now
                    </CustomButton>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="application-process" title="Application Process" subtitle="Simple steps to secure your exhibition space" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                How to Apply
              </Typography>
              <List>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 600
                    }}>
                      1
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Complete the application form"
                    secondary="Provide company information and exhibition requirements"
                  />
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 600
                    }}>
                      2
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Submit required documents"
                    secondary="Company profile, product information, and marketing materials"
                  />
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 600
                    }}>
                      3
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Review and approval"
                    secondary="Our team will review your application and confirm your space"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box sx={{ 
                      backgroundColor: 'primary.main', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: 32, 
                      height: 32, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 600
                    }}>
                      4
                    </Box>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Payment and confirmation"
                    secondary="Secure your space with payment and receive confirmation"
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCard sx={{ height: '100%' }}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Ready to Exhibit?
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                    Join us at AETC 2026 and showcase your solutions to Africa's energy leaders. 
                    Limited exhibition spaces available.
                  </Typography>
                  <CustomButton
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mb: 3 }}
                  >
                    Start Application
                  </CustomButton>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Questions? Contact our exhibition team at exhibits@aetconference.com
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>
      </main>
    </>
  );
}
