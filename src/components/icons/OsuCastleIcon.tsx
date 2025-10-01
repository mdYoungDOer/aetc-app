'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface OsuCastleIconProps {
  size?: number;
  color?: string;
  className?: string;
  sx?: any;
}

const OsuCastleIcon: React.FC<OsuCastleIconProps> = ({ 
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
      aria-label="Osu Castle representing historical governance and legacy"
    >
      {/* Castle base */}
      <rect x="3" y="12" width="18" height="9" fill={fillColor} fillOpacity="0.8"/>
      
      {/* Castle walls */}
      <rect x="4" y="8" width="16" height="4" fill={fillColor} fillOpacity="0.9"/>
      
      {/* Central tower */}
      <rect x="10" y="4" width="4" height="8" fill={fillColor}/>
      
      {/* Side towers */}
      <rect x="6" y="6" width="3" height="6" fill={fillColor} fillOpacity="0.9"/>
      <rect x="15" y="6" width="3" height="6" fill={fillColor} fillOpacity="0.9"/>
      
      {/* Tower tops */}
      <polygon points="10,2 12,0 14,2" fill={fillColor}/>
      <polygon points="6,4 7.5,2 9,4" fill={fillColor} fillOpacity="0.9"/>
      <polygon points="15,4 16.5,2 18,4" fill={fillColor} fillOpacity="0.9"/>
      
      {/* Battlements */}
      <rect x="5" y="8" width="1" height="2" fill={fillColor} fillOpacity="0.7"/>
      <rect x="7" y="8" width="1" height="2" fill={fillColor} fillOpacity="0.7"/>
      <rect x="16" y="8" width="1" height="2" fill={fillColor} fillOpacity="0.7"/>
      <rect x="18" y="8" width="1" height="2" fill={fillColor} fillOpacity="0.7"/>
      
      {/* Main entrance */}
      <rect x="11" y="15" width="2" height="6" fill={fillColor} fillOpacity="0.3"/>
    </Box>
  );
};

export default OsuCastleIcon;
