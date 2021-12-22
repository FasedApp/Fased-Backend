/*
  Warnings:

  - You are about to drop the column `registerType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "registerType",
ADD COLUMN     "registrationType" TEXT NOT NULL DEFAULT E'emailpassword';
