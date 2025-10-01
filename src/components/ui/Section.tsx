'use client';

import { Box, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title?: string | ReactNode;
  subtitle?: string;
  children: ReactNode;
  backgroundColor?: 'default' | 'paper' | 'dark';
  py?: number;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  backgroundColor = 'default',
  py = 8,
  maxWidth = 'lg',
}: SectionProps) {
  const bgColors = {
    default: 'background.default',
    paper: 'background.paper',
    dark: '#181C2C',
  };

  return (
    <Box
      component="section"
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      sx={{
        py,
        backgroundColor: bgColors[backgroundColor],
        ...(backgroundColor === 'dark' && {
          color: 'rgba(255, 255, 255, 0.87)',
        }),
      }}
    >
      <Container maxWidth={maxWidth}>
        {title && (
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            {typeof title === 'string' ? (
              <Typography
                id={`${id}-title`}
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: subtitle ? 1 : 0,
                  color: backgroundColor === 'dark' ? '#FFFFFF' : 'inherit',
                }}
              >
                {title}
              </Typography>
            ) : (
              <Box
                id={`${id}-title`}
                sx={{
                  mb: subtitle ? 1 : 0,
                }}
              >
                {title}
              </Box>
            )}
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color:
                    backgroundColor === 'dark'
                      ? 'rgba(255, 255, 255, 0.60)'
                      : 'text.secondary',
                  maxWidth: 700,
                  mx: 'auto',
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
}

