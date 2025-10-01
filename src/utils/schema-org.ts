export interface ConferenceEvent {
  name: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
  };
  description: string;
  url: string;
  image?: string;
  organizer?: {
    name: string;
    url: string;
  };
}

export function generateEventSchema(event: ConferenceEvent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.address,
        addressCountry: 'GH',
      },
    },
    image: event.image || `${event.url}/og-image.jpg`,
    description: event.description,
    offers: {
      '@type': 'Offer',
      url: `${event.url}/registration`,
      price: '2500',
      priceCurrency: 'GHS',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
    organizer: event.organizer || {
      '@type': 'Organization',
      name: 'Africa Energy Technology Conference',
      url: event.url,
    },
  };
}

export function generateOrganizationSchema(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Africa Energy Technology Conference',
    url,
    logo: `${url}/AETC_Logo-main.png`,
    sameAs: [
      'https://linkedin.com/company/aetc',
      'https://twitter.com/aetc2026',
      'https://facebook.com/aetc2026',
    ],
  };
}

