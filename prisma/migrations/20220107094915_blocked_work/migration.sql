-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fcmToken" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false;