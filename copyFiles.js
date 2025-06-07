const fs = require('fs');
const path = require('path');

// ✅ Set correct root path: adjust if your folder is actually Downloads/2024/2024
const rootFolder = path.join(__dirname);
const output2023 = path.join(__dirname, '2023');
const output2024 = path.join(__dirname, '2024');

const photoExtensions = ['.HEIC', '.JPG', '.JPEG', '.PNG', '.MP4'];

// ✅ Ensure output folders exist
if (!fs.existsSync(output2023)) fs.mkdirSync(output2023);
if (!fs.existsSync(output2024)) fs.mkdirSync(output2024);

function copyFile(sourcePath, targetFolder) {
  const originalName = path.basename(sourcePath);
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  let targetPath = path.join(targetFolder, originalName);
  let counter = 1;

  while (fs.existsSync(targetPath)) {
    targetPath = path.join(targetFolder, `${base}_${counter}${ext}`);
    counter++;
  }

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`    ✅ Copied: ${originalName} → ${path.basename(targetPath)}`);
}

function processYearFolder(takeoutFolder, year) {
  const photosPath = path.join(rootFolder, takeoutFolder, 'Google Photos', `Photos from ${year}`);
  console.log(`  🔍 Checking for: ${photosPath}`);

  if (!fs.existsSync(photosPath)) {
    console.log(`    ❌ Missing folder`);
    return;
  }

  const files = fs.readdirSync(photosPath);
  if (files.length === 0) {
    console.log(`    ⚠️  Empty folder`);
    return;
  }

  const mediaFiles = files.filter(file =>
    photoExtensions.includes(path.extname(file).toUpperCase())
  );

  if (mediaFiles.length === 0) {
    console.log(`    ⚠️  No media files found`);
    return;
  }

  const targetFolder = year === 2023 ? output2023 : output2024;
  console.log(`    📸 Found ${mediaFiles.length} media files`);

  mediaFiles.forEach(file => {
    const sourcePath = path.join(photosPath, file);
    copyFile(sourcePath, targetFolder);
  });
}

console.log(`🚀 Starting photo collection from: ${rootFolder}`);

for (let i = 20; i >= 1; i--) {
  const folderName = `Takeout ${i}`;
  const takeoutPath = path.join(rootFolder, folderName);

  if (!fs.existsSync(takeoutPath)) {
    console.log(`⚠️  Skipping missing: ${folderName}`);
    continue;
  }

  console.log(`\n📂 Processing: ${folderName}`);
  processYearFolder(folderName, 2023);
  processYearFolder(folderName, 2024);
}

console.log(`\n✅ Done! All available media files have been copied.`);



// DEBUG
// const fs = require('fs');
// const path = require('path');

// const root = path.join(__dirname, '2024', 'Takeout 20');

// function walk(dir, depth = 0) {
//   if (!fs.existsSync(dir)) return;
//   const items = fs.readdirSync(dir);

//   items.forEach(item => {
//     const fullPath = path.join(dir, item);
//     const stat = fs.statSync(fullPath);

//     if (stat.isDirectory()) {
//       console.log('  '.repeat(depth) + '📁 ' + item);
//       walk(fullPath, depth + 1);
//     }
//   });
// }

// console.log(`📂 Walking folder tree for: ${root}`);
// walk(root);
