import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const baseFolder = './public/images/totalsport';

const getAllImages = (dirPath, fileList = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllImages(fullPath, fileList);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      fileList.push(fullPath);
    }
  });
  return fileList;
};

const connectToDB = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
};

export const uploadImagesAndUpdateDB = async () => {
  const allImages = getAllImages(baseFolder);
  const db = await connectToDB();

  for (let i = 0; i < allImages.length; i++) {
    const filePath = allImages[i];

    let relativePath = path.relative('./public', filePath);
    relativePath = relativePath.split(path.sep).join('/');

    const cloudinaryFolder = path.dirname(relativePath);

    let fileName = path.basename(filePath, path.extname(filePath)); // This should match the full Prod_name in DB

    try {
      console.log(`⬆️ Uploading ${i + 1} of ${allImages.length}: ${filePath}`);

      const result = await cloudinary.uploader.upload(filePath, {
        folder: cloudinaryFolder,
        public_id: fileName,
      });

      const cloudURL = result.secure_url;
      console.log(`✅ Uploaded: ${fileName}`);
      console.log(`🌍 URL: ${cloudURL}`);

      // Now update the DB where Prod_name = original file name
      const [rows] = await db.execute(
        `UPDATE product SET img = ? WHERE Prod_name = ?`,
        [cloudURL, fileName]
      );

      if (rows.affectedRows > 0) {
        console.log(`🛠️ DB updated for: ${fileName}\n`);
      } else {
        console.warn(`⚠️ No match in DB for: ${fileName}\n`);
      }

    } catch (err) {
      console.error(`❌ Error uploading ${fileName}:`, err.message);
    }
  }

  console.log('\n🎉 All uploads and MySQL updates completed!');
  await db.end();
};

// Run it directly
uploadImagesAndUpdateDB();
