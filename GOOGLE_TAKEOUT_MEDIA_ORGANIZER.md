# 📂 Google Takeout Media Organizer

This Node.js script scans multiple Google Takeout folders and organizes your photo and video files (.HEIC, .JPG, .PNG, .MP4, etc.) into 2023/ and 2024/ folders based on the folder structure inside the Takeout export.

📌 Features

    ✅ Scans Takeout 1 through Takeout 20 folders

    ✅ Looks for folders like Google Photos/Photos from 2023 and Photos from 2024

    ✅ Copies photo and video files to local 2023/ or 2024/ folders

    ✅ Automatically renames duplicates like IMG_1234_1.JPG

    ✅ Supports .HEIC, .JPG, .JPEG, .PNG, .MP4

## Folder Structure

        your-folder/
        ├── Takeout 1/
        │   └── Google Photos/
        │       └── Photos from 2023/
        │           └── IMG_1234.JPG
        ├── Takeout 2/
        │   └── ...
        ├── 2023/             ← Media from 2023 will be copied here
        ├── 2024/             ← Media from 2024 will be copied here
        ├── organize.js       ← Main script
        └── README.md
  
## 🛠 Setup

Make sure you have Node.js installed (v14+ recommended).

Create a folder and place your Takeout X folders inside it.

Copy the script (organize.js) into the same folder.

Open a terminal and run:

    node organize.js

### 📜 What It Does

For each folder named Takeout 1 to Takeout 20, the script:

1. Looks inside:

    Google Photos/Photos from 2023/

    Google Photos/Photos from 2024/

2. Finds supported media files:

    .HEIC, .JPG, .JPEG, .PNG, .MP4

3. Copies them into:

    - 2023/ folder (for 2023 files)

    - 2024/ folder (for 2024 files)

4. Avoids overwriting by renaming duplicates.

### 🧪 Optional Debugging

At the bottom of the script, there's a commented-out folder walking function you can enable to print out the directory tree of a specific Takeout folder.

### ✅ Example Output

    📂 Processing: Takeout 5
      🔍 Checking for: /Users/you/Takeout 5/Google Photos/Photos from 2023
        📸 Found 12 media files
        ✅ Copied: IMG_1234.JPG → IMG_1234.JPG
        ✅ Copied: video.MP4 → video.MP4

    📂 Processing: Takeout 4
      🔍 Checking for: .../Photos from 2024
        ❌ Missing folder

    ✅ Done! All available media files have been copied.
