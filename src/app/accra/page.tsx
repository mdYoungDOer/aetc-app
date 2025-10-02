import { Metadata } from 'next';
import { Box, Grid, Typography, Chip, List, ListItem, ListItemIcon, ListItemText, Card, CardContent } from '@mui/material';
import { MapPin, Plane, Car, Utensils, Wifi, Shield, Users, Clock, Star, Phone, Mail, Heart, Globe, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import CustomButton from '@/components/ui/CustomButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata: Metadata = {
  title: 'Discover Accra, Ghana | Africa Energy Technology Conference 2026',
  description: 'Explore the vibrant city of Accra, Ghana - your gateway to West Africa. Discover rich culture, history, business opportunities, and world-class attractions.',
};

const attractions = [
  {
    name: 'Kwame Nkrumah Memorial Park',
    description: 'Honor Ghana\'s first president and learn about the country\'s independence struggle',
    image: '/Ghana/10_Things_to_do_in_Accra.jpg',
    type: 'Historical'
  },
  {
    name: 'Independence Square (Black Star Square)',
    description: 'One of the world\'s largest public squares, symbolizing Ghana\'s freedom',
    image: '/Ghana/Acca.jpg',
    type: 'Historical'
  },
  {
    name: 'Cape Coast Castle',
    description: 'UNESCO World Heritage site showcasing Ghana\'s colonial history',
    image: '/Ghana/cape-coast-castle-front-view.jpg',
    type: 'Historical'
  },
  {
    name: 'Adomi Bridge',
    description: 'Iconic bridge spanning the Volta River, a marvel of engineering',
    image: '/Ghana/1920px-Adomi-bridge_0418.png',
    type: 'Engineering'
  },
  {
    name: 'Lake Volta',
    description: 'World\'s largest man-made lake, offering scenic beauty and water activities',
    image: '/Ghana/LAKE-VOLTA-and-the-Construction-of-the-Akosombo-Dam-Ghana.jpg',
    type: 'Natural'
  },
  {
    name: 'Kotoka International Airport',
    description: 'Modern international gateway connecting Ghana to the world',
    image: '/Ghana/DGAA_T3_DEP_INT.jpg',
    type: 'Infrastructure'
  }
];

const culturalHighlights = [
  {
    icon: Heart,
    title: 'Warm Hospitality',
    description: 'Experience the legendary Ghanaian hospitality and friendliness'
  },
  {
    icon: Utensils,
    title: 'Culinary Delights',
    description: 'Savor authentic Ghanaian cuisine including jollof rice, banku, and fresh seafood'
  },
  {
    icon: Globe,
    title: 'Rich Heritage',
    description: 'Explore centuries of history, from ancient kingdoms to modern independence'
  },
  {
    icon: TrendingUp,
    title: 'Economic Hub',
    description: 'West Africa\'s fastest-growing economy with abundant business opportunities'
  }
];

const businessFacts = [
  { number: '33M+', label: 'Population' },
  { number: '6.2%', label: 'GDP Growth Rate' },
  { number: '50+', label: 'Languages Spoken' },
  { number: '1957', label: 'Independence Year' }
];

export default function AccraPage() {
  return (
    <>
      <PageBreadcrumb
        title="Discover Accra, Ghana"
        subtitle="Your Gateway to West Africa's Most Vibrant City"
        backgroundImage="/Ghana/Ghana_shutterstock_1709789110.jpg"
        breadcrumbItems={[
          { label: 'Travel', href: '#' },
          { label: 'Accra, Ghana', href: '/accra' }
        ]}
      />

      <main>
        {/* Welcome Section */}
        <Section id="welcome" py={10}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 1, mb: 2 }}
              >
                Welcome to Accra
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                The Heart of West Africa
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                Accra, Ghana's vibrant capital, is a city where ancient traditions meet modern innovation. 
                As the economic and cultural hub of West Africa, Accra offers international visitors an 
                unforgettable experience of rich history, warm hospitality, and boundless opportunities.
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                From the bustling markets of Makola to the serene beaches of Labadi, from the historic 
                Independence Square to the modern skyline of Airport City, Accra seamlessly blends 
                the old and new, creating a unique destination for business and leisure.
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
                <Chip icon={<Award size={16} />} label="West Africa's Business Hub" color="primary" />
                <Chip icon={<Heart size={16} />} label="Warm Hospitality" color="secondary" />
                <Chip icon={<Globe size={16} />} label="Rich Culture" color="success" />
                <Chip icon={<TrendingUp size={16} />} label="Growing Economy" color="info" />
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
                  src="/Ghana/Airport_City,_Greater_Accra_Street.jpg"
                  alt="Modern Accra skyline"
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

        {/* Cultural Highlights */}
        <Section id="culture" title="Cultural Highlights" subtitle="Experience the rich tapestry of Ghanaian culture" backgroundColor="paper" py={10}>
          <Grid container spacing={4}>
            {culturalHighlights.map((highlight, index) => (
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
                      mb: 3,
                    }}
                    aria-hidden="true"
                  >
                    <highlight.icon size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {highlight.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {highlight.description}
                  </Typography>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Key Facts */}
        <Section id="facts" title="Ghana by the Numbers" subtitle="Key facts about this remarkable nation" py={10}>
          <Grid container spacing={4}>
            {businessFacts.map((fact, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                    {fact.number}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {fact.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Top Attractions */}
        <Section id="attractions" title="Must-Visit Attractions" subtitle="Discover Accra's most iconic landmarks and experiences" py={10}>
          <Grid container spacing={4}>
            {attractions.map((attraction, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' }}>
                  <Box sx={{ position: 'relative', height: '250px' }}>
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                      quality={85}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {attraction.type}
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {attraction.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {attraction.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Business Opportunities */}
        <Section id="business" title="Business & Investment Opportunities" subtitle="Why Accra is West Africa's premier business destination" backgroundColor="paper" py={10}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                West Africa's Economic Powerhouse
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
                Ghana has emerged as one of Africa's most stable and prosperous nations, with Accra 
                serving as the region's premier business hub. The city offers unparalleled opportunities 
                for international investors and entrepreneurs.
              </Typography>
              
              <List>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <TrendingUp size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Fastest Growing Economy in West Africa"
                    secondary="Consistent 6%+ GDP growth with stable political environment"
                  />
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Globe size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Gateway to 350+ Million West Africans"
                    secondary="Strategic location for regional market expansion"
                  />
                </ListItem>
                <ListItem sx={{ px: 0, mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Award size={20} color="#FBA91E" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="English-Speaking Business Environment"
                    secondary="Ease of communication and legal framework"
                  />
                </ListItem>
              </List>
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
                  src="/Ghana/11188_11284_file-20190627-76697-1ttsnl7.jpg"
                  alt="Accra business district"
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

        {/* Getting Around */}
        <Section id="transportation" title="Getting Around Accra" subtitle="Convenient transportation options for international visitors" py={10}>
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
                    Kotoka International Airport
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Modern international airport with direct flights to major cities worldwide.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Just 15 minutes from Labadi Beach Hotel and the conference venue.
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
                    Reliable taxi services, ride-sharing apps (Uber, Bolt), and hotel shuttles.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Safe and affordable options for exploring the city.
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
                    Strategic Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                    Centrally located with easy access to major attractions and business districts.
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    Perfect base for exploring Ghana and neighboring countries.
                  </Typography>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        {/* Call to Action */}
        <Section backgroundColor="dark" py={10}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#FFFFFF' }}>
              Ready to Explore Accra?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255, 255, 255, 0.87)', lineHeight: 1.8, mb: 4 }}
            >
              Join us at AETC 2026 and discover why Accra is West Africa's most exciting destination. 
              Experience the perfect blend of business opportunities, cultural richness, and warm hospitality.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                Register for AETC 2026
              </CustomButton>
              <CustomButton
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'secondary.main',
                    color: '#000',
                  },
                }}
              >
                Plan Your Visit
              </CustomButton>
            </Box>
          </Box>
        </Section>
      </main>
    </>
  );
}
