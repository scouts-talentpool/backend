import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyProfile, Prisma } from '@prisma/client';
import { CompanyService } from './company.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<CompanyProfile[]> {
    return await this.companyService.findMany({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<CompanyProfile | null> {
    return await this.companyService.findOne({ id });
  }
}
