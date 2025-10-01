export interface PaystackConfig {
  publicKey: string;
  secretKey?: string;
}

export interface PaystackPaymentData {
  email: string;
  amount: number; // in kobo (lowest currency unit)
  reference: string;
  currency?: string;
  metadata?: any;
  callback_url?: string;
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: any;
}

export class PaystackService {
  private publicKey: string;
  private secretKey: string;

  constructor() {
    this.publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || '';
    this.secretKey = process.env.PAYSTACK_SECRET_KEY || '';
  }

  // Initialize payment
  async initializePayment(data: PaystackPaymentData): Promise<PaystackResponse> {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        currency: 'GHS',
      }),
    });

    return response.json();
  }

  // Verify payment
  async verifyPayment(reference: string): Promise<PaystackResponse> {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    });

    return response.json();
  }

  // Generate reference
  generateReference(prefix: string = 'AETC'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `${prefix}_${timestamp}_${random}`;
  }

  // Convert Ghana Cedis to pesewas (kobo equivalent)
  cedisToPesewas(amount: number): number {
    return Math.round(amount * 100);
  }

  // Convert pesewas to Ghana Cedis
  pesewasToCedis(amount: number): number {
    return amount / 100;
  }

  getPublicKey(): string {
    return this.publicKey;
  }
}

export const paystackService = new PaystackService();

