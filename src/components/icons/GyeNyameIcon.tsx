'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface GyeNyameIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const GyeNyameIcon: React.FC<GyeNyameIconProps> = ({ 
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
      aria-label="Gye Nyame symbol representing supremacy and divine authority"
    >
      {/* Gye Nyame - Interlocking geometric shapes */}
      {/* Central circle */}
      <circle cx="12" cy="12" r="8" fill="none" stroke={fillColor} strokeWidth="2"/>
      
      {/* Inner geometric pattern */}
      <path
        d="M12 4C15.31 4 18 6.69 18 10C18 11.1 17.6 12.1 16.9 12.9L12 20L7.1 12.9C6.4 12.1 6 11.1 6 10C6 6.69 8.69 4 12 4Z"
        fill={fillColor}
        fillOpacity="0.3"
      />
      
      {/* Interlocking shapes */}
      <path
        d="M12 8C13.66 8 15 9.34 15 11C15 11.74 14.74 12.43 14.32 12.96L12 16L9.68 12.96C9.26 12.43 9 11.74 9 11C9 9.34 10.34 8 12 8Z"
        fill={fillColor}
        fillOpacity="0.6"
      />
      
      {/* Center point */}
      <circle cx="12" cy="12" r="2" fill={fillColor}/>
    </Box>
  );
};

export default GyeNyameIcon;
