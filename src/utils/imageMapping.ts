
// Auto-generated image mapping
export const imageMapping: Record<string, string> = {
  "/Images/AETC 2025 PICS 1-24.JPG": "/images-optimized/aetc-2025-pics-1-24.webp",
  "/Images/AETC 2025 PICS 1-57.JPG": "/images-optimized/aetc-2025-pics-1-57.webp",
  "/Images/AETC 2025 PICS 1-67.JPG": "/images-optimized/aetc-2025-pics-1-67.webp",
  "/Images/AETC 2025 PICS 1-69.JPG": "/images-optimized/aetc-2025-pics-1-69.webp"
};

export const getOptimizedImagePath = (originalPath: string): string => {
  return imageMapping[originalPath] || originalPath;
};
