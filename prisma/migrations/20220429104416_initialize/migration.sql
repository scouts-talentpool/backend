-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMPANY', 'TALENT', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "cursor" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'TALENT',
    "companyProfileId" TEXT,
    "talentProfileId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyProfile" (
    "id" TEXT NOT NULL,
    "cursor" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "CompanyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentProfile" (
    "id" TEXT NOT NULL,
    "cursor" SERIAL NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "TalentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cursor_key" ON "User"("cursor");

-- CreateIndex
CREATE UNIQUE INDEX "User_talentProfileId_key" ON "User"("talentProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProfile_cursor_key" ON "CompanyProfile"("cursor");

-- CreateIndex
CREATE UNIQUE INDEX "TalentProfile_cursor_key" ON "TalentProfile"("cursor");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyProfileId_fkey" FOREIGN KEY ("companyProfileId") REFERENCES "CompanyProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_talentProfileId_fkey" FOREIGN KEY ("talentProfileId") REFERENCES "TalentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
