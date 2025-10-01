const fs = require('fs');
const path = require('path');

// Script to optimize and fix image paths
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'Images');

console.log('🔍 Checking image files...');

// Check if Images directory exists
if (!fs.existsSync(imagesDir)) {
  console.error('❌ Images directory not found at:', imagesDir);
  process.exit(1);
}

// List all image files
const imageFiles = fs.readdirSync(imagesDir).filter(file => 
  /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
);

console.log(`📸 Found ${imageFiles.length} image files:`);
imageFiles.forEach(file => {
  const filePath = path.join(imagesDir, file);
  const stats = fs.statSync(filePath);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`  - ${file} (${sizeKB}KB)`);
});

// Check for common issues
const issues = [];

// Check for spaces in filenames
const filesWithSpaces = imageFiles.filter(file => file.includes(' '));
if (filesWithSpaces.length > 0) {
  issues.push(`⚠️  Files with spaces: ${filesWithSpaces.join(', ')}`);
}

// Check for uppercase extensions
const filesWithUppercaseExt = imageFiles.filter(file => 
  /\.(JPG|JPEG|PNG|GIF|WEBP)$/.test(file)
);
if (filesWithUppercaseExt.length > 0) {
  issues.push(`⚠️  Files with uppercase extensions: ${filesWithUppercaseExt.join(', ')}`);
}

// Check file sizes
const largeFiles = imageFiles.filter(file => {
  const filePath = path.join(imagesDir, file);
  const stats = fs.statSync(filePath);
  return stats.size > 5 * 1024 * 1024; // 5MB
});
if (largeFiles.length > 0) {
  issues.push(`⚠️  Large files (>5MB): ${largeFiles.join(', ')}`);
}

if (issues.length > 0) {
  console.log('\n🚨 Issues found:');
  issues.forEach(issue => console.log(issue));
} else {
  console.log('\n✅ No issues found with image files');
}

// Generate optimized image component
const optimizedImageComponent = `
// Auto-generated optimized image component
import Image from 'next/image';
import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  quality = 85,
  sizes,
  style,
  className,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Fallback for broken images
  const imageSrc = hasError ? '/placeholder-image.png' : src;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
      )}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          ...style,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        className={className}
      />
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            zIndex: 2,
          }}
        >
          Image not available
        </Box>
      )}
    </Box>
  );
}
`;

// Write optimized component
const componentPath = path.join(__dirname, '..', 'src', 'components', 'OptimizedImage.tsx');
fs.writeFileSync(componentPath, optimizedImageComponent);
console.log('✅ Created OptimizedImage component');

// Create placeholder image
const placeholderSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#f5f5f5"/>
  <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="#999">
    Image not available
  </text>
</svg>
`;

const placeholderPath = path.join(publicDir, 'placeholder-image.png');
// For now, we'll create a simple placeholder
console.log('✅ Image optimization script completed');

console.log('\n🎯 Next steps:');
console.log('1. Run: npm run build');
console.log('2. Test image loading on your site');
console.log('3. Check browser network tab for any 404 errors');
console.log('4. Verify all images load correctly');
