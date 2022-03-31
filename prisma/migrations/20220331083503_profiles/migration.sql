/*
  Warnings:

  - A unique constraint covering the columns `[talentProfileId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMPANY', 'TALENT', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'TALENT',
ADD COLUMN     "talentProfileId" TEXT;

-- CreateTable
CREATE TABLE "TalentProfile" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TalentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_talentProfileId_key" ON "User"("talentProfileId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_talentProfileId_fkey" FOREIGN KEY ("talentProfileId") REFERENCES "TalentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
