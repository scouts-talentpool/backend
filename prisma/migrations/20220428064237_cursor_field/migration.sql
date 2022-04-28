/*
  Warnings:

  - A unique constraint covering the columns `[cursor]` on the table `CompanyProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cursor]` on the table `TalentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cursor]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CompanyProfile" ADD COLUMN     "cursor" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "TalentProfile" ADD COLUMN     "cursor" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cursor" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile_cursor_key" ON "CompanyProfile"("cursor");

-- CreateIndex
CREATE UNIQUE INDEX "TalentProfile_cursor_key" ON "TalentProfile"("cursor");

-- CreateIndex
CREATE UNIQUE INDEX "User_cursor_key" ON "User"("cursor");
