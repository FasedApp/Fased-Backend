/*
  Warnings:

  - Made the column `newsId` on table `Favorites` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Favorites" ALTER COLUMN "newsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
