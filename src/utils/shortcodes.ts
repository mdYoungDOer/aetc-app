/**
 * Parse shortcodes in text content
 * Supports format: [shortcode_name attribute="value"]
 */

export interface Shortcode {
  name: string;
  attributes: Record<string, string>;
  content?: string;
}

export function parseShortcodes(text: string): { text: string; shortcodes: Shortcode[] } {
  const shortcodes: Shortcode[] = [];
  const shortcodeRegex = /\[(\w+)([^\]]*)\]/g;
  
  let match;
  while ((match = shortcodeRegex.exec(text)) !== null) {
    const name = match[1];
    const attributesString = match[2];
    
    // Parse attributes
    const attributes: Record<string, string> = {};
    const attrRegex = /(\w+)="([^"]+)"/g;
    let attrMatch;
    
    while ((attrMatch = attrRegex.exec(attributesString)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }
    
    shortcodes.push({
      name,
      attributes,
    });
  }
  
  return { text, shortcodes };
}

export function replaceShortcode(text: string, shortcodeName: string, replacement: string): string {
  const regex = new RegExp(`\\[${shortcodeName}[^\\]]*\\]`, 'g');
  return text.replace(regex, replacement);
}

export function hasShortcode(text: string, shortcodeName: string): boolean {
  const regex = new RegExp(`\\[${shortcodeName}[^\\]]*\\]`);
  return regex.test(text);
}

/**
 * Extract form ID from form shortcode
 * Example: [form id="123abc"] returns "123abc"
 */
export function extractFormId(shortcode: string): string | null {
  const match = shortcode.match(/\[form\s+id="([^"]+)"\]/);
  return match ? match[1] : null;
}

