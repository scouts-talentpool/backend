import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Post,
} from '@nestjs/common';
import { BenutzerService } from './benutzer.service';
import { AuthGuard } from '../auth/auth.guard';
import { Benutzer } from '@prisma/client';
import { CreateUserData, UpdateUserData } from 'auth0';
import { Auth0Service } from 'src/auth0.service';
import { ConfigService } from '@nestjs/config';
import { RolleService } from 'src/rolle/rolle.service';

class Auth0BenutzerCreateInput implements CreateUserData {
  connection: string;
  password?: string;
}

class Auth0BenutzerUpdateInput implements UpdateUserData {
  connection: string;
  password?: string;
}

@Controller('benutzer')
export class BenutzerController {
  constructor(
    private readonly benutzerService: BenutzerService,
    private readonly auth0Service: Auth0Service,
    private readonly configService: ConfigService,
    private readonly rolleService: RolleService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createBenutzer(
    @Body() benutzer: Benutzer & Partial<Auth0BenutzerCreateInput>,
  ): Promise<Benutzer> {
    const newUser = await this.benutzerService.createBenutzer({
      firma: {
        connect: {
          id: benutzer.firmaId,
        },
      },
      talent: {
        connect: {
          id: benutzer.talentId,
        },
      },
      rolle: {
        connect: {
          id: benutzer.rolleId,
        },
      },
      ...benutzer,
    });

    const benutzerRolle = await this.rolleService.getRolle({
      where: { id: benutzer.rolleId },
    });
    if (benutzerRolle.bezeichnung === 'Firma')
      await this.auth0Service.managementClient.createUser({
        connection: this.configService.get<string>('AUTH0_USER_DATABASE'),
        user_id: newUser.authId,
        email: benutzer.email,
        family_name: benutzer.nachname,
        given_name: benutzer.vorname,
        password: benutzer.password,
      });

    return newUser;
  }

  @UseGuards(AuthGuard)
  @Get()
  async findBenutzers(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
    @Query('rolle') rolle?: string,
  ): Promise<Benutzer[]> {
    return await this.benutzerService.getBenutzers({
      take: +take,
      cursor: {
        id: +cursor,
      },
      where: {
        rolle: {
          bezeichnung: rolle,
        },
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findBenutzerByAuthId(@Param('id') id: string): Promise<Benutzer> {
    return await this.benutzerService.getBenutzer({
      where: { authId: id },
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateBenutzer(
    @Param('id') id: string,
    @Body() benutzer: Partial<Benutzer> & Partial<Auth0BenutzerUpdateInput>,
  ): Promise<Benutzer> {
    const updatedUser = await this.benutzerService.updateBenutzer(
      {
        authId: id,
      },
      benutzer,
    );

    const benutzerRolle = await this.rolleService.getRolle({
      where: { id: benutzer.rolleId },
    });
    if (benutzerRolle.bezeichnung === 'Firma')
      await this.auth0Service.managementClient.updateUser(
        {
          id: updatedUser.authId,
        },
        {
          connection: this.configService.get<string>('AUTH0_USER_DATABASE'),
          user_id: benutzer.authId,
          email: benutzer.email,
          family_name: benutzer.nachname,
          given_name: benutzer.vorname,
          password: benutzer.password,
        },
      );

    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeBenutzer(@Param('id') id: string): Promise<Benutzer> {
    const removedUser = await this.benutzerService.removeBenutzer({ id: +id });

    const benutzerRolle = await this.rolleService.getRolle({
      where: { id: removedUser.rolleId },
    });
    if (benutzerRolle.bezeichnung === 'Firma')
      await this.auth0Service.managementClient.deleteUser({ id });

    return removedUser;
  }
}
