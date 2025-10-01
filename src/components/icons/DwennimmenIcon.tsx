'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface DwennimmenIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const DwennimmenIcon: React.FC<DwennimmenIconProps> = ({ 
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
      aria-label="Dwennimmen symbol representing humility in strength"
    >
      {/* Dwennimmen - Ram's horns */}
      {/* Left horn */}
      <path
        d="M6 8C6 6 7 4 9 4C10.5 4 11.5 5 12 6C12.5 5 13.5 4 15 4C17 4 18 6 18 8C18 10 17 12 15 12C13.5 12 12.5 11 12 10C11.5 11 10.5 12 9 12C7 12 6 10 6 8Z"
        fill={fillColor}
        fillOpacity="0.7"
      />
      
      {/* Right horn */}
      <path
        d="M8 6C8 4 9 2 11 2C12.5 2 13.5 3 14 4C14.5 3 15.5 2 17 2C19 2 20 4 20 6C20 8 19 10 17 10C15.5 10 14.5 9 14 8C13.5 9 12.5 10 11 10C9 10 8 8 8 6Z"
        fill={fillColor}
        fillOpacity="0.7"
      />
      
      {/* Central base */}
      <ellipse cx="12" cy="18" rx="4" ry="2" fill={fillColor} fillOpacity="0.5"/>
      
      {/* Connecting lines */}
      <path
        d="M10 8L12 16L14 8"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Box>
  );
};

export default DwennimmenIcon;
