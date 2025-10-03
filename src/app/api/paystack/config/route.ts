import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const publicKey = process.env.PAYSTACK_PUBLIC_KEY;
    
    if (!publicKey) {
      return NextResponse.json({ error: 'Paystack public key not configured' }, { status: 500 });
    }

    return NextResponse.json({ publicKey });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get Paystack configuration' }, { status: 500 });
  }
}
