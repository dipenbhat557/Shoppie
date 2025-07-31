import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fromEnv } from "@aws-sdk/credential-providers";
import { S3Client } from '@aws-sdk/client-s3';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const acceptedFiles = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/jpg',
  'image/svg+xml',
  'image/tiff',
  'image/bmp',
  "text/plain"
];

// Create S3 client with proper type-safe configuration
const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: fromEnv(), // This properly handles credentials from environment variables
});

export const uploadFileToR2 = async (file: Express.Multer.File, bucketName = 'product-images'): Promise<string> => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    if (file.buffer.length > MAX_FILE_SIZE) {
      throw new Error('File must be under 10MB');
    }

    const randomId = uuidv4();
    let fileKey = randomId;

    if (acceptedFiles.includes(file.mimetype) && file.originalname) {
      const fileExt = file.originalname.split('.').pop()?.toLowerCase();
      if (fileExt) {
        fileKey = `${randomId}.${fileExt}`;
      }
    }

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(putObjectCommand);

    // Get a signed URL for immediate access
    const signedUrl = await getSignedUrlForR2(bucketName, fileKey);
    return signedUrl;
  } catch (error: any) {
    console.error('Error uploading file to R2:', {
      error: error.message,
      code: error.Code,
      metadata: error.$metadata,
      bucket: bucketName,
      type: file.mimetype,
    });
    throw new Error('Failed to upload file to R2');
  }
};

export const deleteFileFromR2 = async (key: string, bucketName = 'product-images'): Promise<void> => {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await r2.send(deleteCommand);
  } catch (error: any) {
    console.error('Error deleting file from R2:', {
      error: error.message,
      bucket: bucketName,
      key,
    });
    throw new Error('Failed to delete file from R2');
  }
};

export const getSignedUrlForR2 = async (bucketName = 'product-images', key: string): Promise<string> => {
  try {
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // Use proper type-safe getSignedUrl
    const signedUrl = await getSignedUrl(r2 as any, getCommand, {
      expiresIn: 604800, // 7 days
    });

    return signedUrl;
  } catch (error: any) {
    console.error('Error generating signed URL:', {
      error: error.message,
      bucket: bucketName,
      key,
    });
    throw new Error('Failed to generate signed URL');
  }
};

// Export the r2 client for use in other files
export default r2;