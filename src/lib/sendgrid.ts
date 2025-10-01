import sgMail from '@sendgrid/mail';
import { emailTemplates } from './email-templates';

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

  async sendOTP(email: string, code: string, recipientName: string = 'Valued Attendee'): Promise<void> {
    const template = emailTemplates.otpVerification(code, recipientName);
    
    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  async sendTicketConfirmation(email: string, orderData: any, qrCodeUrl: string = ''): Promise<void> {
    const template = emailTemplates.purchaseConfirmation(orderData, qrCodeUrl);
    
    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const template = emailTemplates.welcomeEmail(name);
    
    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  // Conference Reminder Email
  async sendConferenceReminder(email: string, name: string, daysUntil: number): Promise<void> {
    const template = emailTemplates.conferenceReminder(name, daysUntil);
    
    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }
}

export const sendGridService = new SendGridService();

