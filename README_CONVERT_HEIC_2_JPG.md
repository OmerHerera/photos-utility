# 📸 HEIC to JPG Converter & Media Organizer

This Node.js script automates the process of converting .HEIC image files to .JPG format and organizes various media files by:

✅ Converting real `.>HEIC files to .JPG`

📁 Moving misnamed .HEIC files (e.g. actually .JPG) to the output folder with the correct extension

📄 Copying all other media files (like .MOV, .JPG, .PNG) as-is to the output folder

## 🛠 Requirements

- Node.js (version 14+ recommended)

- HEIC decoding support via heic-convert

## 📦 Setup

- Create a new folder and put this script inside (e.g. convert.js)

- Inside that folder, create a subfolder named heic-files and place your media files there

- Open a terminal in the folder and run:

```bash
npm init -y
npm install heic-convert fs-extra file-type@16.5.3
```

🔧 We use file-type@16.5.3 to ensure compatibility with CommonJS (require) syntax.

📂 Folder Structure

```bash

project-folder/
├── convert.js              # ← The script
├── heic-files/             # ← Source folder (place your .HEIC/.MOV/.JPG/etc here)
└── jpg-output/             # ← Output folder (auto-created for results)
```

▶️ Run the Script

```bash
node convertHeicToJpg.js
```

### 🧠 What the Script Does

For every file in ./heic-files/:

1. `.heic` files:

    - If it’s a valid HEIC file:

        - ✅ Convert it to .JPG

    - If it’s a misnamed file (e.g. actually a .JPG inside):

        - 📁 Move it to the output folder and rename it with the correct extension

2. Other files (.MOV, .JPG, .PNG, etc.):

    - 📄 Simply copied to the output folder without changes

3. Output:

    - All results go into the jpg-output/ folder

    - Files with name conflicts are automatically overwritten (you can change this if needed)

### 📝 Example Output

```bash
✅ Converted HEIC: IMG_1001.HEIC → IMG_1001.jpg
📁 Moved misnamed file: IMG_1002.HEIC → IMG_1002.jpg
📄 Copied: video.MOV
🧩 Customization Ideas
Delete original files after conversion/move

Recursively scan subfolders

Organize output by date/month

Generate a summary log

Let me know if you want help with any of these improvements!

🧼 Cleanup
If you want to re-run from scratch:

bash
Copy
Edit
rm -rf jpg-output
mkdir jpg-output
Let me know if you’d like a version of this that:

Organizes by date/month

Works with drag & drop

Exports a conversion report

I'm happy to tailor it!
