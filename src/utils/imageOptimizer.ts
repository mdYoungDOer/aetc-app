// Image optimization utilities for AETC 2026

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
}

export const getOptimizedImageProps = (
  src: string,
  alt: string,
  options: Partial<OptimizedImageProps> = {}
): OptimizedImageProps => ({
  src,
  alt,
  width: options.width || 800,
  height: options.height || 600,
  quality: options.quality || 85,
  priority: options.priority || false,
  sizes: options.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
});

// Pre-optimized image configurations for common use cases
export const IMAGE_CONFIGS = {
  hero: {
    quality: 90,
    priority: true,
    sizes: '100vw',
  },
  card: {
    quality: 80,
    priority: false,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
  thumbnail: {
    quality: 75,
    priority: false,
    sizes: '(max-width: 768px) 50vw, 25vw',
  },
  avatar: {
    quality: 80,
    priority: false,
    sizes: '100px',
  },
} as const;

// CDN-optimized image URLs (if using Supabase Storage)
export const getCDNImageUrl = (path: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg';
} = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = 'aetc-assets';
  
  if (!baseUrl) return path;
  
  const { width, height, quality = 85, format = 'webp' } = options;
  const params = new URLSearchParams();
  
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  if (quality) params.append('quality', quality.toString());
  if (format) params.append('format', format);
  
  const queryString = params.toString();
  return `${baseUrl}/storage/v1/object/public/${bucket}/${path}${queryString ? `?${queryString}` : ''}`;
};
