/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `benutzer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "campus" ALTER COLUMN "plz" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "mitgliederfirmen" ALTER COLUMN "plz" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "talente" ALTER COLUMN "plz" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "benutzer_email_key" ON "benutzer"("email");
