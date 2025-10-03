export const cleanEmailTemplates = {
  ticketPurchaseSuccess: (data: {
    customerName: string;
    customerEmail: string;
    ticketName: string;
    quantity: number;
    totalAmount: number;
    orderId: string;
    qrCode?: string;
  }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AETC 2026 - Ticket Confirmation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #293972;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #293972;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        .success-badge {
            background: #78C044;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
            margin-bottom: 20px;
        }
        .ticket-details {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .label {
            font-weight: 600;
            color: #293972;
        }
        .value {
            color: #333;
        }
        .total {
            background: #293972;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-size: 18px;
            font-weight: 700;
            margin: 20px 0;
        }
        .qr-section {
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .qr-code {
            max-width: 200px;
            height: auto;
            margin: 10px 0;
        }
        .instructions {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .instructions h3 {
            color: #856404;
            margin-top: 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 14px;
        }
        .contact-info {
            background: #293972;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .contact-info h3 {
            margin-top: 0;
            color: white;
        }
        .btn {
            display: inline-block;
            background: #FBA91E;
            color: #000;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 5px;
        }
        .btn:hover {
            background: #e09915;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <div class="subtitle">Africa Energy Technology Conference</div>
        </div>

        <div class="success-badge">✓ Purchase Confirmed</div>

        <h2>Hello ${data.customerName},</h2>
        
        <p>Thank you for your purchase! Your tickets for the Africa Energy Technology Conference 2026 have been successfully confirmed.</p>

        <div class="ticket-details">
            <h3 style="margin-top: 0; color: #293972;">Ticket Details</h3>
            <div class="detail-row">
                <span class="label">Ticket Type:</span>
                <span class="value">${data.ticketName}</span>
            </div>
            <div class="detail-row">
                <span class="label">Quantity:</span>
                <span class="value">${data.quantity}</span>
            </div>
            <div class="detail-row">
                <span class="label">Order ID:</span>
                <span class="value">${data.orderId}</span>
            </div>
            <div class="detail-row">
                <span class="label">Purchase Date:</span>
                <span class="value">${new Date().toLocaleDateString()}</span>
            </div>
        </div>

        <div class="total">
            Total Paid: ₵${data.totalAmount.toLocaleString()}
        </div>

        ${data.qrCode ? `
        <div class="qr-section">
            <h3>Your QR Code</h3>
            <p>Present this QR code at the conference entrance:</p>
            <img src="${data.qrCode}" alt="QR Code" class="qr-code">
        </div>
        ` : ''}

        <div class="instructions">
            <h3>Important Information</h3>
            <ul>
                <li>Save this email as your ticket confirmation</li>
                <li>Bring a valid ID to the conference</li>
                <li>Arrive 30 minutes before your session starts</li>
                <li>Check our website for any updates</li>
            </ul>
        </div>

        <div class="contact-info">
            <h3>Conference Details</h3>
            <p><strong>Date:</strong> March 2026</p>
            <p><strong>Venue:</strong> Labadi Beach Hotel, Accra, Ghana</p>
            <p><strong>Website:</strong> <a href="https://aetc.africa" style="color: #FBA91E;">aetc.africa</a></p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="https://aetc.africa/my-tickets" class="btn">View My Tickets</a>
            <a href="https://aetc.africa" class="btn">Conference Info</a>
        </div>

        <div class="footer">
            <p>Need assistance? Contact us at <a href="mailto:support@aetc.africa" style="color: #293972;">support@aetc.africa</a></p>
            <p>© 2026 Africa Energy Technology Conference. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
  },

  accountVerification: (data: {
    customerName: string;
    customerEmail: string;
    otpCode: string;
    expiresIn: string;
  }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AETC 2026 - Account Verification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #293972;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #293972;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        .otp-code {
            background: #293972;
            color: white;
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            letter-spacing: 4px;
        }
        .instructions {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .instructions h3 {
            color: #293972;
            margin-top: 0;
        }
        .security-note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 14px;
        }
        .btn {
            display: inline-block;
            background: #FBA91E;
            color: #000;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 5px;
        }
        .btn:hover {
            background: #e09915;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <div class="subtitle">Africa Energy Technology Conference</div>
        </div>

        <h2>Hello ${data.customerName},</h2>
        
        <p>Welcome to AETC 2026! To complete your account setup and access your tickets, please verify your email address using the code below.</p>

        <div class="otp-code">${data.otpCode}</div>

        <div class="instructions">
            <h3>How to verify your account:</h3>
            <ol>
                <li>Copy the verification code above</li>
                <li>Visit <a href="https://aetc.africa/auth/verify-otp" style="color: #293972;">aetc.africa/auth/verify-otp</a></li>
                <li>Enter your email and the verification code</li>
                <li>Click "Verify Account" to complete setup</li>
            </ol>
        </div>

        <div class="security-note">
            <strong>Security Note:</strong> This code expires in ${data.expiresIn} and can only be used once. Never share this code with anyone.
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="https://aetc.africa/auth/verify-otp" class="btn">Verify My Account</a>
            <a href="https://aetc.africa/my-tickets" class="btn">View My Tickets</a>
        </div>

        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:support@aetc.africa" style="color: #293972;">support@aetc.africa</a></p>
            <p>© 2026 Africa Energy Technology Conference. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
  },

  accountCredentials: (data: {
    customerName: string;
    customerEmail: string;
    password: string;
    loginUrl: string;
  }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AETC 2026 - Account Credentials</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #293972;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #293972;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        .credentials-box {
            background: #f8f9fa;
            border: 2px solid #293972;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .credential-item {
            margin: 15px 0;
        }
        .label {
            font-weight: 600;
            color: #293972;
            display: block;
            margin-bottom: 5px;
        }
        .value {
            font-size: 18px;
            font-weight: 700;
            color: #333;
            background: white;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .login-button {
            display: inline-block;
            background: #FBA91E;
            color: #000;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            font-size: 16px;
        }
        .login-button:hover {
            background: #e09915;
        }
        .security-note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .security-note h3 {
            color: #856404;
            margin-top: 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 14px;
        }
        .features {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .features h3 {
            color: #293972;
            margin-top: 0;
        }
        .features ul {
            margin: 0;
            padding-left: 20px;
        }
        .features li {
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <div class="subtitle">Africa Energy Technology Conference</div>
        </div>

        <h2>Welcome to AETC 2026, ${data.customerName}!</h2>
        
        <p>Your account has been successfully created. Here are your login credentials to access your ticket dashboard:</p>

        <div class="credentials-box">
            <div class="credential-item">
                <span class="label">Email Address:</span>
                <div class="value">${data.customerEmail}</div>
            </div>
            <div class="credential-item">
                <span class="label">Password:</span>
                <div class="value">${data.password}</div>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="${data.loginUrl}" class="login-button">Access Your Dashboard</a>
        </div>

        <div class="features">
            <h3>What you can do in your dashboard:</h3>
            <ul>
                <li>View all your conference tickets</li>
                <li>Download QR codes for each ticket</li>
                <li>Access conference materials and updates</li>
                <li>Update your profile information</li>
                <li>View your order history</li>
            </ul>
        </div>

        <div class="security-note">
            <h3>Security Information</h3>
            <p><strong>Important:</strong> Please save these credentials in a secure location. For security reasons, we recommend changing your password after your first login.</p>
            <p>If you have any issues accessing your account, please contact our support team immediately.</p>
        </div>

        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:support@aetc.africa" style="color: #293972;">support@aetc.africa</a></p>
            <p>© 2026 Africa Energy Technology Conference. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
  },

  passwordReset: (data: {
    customerName: string;
    customerEmail: string;
    newPassword: string;
    loginUrl: string;
    resetUrl: string;
  }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AETC 2026 - Password Reset</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #293972;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #293972;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 16px;
        }
        .credentials-box {
            background: #f8f9fa;
            border: 2px solid #293972;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .credential-item {
            margin: 15px 0;
        }
        .label {
            font-weight: 600;
            color: #293972;
            display: block;
            margin-bottom: 5px;
        }
        .value {
            font-size: 18px;
            font-weight: 700;
            color: #333;
            background: white;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
        .login-button {
            display: inline-block;
            background: #FBA91E;
            color: #000;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            font-size: 16px;
        }
        .login-button:hover {
            background: #e09915;
        }
        .security-note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .security-note h3 {
            color: #856404;
            margin-top: 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AETC 2026</div>
            <div class="subtitle">Africa Energy Technology Conference</div>
        </div>

        <h2>Password Reset Request, ${data.customerName}!</h2>
        
        <p>We received a request to reset your password for your AETC 2026 account. You have two options to proceed:</p>

        <div style="background: #f8f9fa; border: 2px solid #293972; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #293972; margin-top: 0;">Option 1: Use Your New Temporary Password</h3>
            <div class="credentials-box">
                <div class="credential-item">
                    <span class="label">Email Address:</span>
                    <div class="value">${data.customerEmail}</div>
                </div>
                <div class="credential-item">
                    <span class="label">Temporary Password:</span>
                    <div class="value">${data.newPassword}</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
                <a href="${data.loginUrl}" class="login-button">Sign In with Temporary Password</a>
            </div>
        </div>

        <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Option 2: Set Your Own Password (Recommended)</h3>
            <p>For better security, you can set your own password using our secure reset form:</p>
            <div style="text-align: center; margin-top: 15px;">
                <a href="${data.resetUrl || `${data.loginUrl}?reset=true&email=${encodeURIComponent(data.customerEmail)}`}" class="login-button" style="background: #2196f3;">Set Your Own Password</a>
            </div>
        </div>

        <div class="security-note">
            <h3>Security Information</h3>
            <p><strong>Important:</strong> The temporary password is only valid for 24 hours. For security reasons, we recommend using Option 2 to set your own password.</p>
            <p>If you did not request this password reset, please contact our support team immediately at <a href="mailto:support@aetc.africa" style="color: #293972;">support@aetc.africa</a></p>
        </div>

        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:support@aetc.africa" style="color: #293972;">support@aetc.africa</a></p>
            <p>© 2026 Africa Energy Technology Conference. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
  },

  attendeeConfirmation: ({
    attendeeName,
    attendeeEmail,
    ticketName,
    ticketType,
    conferenceDate,
    conferenceVenue,
    verificationToken,
    loginUrl,
  }: {
    attendeeName: string;
    attendeeEmail: string;
    ticketName: string;
    ticketType: string;
    conferenceDate: string;
    conferenceVenue: string;
    verificationToken: string;
    loginUrl: string;
  }) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your AETC 2026 Attendee Information Confirmation</title>
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #293972 0%, #151443 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        .content {
          padding: 40px 30px;
        }
        .success-icon {
          text-align: center;
          margin-bottom: 30px;
        }
        .success-icon .icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #78C044 0%, #5A9A2E 100%);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: white;
          margin-bottom: 20px;
        }
        .ticket-info {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 25px;
          margin: 30px 0;
          border-left: 4px solid #FBA91E;
        }
        .ticket-info h3 {
          margin: 0 0 15px 0;
          color: #293972;
          font-size: 18px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e9ecef;
        }
        .info-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .info-label {
          font-weight: 600;
          color: #666;
        }
        .info-value {
          color: #333;
          font-weight: 500;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #FBA91E 0%, #E8960A 100%);
          color: white;
          text-decoration: none;
          padding: 15px 30px;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
          margin: 20px 0;
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(251, 169, 30, 0.3);
        }
        .footer {
          background-color: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }
        .footer p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        .footer a {
          color: #293972;
          text-decoration: none;
        }
        .highlight {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
        }
        .highlight p {
          margin: 0;
          color: #856404;
          font-size: 14px;
        }
        @media (max-width: 600px) {
          .container {
            margin: 0;
            border-radius: 0;
          }
          .header, .content, .footer {
            padding: 20px;
          }
          .info-row {
            flex-direction: column;
          }
          .info-label {
            margin-bottom: 5px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Attendee Information Confirmed</h1>
          <p>Your AETC 2026 registration details have been successfully submitted</p>
        </div>
        
        <div class="content">
          <div class="success-icon">
            <div class="icon">✓</div>
            <h2 style="margin: 0; color: #293972;">Thank You, ${attendeeName}!</h2>
            <p style="color: #666; margin: 10px 0 0 0;">Your attendee information has been successfully submitted and confirmed.</p>
          </div>

          <div class="ticket-info">
            <h3>Your Conference Details</h3>
            <div class="info-row">
              <span class="info-label">Ticket Type:</span>
              <span class="info-value">${ticketName} (${ticketType})</span>
            </div>
            <div class="info-row">
              <span class="info-label">Conference Date:</span>
              <span class="info-value">${conferenceDate}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Venue:</span>
              <span class="info-value">${conferenceVenue}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span class="info-value">${attendeeEmail}</span>
            </div>
          </div>

          <div class="highlight">
            <p><strong>Important:</strong> Your attendee information is now on file and will be used for conference planning, networking opportunities, and personalized experiences. You can view and update your information anytime through your dashboard.</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" class="cta-button">View My Tickets & Information</a>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="margin: 0 0 15px 0; color: #293972;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #666;">
              <li>You'll receive conference updates and important information via email</li>
              <li>Your networking preferences will help us connect you with relevant attendees</li>
              <li>Dietary and accessibility requirements will be noted for the event</li>
              <li>You can update your information anytime before the conference</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p>
            Questions? Contact us at <a href="mailto:support@aetc.africa">support@aetc.africa</a>
          </p>
          <p style="margin-top: 15px; font-size: 12px; color: #999;">
            This email was sent to ${attendeeEmail} because you submitted attendee information for AETC 2026.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
};
