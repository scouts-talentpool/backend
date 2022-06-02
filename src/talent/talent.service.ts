import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Talent, Prisma } from '@prisma/client';

@Injectable()
export class TalentService {
  constructor(private prisma: PrismaService) {}

  async createTalent(data: Prisma.TalentCreateInput): Promise<Talent> {
    return await this.prisma.talent.create({
      data,
      include: {
        benutzer: true,
        campus: true,
        wunschberufe: true,
      },
    });
  }

  async findTalente(params: Prisma.TalentFindManyArgs): Promise<Talent[]> {
    return await this.prisma.talent.findMany({
      ...params,
      include: {
        benutzer: true,
        campus: true,
        wunschberufe: true,
      },
    });
  }

  async findTalent(
    params: Prisma.TalentFindUniqueArgs,
  ): Promise<Talent | null> {
    return await this.prisma.talent.findUnique({
      ...params,
      include: {
        benutzer: true,
        campus: true,
        wunschberufe: true,
      },
    });
  }

  async updateTalent(
    where: Prisma.TalentWhereUniqueInput,
    data: Prisma.TalentUpdateInput,
  ): Promise<Talent> {
    return await this.prisma.talent.update({
      where,
      data,
      include: {
        benutzer: true,
        campus: true,
        wunschberufe: true,
      },
    });
  }

  async removeTalent(where: Prisma.TalentWhereUniqueInput): Promise<Talent> {
    return await this.prisma.talent.delete({
      where,
      include: {
        benutzer: true,
        campus: true,
        wunschberufe: true,
      },
    });
  }
}
