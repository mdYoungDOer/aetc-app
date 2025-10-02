import { Metadata } from 'next';
import { Box, Grid, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Plane, Hotel, Car, MapPin, Clock, Phone } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Travel & Accommodation | AETC 2026',
  description: 'Plan your trip to AETC 2026 in Accra, Ghana. Find information about flights, accommodation, and local transportation.',
};

export default function TravelPage() {
  const airlines = [
    { name: 'Ghana Airways', routes: 'Direct flights from major African cities' },
    { name: 'Ethiopian Airlines', routes: 'Connecting flights via Addis Ababa' },
    { name: 'Kenya Airways', routes: 'Connecting flights via Nairobi' },
    { name: 'Emirates', routes: 'Connecting flights via Dubai' },
    { name: 'Turkish Airlines', routes: 'Connecting flights via Istanbul' },
    { name: 'British Airways', routes: 'Connecting flights via London' }
  ];

  const hotels = [
    {
      name: 'Labadi Beach Hotel',
      category: 'Conference Venue',
      distance: '0 km',
      features: ['Conference facilities', 'Beach access', 'Multiple restaurants', 'Spa services'],
      contact: '+233 302 774 222'
    },
    {
      name: 'Kempinski Hotel Gold Coast City',
      category: '5-Star Luxury',
      distance: '5 km',
      features: ['Luxury accommodation', 'Business center', 'Fitness center', 'Multiple dining options'],
      contact: '+233 302 611 000'
    },
    {
      name: 'Movenpick Ambassador Hotel',
      category: '5-Star Business',
      distance: '8 km',
      features: ['Business facilities', 'Conference rooms', 'Swimming pool', 'Restaurant'],
      contact: '+233 302 741 000'
    },
    {
      name: 'Holiday Inn Accra Airport',
      category: '4-Star Airport',
      distance: '15 km',
      features: ['Airport proximity', 'Business center', 'Fitness center', 'Restaurant'],
      contact: '+233 302 741 000'
    }
  ];

  const transportation = [
    {
      icon: Car,
      title: 'Airport Transfer',
      description: 'Shuttle services available from Kotoka International Airport to conference hotels',
      details: 'Pre-booked transfers available through conference organizers'
    },
    {
      icon: Car,
      title: 'Taxi Services',
      description: 'Reliable taxi services throughout Accra with fixed rates',
      details: 'Uber and Bolt are also available in Accra'
    },
    {
      icon: Car,
      title: 'Car Rental',
      description: 'Self-drive options available from major car rental companies',
      details: 'International driving permit required for foreign visitors'
    },
    {
      icon: Car,
      title: 'Public Transport',
      description: 'Local buses and tro-tros (shared minibuses) for budget travel',
      details: 'Not recommended for first-time visitors due to complexity'
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="Travel & Accommodation"
        subtitle="Plan your journey to AETC 2026 in Accra, Ghana"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
      />

      <main>
        <Section id="getting-to-accra" title="Getting to Accra" subtitle="Your gateway to AETC 2026" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Flight Information
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                Accra is well-connected to major cities worldwide through Kotoka International Airport (ACC). 
                The airport is located approximately 10km from the city center and conference venue.
              </Typography>
              
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recommended Airlines
              </Typography>
              <Grid container spacing={2}>
                {airlines.map((airline, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <CustomCard>
                      <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {airline.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {airline.routes}
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
                    Airport Information
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <MapPin size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Kotoka International Airport (ACC)"
                        secondary="10km from city center"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Clock size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Travel Time"
                        secondary="30-45 minutes to conference venue"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Phone size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Airport Information"
                        secondary="+233 302 775 111"
                      />
                    </ListItem>
                  </List>
                </Box>
              </CustomCard>
            </Grid>
          </Grid>
        </Section>

        <Section id="accommodation" title="Recommended Accommodation" subtitle="Partner hotels with special rates" backgroundColor="paper" py={10}>
          <Grid container spacing={4}>
            {hotels.map((hotel, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CustomCard sx={{ height: '100%' }}>
                  <Box sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600, mb: 2 }}>
                      {hotel.category} • {hotel.distance} from venue
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                      {hotel.features.join(' • ')}
                    </Typography>
                    <List dense>
                      {hotel.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Hotel size={16} color="#78C044" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Contact: {hotel.contact}
                      </Typography>
                    </Box>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="local-transportation" title="Local Transportation" subtitle="Getting around Accra during the conference" py={10}>
          <Grid container spacing={4}>
            {transportation.map((option, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <CustomCard sx={{ height: '100%' }}>
                  <Box sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          backgroundColor: 'primary.main',
                          borderRadius: '50%',
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <option.icon size={24} color="#FBA91E" />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {option.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
                      {option.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      {option.details}
                    </Typography>
                  </Box>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section id="travel-tips" title="Travel Tips" subtitle="Make the most of your visit to Ghana" backgroundColor="paper" py={10}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CustomCard>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                    Before You Travel
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <MapPin size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Check VISA requirements"
                        secondary="Ensure you have the necessary travel documents"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Clock size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Book accommodation early"
                        secondary="Hotels fill up quickly during conference season"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Phone size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Get travel insurance"
                        secondary="Recommended for international travel"
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
                    During Your Stay
                  </Typography>
                  <List>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <MapPin size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Use official transport"
                        secondary="Stick to registered taxi services and hotel shuttles"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Clock size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Allow extra time"
                        secondary="Traffic in Accra can be unpredictable"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Phone size={20} color="#FBA91E" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Keep emergency contacts"
                        secondary="Save conference and hotel contact numbers"
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
