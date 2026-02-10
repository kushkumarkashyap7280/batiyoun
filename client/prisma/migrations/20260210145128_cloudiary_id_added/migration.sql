/*
  Warnings:

  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_verified",
ADD COLUMN     "cloudinary_id" TEXT,
ADD COLUMN     "is_pro" BOOLEAN NOT NULL DEFAULT false;
