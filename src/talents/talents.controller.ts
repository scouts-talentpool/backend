import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
    return this.talentsService.create(talentProfile);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.talentsService.findMany({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talentsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() talentProfile: Prisma.TalentProfileUpdateInput,
  ) {
    return this.talentsService.update({ where: { id }, data: talentProfile });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talentsService.remove({ id });
  }
}
