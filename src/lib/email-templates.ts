// AETC 2026 Email Templates - Professional & Modern Design
// No AI-generic elements, specific to Africa Energy Technology Conference

export const emailTemplates = {
  // OTP Verification Email
  otpVerification: (otpCode: string, recipientName: string) => ({
    subject: '🔐 Verify Your AETC 2026 Account',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account - AETC 2026</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #293972 0%, #1f2a5a 100%); padding: 40px 30px; text-align: center; }
        .logo { color: #FBA91E; font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .header-text { color: #ffffff; font-size: 18px; font-weight: 500; margin: 0; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 24px; font-weight: 700; color: #293972; margin-bottom: 20px; }
        .message { font-size: 16px; color: #4a5568; line-height: 1.6; margin-bottom: 30px; }
        .otp-container { background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
        .otp-label { font-size: 14px; color: #718096; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; }
        .otp-code { font-size: 36px; font-weight: 800; color: #293972; letter-spacing: 8px; font-family: 'Courier New', monospace; background: #ffffff; padding: 20px; border-radius: 8px; border: 2px dashed #FBA91E; }
        .expiry { font-size: 14px; color: #e53e3e; font-weight: 600; margin-top: 15px; }
        .instructions { background: #fff5f5; border-left: 4px solid #FBA91E; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0; }
        .instructions h3 { color: #293972; font-size: 18px; margin: 0 0 10px 0; }
        .instructions p { color: #4a5568; margin: 0; font-size: 14px; }
        .footer { background: #293972; color: #ffffff; padding: 30px; text-align: center; }
        .footer-text { font-size: 14px; color: #a0aec0; margin-bottom: 15px; }
        .contact-info { font-size: 12px; color: #718096; }
        .button { display: inline-block; background: #FBA91E; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
        .security-note { background: #f0fff4; border: 1px solid #68d391; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .security-note h4 { color: #22543d; margin: 0 0 10px 0; font-size: 16px; }
        .security-note p { color: #2f855a; margin: 0; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <p class="header-text">Africa Energy Technology Conference</p>
        </div>
        
        <div class="content">
            <h1 class="greeting">Welcome to AETC 2026, ${recipientName}!</h1>
            
            <p class="message">
                Thank you for registering for the Africa Energy Technology Conference 2026. 
                To complete your account setup and access your dashboard, please verify your email address.
            </p>
            
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otpCode}</div>
                <div class="expiry">⏰ Expires in 15 minutes</div>
            </div>
            
            <div class="instructions">
                <h3>📱 How to verify:</h3>
                <p>1. Copy the 6-digit code above<br>
                2. Return to the AETC 2026 website<br>
                3. Enter the code in the verification field<br>
                4. Click "Verify Account"</p>
            </div>
            
            <div class="security-note">
                <h4>🔒 Security Notice</h4>
                <p>Never share this code with anyone. AETC 2026 will never ask for your verification code via phone or email.</p>
            </div>
            
            <p class="message">
                Once verified, you'll have full access to your conference dashboard, ticket management, 
                and exclusive conference updates.
            </p>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                <strong>Africa Energy Technology Conference 2026</strong><br>
                May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
            </p>
            <div class="contact-info">
                📧 info@aetconference.com • 📞 +233 548 327 906<br>
                🌐 aetc.africa • 🐦 @aetconference
            </div>
        </div>
    </div>
</body>
</html>
    `,
    text: `
Welcome to AETC 2026, ${recipientName}!

Your verification code is: ${otpCode}
This code expires in 15 minutes.

To verify your account:
1. Return to the AETC 2026 website
2. Enter the code: ${otpCode}
3. Click "Verify Account"

Security Notice: Never share this code. AETC 2026 will never ask for your verification code via phone or email.

Africa Energy Technology Conference 2026
May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
📧 info@aetconference.com • 📞 +233 548 327 906
    `
  }),

  // Purchase Confirmation Email
  purchaseConfirmation: (orderData: any, qrCodeUrl: string) => ({
    subject: '🎫 Your AETC 2026 Tickets Are Ready!',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Confirmation - AETC 2026</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #293972 0%, #1f2a5a 100%); padding: 40px 30px; text-align: center; }
        .logo { color: #FBA91E; font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .header-text { color: #ffffff; font-size: 18px; font-weight: 500; margin: 0; }
        .success-badge { background: #68d391; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-top: 15px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 24px; font-weight: 700; color: #293972; margin-bottom: 20px; }
        .ticket-card { background: #f7fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 30px; margin: 30px 0; }
        .ticket-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .ticket-type { font-size: 20px; font-weight: 700; color: #293972; }
        .ticket-price { font-size: 24px; font-weight: 800; color: #FBA91E; }
        .ticket-details { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
        .detail-item { }
        .detail-label { font-size: 12px; color: #718096; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .detail-value { font-size: 16px; color: #2d3748; font-weight: 600; margin-top: 5px; }
        .qr-section { text-align: center; margin: 30px 0; }
        .qr-code { max-width: 200px; border: 3px solid #FBA91E; border-radius: 8px; }
        .qr-instructions { background: #fff5f5; border-left: 4px solid #FBA91E; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .conference-info { background: #f0fff4; border: 1px solid #68d391; border-radius: 8px; padding: 25px; margin: 30px 0; }
        .conference-info h3 { color: #22543d; margin: 0 0 15px 0; font-size: 18px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { }
        .info-label { font-size: 12px; color: #718096; font-weight: 600; text-transform: uppercase; }
        .info-value { font-size: 14px; color: #2d3748; font-weight: 600; margin-top: 5px; }
        .footer { background: #293972; color: #ffffff; padding: 30px; text-align: center; }
        .footer-text { font-size: 14px; color: #a0aec0; margin-bottom: 15px; }
        .contact-info { font-size: 12px; color: #718096; }
        .button { display: inline-block; background: #FBA91E; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <p class="header-text">Africa Energy Technology Conference</p>
            <div class="success-badge">✅ Payment Successful</div>
        </div>
        
        <div class="content">
            <h1 class="greeting">Your Tickets Are Confirmed!</h1>
            
            <div class="ticket-card">
                <div class="ticket-header">
                    <div class="ticket-type">${orderData.ticketType} Pass</div>
                    <div class="ticket-price">₵${orderData.totalAmount}</div>
                </div>
                
                <div class="ticket-details">
                    <div class="detail-item">
                        <div class="detail-label">Order Number</div>
                        <div class="detail-value">#${orderData.orderId}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Quantity</div>
                        <div class="detail-value">${orderData.quantity} ticket(s)</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Attendee</div>
                        <div class="detail-value">${orderData.customerName}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${orderData.customerEmail}</div>
                    </div>
                </div>
            </div>
            
            <div class="qr-section">
                <h3 style="color: #293972; margin-bottom: 15px;">📱 Your Conference QR Code</h3>
                <img src="${qrCodeUrl}" alt="Conference QR Code" class="qr-code">
                <div class="qr-instructions">
                    <h3>🎯 Conference Entry Instructions</h3>
                    <p><strong>Show this QR code at the conference entrance</strong><br>
                    • Save this email to your phone<br>
                    • Have your ID ready for verification<br>
                    • Arrive 30 minutes early for smooth entry</p>
                </div>
            </div>
            
            <div class="conference-info">
                <h3>📅 Conference Details</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Date</div>
                        <div class="info-value">September 15-17, 2026</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Time</div>
                        <div class="info-value">9:00 AM - 6:00 PM</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Venue</div>
                        <div class="info-value">Accra International Conference Centre</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Location</div>
                        <div class="info-value">Accra, Ghana</div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://aetc.africa/dashboard" class="button">Access Your Dashboard</a>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                <strong>Africa Energy Technology Conference 2026</strong><br>
                May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
            </p>
            <div class="contact-info">
                📧 info@aetconference.com • 📞 +233 548 327 906<br>
                🌐 aetc.africa • 🐦 @aetconference
            </div>
        </div>
    </div>
</body>
</html>
    `,
    text: `
Your AETC 2026 Tickets Are Confirmed!

Order #${orderData.orderId}
Ticket Type: ${orderData.ticketType} Pass
Quantity: ${orderData.quantity} ticket(s)
Total: ₵${orderData.totalAmount}
Attendee: ${orderData.customerName}

Conference Details:
Date: September 15-17, 2026
Time: 9:00 AM - 6:00 PM
Venue: Accra International Conference Centre
Location: Accra, Ghana

Access your dashboard: https://aetc.africa/dashboard

Africa Energy Technology Conference 2026
📧 info@aetconference.com • 📞 +233 548 327 906
    `
  }),

  // Welcome Email
  welcomeEmail: (recipientName: string) => ({
    subject: '🌟 Welcome to AETC 2026 - Your Energy Journey Begins',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AETC 2026</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #293972 0%, #1f2a5a 100%); padding: 40px 30px; text-align: center; }
        .logo { color: #FBA91E; font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .header-text { color: #ffffff; font-size: 18px; font-weight: 500; margin: 0; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 24px; font-weight: 700; color: #293972; margin-bottom: 20px; }
        .message { font-size: 16px; color: #4a5568; line-height: 1.6; margin-bottom: 30px; }
        .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
        .feature-card { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; }
        .feature-icon { font-size: 24px; margin-bottom: 10px; }
        .feature-title { font-size: 14px; font-weight: 600; color: #293972; margin-bottom: 5px; }
        .feature-desc { font-size: 12px; color: #718096; }
        .cta-section { background: #fff5f5; border-left: 4px solid #FBA91E; padding: 25px; margin: 30px 0; border-radius: 0 8px 8px 0; }
        .cta-title { color: #293972; font-size: 18px; margin: 0 0 15px 0; }
        .cta-text { color: #4a5568; margin: 0 0 20px 0; }
        .button { display: inline-block; background: #FBA91E; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px 5px; }
        .footer { background: #293972; color: #ffffff; padding: 30px; text-align: center; }
        .footer-text { font-size: 14px; color: #a0aec0; margin-bottom: 15px; }
        .contact-info { font-size: 12px; color: #718096; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <p class="header-text">Africa Energy Technology Conference</p>
        </div>
        
        <div class="content">
            <h1 class="greeting">Welcome to AETC 2026, ${recipientName}!</h1>
            
            <p class="message">
                You're now part of Africa's premier energy technology conference. 
                Get ready to connect with industry leaders, discover innovative solutions, 
                and shape the future of energy across our continent.
            </p>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🎫</div>
                    <div class="feature-title">Ticket Management</div>
                    <div class="feature-desc">Access your tickets anytime</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <div class="feature-title">Mobile Dashboard</div>
                    <div class="feature-desc">Manage your conference experience</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔔</div>
                    <div class="feature-title">Live Updates</div>
                    <div class="feature-desc">Stay informed about sessions</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🤝</div>
                    <div class="feature-title">Networking</div>
                    <div class="feature-desc">Connect with fellow attendees</div>
                </div>
            </div>
            
            <div class="cta-section">
                <h3 class="cta-title">🚀 Ready to Get Started?</h3>
                <p class="cta-text">
                    Explore your dashboard to manage tickets, view the program, 
                    and connect with other conference attendees.
                </p>
                <a href="https://aetc.africa/dashboard" class="button">Access Dashboard</a>
                <a href="https://aetc.africa/programme" class="button">View Programme</a>
            </div>
            
            <p class="message">
                We're excited to have you join us in Accra for what promises to be 
                an incredible three days of innovation, collaboration, and progress 
                in Africa's energy sector.
            </p>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                <strong>Africa Energy Technology Conference 2026</strong><br>
                May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
            </p>
            <div class="contact-info">
                📧 info@aetconference.com • 📞 +233 548 327 906<br>
                🌐 aetc.africa • 🐦 @aetconference
            </div>
        </div>
    </div>
</body>
</html>
    `,
    text: `
Welcome to AETC 2026, ${recipientName}!

You're now part of Africa's premier energy technology conference. Get ready to connect with industry leaders, discover innovative solutions, and shape the future of energy across our continent.

Your Dashboard Features:
🎫 Ticket Management - Access your tickets anytime
📱 Mobile Dashboard - Manage your conference experience  
🔔 Live Updates - Stay informed about sessions
🤝 Networking - Connect with fellow attendees

Ready to Get Started?
Access Dashboard: https://aetc.africa/dashboard
View Programme: https://aetc.africa/programme

We're excited to have you join us in Accra for what promises to be an incredible three days of innovation, collaboration, and progress in Africa's energy sector.

Africa Energy Technology Conference 2026
May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
📧 info@aetconference.com • 📞 +233 548 327 906
    `
  }),

  // Conference Reminder Email
  conferenceReminder: (recipientName: string, daysUntil: number) => ({
    subject: `⏰ ${daysUntil} Days Until AETC 2026 - Final Preparations`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conference Reminder - AETC 2026</title>
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #293972 0%, #1f2a5a 100%); padding: 40px 30px; text-align: center; }
        .logo { color: #FBA91E; font-size: 28px; font-weight: 800; margin-bottom: 10px; }
        .header-text { color: #ffffff; font-size: 18px; font-weight: 500; margin: 0; }
        .countdown { background: #FBA91E; color: #000000; padding: 15px 30px; border-radius: 25px; font-size: 18px; font-weight: 700; display: inline-block; margin-top: 15px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 24px; font-weight: 700; color: #293972; margin-bottom: 20px; }
        .message { font-size: 16px; color: #4a5568; line-height: 1.6; margin-bottom: 30px; }
        .prep-checklist { background: #f0fff4; border: 1px solid #68d391; border-radius: 8px; padding: 25px; margin: 30px 0; }
        .prep-checklist h3 { color: #22543d; margin: 0 0 15px 0; font-size: 18px; }
        .checklist-item { display: flex; align-items: center; margin: 10px 0; }
        .checklist-icon { color: #68d391; margin-right: 10px; font-weight: bold; }
        .checklist-text { color: #2d3748; font-size: 14px; }
        .venue-info { background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 30px 0; }
        .venue-info h3 { color: #293972; margin: 0 0 15px 0; font-size: 18px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { }
        .info-label { font-size: 12px; color: #718096; font-weight: 600; text-transform: uppercase; }
        .info-value { font-size: 14px; color: #2d3748; font-weight: 600; margin-top: 5px; }
        .footer { background: #293972; color: #ffffff; padding: 30px; text-align: center; }
        .footer-text { font-size: 14px; color: #a0aec0; margin-bottom: 15px; }
        .contact-info { font-size: 12px; color: #718096; }
        .button { display: inline-block; background: #FBA91E; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 10px 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <p class="header-text">Africa Energy Technology Conference</p>
            <div class="countdown">${daysUntil} Days to Go!</div>
        </div>
        
        <div class="content">
            <h1 class="greeting">Almost Time for AETC 2026, ${recipientName}!</h1>
            
            <p class="message">
                The countdown is on! In just ${daysUntil} days, you'll be joining Africa's most 
                influential energy technology conference. Here's everything you need to know 
                to make the most of your experience.
            </p>
            
            <div class="prep-checklist">
                <h3>📋 Pre-Conference Checklist</h3>
                <div class="checklist-item">
                    <span class="checklist-icon">✓</span>
                    <span class="checklist-text">Download your QR code ticket</span>
                </div>
                <div class="checklist-item">
                    <span class="checklist-icon">✓</span>
                    <span class="checklist-text">Review the conference program</span>
                </div>
                <div class="checklist-item">
                    <span class="checklist-icon">✓</span>
                    <span class="checklist-text">Plan your networking targets</span>
                </div>
                <div class="checklist-item">
                    <span class="checklist-icon">✓</span>
                    <span class="checklist-text">Book your accommodation</span>
                </div>
                <div class="checklist-item">
                    <span class="checklist-icon">✓</span>
                    <span class="checklist-text">Prepare your business cards</span>
                </div>
            </div>
            
            <div class="venue-info">
                <h3>📍 Conference Venue</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Venue</div>
                        <div class="info-value">Accra International Conference Centre</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Address</div>
                        <div class="info-value">Independence Square, Accra</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Parking</div>
                        <div class="info-value">Available on-site</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Transport</div>
                        <div class="info-value">Uber, Bolt, Taxi available</div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://aetc.africa/dashboard" class="button">View Your Tickets</a>
                <a href="https://aetc.africa/programme" class="button">Check Programme</a>
            </div>
        </div>
        
        <div class="footer">
            <p class="footer-text">
                <strong>Africa Energy Technology Conference 2026</strong><br>
                May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
            </p>
            <div class="contact-info">
                📧 info@aetconference.com • 📞 +233 548 327 906<br>
                🌐 aetc.africa • 🐦 @aetconference
            </div>
        </div>
    </div>
</body>
</html>
    `,
    text: `
Almost Time for AETC 2026, ${recipientName}!

The countdown is on! In just ${daysUntil} days, you'll be joining Africa's most influential energy technology conference.

Pre-Conference Checklist:
✓ Download your QR code ticket
✓ Review the conference program  
✓ Plan your networking targets
✓ Book your accommodation
✓ Prepare your business cards

Conference Venue:
Accra International Conference Centre
Independence Square, Accra
Parking: Available on-site
Transport: Uber, Bolt, Taxi available

View Your Tickets: https://aetc.africa/dashboard
Check Programme: https://aetc.africa/programme

Africa Energy Technology Conference 2026
May 26-28, 2026 • Labadi Beach Hotel, Accra, Ghana
📧 info@aetconference.com • 📞 +233 548 327 906
    `
  })
};

export default emailTemplates;
