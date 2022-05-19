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
import { Prisma, Talent } from '@prisma/client';
import { TalentService } from './talent.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('talente')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTalent(@Body() talent: Prisma.TalentCreateInput) {
    return await this.talentService.createTalent(talent);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getTalente(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ): Promise<Talent[]> {
    return await this.talentService.findTalente({
      take: +take,
      cursor: { id: +cursor },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTalent(@Param('id') id: string) {
    return await this.talentService.findTalent({ id: +id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTalent(
    @Param('id') id: string,
    @Body() talent: Prisma.TalentUpdateInput,
  ) {
    return await this.talentService.updateTalent({
      where: { id: +id },
      data: talent,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeTalent(@Param('id') id: string) {
    return await this.talentService.removeTalent({ id: +id });
  }
}
