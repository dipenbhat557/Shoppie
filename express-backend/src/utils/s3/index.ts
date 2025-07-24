import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs/promises";  // Use fs.promises for async/await
import path from "path";

export const uploadToS3 = async (file: any): Promise<string> => {
  // const s3 = new S3Client({
  //   region: process.env.AWS_REGION || '',
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  //   }
  // });

  // const key = `uploads/${Date.now()}-${file.originalname}`;

  // const command = new PutObjectCommand({
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: key,
  //   Body: file.buffer,
  //   ContentType: file.mimetype
  // });

  // await s3.send(command);

  // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return saveLocalFile(file);
};

export const saveLocalFile = async (file: any): Promise<string> => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadsDir, filename);

    // Save the file
    await fs.writeFile(filePath, file.buffer);

    // Return the URL path that can be used to access the file
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error saving file:', error);
    throw new Error('Failed to save file');
  }
};

export const getExactFileUrl = (filePath: string) => {
  // Instead of returning the full file system path, return the URL path
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  return `${backendUrl}${filePath}`;
};

export const deleteFile = async (filePath: string) => {
  // const s3 = new S3Client({
  //   region: process.env.AWS_REGION || '',
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  //   }
  // });

  // const key = filePath.replace(`/Users/dipenbhat557/Projects/Shoppie/express-backend/`, '');

  // const command = new DeleteObjectCommand({
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: key
  // });

  // await s3.send(command);

  return deleteLocalFile(filePath);
};


export const deleteLocalFile = async (filePath: string) => {
  const fullPath = path.join(process.cwd(), filePath);
  
  await fs.unlink(fullPath);
};