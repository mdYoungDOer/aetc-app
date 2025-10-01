'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface IndependenceArchIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const IndependenceArchIcon: React.FC<IndependenceArchIconProps> = ({ 
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
      aria-label="Independence Arch representing liberation and progress"
    >
      {/* Arch structure */}
      <path
        d="M4 20V4C4 3.45 4.45 3 5 3H19C19.55 3 20 3.45 20 4V20"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
      />
      
      {/* Arch opening */}
      <path
        d="M8 8C8 6.9 8.9 6 10 6H14C15.1 6 16 6.9 16 8V16"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
      />
      
      {/* Pillars */}
      <rect x="6" y="8" width="2" height="12" fill={fillColor} fillOpacity="0.7"/>
      <rect x="16" y="8" width="2" height="12" fill={fillColor} fillOpacity="0.7"/>
      
      {/* Flag pole */}
      <line x1="12" y1="3" x2="12" y2="8" stroke={fillColor} strokeWidth="2"/>
      
      {/* Flag */}
      <rect x="12" y="3" width="4" height="3" fill={fillColor} fillOpacity="0.8"/>
      
      {/* Base platform */}
      <rect x="2" y="18" width="20" height="2" fill={fillColor} fillOpacity="0.5"/>
    </Box>
  );
};

export default IndependenceArchIcon;
