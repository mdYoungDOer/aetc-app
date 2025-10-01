import { Metadata } from 'next';
import { Box, Container, Grid, Typography, TextField } from '@mui/material';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';

export const metadata: Metadata = {
  title: 'Contact Us | Africa Energy Technology Conference 2026',
  description: 'Get in touch with the AETC 2026 team. Contact us for inquiries about registration, sponsorship, or general information.',
};

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

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="We're here to help - get in touch with our team"
        height="40vh"
      />

      <main>
        {/* Contact Form and Methods */}
        <Section py={10}>
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Send Us a Message
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Fill out the form below and we'll get back to you within 24-48 hours.
              </Typography>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
                aria-label="Contact form"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={6}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
                <Box>
                  <CustomButton
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'primary.main',
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#1f2a5a',
                      },
                    }}
                  >
                    Send Message <Send size={18} style={{ marginLeft: 8 }} />
                  </CustomButton>
                </Box>
              </Box>
            </Grid>

            {/* Contact Methods */}
            <Grid item xs={12} md={5}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Get In Touch
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {contactMethods.map((method, index) => (
                  <CustomCard key={index} hoverEffect={false}>
                    <Box sx={{ p: 3, display: 'flex', gap: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        <method.icon size={24} color="#FBA91E" />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
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
                      </Box>
                    </Box>
                  </CustomCard>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Department Contacts */}
        <Section
          id="departments"
          title="Specialized Inquiries"
          subtitle="Contact the right team for faster assistance"
          backgroundColor="paper"
        >
          <Grid container spacing={3}>
            {departments.map((dept, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CustomCard accentColor="secondary">
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {dept.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="a"
                      href={`mailto:${dept.email}`}
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 600,
                        mb: 1,
                        display: 'block',
                        wordBreak: 'break-word',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {dept.email}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {dept.description}
                    </Typography>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Business Hours */}
        <Section py={8}>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Box
              sx={{
                display: 'inline-flex',
                backgroundColor: 'primary.main',
                borderRadius: '50%',
                p: 3,
                mb: 3,
              }}
              aria-hidden="true"
            >
              <Clock size={48} color="#FBA91E" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Business Hours
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 1 }}>
              Our team is available Monday through Friday, 9:00 AM to 5:00 PM GMT.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              We aim to respond to all inquiries within 24-48 hours during business days.
            </Typography>
          </Box>
        </Section>
      </main>
    </>
  );
}
