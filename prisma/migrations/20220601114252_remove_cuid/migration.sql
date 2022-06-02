/*
  Warnings:

  - The `firmaId` column on the `benutzer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `mitgliederfirmen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `mitgliederfirmen` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `talente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `talente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_FirmaToLink` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_LehrberufToTalent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_LinkToTalent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `firmaId` on the `lehrstellen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_FirmaToLink" DROP CONSTRAINT "_FirmaToLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_LehrberufToTalent" DROP CONSTRAINT "_LehrberufToTalent_B_fkey";

-- DropForeignKey
ALTER TABLE "_LinkToTalent" DROP CONSTRAINT "_LinkToTalent_B_fkey";

-- DropForeignKey
ALTER TABLE "benutzer" DROP CONSTRAINT "benutzer_firmaId_fkey";

-- DropForeignKey
ALTER TABLE "lehrstellen" DROP CONSTRAINT "lehrstellen_firmaId_fkey";

-- AlterTable
ALTER TABLE "_FirmaToLink" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_LehrberufToTalent" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_LinkToTalent" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "benutzer" DROP COLUMN "firmaId",
ADD COLUMN     "firmaId" INTEGER;

-- AlterTable
ALTER TABLE "lehrstellen" DROP COLUMN "firmaId",
ADD COLUMN     "firmaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "mitgliederfirmen" DROP CONSTRAINT "mitgliederfirmen_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "mitgliederfirmen_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "talente" DROP CONSTRAINT "talente_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "talente_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_FirmaToLink_AB_unique" ON "_FirmaToLink"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_LehrberufToTalent_AB_unique" ON "_LehrberufToTalent"("A", "B");

-- CreateIndex
CREATE INDEX "_LehrberufToTalent_B_index" ON "_LehrberufToTalent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LinkToTalent_AB_unique" ON "_LinkToTalent"("A", "B");

-- CreateIndex
CREATE INDEX "_LinkToTalent_B_index" ON "_LinkToTalent"("B");

-- AddForeignKey
ALTER TABLE "benutzer" ADD CONSTRAINT "benutzer_firmaId_fkey" FOREIGN KEY ("firmaId") REFERENCES "mitgliederfirmen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lehrstellen" ADD CONSTRAINT "lehrstellen_firmaId_fkey" FOREIGN KEY ("firmaId") REFERENCES "mitgliederfirmen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToTalent" ADD CONSTRAINT "_LehrberufToTalent_B_fkey" FOREIGN KEY ("B") REFERENCES "talente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirmaToLink" ADD CONSTRAINT "_FirmaToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "mitgliederfirmen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LinkToTalent" ADD CONSTRAINT "_LinkToTalent_B_fkey" FOREIGN KEY ("B") REFERENCES "talente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
