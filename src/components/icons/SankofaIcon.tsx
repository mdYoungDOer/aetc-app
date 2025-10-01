'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface SankofaIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const SankofaIcon: React.FC<SankofaIconProps> = ({ 
  size = 24, 
  color, 
  className,
  sx = {}
}) => {
  const theme = useTheme();
  const fillColor = color || theme.palette.primary.main;

  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      sx={sx}
      aria-label="Sankofa symbol representing innovation and return to roots"
    >
      {/* Sankofa - Bird looking backward with an egg in its mouth */}
      <path
        d="M12 2C13.1 2 14 2.9 14 4V6.5C16.2 7.4 17.5 9.6 17 12C16.5 14.4 14.4 16.2 12 16.5V20C12 21.1 11.1 22 10 22C8.9 22 8 21.1 8 20V16.5C5.6 16.2 3.5 14.4 3 12C2.5 9.6 3.8 7.4 6 6.5V4C6 2.9 6.9 2 8 2C9.1 2 10 2.9 10 4V6C10.6 6 11 6.4 11 7C11 7.6 10.6 8 10 8V10C10.6 10 11 10.4 11 11C11 11.6 10.6 12 10 12V14C10.6 14 11 14.4 11 15C11 15.6 10.6 16 10 16V18C10.6 18 11 18.4 11 19C11 19.6 10.6 20 10 20V22C10 22 10 22 10 22C10 22 10 22 10 22Z"
        fill={fillColor}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {/* Bird head looking backward */}
      <circle cx="8" cy="6" r="1.5" fill={fillColor} />
      {/* Egg in mouth */}
      <ellipse cx="6.5" cy="6" rx="1" ry="0.8" fill={fillColor} />
      {/* Wings */}
      <path
        d="M10 8C11.1 8 12 8.9 12 10C12 11.1 11.1 12 10 12C8.9 12 8 11.1 8 10C8 8.9 8.9 8 10 8Z"
        fill={fillColor}
      />
    </Box>
  );
};

export default SankofaIcon;
