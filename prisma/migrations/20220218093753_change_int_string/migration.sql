/*
  Warnings:

  - Changed the type of `CostMoney` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "CostMoney",
ADD COLUMN     "CostMoney" INTEGER NOT NULL;
