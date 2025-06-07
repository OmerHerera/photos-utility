const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const heicConvert = require('heic-convert');
const fileType = require('file-type');
const monthNames = [
  'NO-MONTH', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];
const month = monthNames[12];

const SOURCE_DIR = `/Users/omher/Downloads/OMER_PHOTOS_24_23/2024/sorted-by-month/${month}`;    // Change to your source folder
// const SOURCE_DIR = './heic-files';    // Change to your source folder
const OUTPUT_DIR = `/Users/omher/Downloads/OMER_PHOTOS_24_23/2024/sorted-by-month/${month}-CONVERTED`;    // Output folder
// const OUTPUT_DIR = './jpg-output';    // Output folder

async function processFiles() {
  await fse.ensureDir(OUTPUT_DIR);

  const files = await fs.promises.readdir(SOURCE_DIR);

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const ext = path.extname(file).toLowerCase();

    try {
      const inputBuffer = await fs.promises.readFile(inputPath);

      if (ext === '.heic') {
        // Validate file type of .heic files
        const type = await fileType.fromBuffer(inputBuffer);

        if (!type) {
          console.warn(`⚠️ Skipped ${file}: Unknown file type`);
          continue;
        }

        if (type.ext === 'heic') {
          // Convert HEIC → JPG
          const outputFile = path.join(OUTPUT_DIR, path.basename(file, ext) + '.jpg');
          const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 1,
          });
          await fs.promises.writeFile(outputFile, outputBuffer);
          console.log(`✅ Converted HEIC: ${file} → ${path.basename(outputFile)}`);

        } else {
          // Move misnamed HEIC (e.g. actually jpg) with correct extension
          const correctedName = path.basename(file, ext) + '.' + type.ext;
          const outputFile = path.join(OUTPUT_DIR, correctedName);
          await fse.move(inputPath, outputFile, { overwrite: true });
          console.log(`📁 Moved misnamed file: ${file} → ${correctedName}`);
        }

      } else {
        // For all other files (MOV, JPG, PNG, etc) just copy as is
        const outputFile = path.join(OUTPUT_DIR, file);
        await fse.copy(inputPath, outputFile, { overwrite: true });
        console.log(`📄 Copied: ${file}`);
      }

    } catch (err) {
      console.error(`❌ Failed processing ${file}: ${err.message}`);
    }
  }

  console.log(`\n🎉 All done Month: ${month}!`);
}
console.log(`📷 Start Photos from Month: ${month}\n`);
processFiles();
