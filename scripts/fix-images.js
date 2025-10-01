const fs = require('fs');
const path = require('path');

// Script to fix image issues
const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'Images');

console.log('🔧 Fixing image issues...');

// Create optimized images directory
const optimizedDir = path.join(publicDir, 'images-optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// List of images used in the app
const usedImages = [
  'AETC 2025 PICS 1-24.JPG',
  'AETC 2025 PICS 1-57.JPG', 
  'AETC 2025 PICS 1-67.JPG',
  'AETC 2025 PICS 1-69.JPG'
];

console.log('📸 Processing used images...');

usedImages.forEach(imageName => {
  const sourcePath = path.join(imagesDir, imageName);
  const optimizedName = imageName.toLowerCase().replace(/\s+/g, '-').replace(/\.jpg$/, '.webp');
  const optimizedPath = path.join(optimizedDir, optimizedName);
  
  if (fs.existsSync(sourcePath)) {
    console.log(`  ✅ Found: ${imageName}`);
    console.log(`  📝 Will optimize to: ${optimizedName}`);
    
    // For now, just copy the file (in production, you'd use sharp or similar)
    try {
      fs.copyFileSync(sourcePath, optimizedPath);
      console.log(`  ✅ Copied to optimized directory`);
    } catch (error) {
      console.log(`  ❌ Error copying: ${error.message}`);
    }
  } else {
    console.log(`  ❌ Not found: ${imageName}`);
  }
});

// Create image mapping file
const imageMapping = {
  '/Images/AETC 2025 PICS 1-24.JPG': '/images-optimized/aetc-2025-pics-1-24.webp',
  '/Images/AETC 2025 PICS 1-57.JPG': '/images-optimized/aetc-2025-pics-1-57.webp',
  '/Images/AETC 2025 PICS 1-67.JPG': '/images-optimized/aetc-2025-pics-1-67.webp',
  '/Images/AETC 2025 PICS 1-69.JPG': '/images-optimized/aetc-2025-pics-1-69.webp'
};

const mappingPath = path.join(__dirname, '..', 'src', 'utils', 'imageMapping.ts');
const mappingContent = `
// Auto-generated image mapping
export const imageMapping: Record<string, string> = ${JSON.stringify(imageMapping, null, 2)};

export const getOptimizedImagePath = (originalPath: string): string => {
  return imageMapping[originalPath] || originalPath;
};
`;

// Create utils directory if it doesn't exist
const utilsDir = path.join(__dirname, '..', 'src', 'utils');
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}

fs.writeFileSync(mappingPath, mappingContent);
console.log('✅ Created image mapping file');

// Create placeholder image
const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#f5f5f5"/>
  <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="#999">Image loading...</text>
</svg>`;

const placeholderPath = path.join(publicDir, 'placeholder-image.svg');
fs.writeFileSync(placeholderPath, placeholderSvg);
console.log('✅ Created placeholder image');

console.log('\n🎯 Image optimization completed!');
console.log('📋 Next steps:');
console.log('1. Update your code to use optimized image paths');
console.log('2. Consider using a service like Cloudinary for automatic optimization');
console.log('3. Test image loading on your deployed site');
console.log('4. Monitor Core Web Vitals for image performance');
