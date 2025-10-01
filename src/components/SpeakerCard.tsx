'use client';

import { Box, Typography, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react';

interface SpeakerCardProps {
  name: string;
  title: string;
  company: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export default function SpeakerCard({
  name,
  title,
  company,
  bio,
  imageUrl,
  linkedinUrl,
  twitterUrl,
}: SpeakerCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '12px',
        border: '2px solid #FBA91E',
        backgroundColor: '#1A1D29',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(251, 169, 30, 0.3)',
        },
      }}
    >
      {/* Speaker Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} headshot`}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#F5F5F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              fontWeight: 700,
              color: '#293972',
            }}
          >
            {name.split(' ').map(n => n.charAt(0)).join('')}
          </Box>
        )}
      </Box>

      {/* Speaker Information */}
      <CardContent
        sx={{
          p: 3,
          backgroundColor: '#1A1D29',
          height: 'calc(100% - 200px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#FBA91E',
            fontSize: '1.1rem',
            lineHeight: 1.3,
            mb: 1,
            minHeight: '2.6rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {name}
        </Typography>

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            color: '#FFFFFF',
            fontSize: '0.9rem',
            lineHeight: 1.4,
            mb: 0.5,
            minHeight: '1.4rem',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        {/* Company */}
        <Typography
          variant="body2"
          sx={{
            color: '#FFFFFF',
            fontSize: '0.85rem',
            lineHeight: 1.3,
            mb: 2,
            minHeight: '1.3rem',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {company}
        </Typography>

        {/* Bio (if provided) */}
        {bio && (
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.8rem',
              lineHeight: 1.4,
              mb: 2,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {bio}
          </Typography>
        )}

        {/* Social Links */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            justifyContent: 'flex-start',
            mt: 'auto',
          }}
        >
          {linkedinUrl && (
            <Box
              component="a"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn`}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FBA91E',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Linkedin size={18} />
            </Box>
          )}
          {twitterUrl && (
            <Box
              component="a"
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} Twitter`}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FBA91E',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Twitter size={18} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
