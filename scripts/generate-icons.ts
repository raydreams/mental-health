import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = {
  favicon: 32,
  apple: 180,
  android: [192, 512],
};

const sourceImage = path.join(process.cwd(), 'public', 'apple-touch-icon.png');
const outputDir = path.join(process.cwd(), 'public', 'icons');

async function generateIcons() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate favicon
    await sharp(sourceImage)
      .resize(sizes.favicon, sizes.favicon)
      .toFile(path.join(outputDir, 'favicon.ico'));

    // Generate apple touch icon
    await sharp(sourceImage)
      .resize(sizes.apple, sizes.apple)
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));

    // Generate Android Chrome icons
    for (const size of sizes.android) {
      await sharp(sourceImage)
        .resize(size, size)
        .toFile(path.join(outputDir, `android-chrome-${size}x${size}.png`));
    }

    console.log('✨ Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 