'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { X, ArrowRight, CreditCard, CheckCircle, QrCode, Download } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const purchaseSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Invalid phone number'),
  quantity: z.number().min(1).max(10),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface TicketPurchaseModalProps {
  open: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    name: string;
    price: number;
    available: number;
  } | null;
}

export default function TicketPurchaseModal({ open, onClose, ticket }: TicketPurchaseModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [qrCode, setQrCode] = useState<string>('');
  const { user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      quantity: 1,
      customerName: '',
      customerEmail: user?.email || '',
      customerPhone: '',
      terms: false,
    },
  });

  const quantity = watch('quantity');

  const handleClose = () => {
    reset();
    setActiveStep(0);
    setError('');
    setSuccess(false);
    setOrderData(null);
    setQrCode('');
    onClose();
  };

  // Load Paystack script
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).PaystackPop) {
      console.log('🔄 Loading Paystack script...');
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Paystack script loaded successfully');
      };
      script.onerror = () => {
        console.error('❌ Failed to load Paystack script');
      };
      document.head.appendChild(script);
    } else if ((window as any).PaystackPop) {
      console.log('✅ Paystack script already loaded');
    }
  }, []);

  const onSubmit = async (data: PurchaseFormData) => {
    setLoading(true);
    setError('');

    try {
      // Initialize payment
      const response = await fetch('/api/tickets/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticketId: ticket?.id,
          quantity: data.quantity,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          userId: user?.id || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to initialize payment');
      }

      // Debug: Check if Paystack key is available
      const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY;
      console.log('🔍 Paystack Debug Info:');
      console.log('Public Key Available:', !!paystackKey);
      console.log('Public Key Value:', paystackKey ? `${paystackKey.substring(0, 10)}...` : 'undefined');
      console.log('Window PaystackPop Available:', !!(window as any).PaystackPop);
      
      if (!paystackKey) {
        throw new Error('Paystack public key is not configured. Please check your environment variables.');
      }

      if (!(window as any).PaystackPop) {
        throw new Error('Paystack script not loaded. Please refresh the page and try again.');
      }

      // Use Paystack inline modal instead of redirect
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey,
        email: data.customerEmail,
        amount: result.amount,
        currency: 'GHS',
        ref: result.reference,
        metadata: {
          orderId: result.orderId,
          ticketType: ticket?.name,
          quantity: data.quantity,
          customerName: data.customerName,
        },
        callback: function(response: any) {
          // Payment successful - verify payment
          verifyPayment(result.reference, result.orderId);
        },
        onClose: function() {
          // Payment cancelled
          setLoading(false);
          setError('Payment was cancelled. Please try again.');
        }
      });

      handler.openIframe();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  const verifyPayment = async (reference: string, orderId: string) => {
    try {
      const response = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, orderId }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setOrderData(result.order);
        setQrCode(result.qrCode);
        setActiveStep(2);
        setLoading(false);
        
        // Send OTP if new user
        if (result.sendOtp) {
          // Show OTP verification step
          setActiveStep(3);
        }
      } else {
        setError('Payment verification failed. Please contact support.');
        setLoading(false);
      }
    } catch (err: any) {
      setError('Payment verification failed. Please contact support.');
      setLoading(false);
    }
  };

  const handleOTPVerification = async (otp: string) => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: orderData?.customer_email,
          token: otp,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setActiveStep(4); // Move to dashboard access step
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err: any) {
      setError('OTP verification failed. Please try again.');
    }
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
    handleClose();
  };

  if (!ticket) return null;

  const totalAmount = ticket.price * (quantity || 1);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '8px',
          maxHeight: '90vh',
        },
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Purchase {ticket.name}
            </Typography>
            <Button
              onClick={handleClose}
              sx={{ minWidth: 'auto', p: 1 }}
              disabled={loading}
            >
              <X size={24} />
            </Button>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Stepper activeStep={activeStep}>
                <Step>
                  <StepLabel>Details</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Payment</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Success</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Verification</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Complete</StepLabel>
                </Step>
              </Stepper>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
                {error}
              </Alert>
            )}

            {/* Step 0: Purchase Form */}
            {activeStep === 0 && (
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                id="purchase-form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <TextField
                  label="Full Name"
                  {...register('customerName')}
                  error={!!errors.customerName}
                  helperText={errors.customerName?.message}
                  fullWidth
                  required
                  disabled={loading}
                />

                <TextField
                  label="Email Address"
                  type="email"
                  {...register('customerEmail')}
                  error={!!errors.customerEmail}
                  helperText={errors.customerEmail?.message}
                  fullWidth
                  required
                  disabled={loading}
                />

                <TextField
                  label="Phone Number"
                  {...register('customerPhone')}
                  error={!!errors.customerPhone}
                  helperText={errors.customerPhone?.message}
                  fullWidth
                  required
                  disabled={loading}
                />

                <TextField
                  label="Quantity"
                  type="number"
                  {...register('quantity', { valueAsNumber: true })}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message || `${ticket.available} tickets available`}
                  fullWidth
                  required
                  inputProps={{ min: 1, max: Math.min(10, ticket.available) }}
                  disabled={loading}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('terms')}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the terms and conditions and privacy policy
                    </Typography>
                  }
                />
                {errors.terms && (
                  <Typography variant="caption" color="error">
                    {errors.terms.message}
                  </Typography>
                )}

                <Box
                  sx={{
                    backgroundColor: 'background.default',
                    p: 3,
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Ticket Price:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ₵{ticket.price.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Quantity:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {quantity || 1}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Total:
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      ₵{totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Step 1: Payment Processing */}
            {activeStep === 1 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress size={60} sx={{ mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Processing Payment...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please complete your payment in the popup window
                </Typography>
              </Box>
            )}

            {/* Step 2: Payment Success */}
            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle size={60} color="#78C044" style={{ marginBottom: 16 }} />
                <Typography variant="h5" gutterBottom sx={{ color: '#78C044' }}>
                  Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Your tickets have been purchased successfully
                </Typography>
                
                {qrCode && (
                  <Card sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Your QR Code
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Image 
                          src={qrCode} 
                          alt="QR Code" 
                          width={200} 
                          height={200}
                          style={{ maxWidth: '200px' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Show this QR code at the conference entrance
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={() => {/* Download PDF logic */}}
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<QrCode />}
                    onClick={handleGoToDashboard}
                  >
                    View Dashboard
                  </Button>
                </Box>
              </Box>
            )}

            {/* Step 3: OTP Verification */}
            {activeStep === 3 && (
              <Box sx={{ py: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                  Verify Your Email
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                  We've sent a 6-digit verification code to your email address
                </Typography>
                
                <TextField
                  label="Enter OTP Code"
                  fullWidth
                  placeholder="123456"
                  sx={{ mb: 3 }}
                  inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.2rem' } }}
                />
                
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleOTPVerification('123456')} // Replace with actual OTP input
                >
                  Verify Code
                </Button>
              </Box>
            )}

            {/* Step 4: Complete */}
            {activeStep === 4 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CheckCircle size={60} color="#78C044" style={{ marginBottom: 16 }} />
                <Typography variant="h5" gutterBottom sx={{ color: '#78C044' }}>
                  Account Verified!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Your account has been verified and you can now access your dashboard
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGoToDashboard}
                  sx={{ px: 4 }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0 }}>
            {activeStep === 0 && (
              <>
                <Button onClick={handleClose} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  form="purchase-form"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <CreditCard size={20} />}
                  sx={{
                    backgroundColor: 'secondary.main',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#e59915',
                    },
                    px: 4,
                  }}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </Button>
              </>
            )}
            
            {activeStep === 1 && (
              <Button onClick={handleClose} disabled={loading}>
                Cancel Payment
              </Button>
            )}
            
            {activeStep === 2 && (
              <Button onClick={handleClose} variant="outlined">
                Close
              </Button>
            )}
            
            {activeStep === 3 && (
              <Button onClick={handleClose} variant="outlined">
                Skip for Now
              </Button>
            )}
            
            {activeStep === 4 && (
              <Button onClick={handleClose} variant="outlined">
                Close
              </Button>
            )}
          </DialogActions>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}

