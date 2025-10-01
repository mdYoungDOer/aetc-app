'use client';

import { Card, CardProps } from '@mui/material';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CustomCardProps extends CardProps {
  children: ReactNode;
  hoverEffect?: boolean;
  accentColor?: 'primary' | 'secondary' | 'success';
}

export default function CustomCard({
  children,
  hoverEffect = true,
  accentColor,
  sx,
  ...props
}: CustomCardProps) {
  const accentColors = {
    primary: '#293972',
    secondary: '#FBA91E',
    success: '#78C044',
  };

  const cardContent = (
    <Card
      sx={{
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        ...(accentColor && {
          borderTop: `3px solid ${accentColors[accentColor]}`,
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );

  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.2 }}
        style={{ height: '100%' }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

