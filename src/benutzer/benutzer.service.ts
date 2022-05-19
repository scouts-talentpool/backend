import { Injectable } from '@nestjs/common';
import { Prisma, Benutzer } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BenutzerService {
  constructor(private prisma: PrismaService) {}

  async createBenutzer(benutzer: Benutzer) {
    return await this.prisma.benutzer.create({
      data: {
        authId: benutzer.authId,
        rolle: { connect: { id: benutzer.rolleId } },
        talent: { connect: { id: benutzer.talentId } },
        firma: { connect: { id: benutzer.firmaId } },
      },
    });
  }

  async getBenutzers(params: {
    take?: number;
    cursor?: Prisma.BenutzerWhereUniqueInput;
    where?: Prisma.BenutzerWhereInput;
  }) {
    return await this.prisma.benutzer.findMany({
      ...params,
      orderBy: { id: 'asc' },
    });
  }

  async getBenutzer(
    where: Prisma.BenutzerWhereUniqueInput,
  ): Promise<Benutzer | null> {
    return await this.prisma.benutzer.findUnique({ where });
  }

  async updateBenutzer(params: {
    where: Prisma.BenutzerWhereUniqueInput;
    data: Prisma.BenutzerUpdateInput;
  }): Promise<Benutzer> {
    return await this.prisma.benutzer.update({
      ...params,
    });
  }

  async removeBenutzer(
    where: Prisma.BenutzerWhereUniqueInput,
  ): Promise<Benutzer> {
    return await this.prisma.benutzer.delete({ where });
  }
}
