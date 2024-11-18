-- CreateTable
CREATE TABLE "_OrderToProductToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProductToProduct_AB_unique" ON "_OrderToProductToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProductToProduct_B_index" ON "_OrderToProductToProduct"("B");

-- AddForeignKey
ALTER TABLE "_OrderToProductToProduct" ADD CONSTRAINT "_OrderToProductToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderToProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProductToProduct" ADD CONSTRAINT "_OrderToProductToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
