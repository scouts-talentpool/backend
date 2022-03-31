import { Injectable } from '@nestjs/common';
import { Prisma, CompanyProfile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CompanyProfileCreateInput) {
    return await this.prisma.companyProfile.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyProfileWhereUniqueInput;
    where?: Prisma.CompanyProfileWhereInput;
    orderBy?: Prisma.CompanyProfileOrderByWithRelationInput;
  }) {
    return await this.prisma.companyProfile.findMany({ ...params });
  }

  async findOne(
    where: Prisma.CompanyProfileWhereUniqueInput,
  ): Promise<CompanyProfile | null> {
    return await this.prisma.companyProfile.findUnique({ where });
  }

  async update(params: {
    where: Prisma.CompanyProfileWhereUniqueInput;
    data: Prisma.CompanyProfileUpdateInput;
  }): Promise<CompanyProfile> {
    return await this.prisma.companyProfile.update({ ...params });
  }

  async remove(
    where: Prisma.CompanyProfileWhereUniqueInput,
  ): Promise<CompanyProfile> {
    return await this.prisma.companyProfile.delete({ where });
  }
}
