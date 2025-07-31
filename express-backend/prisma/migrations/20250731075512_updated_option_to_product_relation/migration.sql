/*
  Warnings:

  - You are about to drop the `_CategoryToProductOptionGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `ProductOptionGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_CategoryToProductOptionGroup" DROP CONSTRAINT "_CategoryToProductOptionGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CategoryToProductOptionGroup" DROP CONSTRAINT "_CategoryToProductOptionGroup_B_fkey";

-- AlterTable
ALTER TABLE "public"."ProductOptionGroup" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."_CategoryToProductOptionGroup";

-- AddForeignKey
ALTER TABLE "public"."ProductOptionGroup" ADD CONSTRAINT "ProductOptionGroup_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
