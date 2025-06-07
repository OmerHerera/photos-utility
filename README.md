# 📷 Photos Utility

1. Download Pictures from Google Takeout

    - Unzip `.zip` files

    - Folders will be unzip with Structure like:

    ```bash
    your-folder/
            ├── Takeout 1/
            │   └── Google Photos/
            │       └── Photos from 2023/
            │           └── IMG_1234.JPG
            ├── Takeout 2/
    ```

2. Run:

    ```bash
    node copyFiles.js
    ```

     - This will take all the files from:

          - `Takeout 1/Google Photos/Photos from 2025` to `target` folder

3. Run:

    ```bash
    node organizeByMonths.js
    ```

4. Run to convert `HEIC` -> `JPG`:

    ```bash
    node convertHeicToJpg.js
    ```
