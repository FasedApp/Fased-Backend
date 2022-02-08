/*
  Warnings:

  - Added the required column `reportId` to the `FlagReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlagReport" ADD COLUMN     "reportId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FlagReport" ADD CONSTRAINT "FlagReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
