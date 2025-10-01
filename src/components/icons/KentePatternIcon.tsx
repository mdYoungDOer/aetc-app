'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface KentePatternIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
  opacity?: number;
}

const KentePatternIcon: React.FC<KentePatternIconProps> = ({ 
  size = 24, 
  color, 
  className,
  sx = {},
  opacity = 0.1
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
      aria-label="Kente pattern representing cultural vibrancy and heritage"
    >
      {/* Kente weaving pattern - alternating colored strips */}
      
      {/* Horizontal strips */}
      <rect x="0" y="2" width="24" height="2" fill={fillColor} fillOpacity={opacity}/>
      <rect x="0" y="6" width="24" height="2" fill={theme.palette.secondary.main} fillOpacity={opacity}/>
      <rect x="0" y="10" width="24" height="2" fill={fillColor} fillOpacity={opacity}/>
      <rect x="0" y="14" width="24" height="2" fill={theme.palette.secondary.main} fillOpacity={opacity}/>
      <rect x="0" y="18" width="24" height="2" fill={fillColor} fillOpacity={opacity}/>
      
      {/* Vertical strips */}
      <rect x="2" y="0" width="2" height="24" fill={fillColor} fillOpacity={opacity * 0.8}/>
      <rect x="6" y="0" width="2" height="24" fill={theme.palette.secondary.main} fillOpacity={opacity * 0.8}/>
      <rect x="10" y="0" width="2" height="24" fill={fillColor} fillOpacity={opacity * 0.8}/>
      <rect x="14" y="0" width="2" height="24" fill={theme.palette.secondary.main} fillOpacity={opacity * 0.8}/>
      <rect x="18" y="0" width="2" height="24" fill={fillColor} fillOpacity={opacity * 0.8}/>
      
      {/* Decorative diamond patterns */}
      <path
        d="M4 4L6 6L4 8L2 6L4 4Z"
        fill={theme.palette.secondary.main}
        fillOpacity={opacity * 1.5}
      />
      <path
        d="M20 4L22 6L20 8L18 6L20 4Z"
        fill={theme.palette.secondary.main}
        fillOpacity={opacity * 1.5}
      />
      <path
        d="M4 16L6 18L4 20L2 18L4 16Z"
        fill={theme.palette.secondary.main}
        fillOpacity={opacity * 1.5}
      />
      <path
        d="M20 16L22 18L20 20L18 18L20 16Z"
        fill={theme.palette.secondary.main}
        fillOpacity={opacity * 1.5}
      />
      
      {/* Central pattern */}
      <circle cx="12" cy="12" r="2" fill={fillColor} fillOpacity={opacity * 2}/>
      <circle cx="12" cy="12" r="1" fill={theme.palette.secondary.main} fillOpacity={opacity * 3}/>
    </Box>
  );
};

export default KentePatternIcon;
