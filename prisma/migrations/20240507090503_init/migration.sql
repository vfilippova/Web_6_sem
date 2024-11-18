/*
  Warnings:

  - You are about to drop the column `productInformation` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productInformation";

-- CreateTable
CREATE TABLE "OrderToProduct" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productInformation" JSONB NOT NULL,

    CONSTRAINT "OrderToProduct_pkey" PRIMARY KEY ("id")
);
