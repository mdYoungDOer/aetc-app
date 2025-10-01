'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface ElephantIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const ElephantIcon: React.FC<ElephantIconProps> = ({ 
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
      aria-label="African Elephant representing wisdom and power"
    >
      {/* Elephant body */}
      <ellipse cx="12" cy="16" rx="6" ry="4" fill={fillColor} fillOpacity="0.8"/>
      
      {/* Elephant head */}
      <ellipse cx="12" cy="10" rx="4" ry="3" fill={fillColor} fillOpacity="0.9"/>
      
      {/* Trunk */}
      <path
        d="M12 7C12 5 10 3 8 3C7 3 6 4 6 5C6 6 7 7 8 7C9 7 10 6 11 6C11.5 6 12 6.5 12 7Z"
        fill={fillColor}
      />
      
      {/* Trunk detail */}
      <path
        d="M8 5C8 4.5 8.5 4 9 4C9.5 4 10 4.5 10 5C10 5.5 9.5 6 9 6C8.5 6 8 5.5 8 5Z"
        fill={fillColor}
        fillOpacity="0.6"
      />
      
      {/* Ears */}
      <ellipse cx="8" cy="8" rx="2" ry="1.5" fill={fillColor} fillOpacity="0.7"/>
      <ellipse cx="16" cy="8" rx="2" ry="1.5" fill={fillColor} fillOpacity="0.7"/>
      
      {/* Eyes */}
      <circle cx="10" cy="9" r="0.8" fill={fillColor}/>
      <circle cx="14" cy="9" r="0.8" fill={fillColor}/>
      
      {/* Tusks */}
      <rect x="9" y="11" width="0.5" height="3" fill={fillColor} fillOpacity="0.8"/>
      <rect x="14.5" y="11" width="0.5" height="3" fill={fillColor} fillOpacity="0.8"/>
      
      {/* Legs */}
      <rect x="8" y="18" width="2" height="4" fill={fillColor} fillOpacity="0.9"/>
      <rect x="14" y="18" width="2" height="4" fill={fillColor} fillOpacity="0.9"/>
      
      {/* Tail */}
      <path
        d="M18 16C19 16 20 17 20 18C20 19 19 20 18 20"
        fill="none"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Box>
  );
};

export default ElephantIcon;
