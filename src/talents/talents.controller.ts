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
import { TalentsService } from './talents.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() talentProfile: Prisma.TalentProfileCreateInput) {
    return await this.talentsService.createTalent(talentProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query('take') take: string, @Query('cursor') cursor: string) {
    return await this.talentsService.findTalents({
      take: +take,
      cursor: { cursor: +cursor },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.talentsService.findTalent({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() talentProfile: Prisma.TalentProfileUpdateInput,
  ) {
    return await this.talentsService.updateTalent({
      where: { id },
      data: talentProfile,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.talentsService.removeTalent({ id });
  }
}
