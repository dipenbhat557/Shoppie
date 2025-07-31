import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY || '',
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY || ''
  },
  forcePathStyle: true
});

// Helper function to extract key from URL if needed
const getKeyFromPath = (path: string): string => {
  if (path.startsWith('http')) {
    return path.split('/').pop() || path;
  }
  return path;
};

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

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await r2.send(putObjectCommand);

    return fileKey;
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
    const fileKey = getKeyFromPath(key);
    
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
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

export const getPublicUrl = (key: string): string => {
  const fileKey = getKeyFromPath(key);
  return `${process.env.S3_ENDPOINT}/${fileKey}`;
};

export const getSignedUrlForR2 = async (key: string, bucketName = 'product-images'): Promise<string> => {
  try {
    const fileKey = getKeyFromPath(key);

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    const url = await getSignedUrl(r2, command, { 
      expiresIn: 604800 
    });

    return url;
  } catch (error: any) {
    console.error('Error generating signed URL:', {
      error: error.message,
      bucket: bucketName,
      key,
    });
    throw new Error('Failed to generate signed URL');
  }
};

export default r2;