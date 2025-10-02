import { Metadata } from 'next';
import { Box, Grid, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MapPin, Hotel, Plane, Car, Utensils, Wifi, Shield, Users, Clock, Star, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata: Metadata = {
  title: 'Venue & Logistics | Africa Energy Technology Conference 2026',
  description: 'Find information about the conference venue, accommodation, and travel arrangements.',
};

export default function VenuePage() {
  return (
    <>
      <PageBreadcrumb
        title="Labadi Beach Hotel"
        subtitle="Ghana's Premier Beachfront Conference Destination"
        backgroundImage="/Labadi/Labadi-Beach-Hotel-13.jpg"
        breadcrumbItems={[
          { label: 'Venue', href: '/venue' }
        ]}
      />

      <main>
        {/* Venue Overview */}
        <Section id="venue-overview" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1, mb: 2 }}
              >
                Conference Venue
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Image
                  src="/Labadi/lbhbiglogo-e1618274195690-copy.png"
                  alt="Labadi Beach Hotel Logo"
                  width={80}
                  height={60}
                  style={{ objectFit: 'contain' }}
                  priority
                />
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Labadi Beach Hotel
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
                <MapPin size={24} color="#FBA91E" style={{ flexShrink: 0, marginTop: 4 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Labadi Beach, Accra, Ghana<br />
                    <strong>Address:</strong> 1 La Badi Road, Accra, Ghana
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'flex-start' }}>
                <Phone size={24} color="#FBA91E" style={{ flexShrink: 0, marginTop: 4 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Contact
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    +233 302 774 222<br />
                    reservations@labadibeachhotel.com
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Nestled along the pristine shores of Labadi Beach, Labadi Beach Hotel offers a unique 
                conference experience combining business excellence with tropical paradise. This 4-star 
                beachfront resort provides state-of-the-art conference facilities with breathtaking ocean views.
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                The hotel's strategic location provides easy access to Accra's business district while 
                offering a serene beachfront setting perfect for networking and relaxation.
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip icon={<Star size={16} />} label="4-Star Resort" color="primary" />
                <Chip icon={<Users size={16} />} label="500+ Capacity" color="secondary" />
                <Chip icon={<Shield size={16} />} label="Secure Venue" color="success" />
                <Chip icon={<Wifi size={16} />} label="Free WiFi" color="info" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '500px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src="/Labadi/expedia_group-55963-94296f-669411.jpg"
                  alt="Labadi Beach Hotel exterior"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={90}
                  priority={false}
                />
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Conference Facilities */}
        <Section
          id="facilities"
          title="Conference Facilities"
          subtitle="State-of-the-art facilities for a world-class conference experience"
          backgroundColor="paper"
          py={10}
        >
          <Grid container spacing={4}>
            {[
              {
                icon: Users,
                title: 'Main Conference Hall',
                description: 'Spacious 500-seat auditorium with ocean views, perfect for keynote presentations and plenary sessions.',
                capacity: '500 attendees'
              },
              {
                icon: MapPin,
                title: 'Breakout Rooms',
                description: 'Multiple smaller meeting rooms for workshops, panel discussions, and networking sessions.',
                capacity: '50-100 each'
              },
              {
                icon: Wifi,
                title: 'High-Speed WiFi',
                description: 'Complimentary high-speed internet access throughout the venue with dedicated conference bandwidth.',
                capacity: 'Unlimited'
              },
              {
                icon: Utensils,
                title: 'Catering Services',
                description: 'Professional catering with local and international cuisine, including dietary accommodations.',
                capacity: 'All attendees'
              },
              {
                icon: Car,
                title: 'Secure Parking',
                description: 'Complimentary parking for conference attendees with 24/7 security monitoring.',
                capacity: '200+ vehicles'
              },
              {
                icon: Shield,
                title: 'Security Services',
                description: 'Professional security team ensuring a safe and secure environment for all attendees.',
                capacity: '24/7 coverage'
              },
            ].map((facility, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                      mb: 3,
                    }}
                    aria-hidden="true"
                  >
                    <facility.icon size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {facility.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    {facility.description}
                  </Typography>
                  <Chip 
                    label={facility.capacity} 
                    size="small" 
                    color="secondary" 
                    sx={{ fontWeight: 600 }}
                  />
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Hotel Accommodation */}
        <Section id="accommodation" title="Hotel Accommodation" subtitle="Stay at the conference venue for the ultimate convenience" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                Labadi Beach Hotel Rooms
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Experience luxury accommodation with stunning ocean views. All rooms feature modern amenities, 
                air conditioning, and complimentary WiFi. Choose from our range of room types designed for 
                comfort and convenience.
              </Typography>
              
              <List>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Deluxe Ocean View Rooms"
                    secondary="Spacious rooms with private balconies overlooking the Atlantic Ocean"
                  />
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Executive Suites"
                    secondary="Luxury suites with separate living areas and premium amenities"
                  />
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Standard Rooms"
                    secondary="Comfortable rooms with modern facilities and garden views"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 4 }}>
                <CustomButton
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: '#000',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                  }}
                >
                  Book Your Room
                </CustomButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '400px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src="/Labadi/LUXURY-ROOM-DOUBLE-BED-TWO-scaled.jpg"
                  alt="Labadi Beach Hotel luxury room"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={90}
                  priority={false}
                />
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Hotel Gallery */}
        <Section id="hotel-gallery" title="Hotel Gallery" subtitle="Experience the beauty and luxury of Labadi Beach Hotel" py={10}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/Labadi/292483655.jpg"
                  alt="Labadi Beach Hotel view"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/Labadi/labadi-beach-hotel-habitacion-125b013c.jpg"
                  alt="Labadi Beach Hotel room"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/Labadi/accra-labadi-beach-hotel-image-65.JPEG"
                  alt="Labadi Beach Hotel facilities"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/Labadi/e28c27d8.jpg"
                  alt="Labadi Beach Hotel beachfront"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/Labadi/LUXURY-ROOM-DOUBLE-BED-TWO-scaled.jpg"
                  alt="Labadi Beach Hotel luxury suite"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: '250px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Image
                  src="/Labadi/Labadi-Beach-Hotel-13.jpg"
                  alt="Labadi Beach Hotel conference facilities"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  quality={85}
                />
              </Box>
            </Grid>
          </Grid>
        </Section>

        {/* Travel & Logistics */}
        <Section id="travel" title="Getting to Labadi Beach Hotel" subtitle="Convenient access from anywhere in the world" backgroundColor="paper" py={10}>
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
                    From Airport
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    <strong>Kotoka International Airport (ACC)</strong> is just 15 minutes from Labadi Beach Hotel.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Airport shuttle service available. Taxi fare: approximately $15-20 USD.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Major airlines: Emirates, British Airways, Ethiopian Airlines, Kenya Airways.
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
                    <Car size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Local Transportation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Hotel shuttle service to/from conference sessions. Complimentary for hotel guests.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Taxi and ride-sharing services (Uber, Bolt) readily available.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Free parking available for conference attendees.
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
                    <MapPin size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Location Benefits
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Beachfront location with direct access to Labadi Beach for relaxation.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Close to Accra's business district and major attractions.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Multiple restaurants and entertainment options within walking distance.
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        {/* Special Offers & Contact */}
        <Section backgroundColor="dark" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
                Special Conference Rates
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.87)', lineHeight: 1.8, mb: 3 }}
              >
                Labadi Beach Hotel is offering exclusive rates for AETC 2026 attendees. 
                Book your stay at the conference venue and enjoy:
              </Typography>
              <List sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Complimentary breakfast for all conference attendees"
                    primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.87)' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Free airport shuttle service"
                    primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.87)' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Access to hotel spa and fitness center"
                    primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.87)' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Star size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Complimentary WiFi and business center access"
                    primaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.87)' }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#FFFFFF' }}>
                  Contact Labadi Beach Hotel
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Phone size={20} color="#FBA91E" />
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                      +233 302 774 222
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <Mail size={20} color="#FBA91E" />
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                      reservations@labadibeachhotel.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <MapPin size={20} color="#FBA91E" />
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
                      1 La Badi Road, Accra, Ghana
                    </Typography>
                  </Box>
                </Box>
                <CustomButton
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: '#000',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    },
                  }}
                >
                  Book Your Stay
                </CustomButton>
              </Box>
            </Grid>
          </Grid>
        </Section>
      </main>
    </>
  );
}
