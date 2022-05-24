import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaModel } from 'src/_gen/entities';

@Injectable()
export class BenutzerService {
  constructor(private prisma: PrismaService) {}

  async createBenutzer(
    benutzer: PrismaModel.Benutzer,
  ): Promise<PrismaModel.Benutzer> {
    return await this.prisma.benutzer.create({
      data: benutzer,
    });
  }

  async getBenutzers(
    take?: number,
    cursor?: number,
    rolle?: string,
  ): Promise<PrismaModel.Benutzer[]> {
    return await this.prisma.benutzer.findMany({
      take,
      cursor: {
        id: cursor,
      },
      where: {
        rolle: {
          bezeichnung: rolle,
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async getBenutzer(id: number): Promise<PrismaModel.Benutzer | null> {
    return await this.prisma.benutzer.findUnique({
      where: {
        id,
      },
    });
  }

  async updateBenutzer(
    id: number,
    benutzer: PrismaModel.Benutzer,
  ): Promise<PrismaModel.Benutzer> {
    return await this.prisma.benutzer.update({
      where: { id },
      data: benutzer,
    });
  }

  async removeBenutzer(id: number): Promise<PrismaModel.Benutzer> {
    return await this.prisma.benutzer.delete({ where: { id } });
  }
}
