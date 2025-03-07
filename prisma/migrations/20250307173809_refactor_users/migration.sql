/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[barberShopId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "BarberShop" DROP CONSTRAINT "BarberShop_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "barberShopId" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Authenticator";

-- CreateIndex
CREATE UNIQUE INDEX "User_barberShopId_key" ON "User"("barberShopId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_barberShopId_fkey" FOREIGN KEY ("barberShopId") REFERENCES "BarberShop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
