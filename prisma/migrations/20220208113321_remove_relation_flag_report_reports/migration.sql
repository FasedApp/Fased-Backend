/*
  Warnings:

  - You are about to drop the column `reportId` on the `FlagReport` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlagReport" DROP CONSTRAINT "FlagReport_reportId_fkey";

-- AlterTable
ALTER TABLE "FlagReport" DROP COLUMN "reportId";
