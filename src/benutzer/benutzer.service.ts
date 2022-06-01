import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Benutzer } from '@prisma/client';

@Injectable()
export class BenutzerService {
  constructor(private prisma: PrismaService) {}

  async createBenutzer(data: Prisma.BenutzerCreateInput): Promise<Benutzer> {
    return await this.prisma.benutzer.create({
      data,
      include: {
        rolle: {
          include: {
            berechtigungen: true,
          },
        },
        firma: true,
        talent: {
          include: {
            campus: true,
            wunschberufe: true,
          },
        },
      },
    });
  }

  async getBenutzers(params: Prisma.BenutzerFindManyArgs): Promise<Benutzer[]> {
    return await this.prisma.benutzer.findMany({
      ...params,
      include: {
        rolle: {
          include: {
            berechtigungen: true,
          },
        },
        firma: true,
        talent: {
          include: {
            campus: true,
            wunschberufe: true,
          },
        },
      },
    });
  }

  async getBenutzer(
    params: Prisma.BenutzerFindUniqueArgs,
  ): Promise<Benutzer | null> {
    return await this.prisma.benutzer.findUnique({
      ...params,
      include: {
        rolle: {
          include: {
            berechtigungen: true,
          },
        },
        firma: true,
        talent: {
          include: {
            campus: true,
            wunschberufe: true,
          },
        },
      },
    });
  }

  async updateBenutzer(
    where: Prisma.BenutzerWhereUniqueInput,
    data: Prisma.BenutzerUpdateInput,
  ): Promise<Benutzer> {
    return await this.prisma.benutzer.update({
      where,
      data,
      include: {
        rolle: {
          include: {
            berechtigungen: true,
          },
        },
        firma: true,
        talent: {
          include: {
            campus: true,
            wunschberufe: true,
          },
        },
      },
    });
  }

  async removeBenutzer(
    where: Prisma.BenutzerWhereUniqueInput,
  ): Promise<Benutzer> {
    return await this.prisma.benutzer.delete({
      where,
      include: {
        rolle: {
          include: {
            berechtigungen: true,
          },
        },
        firma: true,
        talent: {
          include: {
            campus: true,
            wunschberufe: true,
          },
        },
      },
    });
  }
}
