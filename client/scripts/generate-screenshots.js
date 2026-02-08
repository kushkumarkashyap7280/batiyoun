// Script to generate placeholder PWA screenshots
// To use: node scripts/generate-screenshots.js

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputDir = path.join(__dirname, '../public/screenshots');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateScreenshots() {
  console.log('📸 Generating PWA screenshots...');

  // Desktop screenshot (1920x1080)
  await sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 } // #09090b
    }
  })
  .png()
  .toFile(path.join(outputDir, 'desktop-home.png'));
  
  console.log('✅ Generated desktop-home.png (1920x1080)');

  // Mobile screenshot (1080x1920)
  await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 }
    }
  })
  .png()
  .toFile(path.join(outputDir, 'mobile-home.png'));
  
  console.log('✅ Generated mobile-home.png (1080x1920)');

  console.log('✨ Done! Replace these with actual app screenshots.');
}

generateScreenshots();
