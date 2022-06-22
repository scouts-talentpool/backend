import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import faker from '@faker-js/faker';

const prisma = new PrismaClient();

const talentCount = 200;
const firmaCount = 200;
const mitarbeiterProFirmaCount = 25;
const lehrstelleProFirmaCount = 4;

const campus: Prisma.CampusCreateInput[] = [
  {
    bezeichnung: 'ICT Campus Handelskammer beider Basel',
    strasse: 'Gründenstrasse 40',
    plz: 4132,
    ort: 'Muttenz',
  },
  {
    bezeichnung: 'ICT Campus Bern',
    strasse: 'Lorrainestrasse 3a',
    plz: 3013,
    ort: 'Bern',
  },
];

const lehrberufe: Prisma.LehrberufCreateInput[] = [
  {
    bezeichnung: 'Informatiker/in Applikationsentwicklung EFZ',
  },
  {
    bezeichnung: 'Informatiker/in Plattformentwicklung EFZ',
  },
  {
    bezeichnung: 'Mediamatiker/in EFZ',
  },
];

const rollen: Prisma.RolleCreateInput[] = [
  {
    bezeichnung: 'Admin',
  },
  {
    bezeichnung: 'Talent',
  },
  {
    bezeichnung: 'Mitarbeiter',
  },
];

const fakeTalent = (
  campusId: number,
  rolleId: number,
): Prisma.TalentCreateInput => ({
  abschlussjahr: faker.date.future(6).getFullYear(),
  plz: +faker.address.zipCode('####'),
  wohnort: faker.address.cityName(),
  lieblingsCampusAktivitaet: faker.lorem.paragraph(),
  meineStaerken: faker.lorem.paragraph(),
  benutzer: {
    create: {
      vorname: faker.name.firstName(),
      nachname: faker.name.lastName(),
      email: faker.internet.email(),
      rolle: {
        connect: {
          id: rolleId,
        },
      },
    },
  },
  campus: {
    connect: {
      id: campusId,
    },
  },
});

const fakeFirma = (): Prisma.FirmaCreateInput => ({
  firmenname: faker.company.companyName(),
  firmenportrait: faker.lorem.paragraph(),
  strasse: faker.address.streetAddress(),
  plz: +faker.address.zipCode('####'),
  ort: faker.address.cityName(),
});

const fakeMitarbeiter = (
  firmaId: number,
  rolleId: number,
): Prisma.BenutzerCreateInput => ({
  vorname: faker.name.firstName(),
  nachname: faker.name.lastName(),
  email: faker.internet.email(),
  rolle: {
    connect: {
      id: rolleId,
    },
  },
  firma: {
    connect: {
      id: firmaId,
    },
  },
});

const fakeLehrstelle = (
  lehrberufId: number,
  firmaId,
): Prisma.LehrstelleCreateInput => ({
  bewerbungsvorgehen: faker.lorem.paragraph(),
  ausbildungskonzept: faker.lorem.paragraph(),
  ausbildungsorte: [faker.address.cityName(), faker.address.cityName()],
  startjahr: faker.date.future(2).getFullYear(),
  stellenanzahl: 2,
  lehrberuf: {
    connect: {
      id: lehrberufId,
    },
  },
  firma: {
    connect: {
      id: firmaId,
    },
  },
});

const createAdmin = (
  vorname: string,
  nachname: string,
  email: string,
  rolleId: number,
): Prisma.BenutzerCreateManyInput => ({
  vorname,
  nachname,
  email,
  rolleId: rolleId,
});

async function main() {
  await prisma.talent.deleteMany({});
  await prisma.benutzer.deleteMany({});
  await prisma.campus.deleteMany({});
  await prisma.lehrstelle.deleteMany({});
  await prisma.lehrberuf.deleteMany({});
  await prisma.firma.deleteMany({});
  await prisma.link.deleteMany({});
  await prisma.berechtigung.deleteMany({});
  await prisma.rolle.deleteMany({});

  await prisma.campus.createMany({ data: campus });
  await prisma.lehrberuf.createMany({ data: lehrberufe });
  await prisma.rolle.createMany({ data: rollen });

  const newCampus = await prisma.campus.findMany({});
  const newLehrberufe = await prisma.lehrberuf.findMany({});
  const newRollen = await prisma.rolle.findMany({});

  const adminRolleId = newRollen.find((r) => r.bezeichnung === 'Admin').id;
  const newAdmins = await prisma.benutzer.createMany({
    data: [
      createAdmin('Lian', 'Studer', 'ln.studer@protonmail.ch', adminRolleId),
      createAdmin('Kris', 'Huber', 'internet@krishuber.xyz', adminRolleId),
      createAdmin(
        'Stefan',
        'Huber',
        'stefan.huber@ict-scouts.ch',
        adminRolleId,
      ),
      createAdmin(
        'Urs',
        'Nussbaumer',
        'urs.nussbaumer@ict-bz.ch',
        adminRolleId,
      ),
    ],
  });

  for (let index = 0; index < talentCount; index++) {
    await prisma.talent.create({
      data: fakeTalent(
        faker.helpers.arrayElement(newCampus).id,
        newRollen.find((r) => r.bezeichnung === 'Talent').id,
      ),
    });
  }

  for (let index = 0; index < firmaCount; index++) {
    const newFirma = await prisma.firma.create({ data: fakeFirma() });

    for (
      let mitarbeiter = 0;
      mitarbeiter < mitarbeiterProFirmaCount;
      mitarbeiter++
    ) {
      const newMitarbeiter = await prisma.benutzer.create({
        data: fakeMitarbeiter(
          newFirma.id,
          newRollen.find((r) => r.bezeichnung === 'Mitarbeiter').id,
        ),
      });
    }

    for (
      let lehrstelle = 0;
      lehrstelle < lehrstelleProFirmaCount;
      lehrstelle++
    ) {
      const newLehrstelle = await prisma.lehrstelle.create({
        data: fakeLehrstelle(
          faker.helpers.arrayElement(newLehrberufe).id,
          newFirma.id,
        ),
      });
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
