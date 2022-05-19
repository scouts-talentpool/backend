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
import { Benutzer } from '@prisma/client';
import { BenutzerService } from './benutzer.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('benutzer')
export class BenutzerController {
  constructor(private readonly benutzerService: BenutzerService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createBenutzer(@Body() benutzer: Benutzer): Promise<Benutzer> {
    return await this.benutzerService.createBenutzer(benutzer);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getBenutzers(
    @Query('cursor') cursor?: string,
    @Query('take') take?: string,
    @Query('rolle') rolle?: string,
  ): Promise<Benutzer[]> {
    return await this.benutzerService.getBenutzers({
      take: take ? +take : undefined,
      cursor: {
        id: +cursor,
      },
      where: {
        rolle: { bezeichnung: rolle },
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getBenutzer(@Param('id') id: string): Promise<Benutzer> {
    return await this.benutzerService.getBenutzer({ id: +id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateBenutzer(
    @Param('id') id: string,
    @Body() benutzer: Benutzer,
  ): Promise<Benutzer> {
    return await this.benutzerService.updateBenutzer({
      where: { id: +id },
      data: benutzer,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeBenutzer(@Param('id') id: string) {
    return await this.benutzerService.removeBenutzer({ id: +id });
  }
}
