// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const baseFolder = './public/images/totalsport';

// const getAllImages = (dirPath, fileList = []) => {
//   const files = fs.readdirSync(dirPath);
//   files.forEach(file => {
//     const fullPath = path.join(dirPath, file);
//     if (fs.statSync(fullPath).isDirectory()) {
//       getAllImages(fullPath, fileList);
//     } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
//       fileList.push(fullPath);
//     }
//   });
//   return fileList;
// };

// export const uploadImages = async () => {
//   const allImages = getAllImages(baseFolder);
//   const results = [];

//   for (let i = 0; i < allImages.length; i++) {
//     const filePath = allImages[i];
//     let relativePath = path.relative('./public', filePath).split(path.sep).join('/');
//     const cloudinaryFolder = path.dirname(relativePath);

//     let fileName = path.basename(filePath, path.extname(filePath));
//     const cleanFileName = fileName
//       .replace(/\s+/g, '_')
//       .replace(/'/g, '')
//       .replace(/[^a-zA-Z0-9_\-]/g, '');

//     try {
//       console.log(`⬆️ Uploading ${i + 1} of ${allImages.length}: ${filePath}`);

//       const result = await cloudinary.uploader.upload(filePath, {
//         folder: cloudinaryFolder,
//         public_id: cleanFileName,
//       });

//       const cloudURL = result.secure_url;
//       results.push({ name: cleanFileName, url: cloudURL });

//       console.log(`✅ Uploaded: ${cleanFileName}`);
//       console.log(`🌍 URL: ${cloudURL}\n`);
//     } catch (err) {
//       console.error(`❌ Error uploading ${cleanFileName}:`, err.message);
//       results.push({ name: cleanFileName, url: 'FAILED_UPLOAD' });
//     }
//   }

//   // Prepare SQL statements
//   let sqlStatements = '\n📝 SQL UPDATE Statements:\n\n';
//   results.forEach(img => {
//     const prodName = img.name.replace(/_/g, ' ');
//     if (img.url === 'FAILED_UPLOAD') {
//       sqlStatements += `-- FAILED: ${prodName}\n\n`;
//     } else {
//       sqlStatements += `UPDATE product\nSET img = '${img.url}'\nWHERE Prod_name = '${prodName}';\n\n`;
//     }
//   });

//   // Write SQL statements to file
//   const outputPath = path.join('./', 'cloudinary_update.sql');
//   fs.writeFileSync(outputPath, sqlStatements, 'utf-8');

//   console.log(sqlStatements); // Still prints to console
//   console.log(`📄 SQL file saved at: ${outputPath}\n`);

//   console.log(`📦 Total Files Processed: ${results.length}`);
//   const failedCount = results.filter(r => r.url === 'FAILED_UPLOAD').length;
//   const successCount = results.length - failedCount;
//   console.log(`✅ Successful: ${successCount}`);
//   console.log(`❌ Failed: ${failedCount}`);
// };

// // Optional run directly
// if (process.argv[1].endsWith('cloudnery.js')) {
//   uploadImages();
// }
