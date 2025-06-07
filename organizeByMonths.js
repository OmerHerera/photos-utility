const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const { exiftool } = require('exiftool-vendored');

const SOURCE_DIR = '/Users/omher/Downloads/OMER_PHOTOS_24_23/25_FROM_CODE'; // 🔄 Change to your folder
const DEST_DIR = './sorted-by-month';

const monthNames = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

(async () => {
  try {
    const files = await fs.promises.readdir(SOURCE_DIR);

    for (const file of files) {
      const fullPath = path.join(SOURCE_DIR, file);
      const stat = await fs.promises.stat(fullPath);

      if (stat.isDirectory()) continue;

      let date;

      try {
        const tags = await exiftool.read(fullPath);
        const rawDate = tags.DateTimeOriginal || tags.CreateDate;
        date = rawDate ? new Date(rawDate) : stat.birthtime;
      } catch (err) {
        console.warn(`EXIF read failed for ${file}, using fs.birthtime`);
        date = stat.birthtime;
      }

      if (!(date instanceof Date) || isNaN(date)) {
        console.warn(`Could not parse date for ${file}`);
        continue;
      }

      const month = monthNames[date.getMonth()];
      const destFolder = path.join(DEST_DIR, month);

      await fse.ensureDir(destFolder);
      await fse.copy(fullPath, path.join(destFolder, file));

      console.log(`Copied "${file}" to "${month}/"`);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await exiftool.end();
  }
})();
