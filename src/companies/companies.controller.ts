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
  async create(@Body() companyProfile: Prisma.CompanyProfileCreateInput) {
    return await this.companiesService.createCompany(companyProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('take') take: string, @Query('cursor') cursor: string) {
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
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findCompany({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
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
  async remove(@Param('id') id: string) {
    return await this.companiesService.removeCompany({ id });
  }
}
