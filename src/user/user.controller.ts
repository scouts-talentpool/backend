import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.findMany({});
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put()
  async create(@Body('userId') userId: string): Promise<User> {
    return await this.userService.create({
      id: userId,
    });
  }
}
