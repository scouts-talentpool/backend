import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TalentProfile, Prisma } from '@prisma/client';
import { CompaniesService } from './companies.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCompany(
    @Body() companyProfile: Prisma.CompanyProfileCreateInput,
  ) {
    return await this.companiesService.createCompany(companyProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findCompanies(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ) {
    return await this.companiesService.findCompanies({
      take: +take,
      cursor: {
        cursor: +cursor,
      },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findCompany(@Param('id') id: string) {
    return await this.companiesService.findCompany({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateCompany(
    @Param('id') id: string,
    @Body() companyProfile: Prisma.CompanyProfileUpdateInput,
  ) {
    return await this.companiesService.updateCompany({
      where: { id },
      data: companyProfile,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeCompany(@Param('id') id: string) {
    return await this.companiesService.removeCompany({ id });
  }
}
