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
import { TalentService } from './talent.service';
import { AuthGuard } from '../auth/auth.guard';
import { Talent } from '@prisma/client';

@Controller('talente')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTalent(@Body() data: Talent): Promise<Talent> {
    return await this.talentService.createTalent({
      ...data,
      campus: {
        connect: {
          id: data.campusId,
        },
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getTalente(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ): Promise<Talent[]> {
    return await this.talentService.findTalente({
      take: +take,
      cursor: {
        id: +cursor,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTalent(@Param('id') id: string): Promise<Talent> {
    return await this.talentService.findTalent({
      where: {
        id: +id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTalent(
    @Param('id') id: string,
    @Body() data: Partial<Talent>,
  ): Promise<Talent> {
    return await this.talentService.updateTalent(
      {
        id: +id,
      },
      data,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeTalent(@Param('id') id: string): Promise<Talent> {
    return await this.talentService.removeTalent({
      id: +id,
    });
  }
}
