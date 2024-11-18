/*
  Warnings:

  - Changed the type of `postalCode` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "OrderToProduct_orderId_productId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "postalCode",
ADD COLUMN     "postalCode" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "OrderToProduct" ADD CONSTRAINT "OrderToProduct_pkey" PRIMARY KEY ("orderId", "productId");
