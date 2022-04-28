import { Injectable } from '@nestjs/common';
import { Prisma, TalentProfile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TalentsService {
  constructor(private prisma: PrismaService) {}

  async createTalent(data: Prisma.TalentProfileCreateInput) {
    return await this.prisma.talentProfile.create({ data });
  }

  async findTalents(params: {
    take: number;
    cursor: Prisma.TalentProfileWhereUniqueInput;
    where: Prisma.TalentProfileWhereInput;
  }) {
    return await this.prisma.talentProfile.findMany({ ...params, skip: 1 });
  }

  async findTalent(
    where: Prisma.TalentProfileWhereUniqueInput,
  ): Promise<TalentProfile | null> {
    return await this.prisma.talentProfile.findUnique({ where });
  }

  async updateTalent(params: {
    where: Prisma.TalentProfileWhereUniqueInput;
    data: Prisma.TalentProfileUpdateInput;
  }): Promise<TalentProfile> {
    return await this.prisma.talentProfile.update({ ...params });
  }

  async removeTalent(
    where: Prisma.TalentProfileWhereUniqueInput,
  ): Promise<TalentProfile> {
    return await this.prisma.talentProfile.delete({ where });
  }
}
