const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 }
];

const publicDir = path.join(__dirname, '..', 'public');
const sourceIcon = path.join(publicDir, 'favicon.ico');

async function generateFavicons() {
  try {
    // Read the source icon
    const image = sharp(sourceIcon);
    
    // Generate each size
    for (const { name, size } of sizes) {
      await image
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`Generated ${name}`);
    }
    
    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 