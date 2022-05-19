import { Injectable } from '@nestjs/common';
import { Prisma, Talent } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TalentService {
  constructor(private prisma: PrismaService) {}

  async createTalent(data: Prisma.TalentCreateInput) {
    return await this.prisma.talent.create({ data });
  }

  async findTalente(params: {
    take: number;
    cursor: Prisma.TalentWhereUniqueInput;
    where: Prisma.TalentWhereInput;
  }) {
    return await this.prisma.talent.findMany({
      ...params,
      orderBy: { id: 'asc' },
    });
  }

  async findTalent(
    where: Prisma.TalentWhereUniqueInput,
  ): Promise<Talent | null> {
    return await this.prisma.talent.findUnique({ where });
  }

  async updateTalent(params: {
    where: Prisma.TalentWhereUniqueInput;
    data: Prisma.TalentUpdateInput;
  }): Promise<Talent> {
    return await this.prisma.talent.update({ ...params });
  }

  async removeTalent(where: Prisma.TalentWhereUniqueInput): Promise<Talent> {
    return await this.prisma.talent.delete({ where });
  }
}
