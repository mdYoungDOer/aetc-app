import { Metadata } from 'next';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'AETC FAQs | Africa Energy Technology Conference 2026',
  description: 'Frequently asked questions about the Africa Energy Technology Conference 2026.',
};

export default function FAQsPage() {
  const faqs = [
    {
      question: 'When and where is AETC 2026 taking place?',
      answer: 'AETC 2026 will take place from May 26-28, 2026 at the Labadi Beach Hotel in Accra, Ghana. The conference will run for three days with various sessions, networking events, and exhibitions.'
    },
    {
      question: 'Who should attend AETC 2026?',
      answer: 'AETC 2026 is designed for energy professionals, policymakers, investors, researchers, entrepreneurs, and anyone interested in Africa\'s energy transformation. This includes government officials, industry leaders, technology providers, financial institutions, and academic researchers.'
    },
    {
      question: 'How can I register for the conference?',
      answer: 'Registration is now open! You can register online through our registration page. We offer different ticket types including early bird discounts, student rates, and group packages. Early registration is recommended as spaces are limited.'
    },
    {
      question: 'What topics will be covered at AETC 2026?',
      answer: 'The conference will cover renewable energy innovation, energy access and electrification, climate change and sustainability, smart grid and digital energy, policy and regulation, and investment and finance. Each topic will have dedicated sessions, panel discussions, and networking opportunities.'
    },
    {
      question: 'Will there be networking opportunities?',
      answer: 'Yes! AETC 2026 includes numerous networking opportunities including coffee breaks, lunch sessions, evening receptions, and dedicated networking zones. We also offer matchmaking services to connect attendees with relevant contacts.'
    },
    {
      question: 'Is accommodation provided?',
      answer: 'Accommodation is not included in the conference fee, but we have partnered with several hotels near the venue offering special rates for conference attendees. Booking details and discount codes will be provided upon registration.'
    },
    {
      question: 'What COVID-19 safety measures are in place?',
      answer: 'We are committed to ensuring a safe and healthy environment for all attendees. We will follow all local health guidelines and implement appropriate safety measures. Specific protocols will be communicated closer to the event date.'
    },
    {
      question: 'Can I present at the conference?',
      answer: 'Yes! We welcome presentations from industry experts, researchers, and practitioners. Call for abstracts and speaker applications are now open. Please visit our "Get Involved" section for more information on how to apply.'
    },
    {
      question: 'Is there a mobile app for the conference?',
      answer: 'Yes, we will provide a comprehensive mobile app that includes the conference schedule, speaker information, networking features, and real-time updates. The app will be available for download before the conference begins.'
    },
    {
      question: 'What is the dress code for the conference?',
      answer: 'The dress code is business casual for most sessions. However, the gala dinner and some evening events may require more formal attire. Specific dress code information will be provided in the conference materials.'
    },
    {
      question: 'Will there be simultaneous translation services?',
      answer: 'The main conference sessions will be conducted in English. However, we are exploring options for translation services for key sessions. Please contact us if you have specific language requirements.'
    },
    {
      question: 'How can I become a sponsor or exhibitor?',
      answer: 'We offer various sponsorship and exhibition opportunities. Please visit our "Get Involved" section or contact our partnerships team directly to discuss available packages and benefits.'
    }
  ];

  return (
    <>
      <PageBreadcrumb
        title="AETC FAQs"
        subtitle="Frequently asked questions about the conference"
        backgroundImage="/images-optimized/aetc-2025-pics-1-24.webp"
      />

      <main>
        <Section id="faqs" title="Frequently Asked Questions" subtitle="Everything you need to know about AETC 2026" py={10}>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} sx={{ mb: 2, boxShadow: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: 'background.paper' }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Section>

        <Section id="contact-support" title="Still Have Questions?" subtitle="Get in touch with our team" backgroundColor="paper" py={10}>
          <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
              Can't find the answer you're looking for? Our team is here to help. 
              Contact us directly and we'll get back to you within 24 hours.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Email: info@aetconference.com
              </Typography>
              <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 600 }}>
                Phone: +233 502 519 909
              </Typography>
            </Box>
          </Box>
        </Section>
      </main>
    </>
  );
}
