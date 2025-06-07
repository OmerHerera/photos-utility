# 📁 File Organizer by Month (Using EXIF Metadata)

This Node.js script organizes files (images, videos, etc.) into folders based on the **month** they were originally created. It uses **EXIF metadata** when available and falls back to file system creation time when needed.

---

## 🔧 Features

- ✅ Organizes files into folders like `JANUARY`, `FEBRUARY`, etc.
- ✅ Uses accurate creation dates from EXIF metadata (for photos and videos)
- ✅ Falls back to file system creation date (`fs.stat`) if EXIF data is missing
- ✅ Supports images (`.jpg`, `.heic`, etc.) and videos (`.mp4`, etc.)
- ✅ Copies files (safe – does not delete or move originals unless modified)

---

## 📦 Setup Instructions

### 1. Create a new folder and enter it

```bash
mkdir file-organizer-by-month
cd file-organizer-by-month
```

### 2. Initialize a Node.js project

```bash
npm init -y

```

### 3. Install required dependencies

```bash
Copy
npm install exiftool-vendored fs-extra
```