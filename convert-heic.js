// convert-heic.js
const fs = require('fs');
const heicConvert = require('heic-convert');

(async () => {
  const [inputPath, outputPath] = process.argv.slice(2);

  try {
    const inputBuffer = await fs.promises.readFile(inputPath);
    const outputBuffer = await heicConvert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 1,
    });
    await fs.promises.writeFile(outputPath, outputBuffer);
    console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
    process.exit(0);
  } catch (err) {
    console.error(`❌ Conversion failed: ${inputPath} → ${err.message}`);
    process.exit(1);
  }
})();
