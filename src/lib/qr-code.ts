import QRCode from 'qrcode';

export interface QRCodeData {
  ticketNumber: string;
  orderId: string;
  attendeeName: string;
  attendeeEmail: string;
  ticketType: string;
  purchaseDate: string;
  eventName: string;
  eventDate: string;
  venue: string;
}

export class QRCodeService {
  /**
   * Generate a QR code data URL for a ticket
   */
  static async generateQRCode(data: QRCodeData): Promise<string> {
    try {
      const qrData = {
        ticketNumber: data.ticketNumber,
        orderId: data.orderId,
        attendeeName: data.attendeeName,
        attendeeEmail: data.attendeeEmail,
        ticketType: data.ticketType,
        purchaseDate: data.purchaseDate,
        eventName: data.eventName,
        eventDate: data.eventDate,
        venue: data.venue,
        verified: false,
        timestamp: new Date().toISOString()
      };

      const qrString = JSON.stringify(qrData);
      
      const qrCodeDataURL = await QRCode.toDataURL(qrString, {
        width: 300,
        margin: 2,
        color: {
          dark: '#293972',  // Primary color
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });

      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Generate QR code for multiple tickets
   */
  static async generateMultipleQRCodes(
    baseData: Omit<QRCodeData, 'ticketNumber'>,
    quantity: number
  ): Promise<{ ticketNumber: string; qrCode: string }[]> {
    const qrCodes = [];

    for (let i = 1; i <= quantity; i++) {
      const ticketNumber = `AETC${Date.now()}${String(i).padStart(3, '0')}`;
      
      const qrCodeData: QRCodeData = {
        ...baseData,
        ticketNumber
      };

      const qrCode = await this.generateQRCode(qrCodeData);
      
      qrCodes.push({
        ticketNumber,
        qrCode
      });
    }

    return qrCodes;
  }

  /**
   * Generate a simple QR code with just ticket number and order ID
   */
  static async generateSimpleQRCode(ticketNumber: string, orderId: string): Promise<string> {
    try {
      const qrData = {
        ticketNumber,
        orderId,
        timestamp: new Date().toISOString()
      };

      const qrString = JSON.stringify(qrData);
      
      const qrCodeDataURL = await QRCode.toDataURL(qrString, {
        width: 200,
        margin: 2,
        color: {
          dark: '#293972',
          light: '#FFFFFF'
        }
      });

      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating simple QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Validate QR code data
   */
  static validateQRCode(qrData: any): boolean {
    try {
      const requiredFields = ['ticketNumber', 'orderId', 'timestamp'];
      return requiredFields.every(field => qrData[field]);
    } catch {
      return false;
    }
  }
}
