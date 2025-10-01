'use client';

import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface CustomButtonProps extends ButtonProps {
  component?: any;
  href?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ display: 'inline-block' }}
      >
        <Button
          ref={ref}
          sx={{
            borderRadius: '8px',
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            ...sx,
          }}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;

