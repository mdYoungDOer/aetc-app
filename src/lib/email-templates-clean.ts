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

        <h2>Password Reset Complete, ${data.customerName}!</h2>
        
        <p>Your password has been successfully reset. Here are your new login credentials:</p>

        <div class="credentials-box">
            <div class="credential-item">
                <span class="label">Email Address:</span>
                <div class="value">${data.customerEmail}</div>
            </div>
            <div class="credential-item">
                <span class="label">New Password:</span>
                <div class="value">${data.newPassword}</div>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="${data.loginUrl}" class="login-button">Access Your Dashboard</a>
        </div>

        <div class="security-note">
            <h3>Security Information</h3>
            <p><strong>Important:</strong> Please save these new credentials in a secure location. For security reasons, we recommend changing your password after your first login.</p>
            <p>If you did not request this password reset, please contact our support team immediately.</p>
        </div>

        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:support@aetc.africa" style="color: #293972;">support@aetc.africa</a></p>
            <p>© 2026 Africa Energy Technology Conference. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
  }
};
