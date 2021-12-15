/*
  Warnings:

  - You are about to drop the column `Heading` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `SubHeading` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "Heading",
DROP COLUMN "SubHeading",
ADD COLUMN     "BackgroundColor" TEXT,
ADD COLUMN     "Description" TEXT,
ADD COLUMN     "Title" TEXT;
