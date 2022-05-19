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
import { Role, User } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Auth0Service } from 'src/auth0.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.createUser({
      id: user.id,
      role: user.role,
      talentProfile: user.talentProfileId
        ? { connect: { id: user.talentProfileId } }
        : undefined,
      companyProfile: user.companyProfileId
        ? { connect: { id: user.companyProfileId } }
        : undefined,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(
    @Query('cursor') cursor?: string,
    @Query('take') take?: string,
    @Query('role') role?: string,
  ): Promise<User[]> {
    return await this.usersService.getUsers({
      take: take ? +take : undefined,
      cursor: {
        cursor: cursor ? +cursor : undefined,
      },
      where: {
        role: role ? (role as Role) : undefined,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUser({ id });
  }

  @UseGuards(AuthGuard)
  @Get('talent/:talentProfileId')
  async getUserByTalentProfileId(
    @Param('talentProfileId') talentProfileId: string,
  ): Promise<User> {
    return await this.usersService.getUser({
      talentProfileId,
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.usersService.updateUser({
      where: { id },
      data: user,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('talent/:talentProfileId')
  async updateUserByTalentProfileId(
    @Param('talentProfileId') talentProfileId: string,
    @Body() user: User,
  ): Promise<User> {
    return await this.usersService.updateUser({
      where: { talentProfileId },
      data: {
        role: user.role,
        talentProfile: user.talentProfileId
          ? { update: { id: user.talentProfileId } }
          : undefined,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUser({ id });
  }
}
