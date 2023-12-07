const { createCanvas } = require('canvas');
const fs = require('fs');

// Function to generate a random hex color
function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to generate a random color PNG and save it to a file
function generateRandomColorPNG(filePath, width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill canvas with a random color
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, width, height);

  // Convert canvas to buffer (PNG format)
  const buffer = canvas.toBuffer('image/png');

  // Save buffer to a file
  fs.writeFileSync(filePath, buffer);
}

// Set output directory and canvas dimensions
const outputDir = 'random_color_images';
const canvasWidth = 2000;
const canvasHeight = 2000;

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate 20 random color PNG images
for (let i = 1; i <= 20; i++) {
  const outputPath = `${outputDir}/${i}.png`;
  generateRandomColorPNG(outputPath, canvasWidth, canvasHeight);
  console.log(`Image ${i} generated and saved to: ${outputPath}`);
}

console.log('Generation complete.');
