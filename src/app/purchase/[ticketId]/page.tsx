'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ArrowLeft, CreditCard, CheckCircle, QrCode, Download, Check } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@supabase/supabase-js';
import CustomButton from '@/components/ui/CustomButton';
import CustomCard from '@/components/ui/CustomCard';
import Section from '@/components/ui/Section';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const purchaseSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Invalid phone number'),
  quantity: z.number().min(1).max(10),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface Ticket {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  features: string[];
  active: boolean;
}

export default function TicketPurchasePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState<any>(null);
  const [qrCode, setQrCode] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('id', params.ticketId)
          .eq('active', true)
          .single();

        if (error || !data) {
          throw new Error('Ticket not found');
        }

        setTicket(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.ticketId) {
      fetchTicket();
    }
  }, [params.ticketId]);

  const onSubmit = async (data: PurchaseFormData) => {
    setProcessing(true);
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

      // Get Paystack public key from API
      const configResponse = await fetch('/api/paystack/config');
      const configResult = await configResponse.json();
      
      if (!configResponse.ok) {
        throw new Error(configResult.error || 'Failed to get Paystack configuration');
      }
      
      const paystackKey = configResult.publicKey;
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

      // Use Paystack inline modal
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
          setProcessing(false);
          setError('Payment was cancelled. Please try again.');
        }
      });

      handler.openIframe();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setProcessing(false);
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
        setOrderData(result.order);
        setQrCode(result.qrCode);
        setActiveStep(2);
        setProcessing(false);
      } else {
        setError('Payment verification failed. Please contact support.');
        setProcessing(false);
      }
    } catch (err: any) {
      setError('Payment verification failed. Please contact support.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error && !ticket) {
    return (
      <Section py={10}>
        <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h4" gutterBottom color="error">
            Ticket Not Found
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <CustomButton
            variant="contained"
            startIcon={<ArrowLeft size={20} />}
            onClick={() => router.push('/registration')}
          >
            Back to Registration
          </CustomButton>
        </Box>
      </Section>
    );
  }

  if (!ticket) return null;

  const totalAmount = ticket.price * (quantity || 1);

  return (
    <Section py={10}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <CustomButton
            variant="outlined"
            startIcon={<ArrowLeft size={20} />}
            onClick={() => router.push('/registration')}
            sx={{ mb: 3 }}
          >
            Back to Registration
          </CustomButton>
          
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Purchase {ticket.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete your registration for AETC 2026
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Box sx={{ mb: 4 }}>
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
          </Stepper>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Purchase Form */}
          <Grid item xs={12} md={8}>
            {activeStep === 0 && (
              <CustomCard sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Your Information
                </Typography>
                
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                >
                  <TextField
                    label="Full Name"
                    {...register('customerName')}
                    error={!!errors.customerName}
                    helperText={errors.customerName?.message}
                    fullWidth
                    required
                    disabled={processing}
                  />

                  <TextField
                    label="Email Address"
                    type="email"
                    {...register('customerEmail')}
                    error={!!errors.customerEmail}
                    helperText={errors.customerEmail?.message}
                    fullWidth
                    required
                    disabled={processing}
                  />

                  <TextField
                    label="Phone Number"
                    {...register('customerPhone')}
                    error={!!errors.customerPhone}
                    helperText={errors.customerPhone?.message}
                    fullWidth
                    required
                    disabled={processing}
                  />

                  <TextField
                    label="Quantity"
                    type="number"
                    {...register('quantity', { valueAsNumber: true })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    fullWidth
                    required
                    inputProps={{ min: 1, max: 10 }}
                    disabled={processing}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register('terms')}
                        color="primary"
                        disabled={processing}
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

                  <CustomButton
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={processing}
                    startIcon={processing ? <CircularProgress size={20} /> : <CreditCard size={20} />}
                    sx={{
                      backgroundColor: 'secondary.main',
                      color: '#000',
                      py: 2,
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                      },
                    }}
                  >
                    {processing ? 'Processing...' : 'Proceed to Payment'}
                  </CustomButton>
                </Box>
              </CustomCard>
            )}

            {activeStep === 1 && (
              <CustomCard sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress size={60} sx={{ mb: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Processing Payment...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please complete your payment in the popup window
                </Typography>
              </CustomCard>
            )}

            {activeStep === 2 && (
              <CustomCard sx={{ p: 4, textAlign: 'center' }}>
                <CheckCircle size={60} color="#78C044" style={{ marginBottom: 16 }} />
                <Typography variant="h5" gutterBottom sx={{ color: '#78C044' }}>
                  Payment Successful!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Your tickets have been purchased successfully
                </Typography>
                
                {qrCode && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Your QR Code
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      <Image 
                        src={qrCode} 
                        alt="QR Code" 
                        width={200}
                        height={200}
                        style={{ maxWidth: '200px', height: 'auto' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Show this QR code at the conference entrance
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <CustomButton
                    variant="outlined"
                    startIcon={<Download size={20} />}
                    onClick={() => {/* Download PDF logic */}}
                  >
                    Download PDF
                  </CustomButton>
                  <CustomButton
                    variant="contained"
                    startIcon={<QrCode size={20} />}
                    onClick={() => router.push('/my-tickets')}
                    sx={{
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    View My Tickets
                  </CustomButton>
                </Box>
              </CustomCard>
            )}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <CustomCard sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {ticket.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {ticket.description}
                </Typography>
                
                <List dense>
                  {ticket.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Check size={16} color="#78C044" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={feature} 
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Divider sx={{ my: 2 }} />

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
              
              <Divider sx={{ my: 1 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ₵{totalAmount.toLocaleString()}
                </Typography>
              </Box>
            </CustomCard>
          </Grid>
        </Grid>
      </Box>
    </Section>
  );
}
