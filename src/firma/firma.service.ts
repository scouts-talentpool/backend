import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaModel } from 'src/_gen/entities';

@Injectable()
export class FirmaService {
  constructor(private prisma: PrismaService) {}

  async createFirma(firma: PrismaModel.Firma): Promise<PrismaModel.Firma> {
    return await this.prisma.firma.create({ data: firma });
  }

  async findCompanies(
    take: number,
    cursor: number,
  ): Promise<PrismaModel.Firma[]> {
    return await this.prisma.firma.findMany({
      take,
      cursor: {
        id: cursor,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findFirma(id: number): Promise<PrismaModel.Firma | null> {
    return await this.prisma.firma.findUnique({
      where: {
        id,
      },
    });
  }

  async updateFirma(
    id: number,
    firma: PrismaModel.Firma,
  ): Promise<PrismaModel.Firma> {
    return await this.prisma.firma.update({ where: { id }, data: firma });
  }

  async removeFirma(id: number): Promise<PrismaModel.Firma> {
    return await this.prisma.firma.delete({ where: { id } });
  }
}
