// main-script.js
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const fileType = require('file-type');
const { execFile } = require('child_process');
const util = require('util');
const execFileAsync = util.promisify(execFile);

const monthNames = [
  'NO-MONTH', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];
const month = monthNames[4];

const SOURCE_DIR = `/Users/omher/Downloads/OMER_PHOTOS_24_23/25_FROM_CODE/sorted-by-month/${month}`;
const OUTPUT_DIR = `/Users/omher/Downloads/OMER_PHOTOS_24_23/25_FROM_CODE/sorted-by-month/${month}-CONVERTED`;

async function processFiles() {
  await fse.ensureDir(OUTPUT_DIR);
  const files = await fs.promises.readdir(SOURCE_DIR);

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const ext = path.extname(file).toLowerCase();

    try {
      const inputBuffer = await fs.promises.readFile(inputPath);

      if (ext === '.heic') {
        const type = await fileType.fromBuffer(inputBuffer);
        if (!type) {
          console.warn(`⚠️ Skipped ${file}: Unknown file type`);
          continue;
        }

        if (type.ext === 'heic') {
          // Call convert-heic.js as a subprocess
          const outputFile = path.join(OUTPUT_DIR, path.basename(file, ext) + '.jpg');

          try {
            await execFileAsync('node', ['convert-heic.js', inputPath, outputFile]);
            console.log(`✅ Converted HEIC (child): ${file} → ${path.basename(outputFile)}`);
          } catch (childErr) {
            console.error(`❌ Child conversion failed for ${file}: ${childErr.message}`);
          }

        } else {
          // Misnamed file (not really HEIC)
          const correctedName = path.basename(file, ext) + '.' + type.ext;
          const outputFile = path.join(OUTPUT_DIR, correctedName);
          await fse.move(inputPath, outputFile, { overwrite: true });
          console.log(`📁 Moved misnamed file: ${file} → ${correctedName}`);
        }

      } else {
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
