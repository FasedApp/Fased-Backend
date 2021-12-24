-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_SubCategory_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "SubCategory" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
