// To use this script:
// 1. Install sharp: npm install --save-dev sharp
// 2. Run: node scripts/generate-icons.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = path.join(__dirname, '../public/favicon.svg');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('🎨 Generating PWA icons...');
  
  for (const size of sizes) {
    const outputFile = path.join(outputDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(inputFile)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 9, g: 9, b: 11, alpha: 1 } // #09090b
        })
        .png()
        .toFile(outputFile);
      
      console.log(`✅ Generated ${size}x${size}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size}x${size}:`, error.message);
    }
  }
  
  console.log('✨ Done!');
}

generateIcons();
