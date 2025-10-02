import { Metadata } from 'next';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Alert } from '@mui/material';
import { Check, FileText, Clock, Globe, Users, Phone } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';

export const metadata: Metadata = {
  title: 'VISA Support Letter Request | AETC 2026',
  description: 'Request a VISA support letter for AETC 2026. Get assistance with your travel documentation to Ghana.',
};

export default function VisaSupportPage() {
  const requirements = [
    {
      icon: FileText,
      title: 'Conference Registration',
      description: 'Must be registered for AETC 2026 with confirmed attendance'
    },
    {
      icon: Users,
      title: 'Valid Passport',
      description: 'Passport must be valid for at least 6 months from travel date'
    },
    {
      icon: Clock,
      title: 'Travel Dates',
      description: 'Provide confirmed travel dates and accommodation details'
    },
    {
      icon: Globe,
      title: 'Purpose of Visit',
      description: 'Clear statement of conference attendance and business purpose'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Complete Registration',
      description: 'Register for AETC 2026 and receive your confirmation email'
    },
    {
      step: 2,
      title: 'Submit Request',
      description: 'Fill out the VISA support letter request form with all required information'
    },
    {
      step: 3,
      title: 'Document Review',
      description: 'Our team reviews your application and supporting documents (2-3 business days)'
    },
    {
      step: 4,
      title: 'Letter Issuance',
      description: 'Receive your official VISA support letter via email within 5 business days'
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="VISA Support Letter Request"
        subtitle="Get assistance with your travel documentation"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
        breadcrumbItems={[
          { label: 'Travel', href: '#' },
          { label: 'VISA Support', href: '/visa-support' }
        ]}
      />

      <main>
        <Section id="visa-overview" title="VISA Support for AETC 2026" subtitle="We're here to help with your travel documentation" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                About VISA Support Letters
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                AETC 2026 provides official VISA support letters to help facilitate your travel to Ghana. 
                These letters confirm your participation in the conference and can assist with your VISA application process.
              </Typography>
              
              <Alert severity="info" sx={{ mb: 4 }}>
                <Typography variant="body2">
                  <strong>Important:</strong> VISA support letters are provided as a courtesy service. 
                  Final VISA approval is at the discretion of the Ghana Immigration Service and your local embassy/consulate.
                </Typography>
              </Alert>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Requirements for VISA Support Letter
              </Typography>
              <Grid container spacing={3}>
                {requirements.map((req, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <CustomCard>
                      <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: 'primary.main',
                              borderRadius: '50%',
                              width: 48,
                              height: 48,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                            }}
                          >
                            <req.icon size={24} color="#FBA91E" />
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {req.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {req.description}
                        </Typography>
                      </Box>
                    </CustomCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomCard sx={{ height: 'fit-content' }}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Quick Request
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                    Ready to request your VISA support letter? 
                    Make sure you have all required documents ready.
                  </Typography>
                  <CustomButton
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mb: 3 }}
                  >
                    Request Support Letter
                  </CustomButton>
                  <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Questions? Contact us at visa@aetconference.com
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        <Section id="application-process" title="Application Process" subtitle="Simple steps to get your VISA support letter" backgroundColor="paper" py={10}>
          <Grid container spacing={4}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      fontWeight: 600,
                      fontSize: '1.5rem'
                    }}
                  >
                    {step.step}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="important-info" title="Important Information" subtitle="Please read before applying" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CustomCard>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                    Processing Times
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Clock size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Standard Processing: 5 business days"
                        secondary="For complete applications with all required documents"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Clock size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Express Processing: 2 business days"
                        secondary="Additional fee applies for expedited processing"
                      />
                    </ListItem>
                  </List>
                </Box>
              </CustomCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomCard>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                    Contact Information
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Phone size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="VISA Support Team"
                        secondary="+233 502 519 909"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <FileText size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email Support"
                        secondary="visa@aetconference.com"
                      />
                    </ListItem>
                  </List>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>
      </main>
    </>
  );
}
