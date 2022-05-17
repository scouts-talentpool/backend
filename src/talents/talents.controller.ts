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
import { Prisma } from '@prisma/client';
import { TalentsService } from './talents.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createTalent(@Body() talentProfile: Prisma.TalentProfileCreateInput) {
    return await this.talentsService.createTalent({
      firstname: talentProfile.firstname,
      lastname: talentProfile.lastname,
      postalCode: talentProfile.postalCode,
      placeOfResidence: talentProfile.placeOfResidence,
      finalSchoolYear: talentProfile.finalSchoolYear,
      desiredApprenticeships: talentProfile.desiredApprenticeships
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getTalents(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ) {
    return await this.talentsService.findTalents({
      take: +take,
      cursor: { cursor: +cursor },
      where: {},
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getTalent(@Param('id') id: string) {
    return await this.talentsService.findTalent({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTalent(
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
  async removeTalent(@Param('id') id: string) {
    return await this.talentsService.removeTalent({ id });
  }
}
