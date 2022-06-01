import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Firma, Prisma } from '@prisma/client';

@Injectable()
export class FirmaService {
  constructor(private prisma: PrismaService) {}

  async createFirma(data: Prisma.FirmaCreateInput): Promise<Firma> {
    return await this.prisma.firma.create({
      data,
      include: {
        lehrstellen: {
          include: {
            lehrberuf: true,
          },
        },
      },
    });
  }

  async findFirmen(params: Prisma.FirmaFindManyArgs): Promise<Firma[]> {
    return await this.prisma.firma.findMany({
      ...params,
      include: {
        lehrstellen: {
          include: {
            lehrberuf: true,
          },
        },
      },
    });
  }

  async findFirma(params: Prisma.FirmaFindUniqueArgs): Promise<Firma | null> {
    return await this.prisma.firma.findUnique({
      ...params,
      include: {
        lehrstellen: {
          include: {
            lehrberuf: true,
          },
        },
      },
    });
  }

  async updateFirma(
    where: Prisma.FirmaWhereUniqueInput,
    data: Prisma.FirmaUpdateInput,
  ): Promise<Firma> {
    return await this.prisma.firma.update({
      where,
      data,
      include: {
        lehrstellen: {
          include: {
            lehrberuf: true,
          },
        },
      },
    });
  }

  async removeFirma(where: Prisma.FirmaWhereUniqueInput): Promise<Firma> {
    return await this.prisma.firma.delete({
      where,
      include: {
        lehrstellen: {
          include: {
            lehrberuf: true,
          },
        },
      },
    });
  }
}
