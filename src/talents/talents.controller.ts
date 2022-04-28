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
  create(@Body() talentProfile: Prisma.TalentProfileCreateInput) {
    return this.talentsService.createTalent(talentProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query('take') take: string, @Query('cursor') cursor: string) {
    return this.talentsService.findTalents({
      take: +take,
      cursor: { cursor: +cursor },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentsService.findTalent({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() talentProfile: Prisma.TalentProfileUpdateInput,
  ) {
    return this.talentsService.updateTalent({
      where: { id },
      data: talentProfile,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentsService.removeTalent({ id });
  }
}
