import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { faker } from '@faker-js/faker';
import { PrismaService } from './prisma.service';
import { User, CompanyProfile, TalentProfile } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private prismaService: PrismaService) {}

  // @Get('generate')
  // async generateTestData() {
  //   console.log('neger');
  //   for (let index = 0; index < 20; index++) {
  //     let companyId = faker.datatype.uuid();

  //     let company: CompanyProfile = {
  //       id: companyId,
  //       location: faker.address.city(),
  //       name: faker.company.companyName(),
  //     };

  //     await this.prismaService.companyProfile.create({ data: company });

  //     for (let index = 0; index < 100; index++) {
  //       let employee: User = {
  //         id: faker.datatype.uuid(),
  //         role: 'COMPANY',
  //         companyProfileId: companyId,
  //         talentProfileId: null,
  //       };

  //       await this.prismaService.user.create({ data: employee });
  //     }
  //   }

  //   for (let index = 0; index < 200; index++) {
  //     let talentId = faker.datatype.uuid();

  //     let talent: TalentProfile = {
  //       id: talentId,
  //       firstname: faker.name.firstName(),
  //       lastname: faker.name.lastName(),
  //       birthdate: faker.date.past(),
  //     };

  //     await this.prismaService.talentProfile.create({ data: talent });

  //     let user: User = {
  //       id: faker.datatype.uuid(),
  //       role: 'TALENT',
  //       companyProfileId: null,
  //       talentProfileId: talentId,
  //     };

  //     await this.prismaService.user.create({ data: user });
  //   }
  // }
}
