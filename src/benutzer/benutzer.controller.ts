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
import { BenutzerService } from './benutzer.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaModel } from 'src/_gen/entities';

@ApiBearerAuth()
@ApiTags('benutzer')
@Controller('benutzer')
export class BenutzerController {
  constructor(private readonly benutzerService: BenutzerService) {}

  @ApiOperation({ summary: 'Create Benutzer' })
  @ApiResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  @Post()
  async createBenutzer(
    @Body() benutzer: PrismaModel.Benutzer,
  ): Promise<PrismaModel.Benutzer> {
    return await this.benutzerService.createBenutzer(benutzer);
  }

  @ApiResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  @Get()
  async getBenutzers(
    @Query('cursor') cursor: string,
    @Query('take') take: string,
    @Query('rolle') rolle?: string,
  ): Promise<PrismaModel.Benutzer[]> {
    return await this.benutzerService.getBenutzers(+take, +cursor, rolle);
  }

  @ApiResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getBenutzer(@Param('id') id: string): Promise<PrismaModel.Benutzer> {
    return await this.benutzerService.getBenutzer(+id);
  }

  @ApiOperation({ summary: 'Update Benutzer' })
  @ApiResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateBenutzer(
    @Param('id') id: string,
    @Body() benutzer: PrismaModel.Benutzer,
  ): Promise<PrismaModel.Benutzer> {
    return await this.benutzerService.updateBenutzer(+id, benutzer);
  }

  @ApiOperation({ summary: 'Delete Benutzer' })
  @ApiResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeBenutzer(@Param('id') id: string): Promise<PrismaModel.Benutzer> {
    return await this.benutzerService.removeBenutzer(+id);
  }
}
