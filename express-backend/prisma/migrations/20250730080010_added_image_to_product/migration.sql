/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BLACKLISTED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('CUSTOMER', 'ADMIN', 'SUPPORT');

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_product_variant_id_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."ProductVariant" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fraudReason" TEXT,
ADD COLUMN     "isFraudSuspected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "loginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."Image";
