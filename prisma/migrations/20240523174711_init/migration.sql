/*
  Warnings:

  - The primary key for the `OrderToProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[orderId,productId]` on the table `OrderToProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "OrderToProduct" DROP CONSTRAINT "OrderToProduct_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "OrderToProduct_orderId_productId_key" ON "OrderToProduct"("orderId", "productId");
