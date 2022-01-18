-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_CategoryId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
