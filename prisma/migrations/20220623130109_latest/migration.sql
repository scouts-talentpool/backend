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
    "firmaId" INTEGER,

    CONSTRAINT "benutzer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talente" (
    "id" SERIAL NOT NULL,
    "plz" TEXT NOT NULL,
    "wohnort" TEXT NOT NULL,
    "abschlussjahr" INTEGER NOT NULL,
    "meineStaerken" TEXT NOT NULL,
    "lieblingsCampusAktivitaet" TEXT NOT NULL,
    "campusId" INTEGER NOT NULL,
    "benutzerId" INTEGER NOT NULL,

    CONSTRAINT "talente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus" (
    "id" SERIAL NOT NULL,
    "bezeichnung" TEXT NOT NULL,
    "strasse" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL,

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
    "strasse" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL,
    "firmenportrait" TEXT NOT NULL,

    CONSTRAINT "mitgliederfirmen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lehrstellen" (
    "id" SERIAL NOT NULL,
    "startjahr" INTEGER NOT NULL,
    "stellenanzahl" INTEGER NOT NULL DEFAULT 1,
    "firmaId" INTEGER NOT NULL,
    "lehrberufId" INTEGER NOT NULL,
    "ausbildungskonzept" TEXT NOT NULL,
    "bewerbungsvorgehen" TEXT NOT NULL,
    "ausbildungsorte" TEXT[],

    CONSTRAINT "lehrstellen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BerechtigungToRolle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CampusToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LehrberufToTalent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LehrberufToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FirmaToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LehrstelleToLink" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LinkToTalent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "benutzer_authId_key" ON "benutzer"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "benutzer_email_key" ON "benutzer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "talente_benutzerId_key" ON "talente"("benutzerId");

-- CreateIndex
CREATE UNIQUE INDEX "_BerechtigungToRolle_AB_unique" ON "_BerechtigungToRolle"("A", "B");

-- CreateIndex
CREATE INDEX "_BerechtigungToRolle_B_index" ON "_BerechtigungToRolle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CampusToLink_AB_unique" ON "_CampusToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_CampusToLink_B_index" ON "_CampusToLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LehrberufToTalent_AB_unique" ON "_LehrberufToTalent"("A", "B");

-- CreateIndex
CREATE INDEX "_LehrberufToTalent_B_index" ON "_LehrberufToTalent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LehrberufToLink_AB_unique" ON "_LehrberufToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_LehrberufToLink_B_index" ON "_LehrberufToLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FirmaToLink_AB_unique" ON "_FirmaToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_FirmaToLink_B_index" ON "_FirmaToLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LehrstelleToLink_AB_unique" ON "_LehrstelleToLink"("A", "B");

-- CreateIndex
CREATE INDEX "_LehrstelleToLink_B_index" ON "_LehrstelleToLink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LinkToTalent_AB_unique" ON "_LinkToTalent"("A", "B");

-- CreateIndex
CREATE INDEX "_LinkToTalent_B_index" ON "_LinkToTalent"("B");

-- AddForeignKey
ALTER TABLE "benutzer" ADD CONSTRAINT "benutzer_rolleId_fkey" FOREIGN KEY ("rolleId") REFERENCES "rollen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benutzer" ADD CONSTRAINT "benutzer_firmaId_fkey" FOREIGN KEY ("firmaId") REFERENCES "mitgliederfirmen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talente" ADD CONSTRAINT "talente_benutzerId_fkey" FOREIGN KEY ("benutzerId") REFERENCES "benutzer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "_CampusToLink" ADD CONSTRAINT "_CampusToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "campus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampusToLink" ADD CONSTRAINT "_CampusToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToTalent" ADD CONSTRAINT "_LehrberufToTalent_A_fkey" FOREIGN KEY ("A") REFERENCES "lehrberufe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToTalent" ADD CONSTRAINT "_LehrberufToTalent_B_fkey" FOREIGN KEY ("B") REFERENCES "talente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToLink" ADD CONSTRAINT "_LehrberufToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "lehrberufe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrberufToLink" ADD CONSTRAINT "_LehrberufToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirmaToLink" ADD CONSTRAINT "_FirmaToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "mitgliederfirmen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FirmaToLink" ADD CONSTRAINT "_FirmaToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrstelleToLink" ADD CONSTRAINT "_LehrstelleToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "lehrstellen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LehrstelleToLink" ADD CONSTRAINT "_LehrstelleToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LinkToTalent" ADD CONSTRAINT "_LinkToTalent_A_fkey" FOREIGN KEY ("A") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LinkToTalent" ADD CONSTRAINT "_LinkToTalent_B_fkey" FOREIGN KEY ("B") REFERENCES "talente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
