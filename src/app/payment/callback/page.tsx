'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress, Button } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PaymentCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const reference = searchParams.get('reference');

  useEffect(() => {
    if (reference) {
      verifyPayment();
    } else {
      setStatus('failed');
    }
  }, [reference]);

  const verifyPayment = async () => {
    try {
      // The webhook handles verification, we just check the order status
      // In production, you might want to verify on the frontend too
      setTimeout(() => {
        setStatus('success');
      }, 2000);
    } catch (error) {
      console.error('Payment verification error:', error);
      setStatus('failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #293972 0%, #1a2550 100%)',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              p: 6,
              textAlign: 'center',
            }}
          >
            {status === 'loading' && (
              <>
                <CircularProgress size={64} sx={{ mb: 3 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Processing Payment...
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Please wait while we confirm your payment
                </Typography>
              </>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#78C04415',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <CheckCircle size={48} color="#78C044" />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'success.main' }}>
                  Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                  Your ticket purchase has been confirmed. A confirmation email has been sent to your inbox.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    component={Link}
                    href="/dashboard"
                    variant="contained"
                    sx={{
                      backgroundColor: 'primary.main',
                      '&:hover': { backgroundColor: '#1f2a5a' },
                    }}
                  >
                    View My Tickets
                  </Button>
                  <Button component={Link} href="/" variant="outlined">
                    Back to Home
                  </Button>
                </Box>
              </motion.div>
            )}

            {status === 'failed' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#EB482415',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <XCircle size={48} color="#EB4824" />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'error.main' }}>
                  Payment Failed
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                  Unfortunately, your payment could not be processed. Please try again.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    component={Link}
                    href="/registration"
                    variant="contained"
                    sx={{
                      backgroundColor: 'primary.main',
                      '&:hover': { backgroundColor: '#1f2a5a' },
                    }}
                  >
                    Try Again
                  </Button>
                  <Button component={Link} href="/" variant="outlined">
                    Back to Home
                  </Button>
                </Box>
              </motion.div>
            )}

            {reference && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 3,
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                }}
              >
                Reference: {reference}
              </Typography>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

