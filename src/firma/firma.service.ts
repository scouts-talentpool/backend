import { Injectable } from '@nestjs/common';
import { Prisma, Firma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FirmaService {
  constructor(private prisma: PrismaService) {}

  async createFirma(data: Prisma.FirmaCreateInput) {
    return await this.prisma.firma.create({ data });
  }

  async findCompanies(params: {
    take: number;
    cursor: Prisma.FirmaWhereUniqueInput;
    where: Prisma.FirmaWhereInput;
  }) {
    const result = await this.prisma.firma.findMany({
      ...params,
      orderBy: { id: 'asc' },
    });
    return result;
  }

  async findFirma(where: Prisma.FirmaWhereUniqueInput): Promise<Firma | null> {
    return await this.prisma.firma.findUnique({ where });
  }

  async updateFirma(params: {
    where: Prisma.FirmaWhereUniqueInput;
    data: Prisma.FirmaUpdateInput;
  }): Promise<Firma> {
    return await this.prisma.firma.update({ ...params });
  }

  async removeFirma(where: Prisma.FirmaWhereUniqueInput): Promise<Firma> {
    return await this.prisma.firma.delete({ where });
  }
}
