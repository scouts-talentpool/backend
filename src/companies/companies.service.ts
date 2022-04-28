import { Injectable } from '@nestjs/common';
import { Prisma, CompanyProfile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async createCompany(data: Prisma.CompanyProfileCreateInput) {
    return await this.prisma.companyProfile.create({ data });
  }

  async findCompanies(params: {
    take: number;
    cursor: Prisma.CompanyProfileWhereUniqueInput;
    where: Prisma.CompanyProfileWhereInput;
  }) {
    return await this.prisma.companyProfile.findMany({ ...params, skip: 1 });
  }

  async findCompany(
    where: Prisma.CompanyProfileWhereUniqueInput,
  ): Promise<CompanyProfile | null> {
    return await this.prisma.companyProfile.findUnique({ where });
  }

  async updateCompany(params: {
    where: Prisma.CompanyProfileWhereUniqueInput;
    data: Prisma.CompanyProfileUpdateInput;
  }): Promise<CompanyProfile> {
    return await this.prisma.companyProfile.update({ ...params });
  }

  async removeCompany(
    where: Prisma.CompanyProfileWhereUniqueInput,
  ): Promise<CompanyProfile> {
    return await this.prisma.companyProfile.delete({ where });
  }
}
