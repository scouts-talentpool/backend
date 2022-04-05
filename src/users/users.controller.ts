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
import { User, Prisma } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { stringify } from 'querystring';

@Controller('users')
export class UsersController {
  private MANAGEMENT_API_URL: string;
  private MANAGEMENT_API_AUDIENCE: string;
  private AUTH0_CLIENT_ID: string;
  private AUTH0_CLIENT_SECRET: string;

  private MANAGEMENT_API_ACCESS_TOKEN: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.MANAGEMENT_API_URL = configService.get<string>('MANAGEMENT_API_URL');
    this.MANAGEMENT_API_AUDIENCE = configService.get<string>(
      'MANAGEMENT_API_AUDIENCE',
    );
    this.AUTH0_CLIENT_ID = configService.get<string>('AUTH0_CLIENT_ID');
    this.AUTH0_CLIENT_SECRET = configService.get<string>('AUTH0_CLIENT_SECRET');

    if (!this.MANAGEMENT_API_ACCESS_TOKEN) {
      axios
        .post(`${this.MANAGEMENT_API_URL}/oauth/token`, {
          client_id: this.AUTH0_CLIENT_ID,
          client_secret: this.AUTH0_CLIENT_SECRET,
          audience: this.MANAGEMENT_API_AUDIENCE,
          grant_type: 'client_credentials',
        })
        .then((res) => {
          this.MANAGEMENT_API_ACCESS_TOKEN = res.data['access_token'];
        });
    }
  }

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() user: Prisma.UserCreateInput) {
    const { role, ...userData } = user;

    if (role === 'COMPANY') {
      const res = await axios.post(
        `${this.MANAGEMENT_API_URL}/api/v2/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${this.MANAGEMENT_API_ACCESS_TOKEN}`,
          },
        },
      );

      return this.usersService.create({
        id: res.data['user_id'].split('|')[1],
        role: 'COMPANY',
      });
    }

    this.usersService.create({
      id: user.id,
      role: role,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findMany({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: Prisma.UserUpdateInput) {
    return this.usersService.update({ where: { id }, data: user });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }

  @Get('/role/:email')
  async getRole(@Param('email') email: string) {
    const res = await axios.get(
      `${this.MANAGEMENT_API_URL}/api/v2/users-by-email`,
      {
        params: {
          email,
        },
        headers: {
          Authorization: `Bearer ${this.MANAGEMENT_API_ACCESS_TOKEN}`,
        },
      },
    );

    const role = (
      await this.usersService.findOne({
        id: res.data[0]['user_id'].split('|')[1],
      })
    ).role;

    return { role };
  }
}
