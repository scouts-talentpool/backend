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
import { PrismaModel } from 'src/_gen/entities';
import { FirmaService } from './firma.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('firmen')
@Controller('firmen')
export class FirmaController {
  constructor(private readonly firmaService: FirmaService) {}

  @ApiOperation({ summary: 'Create Firma' })
  @ApiResponse({ type: PrismaModel.Firma })
  @UseGuards(AuthGuard)
  @Post()
  async createFirma(
    @Body() firma: PrismaModel.Firma,
  ): Promise<PrismaModel.Firma> {
    return await this.firmaService.createFirma(firma);
  }

  @ApiResponse({ type: [PrismaModel.Firma] })
  @UseGuards(AuthGuard)
  @Get()
  async findCompanies(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ): Promise<PrismaModel.Firma[]> {
    return await this.firmaService.findCompanies(+take, +cursor);
  }

  @ApiResponse({ type: PrismaModel.Firma })
  @UseGuards(AuthGuard)
  @Get(':id')
  async findFirma(@Param('id') id: string): Promise<PrismaModel.Firma> {
    return await this.firmaService.findFirma(+id);
  }

  @ApiOperation({ summary: 'Update Firma' })
  @ApiResponse({ type: PrismaModel.Firma })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateFirma(
    @Param('id') id: string,
    @Body() firma: PrismaModel.Firma,
  ): Promise<PrismaModel.Firma> {
    return await this.firmaService.updateFirma(+id, firma);
  }

  @ApiOperation({ summary: 'Delete Firma' })
  @ApiResponse({ type: PrismaModel.Firma })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeFirma(@Param('id') id: string): Promise<PrismaModel.Firma> {
    return await this.firmaService.removeFirma(+id);
  }
}
