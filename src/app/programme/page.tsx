import { Metadata } from 'next';
import { Box, Typography, Grid, Chip, Divider } from '@mui/material';
import { Clock, MapPin, Coffee, Users } from 'lucide-react';
import Hero from '@/components/ui/Hero';
import Section from '@/components/ui/Section';
import CustomCard from '@/components/ui/CustomCard';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SponsorsSection from '@/components/SponsorsSection';

export const metadata: Metadata = {
  title: 'Programme | Africa Energy Technology Conference 2026',
  description: 'View the full conference programme including schedule, sessions, and speaker line-up.',
};

const scheduleDay1 = [
  { time: '08:00 - 09:00', title: 'Registration & Networking Breakfast', venue: 'Lobby', type: 'networking' },
  { time: '09:00 - 10:00', title: 'Opening Ceremony & Welcome Address', venue: 'Main Hall', type: 'plenary' },
  { time: '10:00 - 10:30', title: 'Coffee Break', venue: 'Exhibition Area', type: 'break' },
  { time: '10:30 - 12:00', title: 'Plenary: The Future of Energy in Africa', venue: 'Main Hall', type: 'plenary' },
  { time: '12:00 - 13:00', title: 'Lunch Break', venue: 'Dining Hall', type: 'break' },
  { time: '13:00 - 14:30', title: 'Parallel Session A: Renewable Energy Technologies', venue: 'Hall A', type: 'session' },
  { time: '13:00 - 14:30', title: 'Parallel Session B: Energy Policy & Regulation', venue: 'Hall B', type: 'session' },
  { time: '14:30 - 15:00', title: 'Afternoon Tea', venue: 'Exhibition Area', type: 'break' },
  { time: '15:00 - 16:30', title: 'Panel Discussion: Investment in African Energy', venue: 'Main Hall', type: 'panel' },
  { time: '18:00 - 20:00', title: 'Welcome Reception', venue: 'Rooftop Terrace', type: 'networking' },
];

const tracks = [
  {
    name: 'Technical Track',
    color: '#293972',
    sessions: [
      'Solar PV Systems for African Markets',
      'Wind Energy: Opportunities and Challenges',
      'Mini-Grid Solutions for Rural Electrification',
      'Energy Storage Technologies',
    ],
  },
  {
    name: 'Policy Track',
    color: '#FBA91E',
    sessions: [
      'Regulatory Frameworks for Renewable Energy',
      'Public-Private Partnerships in Energy',
      'Regional Energy Integration',
      'Climate Policy and Energy Transition',
    ],
  },
  {
    name: 'Business Track',
    color: '#78C044',
    sessions: [
      'Financing Energy Projects in Africa',
      'Risk Management in Energy Investments',
      'Business Models for Off-Grid Solutions',
      'Market Opportunities in Clean Energy',
    ],
  },
  {
    name: 'Social Impact Track',
    color: '#EB4824',
    sessions: [
      'Energy Access and Gender Equity',
      'Community-Led Energy Solutions',
      'Productive Use of Energy',
      'Youth in the Energy Sector',
    ],
  },
];

export default function ProgrammePage() {
  return (
    <>
      <PageBreadcrumb 
        title="Conference Programme"
        subtitle="Explore our comprehensive schedule and sessions"
        backgroundImage="/Images/AETC 2025 PICS 1-69.JPG"
      />

      <main>
        {/* Programme Overview */}
        <Section id="overview" py={8}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 6 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
              AETC 2026 features a dynamic three-day programme with plenary sessions, technical workshops,
              panel discussions, and networking opportunities. Join us for engaging conversations on the
              future of energy in Africa.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip label="Day 1: September 15" sx={{ fontWeight: 600 }} />
              <Chip label="Day 2: September 16" sx={{ fontWeight: 600 }} />
              <Chip label="Day 3: September 17" sx={{ fontWeight: 600 }} />
            </Box>
          </Box>
        </Section>

        {/* Sample Schedule - Day 1 */}
        <Section id="schedule" title="Day 1 Schedule" subtitle="Opening & Keynotes" backgroundColor="paper">
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            {scheduleDay1.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 3,
                    py: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 160,
                    }}
                  >
                    <Clock size={18} color="#293972" />
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'primary.main' }}
                    >
                      {item.time}
                    </Typography>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      {item.type && (
                        <Chip
                          label={item.type}
                          size="small"
                          sx={{
                            backgroundColor:
                              item.type === 'plenary'
                                ? '#293972'
                                : item.type === 'break'
                                ? '#78C044'
                                : item.type === 'panel'
                                ? '#FBA91E'
                                : '#EB4824',
                            color: '#FFFFFF',
                            textTransform: 'capitalize',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MapPin size={16} color="#666" />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.venue}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {index < scheduleDay1.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Section>

        {/* Session Tracks */}
        <Section
          id="sessions"
          title="Session Tracks"
          subtitle="Choose from four specialized tracks throughout the conference"
        >
          <Grid container spacing={4}>
            {tracks.map((track, index) => (
              <Grid item xs={12} md={6} key={index}>
                <CustomCard
                  sx={{
                    height: '100%',
                    borderLeft: `4px solid ${track.color}`,
                  }}
                  hoverEffect={false}
                >
                  <Box sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        color: track.color,
                      }}
                    >
                      {track.name}
                    </Typography>
                    <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                      {track.sessions.map((session, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            display: 'flex',
                            gap: 1,
                            mb: 1.5,
                            alignItems: 'flex-start',
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: track.color,
                              mt: 1,
                              flexShrink: 0,
                            }}
                          />
                          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                            {session}
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

        {/* Networking Events */}
        <Section
          id="networking"
          title="Networking Opportunities"
          subtitle="Connect with industry peers and leaders"
          backgroundColor="paper"
        >
          <Grid container spacing={4}>
            {[
              {
                icon: Coffee,
                title: 'Coffee Breaks',
                description: 'Daily networking breaks with refreshments in the exhibition area.',
              },
              {
                icon: Users,
                title: 'Welcome Reception',
                description: 'Opening night cocktail reception for all attendees and sponsors.',
              },
              {
                icon: Users,
                title: 'VIP Dinner',
                description: 'Exclusive dinner for VIP ticket holders with keynote speakers.',
              },
            ].map((event, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CustomCard accentColor="secondary" sx={{ textAlign: 'center', p: 4 }}>
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
                    <event.icon size={32} color="#FBA91E" />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {event.description}
                  </Typography>
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* Download Programme */}
        <Section backgroundColor="dark" py={6}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#FFFFFF' }}>
              Full Programme Coming Soon
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.87)' }}>
              Detailed programme with speaker assignments and session descriptions will be available for
              download closer to the conference date.
            </Typography>
          </Box>
        </Section>

        {/* Sponsors Section */}
        <SponsorsSection 
          title="Our Partners"
          subtitle="Organizations supporting the conference"
        />
      </main>
    </>
  );
}
