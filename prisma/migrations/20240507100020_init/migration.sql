/*
  Warnings:

  - The primary key for the `OrderToProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderToProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productInformation` on the `OrderToProduct` table. All the data in the column will be lost.
  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderToProductToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderToProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProductToProduct" DROP CONSTRAINT "_OrderToProductToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToProductToProduct" DROP CONSTRAINT "_OrderToProductToProduct_B_fkey";

-- AlterTable
ALTER TABLE "OrderToProduct" DROP CONSTRAINT "OrderToProduct_pkey",
DROP COLUMN "id",
DROP COLUMN "productInformation",
ADD COLUMN     "productOrderPrice" DOUBLE PRECISION;

-- DropTable
DROP TABLE "_OrderToProduct";

-- DropTable
DROP TABLE "_OrderToProductToProduct";

-- CreateIndex
CREATE UNIQUE INDEX "OrderToProduct_orderId_productId_key" ON "OrderToProduct"("orderId", "productId");

-- AddForeignKey
ALTER TABLE "OrderToProduct" ADD CONSTRAINT "OrderToProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
