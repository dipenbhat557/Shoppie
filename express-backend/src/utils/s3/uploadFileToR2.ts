import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const acceptedFiles = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/jpg",
  "image/svg+xml",
  "image/tiff",
  "image/bmp",
  "text/plain",
];

// Cloudflare R2 Configuration
console.log("R2 Configuration Debug:", {
  endpoint: process.env.S3_ENDPOINT,
  hasAccessKey: !!process.env.CLOUDFLARE_ACCESS_KEY,
  hasSecretKey: !!process.env.CLOUDFLARE_SECRET_KEY,
  accessKeyLength: process.env.CLOUDFLARE_ACCESS_KEY?.length,
});

const S3_ENDPOINT = process.env.S3_ENDPOINT;
const CLOUDFLARE_ACCESS_KEY = process.env.CLOUDFLARE_ACCESS_KEY;
const CLOUDFLARE_SECRET_KEY = process.env.CLOUDFLARE_SECRET_KEY;

if (!S3_ENDPOINT || !CLOUDFLARE_ACCESS_KEY || !CLOUDFLARE_SECRET_KEY) {
  throw new Error("Missing required environment variables");
}

const r2: any = new S3Client({
  region: "us-east-1", // Use a standard region, not 'auto' for R2
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: CLOUDFLARE_SECRET_KEY,
  },
  forcePathStyle: true,
  // Disable AWS service discovery to ensure custom endpoint is used
  serviceId: "s3",
  disableHostPrefix: true,
});

// Helper function to extract key from URL if needed
const getKeyFromPath = (path: string): string => {
  if (path.startsWith("http")) {
    return path.split("/").pop() || path;
  }
  return path;
};

export const uploadFileToR2 = async (
  file: Express.Multer.File,
  bucketName = "product-images"
): Promise<string> => {
  try {
    console.log("Starting R2 upload:", {
      fileName: file.originalname,
      fileSize: file.buffer.length,
      mimeType: file.mimetype,
      bucketName,
      endpoint: process.env.S3_ENDPOINT,
    });

    if (!file) {
      throw new Error("No file provided");
    }

    if (file.buffer.length > MAX_FILE_SIZE) {
      throw new Error("File must be under 10MB");
    }

    if (!acceptedFiles.includes(file.mimetype)) {
      throw new Error(`File type ${file.mimetype} not supported`);
    }

    const randomId = uuidv4();
    let fileKey = `${randomId}-${file.originalname || "file"}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      // Add metadata for better tracking
      Metadata: {
        "original-name": file.originalname || "unknown",
        "upload-date": new Date().toISOString(),
      },
    });

    console.log("Attempting to upload to R2 with command:", {
      bucket: bucketName,
      key: fileKey,
      contentType: file.mimetype,
    });

    await r2.send(putObjectCommand);

    console.log("Successfully uploaded to R2:", fileKey);
    return fileKey;
  } catch (error: any) {
    console.error("Error uploading file to R2:", {
      error: error.message,
      code: error.Code,
      name: error.name,
      metadata: error.$metadata,
      bucket: bucketName,
      type: file?.mimetype,
      endpoint: process.env.S3_ENDPOINT,
      hasCredentials: !!(
        process.env.CLOUDFLARE_ACCESS_KEY && process.env.CLOUDFLARE_SECRET_KEY
      ),
    });
    throw new Error(`Failed to upload file to R2: ${error.message}`);
  }
};

export const deleteFileFromR2 = async (
  key: string,
  bucketName = "product-images"
): Promise<void> => {
  try {
    const fileKey = getKeyFromPath(key);

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    await r2.send(deleteCommand);
  } catch (error: any) {
    console.error("Error deleting file from R2:", {
      error: error.message,
      bucket: bucketName,
      key,
    });
    throw new Error("Failed to delete file from R2");
  }
};

export const getPublicUrl = (key: string): string => {
  const fileKey = getKeyFromPath(key);
  return `${process.env.S3_ENDPOINT}/${fileKey}`;
};

export const getSignedUrlForR2 = async (
  key: string,
  bucketName = "product-images"
): Promise<string> => {
  try {
    const fileKey = getKeyFromPath(key);

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    const url = await getSignedUrl(r2, command, {
      expiresIn: 604800,
    });

    return url;
  } catch (error: any) {
    console.error("Error generating signed URL:", {
      error: error.message,
      bucket: bucketName,
      key,
    });
    throw new Error("Failed to generate signed URL");
  }
};

export default r2;
