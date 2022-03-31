import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
    return this.companiesService.create(companyProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.companiesService.findMany({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() companyProfile: Prisma.CompanyProfileUpdateInput,
  ) {
    return this.companiesService.update({
      where: { id },
      data: companyProfile,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove({ id });
  }
}
