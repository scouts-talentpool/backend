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
  create(@Body() companyProfile: Prisma.CompanyProfileCreateInput) {
    return this.companiesService.createCompany(companyProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('take') take: string, @Query('cursor') cursor: string) {
    return this.companiesService.findCompanies({
      take: +take,
      cursor: {
        cursor: +cursor,
      },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findCompany({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() companyProfile: Prisma.CompanyProfileUpdateInput,
  ) {
    return this.companiesService.updateCompany({
      where: { id },
      data: companyProfile,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.removeCompany({ id });
  }
}
