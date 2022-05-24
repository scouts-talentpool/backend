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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaModel } from 'src/_gen/entities';
import { Auth0Service } from 'src/auth0.service';
import { ConfigService } from '@nestjs/config';
import { CreateBenutzerDto } from './dto/create-benutzer.dto';
import { UpdateBenutzerDto } from './dto/update-benutzer.dto';

@ApiBearerAuth()
@ApiTags('benutzer')
@Controller('benutzer')
export class BenutzerController {
  constructor(
    private readonly benutzerService: BenutzerService,
    private readonly auth0Service: Auth0Service,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Benutzer' })
  @ApiCreatedResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  async createBenutzer(
    @Body()
    benutzer: CreateBenutzerDto,
  ): Promise<PrismaModel.Benutzer> {
    const newUser = await this.benutzerService.createBenutzer(benutzer);

    await this.auth0Service.managementClient.createUser({
      ...benutzer,
      user_id: newUser.authId,
      connection: this.configService.get<string>('AUTH0_USER_DATABASE'),
    });

    return newUser;
  }

  @Get()
  @ApiOkResponse({ type: [PrismaModel.Benutzer] })
  @UseGuards(AuthGuard)
  async getBenutzers(
    @Query('cursor') cursor: string,
    @Query('take') take: string,
    @Query('rolle') rolle?: string,
  ): Promise<PrismaModel.Benutzer[]> {
    return await this.benutzerService.getBenutzers(+take, +cursor, rolle);
  }

  @Get(':id')
  @ApiOkResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  async getBenutzer(@Param('id') id: string): Promise<PrismaModel.Benutzer> {
    return await this.benutzerService.getBenutzer(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Benutzer' })
  @ApiOkResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  async updateBenutzer(
    @Param('id') id: string,
    @Body() benutzer: UpdateBenutzerDto,
  ): Promise<PrismaModel.Benutzer> {
    return await this.benutzerService.updateBenutzer(+id, benutzer);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Benutzer' })
  @ApiOkResponse({ type: PrismaModel.Benutzer })
  @UseGuards(AuthGuard)
  async removeBenutzer(@Param('id') id: string): Promise<PrismaModel.Benutzer> {
    const deletedUser = await this.benutzerService.removeBenutzer(+id);

    await this.auth0Service.managementClient.deleteUser({
      id: deletedUser.authId,
    });

    return deletedUser;
  }
}
