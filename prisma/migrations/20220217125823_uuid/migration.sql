/*
  Warnings:

  - The primary key for the `CompanyProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyProfileId_fkey";

-- AlterTable
ALTER TABLE "CompanyProfile" DROP CONSTRAINT "CompanyProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CompanyProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CompanyProfile_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "companyProfileId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "CompanyProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
