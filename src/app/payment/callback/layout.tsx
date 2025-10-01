import { Suspense } from 'react';

export default function PaymentCallbackLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}

