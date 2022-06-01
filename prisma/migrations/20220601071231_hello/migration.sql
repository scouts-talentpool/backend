-- CreateTable
CREATE TABLE "berechtigungen" (
    "id" SERIAL NOT NULL,
    "bezeichnung" TEXT NOT NULL,

    CONSTRAINT "berechtigungen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rollen" (
    "id" SERIAL NOT NULL,
    "bezeichnung" TEXT NOT NULL,

    CONSTRAINT "rollen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "benutzer" (
    "id" SERIAL NOT NULL,
    "authId" TEXT NOT NULL,
    "vorname" TEXT NOT NULL,
    "nachname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rolleId" INTEGER NOT NULL,
    "talentId" INTEGER,
    "firmaId" INTEGER,

    CONSTRAINT "benutzer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talente" (
    "id" SERIAL NOT NULL,
    "vorname" TEXT NOT NULL,
    "nachname" TEXT NOT NULL,
    "plz" INTEGER NOT NULL,
    "wohnort" TEXT NOT NULL,
    "lehrbeginn" TIMESTAMP(3) NOT NULL,
    "campusId" INTEGER NOT NULL,

    CONSTRAINT "talente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus" (
    "id" SERIAL NOT NULL,
    "bezeichnung" TEXT NOT NULL,
    "standort" TEXT NOT NULL,

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lehrberufe" (
    "id" SERIAL NOT NULL,
    "bezeichnung" TEXT NOT NULL,

    CONSTRAINT "lehrberufe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mitgliederfirmen" (
    "id" SERIAL NOT NULL,
    "firmenname" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "strasse" TEXT NOT NULL,
    "plz" INTEGER NOT NULL,
    "ort" TEXT NOT NULL,
    "firmenportrait" TEXT NOT NULL,

    CONSTRAINT "mitgliederfirmen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lehrstellen" (
    "id" SERIAL NOT NULL,
    "startjahr" TIMESTAMP(3) NOT NULL,
    "stellenanzahl" INTEGER NOT NULL DEFAULT 1,
    "firmaId" INTEGER NOT NULL,
    "lehrberufId" INTEGER NOT NULL,

    CONSTRAINT "lehrstellen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BerechtigungToRolle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LehrberufToTalent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "benutzer_authId_key" ON "benutzer"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "benutzer_talentId_key" ON "benutzer"("talentId");

-- CreateIndex
CREATE UNIQUE INDEX "_BerechtigungToRolle_AB_unique" ON "_BerechtigungToRolle"("A", "B");

-- CreateIndex
CREATE INDEX "_BerechtigungToRolle_B_index" ON "_BerechtigungToRolle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LehrberufToTalent_AB_unique" ON "_LehrberufToTalent"("A", "B");

-- CreateIndex
CREATE INDEX "_LehrberufToTalent_B_index" ON "_LehrberufToTalent"("B");

-- AddForeignKey
ALTER TABLE "benutzer" ADD CONSTRAINT "benutzer_rolleId_fkey" FOREIGN KEY ("rolleId") REFERENCES "rollen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benutzer" ADD CONSTRAINT "benutzer_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "talente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benutzer" ADD CONSTRAINT "benutzer_firmaId_fkey" FOREIGN KEY ("firmaId") REFERENCES "mitgliederfirmen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talente" ADD CONSTRAINT "talente_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lehrstellen" ADD CONSTRAINT "lehrstellen_lehrberufId_fkey" FOREIGN KEY ("lehrberufId") REFERENCES "lehrberufe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lehrstellen" ADD CONSTRAINT "lehrstellen_firmaId_fkey" FOREIGN KEY ("firmaId") REFERENCES "mitgliederfirmen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BerechtigungToRolle" ADD CONSTRAINT "_BerechtigungToRolle_A_fkey" FOREIGN KEY ("A") REFERENCES "berechtigungen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BerechtigungToRolle" ADD CONSTRAINT "_BerechtigungToRolle_B_fkey" FOREIGN KEY ("B") REFERENCES "rollen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToTalent" ADD CONSTRAINT "_LehrberufToTalent_A_fkey" FOREIGN KEY ("A") REFERENCES "lehrberufe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToTalent" ADD CONSTRAINT "_LehrberufToTalent_B_fkey" FOREIGN KEY ("B") REFERENCES "talente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
