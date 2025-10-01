'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { PageBlock } from './PageBuilder';
import ShortcodeRenderer from './ShortcodeRenderer';
import { parseShortcodes, hasShortcode } from '@/utils/shortcodes';

interface CMSPageRendererProps {
  content: {
    blocks: PageBlock[];
  };
}

export default function CMSPageRenderer({ content }: CMSPageRendererProps) {
  if (!content || !content.blocks) {
    return null;
  }

  return (
    <Box>
      {content.blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </Box>
  );
}

function BlockRenderer({ block }: { block: PageBlock }) {
  switch (block.type) {
    case 'hero':
      return (
        <Box
          component="section"
          sx={{
            position: 'relative',
            minHeight: { xs: '50vh', md: '60vh' },
            display: 'flex',
            alignItems: 'center',
            background: block.data.backgroundImage
              ? 'transparent'
              : 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
            overflow: 'hidden',
          }}
        >
          {block.data.backgroundImage && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${block.data.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(21, 20, 67, 0.75)',
                }}
              />
            </>
          )}
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 800,
                color: '#FFFFFF',
                mb: 2,
              }}
            >
              {block.data.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.87)',
                mb: 4,
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              {block.data.subtitle}
            </Typography>
            {block.data.ctaText && (
              <Button
                component={Link}
                href={block.data.ctaLink || '#'}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#FBA91E',
                  color: '#000',
                  '&:hover': {
                    backgroundColor: '#e59915',
                  },
                  px: 4,
                  py: 1.5,
                }}
              >
                {block.data.ctaText}
              </Button>
            )}
          </Container>
        </Box>
      );

    case 'text':
      // Check if content has shortcodes
      const { text, shortcodes } = parseShortcodes(block.data.content);
      const hasFormShortcode = hasShortcode(block.data.content, 'form');

      return (
        <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper' }}>
          <Container maxWidth="lg">
            {hasFormShortcode && shortcodes.length > 0 ? (
              // Render shortcode components
              <Box>
                {shortcodes.map((shortcode, idx) => {
                  if (shortcode.name === 'form') {
                    const shortcodeString = `[form id="${shortcode.attributes.id}"]`;
                    return <ShortcodeRenderer key={idx} shortcode={shortcodeString} />;
                  }
                  return null;
                })}
              </Box>
            ) : (
              // Render regular HTML content
              <Box
                sx={{
                  textAlign: block.data.alignment || 'left',
                  '& p': { mb: 2, lineHeight: 1.8 },
                  '& h2': { fontWeight: 700, mb: 2, mt: 4 },
                  '& h3': { fontWeight: 600, mb: 2, mt: 3 },
                }}
                dangerouslySetInnerHTML={{ __html: block.data.content }}
              />
            )}
          </Container>
        </Box>
      );

    case 'image':
      return (
        <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                position: 'relative',
                height: { xs: 300, md: 500 },
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <Image
                src={block.data.src}
                alt={block.data.alt || ''}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            {block.data.caption && (
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  mt: 2,
                  fontStyle: 'italic',
                }}
              >
                {block.data.caption}
              </Typography>
            )}
          </Container>
        </Box>
      );

    case 'form':
      return (
        <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper' }}>
          <Container maxWidth="md">
            <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Form embed (ID: {block.data.formId}) - Coming soon
            </Typography>
          </Container>
        </Box>
      );

    default:
      return null;
  }
}

