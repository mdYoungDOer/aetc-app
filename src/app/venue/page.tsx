import { Metadata } from 'next';
import { Box, Grid, Typography } from '@mui/material';
import { MapPin, Hotel, Plane, Car, Utensils, Wifi } from 'lucide-react';
import Image from 'next/image';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';

export const metadata: Metadata = {
  title: 'Venue & Logistics | Africa Energy Technology Conference 2026',
  description: 'Find information about the conference venue, accommodation, and travel arrangements.',
};

export default function VenuePage() {
  return (
    <>
      <Hero
        title="Venue & Logistics"
        subtitle="Everything you need to know about getting to the conference"
        height="40vh"
      />

      <main>
        {/* Venue Section */}
        <Section id="venue" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1 }}
              >
                Conference Venue
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                Accra International Conference Centre
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
                <MapPin size={24} color="#FBA91E" style={{ flexShrink: 0, marginTop: 4 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Independence Avenue, Accra, Ghana
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Located in the heart of Ghana's capital, the Accra International Conference Centre features
                state-of-the-art facilities, multiple session rooms, and excellent networking spaces.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                The venue is easily accessible from major hotels and the airport, with ample parking and
                excellent public transport connections.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '450px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                }}
              >
                <Image
                  src="/images-optimized/aetc-2025-pics-1-67.webp"
                  alt="Conference venue"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                  priority={false}
                />
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Venue Facilities */}
        <Section
          id="facilities"
          title="Venue Facilities"
          subtitle="Everything you need for a productive conference experience"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {[
              {
                icon: Wifi,
                title: 'High-Speed WiFi',
                description: 'Complimentary high-speed internet access throughout the venue.',
              },
              {
                icon: Utensils,
                title: 'Catering Services',
                description: 'Daily lunch and refreshments with vegetarian and dietary options.',
              },
              {
                icon: MapPin,
                title: 'Multiple Halls',
                description: '5 session rooms plus main auditorium accommodating 1000+ attendees.',
              },
              {
                icon: Car,
                title: 'Parking Available',
                description: 'Secure parking facilities for conference attendees.',
              },
            ].map((facility, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <CustomCard accentColor="primary" sx={{ textAlign: 'center', p: 4, height: '100%' }}>
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
                      mb: 2,
                    }}
                    aria-hidden="true"
                  >
                    <facility.icon size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {facility.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {facility.description}
                  </Typography>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Travel & Logistics */}
        <Section id="travel" title="Travel & Accommodation" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <CustomCard accentColor="success" sx={{ height: '100%' }}>
                <Box sx={{ p: 4 }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                    aria-hidden="true"
                  >
                    <Plane size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Getting There
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    <strong>Kotoka International Airport (ACC)</strong> is just 20 minutes from the venue.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Major airlines operate regular flights to Accra from across Africa, Europe, and the
                    Middle East.
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomCard accentColor="secondary" sx={{ height: '100%' }}>
                <Box sx={{ p: 4 }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                    aria-hidden="true"
                  >
                    <Hotel size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Accommodation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    We've partnered with several hotels near the venue offering special rates for
                    conference attendees.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Booking details and discount codes will be shared upon registration.
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomCard accentColor="primary" sx={{ height: '100%' }}>
                <Box sx={{ p: 4 }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                    aria-hidden="true"
                  >
                    <Car size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Local Transportation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Shuttle services will be available from partner hotels to the conference venue.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Taxis and ride-sharing services (Uber, Bolt) are readily available throughout the city.
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        {/* Visa Information */}
        <Section backgroundColor="dark" py={8}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
              Visa Information
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255, 255, 255, 0.87)', lineHeight: 1.8, mb: 2 }}
            >
              International attendees may require a visa to enter Ghana. We recommend applying well in
              advance of the conference dates.
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.87)', lineHeight: 1.8 }}>
              An official invitation letter can be provided upon registration to support your visa
              application. Please contact us for assistance.
            </Typography>
          </Box>
        </Section>
      </main>
    </>
  );
}
