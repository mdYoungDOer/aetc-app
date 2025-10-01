import { Metadata } from 'next';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Africa Energy Technology Conference 2026',
  description: 'Get in touch with the AETC 2026 team. Contact us for inquiries about registration, sponsorship, or general information.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'info@aetconference.com',
      secondary: 'For general inquiries',
    },
    {
      icon: Phone,
      title: 'Call Us',
      primary: '+233 XX XXX XXXX',
      secondary: 'Monday - Friday, 9AM - 5PM GMT',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: 'Accra, Ghana',
      secondary: 'Conference Secretariat',
    },
  ];

  const departments = [
    {
      title: 'Registration',
      email: 'registration@aetconference.com',
      description: 'Ticket purchases, group bookings, student discounts',
    },
    {
      title: 'Sponsorship',
      email: 'sponsors@aetconference.com',
      description: 'Partnership opportunities, exhibition space',
    },
    {
      title: 'Speakers',
      email: 'speakers@aetconference.com',
      description: 'Speaker submissions, session proposals',
    },
    {
      title: 'Media',
      email: 'media@aetconference.com',
      description: 'Press inquiries, media accreditation',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
            We're here to help - get in touch with our team
          </Typography>
        </Container>
      </Box>

      {/* Contact Methods */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {contactMethods.map((method, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        backgroundColor: 'primary.main',
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <method.icon size={32} color="#FBA91E" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {method.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'primary.main', fontWeight: 600, mb: 0.5 }}
                    >
                      {method.primary}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {method.secondary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Department Contacts */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Specialized Inquiries
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mb: 6 }}>
            Contact the right team for faster assistance
          </Typography>
          <Grid container spacing={3}>
            {departments.map((dept, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {dept.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 600,
                        mb: 1,
                        wordBreak: 'break-word',
                      }}
                    >
                      {dept.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {dept.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Business Hours */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Clock size={48} color="#FBA91E" style={{ marginBottom: 16 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Business Hours
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            Our team is available Monday through Friday, 9:00 AM to 5:00 PM GMT.
            <br />
            We aim to respond to all inquiries within 24-48 hours.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

