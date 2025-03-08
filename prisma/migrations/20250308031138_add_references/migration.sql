/*
  Warnings:

  - You are about to drop the `Holiday` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workingHoursId` to the `WorkingHours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Holiday" DROP CONSTRAINT "Holiday_barberShopId_fkey";

-- AlterTable
ALTER TABLE "WorkingHours" ADD COLUMN     "workingHoursId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Holiday";
