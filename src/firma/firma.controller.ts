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
import { FirmaService } from './firma.service';
import { AuthGuard } from '../auth/auth.guard';
import { Firma } from '@prisma/client';

@Controller('firmen')
export class FirmaController {
  constructor(private readonly firmaService: FirmaService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createFirma(@Body() firma: Firma): Promise<Firma> {
    return await this.firmaService.createFirma({
      ...firma,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findCompanies(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ): Promise<Firma[]> {
    return await this.firmaService.findFirmen({
      take: +take,
      cursor: {
        id: +cursor,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findFirma(@Param('id') id: string): Promise<Firma> {
    return await this.firmaService.findFirma({
      where: { id: +id },
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateFirma(
    @Param('id') id: string,
    @Body() firma: Partial<Firma>,
  ): Promise<Firma> {
    return await this.firmaService.updateFirma(
      {
        id: +id,
      },
      firma,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeFirma(@Param('id') id: string): Promise<Firma> {
    return await this.firmaService.removeFirma({ id: +id });
  }
}
