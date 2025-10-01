'use client';

import { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Fab
            onClick={scrollToTop}
            size="medium"
            sx={{
              backgroundColor: '#FBA91E',
              color: '#000000',
              boxShadow: '0 4px 12px rgba(251, 169, 30, 0.4)',
              '&:hover': {
                backgroundColor: '#e59915',
                boxShadow: '0 6px 16px rgba(251, 169, 30, 0.5)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </Fab>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
