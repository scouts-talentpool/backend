import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { PrismaService } from './prisma.service';
import { User, CompanyProfile, TalentProfile, Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  // @Get('generate')
  // async generateTestData() {
  //   for (let index = 0; index < 20; index++) {
  //     let companyId = faker.datatype.uuid();

  //     let company = {
  //         id: companyId,
  //         location: faker.address.city(),
  //         name: faker.company.companyName(),
  //     };

  //     await this.prismaService.companyProfile.create({ data: company });

  //     for (let index = 0; index < 100; index++) {
  //       let employee = {
  //         id: faker.datatype.uuid(),
  //         role: 'COMPANY',
  //         talentProfileId: null,
  //         companyProfileId: companyId,
  //       };

  //       await this.prismaService.user.create({ data: employee as User });
  //     }
  //   }

  //   for (let index = 0; index < 200; index++) {
  //     let talentId = faker.datatype.uuid();

  //     let talent = {
  //         id: talentId,
  //         firstname: faker.name.firstName(),
  //         lastname: faker.name.lastName(),
  //         birthdate: faker.date.past(),
  //     };

  //     await this.prismaService.talentProfile.create({ data: talent });

  //     let user = {
  //       id: faker.datatype.uuid(),
  //       role: 'TALENT',
  //       talentProfileId: talentId,
  //       companyProfileId: null,
  //     };

  //     await this.prismaService.user.create({ data: user as User });
  //   }
  // }
}
