'use client';

import { Box, Typography, Avatar, Link as MuiLink, Chip } from '@mui/material';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HomepageSpeakerCardProps {
  name: string;
  title: string;
  company: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  isFeatured?: boolean;
}

export default function HomepageSpeakerCard({
  name,
  title,
  company,
  bio,
  imageUrl,
  linkedinUrl,
  twitterUrl,
  websiteUrl,
  isFeatured = false,
}: HomepageSpeakerCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      whileHover={{ 
        translateY: -8, 
        boxShadow: '0 20px 40px rgba(41, 57, 114, 0.15)' 
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: '#293972',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
            }}
          >
            <Chip
              label="Featured"
              size="small"
              sx={{
                backgroundColor: '#FBA91E',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          </Box>
        )}

        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            height: 200,
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <Avatar
              sx={{
                width: 120,
                height: 120,
                backgroundColor: '#293972',
                    color: 'secondary.main',
                fontSize: '2.5rem',
                fontWeight: 700,
                border: '4px solid #FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {initials}
            </Avatar>
          )}
        </Box>

        {/* Content Section */}
        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Name and Title */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#293972',
                mb: 0.5,
                fontSize: '1.1rem',
                lineHeight: 1.3,
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                    color: 'secondary.main',
                fontWeight: 600, 
                mb: 0.5,
                fontSize: '0.9rem',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                color: '#6B7280', 
                fontWeight: 500,
                fontSize: '0.85rem',
              }}
            >
              {company}
            </Typography>
          </Box>

          {/* Bio */}
          {bio && (
            <Typography
              variant="body2"
              sx={{
                color: '#4B5563',
                lineHeight: 1.6,
                fontSize: '0.9rem',
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
          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            {linkedinUrl && (
              <MuiLink
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                sx={{
                  color: '#6B7280',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#F3F4F6',
                  '&:hover': {
                    backgroundColor: '#E5F3FF',
                    color: '#0077B5',
                  },
                }}
              >
                <Linkedin size={18} />
              </MuiLink>
            )}
            {twitterUrl && (
              <MuiLink
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} Twitter`}
                sx={{
                  color: '#6B7280',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#F3F4F6',
                  '&:hover': {
                    backgroundColor: '#E5F3FF',
                    color: '#1DA1F2',
                  },
                }}
              >
                <Twitter size={18} />
              </MuiLink>
            )}
            {websiteUrl && (
              <MuiLink
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} Website`}
                sx={{
                  color: '#6B7280',
                  transition: 'color 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#F3F4F6',
                  '&:hover': {
                    backgroundColor: '#F0F4FF',
                    color: '#293972',
                  },
                }}
              >
                <Globe size={18} />
              </MuiLink>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
