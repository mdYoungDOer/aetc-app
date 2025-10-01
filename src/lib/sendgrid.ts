import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: any;
}

export class SendGridService {
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL || 'notify@ardentwebservices.com';
    this.fromName = process.env.SENDGRID_FROM_NAME || 'AETC 2026';
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    const msg: any = {
      to: options.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      subject: options.subject,
      ...(options.text && { text: options.text }),
      ...(options.html && { html: options.html }),
      ...(options.templateId && {
        templateId: options.templateId,
        dynamicTemplateData: options.dynamicTemplateData,
      }),
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent to ${options.to}`);
    } catch (error) {
      console.error('SendGrid error:', error);
      throw error;
    }
  }

  async sendOTP(email: string, code: string): Promise<void> {
    const html = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #293972; font-family: 'Plus Jakarta Sans', sans-serif;">AET Conference 2026</h1>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 8px;">
          <h2 style="color: #293972; margin-bottom: 20px;">Verification Code</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Your verification code for AET Conference 2026 is:
          </p>
          <div style="background: #293972; color: #FBA91E; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 8px; margin: 20px 0; letter-spacing: 8px;">
            ${code}
          </div>
          <p style="font-size: 14px; color: #666;">
            This code will expire in 10 minutes. If you didn't request this code, please ignore this email.
          </p>
        </div>
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
          <p>© ${new Date().getFullYear()} Africa Energy Technology Conference. All rights reserved.</p>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Your AET 2026 Verification Code',
      html,
      text: `Your AET 2026 verification code: ${code}`,
    });
  }

  async sendTicketConfirmation(email: string, data: {
    name: string;
    ticketType: string;
    ticketNumber: string;
    quantity: number;
    totalAmount: number;
    orderRef: string;
  }): Promise<void> {
    const html = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #293972; font-family: 'Plus Jakarta Sans', sans-serif;">AET Conference 2026</h1>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 8px;">
          <h2 style="color: #293972; margin-bottom: 20px;">🎉 Ticket Purchase Confirmed!</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Hi ${data.name},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Thank you for registering for the Africa Energy Technology Conference 2026! Your payment has been confirmed.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #78C044;">
            <h3 style="color: #293972; margin-top: 0;">Order Details</h3>
            <p><strong>Ticket Type:</strong> ${data.ticketType}</p>
            <p><strong>Quantity:</strong> ${data.quantity}</p>
            <p><strong>Total Amount:</strong> ₵${data.totalAmount.toLocaleString()}</p>
            <p><strong>Order Reference:</strong> ${data.orderRef}</p>
            <p><strong>Ticket Number:</strong> ${data.ticketNumber}</p>
          </div>
          <p style="font-size: 14px; color: #666;">
            Your tickets are now available in your dashboard. You can access them anytime, download your QR codes, and manage your registration details.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" 
               style="background: #FBA91E; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
              View My Tickets
            </a>
          </div>
        </div>
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
          <p>© ${new Date().getFullYear()} Africa Energy Technology Conference. All rights reserved.</p>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Your AETC 2026 Ticket Confirmation',
      html,
      text: `Your AETC 2026 ticket purchase is confirmed! Order: ${data.orderRef}, Ticket: ${data.ticketNumber}`,
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #293972; font-family: 'Plus Jakarta Sans', sans-serif;">Welcome to AETC 2026!</h1>
        </div>
        <div style="background: #f5f5f5; padding: 30px; border-radius: 8px;">
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Hi ${name},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Welcome to the Africa Energy Technology Conference 2026! We're excited to have you join us.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Your account has been created successfully. You can now access your dashboard to view your tickets, update your profile, and stay updated on conference news.
          </p>
        </div>
        <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
          <p>© ${new Date().getFullYear()} Africa Energy Technology Conference. All rights reserved.</p>
        </div>
      </div>
    `;

    await this.sendEmail({
      to: email,
      subject: 'Welcome to AETC 2026',
      html,
      text: `Welcome to AETC 2026, ${name}! Your account has been created successfully.`,
    });
  }
}

export const sendGridService = new SendGridService();

