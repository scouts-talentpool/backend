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
import { Role, Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Auth0Service } from 'src/auth0.service';

type UserCreateInput = {
  email: string;
  password: string;
  given_name: string;
  family_name: string;
  role: Role;
};

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() user: UserCreateInput) {
    const { email, password, given_name, family_name, role } = user;

    const newUser = await this.auth0Service.managementClient.createUser({
      connection: 'Talentpool',
      email,
      password,
      given_name,
      family_name,
    });

    const { user_id } = newUser;
    return await this.usersService.createUser({ id: user_id, role });
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUsers(
    @Query('take') take: string,
    @Query('cursor') cursor: string,
    @Query('role') role: string,
  ) {
    return await this.usersService.getUsers({
      take: +take,
      cursor: {
        cursor: +cursor,
      },
      where: {
        role: role as Role,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Prisma.UserUpdateInput,
  ) {
    return await this.usersService.updateUser({ where: { id }, data: user });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUser({ id });
  }
}
