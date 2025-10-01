'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface BlackStarSquareIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const BlackStarSquareIcon: React.FC<BlackStarSquareIconProps> = ({ 
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
      aria-label="Black Star Square representing national pride and independence"
    >
      {/* Square base */}
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke={fillColor} strokeWidth="2"/>
      
      {/* Five-pointed star */}
      <path
        d="M12 6L13.5 9.5L17 9L15 12L16.5 15.5L12 13L7.5 15.5L9 12L7 9L10.5 9.5L12 6Z"
        fill={fillColor}
      />
      
      {/* Central circle */}
      <circle cx="12" cy="12" r="3" fill="none" stroke={fillColor} strokeWidth="1"/>
      
      {/* Corner accents */}
      <circle cx="6" cy="6" r="1" fill={fillColor} fillOpacity="0.6"/>
      <circle cx="18" cy="6" r="1" fill={fillColor} fillOpacity="0.6"/>
      <circle cx="6" cy="18" r="1" fill={fillColor} fillOpacity="0.6"/>
      <circle cx="18" cy="18" r="1" fill={fillColor} fillOpacity="0.6"/>
    </Box>
  );
};

export default BlackStarSquareIcon;
