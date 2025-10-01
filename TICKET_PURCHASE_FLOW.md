# AETC 2026 - Ticket Purchase & Dashboard Access Flow

## 🎫 Complete Ticket Purchase Journey

### **Phase 1: Discovery & Selection**
```
User visits /registration
    ↓
Views ticket types (Early Bird, Standard, Student, VIP)
    ↓
Clicks "Buy Now" on desired ticket
    ↓
TicketPurchaseModal opens
```

### **Phase 2: Purchase Process**
```
User fills purchase form:
├── Customer Name (required)
├── Customer Email (required)
├── Customer Phone (required)
├── Quantity (1-10)
└── Terms & Conditions (checkbox)

    ↓
User clicks "Proceed to Payment"
    ↓
Form validation (Zod schema)
    ↓
API call to /api/tickets/initialize
```

### **Phase 3: Payment Processing**
```
Backend creates order in database:
├── Order status: 'pending'
├── Paystack reference generated
├── Stock reserved (optimistic)
└── Order ID generated

    ↓
Paystack payment initialized:
├── Amount converted to pesewas
├── Callback URL set
├── Metadata attached
└── Authorization URL returned

    ↓
User redirected to Paystack:
├── Enter payment details
├── Choose payment method (Card/Mobile Money)
└── Complete payment
```

### **Phase 4: Payment Verification**
```
Paystack webhook to /api/paystack/webhook:
├── Verify webhook signature
├── Check payment status
└── Update order if successful

    ↓
If payment successful:
├── Order status → 'paid'
├── Generate QR codes for each ticket
├── Create user_tickets records
├── Send confirmation email
└── Create user account (if new email)
```

### **Phase 5: Account Creation & OTP**
```
For new users:
├── Supabase auth.signUp() called
├── Random password generated
├── OTP sent via SendGrid
└── User must verify before dashboard access

    ↓
OTP verification:
├── User enters 6-digit code
├── API call to /api/auth/verify-otp
├── Supabase auth.verifyOtp()
└── Account activated
```

### **Phase 6: Dashboard Access**
```
User visits /dashboard:
├── Middleware checks authentication
├── If not authenticated → redirect to login
├── If authenticated → load dashboard
└── Display user's tickets and profile

    ↓
Dashboard features:
├── My Tickets tab:
│   ├── QR code display
│   ├── Download PDF
│   ├── Ticket details
│   └── Entry instructions
├── Profile tab:
│   ├── Edit personal info
│   ├── Change password
│   └── Account settings
└── Orders tab:
    ├── Order history
    ├── Payment status
    └── Receipt download
```

---

## 🔄 Detailed API Flow

### **1. Ticket Purchase API**
```typescript
POST /api/tickets/initialize
{
  "ticketId": "uuid",
  "quantity": 2,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+233123456789",
  "userId": "uuid" // optional
}

Response:
{
  "authorization_url": "https://checkout.paystack.com/...",
  "access_code": "access_code_123",
  "reference": "AETC_123456789",
  "orderId": "uuid"
}
```

### **2. Payment Webhook**
```typescript
POST /api/paystack/webhook
Headers: {
  "x-paystack-signature": "sha256=..."
}

Payload: {
  "event": "charge.success",
  "data": {
    "reference": "AETC_123456789",
    "amount": 50000, // in pesewas
    "customer": { "email": "john@example.com" },
    "metadata": { "orderId": "uuid" }
  }
}
```

### **3. OTP Verification**
```typescript
POST /api/auth/verify-otp
{
  "email": "john@example.com",
  "token": "123456"
}

Response:
{
  "message": "OTP verified successfully",
  "user": { "id": "uuid", "email": "john@example.com" }
}
```

---

## 📱 User Experience Flow

### **Step 1: Registration Page**
- User sees ticket cards with pricing
- Real-time stock availability
- Clear pricing in Ghana Cedis (₵)
- Mobile-optimized design

### **Step 2: Purchase Modal**
- Smooth slide-in animation
- Form validation with clear error messages
- Quantity selector with stock limits
- Terms acceptance required

### **Step 3: Payment Redirect**
- Secure Paystack checkout
- Multiple payment options
- Mobile money support
- Clear pricing display

### **Step 4: Success Page**
- Payment confirmation
- Order details
- QR code preview
- Dashboard access link

### **Step 5: Account Verification**
- OTP email sent immediately
- 6-digit code verification
- Account activation
- Welcome email

### **Step 6: Dashboard Access**
- Protected route (middleware)
- Mobile-first design
- Swipeable tabs
- QR code display

---

## 🔐 Security Features

### **Authentication**
- Supabase Row Level Security (RLS)
- Protected API routes
- JWT token validation
- Session management

### **Payment Security**
- Paystack webhook signature verification
- Order reference validation
- Amount verification
- Duplicate payment prevention

### **Data Protection**
- Input validation (Zod schemas)
- SQL injection prevention
- XSS protection
- HTTPS enforcement

---

## 📊 Database Schema

### **Orders Table**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  ticket_id UUID REFERENCES tickets(id),
  quantity INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  status VARCHAR(20) DEFAULT 'pending',
  paystack_reference VARCHAR(100) UNIQUE,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);
```

### **User Tickets Table**
```sql
CREATE TABLE user_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  user_id UUID REFERENCES auth.users(id),
  ticket_id UUID REFERENCES tickets(id),
  qr_code TEXT NOT NULL,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  attendee_name VARCHAR(255) NOT NULL,
  attendee_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 Success Metrics

### **Purchase Completion Rate**
- Target: 85%+ completion rate
- Track: Abandonment at each step
- Optimize: Form fields, payment flow

### **Payment Success Rate**
- Target: 95%+ payment success
- Track: Failed payments, retries
- Monitor: Paystack error rates

### **User Onboarding**
- Target: 90%+ OTP verification
- Track: Email delivery, verification time
- Optimize: Email templates, UX

### **Dashboard Engagement**
- Target: 80%+ return visits
- Track: Feature usage, session time
- Monitor: User satisfaction

---

## 🚀 Performance Optimizations

### **Frontend**
- Lazy loading for images
- Code splitting for routes
- Optimistic UI updates
- Mobile-first responsive design

### **Backend**
- Database indexing
- Connection pooling
- Caching strategies
- Error handling

### **Payment**
- Async webhook processing
- Retry mechanisms
- Status polling
- Real-time updates

---

## 📧 Email Notifications

### **Purchase Confirmation**
- Order details
- QR code attachment
- Conference information
- Next steps

### **OTP Verification**
- 6-digit code
- Expiration time
- Security instructions
- Support contact

### **Welcome Email**
- Account activation
- Dashboard access
- Conference updates
- Support resources

---

## 🔧 Troubleshooting

### **Common Issues**
1. **Payment fails**: Check Paystack configuration
2. **OTP not received**: Verify SendGrid setup
3. **Dashboard access denied**: Check authentication
4. **QR code not generated**: Verify webhook processing

### **Debug Steps**
1. Check browser console for errors
2. Verify API responses
3. Test payment flow with test cards
4. Monitor webhook deliveries

### **Support Contacts**
- Technical: admin@aetconference.com
- Payment: support@paystack.com
- Email: support@sendgrid.com
