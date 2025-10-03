/**
 * Ghana VAT Calculator
 * Based on Ghana Revenue Authority (GRA) VAT Act 2013 (Act 870)
 * 
 * Standard VAT Rate: 15%
 * Additional Levies:
 * - National Health Insurance Levy (NHIL): 2.5%
 * - Ghana Education Trust Fund Levy (GETFund): 2.5%
 * - COVID-19 Health Recovery Levy (CHRL): 1%
 * 
 * Total Levies: 6%
 * Effective Total Rate: 21.9% (on pre-tax value)
 */

export interface VATBreakdown {
  basePrice: number;
  levies: {
    nhil: number;      // 2.5%
    getfund: number;   // 2.5%
    chrl: number;      // 1%
    total: number;     // 6%
  };
  vat: number;         // 15% on (base + levies)
  totalPrice: number;  // Final amount customer pays
  effectiveRate: number; // 21.9%
}

export class GhanaVATCalculator {
  // Tax rates as per Ghana law
  private static readonly VAT_RATE = 0.15; // 15%
  private static readonly NHIL_RATE = 0.025; // 2.5%
  private static readonly GETFUND_RATE = 0.025; // 2.5%
  private static readonly CHRL_RATE = 0.01; // 1%
  private static readonly TOTAL_LEVIES_RATE = 0.06; // 6%
  private static readonly EFFECTIVE_RATE = 0.219; // 21.9%

  /**
   * Calculate VAT breakdown for a given base price
   * @param basePrice - The pre-tax price of the item
   * @returns Complete VAT breakdown
   */
  static calculateVAT(basePrice: number): VATBreakdown {
    // Step 1: Calculate levies (6% of base price)
    const nhil = basePrice * this.NHIL_RATE;
    const getfund = basePrice * this.GETFUND_RATE;
    const chrl = basePrice * this.CHRL_RATE;
    const totalLevies = nhil + getfund + chrl;

    // Step 2: Calculate VAT (15% of base + levies)
    const vatBase = basePrice + totalLevies;
    const vat = vatBase * this.VAT_RATE;

    // Step 3: Calculate total price
    const totalPrice = basePrice + totalLevies + vat;

    return {
      basePrice,
      levies: {
        nhil,
        getfund,
        chrl,
        total: totalLevies
      },
      vat,
      totalPrice,
      effectiveRate: this.EFFECTIVE_RATE
    };
  }

  /**
   * Calculate base price from VAT-inclusive price
   * @param vatInclusivePrice - Price including all taxes
   * @returns Base price before taxes
   */
  static calculateBaseFromVATInclusive(vatInclusivePrice: number): number {
    // Reverse calculation: VAT Inclusive = Base × 1.219
    return vatInclusivePrice / (1 + this.EFFECTIVE_RATE);
  }

  /**
   * Format currency for display
   * @param amount - Amount to format
   * @returns Formatted currency string
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  /**
   * Get VAT rates for display
   */
  static getVATRates() {
    return {
      vat: this.VAT_RATE,
      nhil: this.NHIL_RATE,
      getfund: this.GETFUND_RATE,
      chrl: this.CHRL_RATE,
      totalLevies: this.TOTAL_LEVIES_RATE,
      effectiveRate: this.EFFECTIVE_RATE
    };
  }
}

/**
 * Helper function to calculate VAT for ticket pricing
 */
export function calculateTicketVAT(basePrice: number): VATBreakdown {
  return GhanaVATCalculator.calculateVAT(basePrice);
}

/**
 * Helper function to format VAT breakdown for display
 */
export function formatVATBreakdown(breakdown: VATBreakdown) {
  return {
    basePrice: GhanaVATCalculator.formatCurrency(breakdown.basePrice),
    levies: {
      nhil: GhanaVATCalculator.formatCurrency(breakdown.levies.nhil),
      getfund: GhanaVATCalculator.formatCurrency(breakdown.levies.getfund),
      chrl: GhanaVATCalculator.formatCurrency(breakdown.levies.chrl),
      total: GhanaVATCalculator.formatCurrency(breakdown.levies.total)
    },
    vat: GhanaVATCalculator.formatCurrency(breakdown.vat),
    totalPrice: GhanaVATCalculator.formatCurrency(breakdown.totalPrice)
  };
}
