-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_newsId_fkey";

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;
