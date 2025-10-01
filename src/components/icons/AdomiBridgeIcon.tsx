'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface AdomiBridgeIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const AdomiBridgeIcon: React.FC<AdomiBridgeIconProps> = ({ 
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
      aria-label="Adomi Bridge representing connectivity and transition"
    >
      {/* Bridge arch */}
      <path
        d="M2 18C2 16.9 2.9 16 4 16H6C7.1 16 8 16.9 8 18V20C8 21.1 7.1 22 6 22H4C2.9 22 2 21.1 2 20V18Z"
        fill={fillColor}
        fillOpacity="0.7"
      />
      
      <path
        d="M16 18C16 16.9 16.9 16 18 16H20C21.1 16 22 16.9 22 18V20C22 21.1 21.1 22 20 22H18C16.9 22 16 21.1 16 20V18Z"
        fill={fillColor}
        fillOpacity="0.7"
      />
      
      {/* Bridge deck */}
      <rect x="4" y="16" width="16" height="2" fill={fillColor} fillOpacity="0.8"/>
      
      {/* Suspension cables */}
      <path
        d="M6 16C8 12 10 8 12 4C14 8 16 12 18 16"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Support towers */}
      <rect x="10" y="10" width="1" height="8" fill={fillColor} fillOpacity="0.9"/>
      <rect x="13" y="10" width="1" height="8" fill={fillColor} fillOpacity="0.9"/>
      
      {/* River below */}
      <path
        d="M2 20C6 20 10 20 14 20C18 20 22 20 22 20"
        fill="none"
        stroke={fillColor}
        strokeWidth="3"
        strokeOpacity="0.4"
      />
    </Box>
  );
};

export default AdomiBridgeIcon;
