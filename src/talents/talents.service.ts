import { Injectable } from '@nestjs/common';
import { Prisma, TalentProfile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TalentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TalentProfileCreateInput) {
    return await this.prisma.talentProfile.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TalentProfileWhereUniqueInput;
    where?: Prisma.TalentProfileWhereInput;
    orderBy?: Prisma.TalentProfileOrderByWithRelationInput;
  }) {
    return await this.prisma.talentProfile.findMany({ ...params });
  }

  async findOne(
    where: Prisma.TalentProfileWhereUniqueInput,
  ): Promise<TalentProfile | null> {
    return await this.prisma.talentProfile.findUnique({ where });
  }

  async update(params: {
    where: Prisma.TalentProfileWhereUniqueInput;
    data: Prisma.TalentProfileUpdateInput;
  }): Promise<TalentProfile> {
    return await this.prisma.talentProfile.update({ ...params });
  }

  async remove(
    where: Prisma.TalentProfileWhereUniqueInput,
  ): Promise<TalentProfile> {
    return await this.prisma.talentProfile.delete({ where });
  }
}
