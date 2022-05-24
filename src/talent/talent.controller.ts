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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaModel } from 'src/_gen/entities';

@ApiBearerAuth()
@ApiTags('talente')
@Controller('talente')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @ApiOperation({ summary: 'Create Talent' })
  @ApiResponse({
    type: PrismaModel.Talent,
  })
  @UseGuards(AuthGuard)
  @Post()
  async createTalent(
    @Body() talent: PrismaModel.Talent,
  ): Promise<PrismaModel.Talent> {
    return await this.talentService.createTalent(talent);
  }

  @ApiResponse({
    type: [PrismaModel.Talent],
  })
  @UseGuards(AuthGuard)
  @Get()
  async getTalente(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
  ): Promise<PrismaModel.Talent[]> {
    return await this.talentService.findTalente(+take, +cursor);
  }

  @ApiResponse({
    type: PrismaModel.Talent,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTalent(@Param('id') id: string): Promise<PrismaModel.Talent> {
    return await this.talentService.findTalent(+id);
  }

  @ApiOperation({ summary: 'Update Talent' })
  @ApiResponse({
    type: PrismaModel.Talent,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTalent(
    @Param('id') id: string,
    @Body() talent: PrismaModel.Talent,
  ): Promise<PrismaModel.Talent> {
    return await this.talentService.updateTalent(+id, talent);
  }

  @ApiOperation({ summary: 'Delete Talent' })
  @ApiResponse({
    type: PrismaModel.Talent,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeTalent(@Param('id') id: string): Promise<PrismaModel.Talent> {
    return await this.talentService.removeTalent(+id);
  }
}
