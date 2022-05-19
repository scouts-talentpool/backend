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
import { Prisma, Firma } from '@prisma/client';
import { FirmaService } from './firma.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('firmen')
export class FirmaController {
  constructor(private readonly firmaService: FirmaService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createFirma(
    @Body() companyProfile: Prisma.FirmaCreateInput,
  ): Promise<Firma> {
    return await this.firmaService.createFirma(companyProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findCompanies(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ): Promise<Firma[]> {
    return await this.firmaService.findCompanies({
      take: +take,
      cursor: {
        id: +cursor,
      },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findFirma(@Param('id') id: string): Promise<Firma> {
    return await this.firmaService.findFirma({ id: +id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateFirma(
    @Param('id') id: string,
    @Body() companyProfile: Prisma.FirmaUpdateInput,
  ): Promise<Firma> {
    return await this.firmaService.updateFirma({
      where: { id: +id },
      data: companyProfile,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeFirma(@Param('id') id: string): Promise<Firma> {
    return await this.firmaService.removeFirma({ id: +id });
  }
}
