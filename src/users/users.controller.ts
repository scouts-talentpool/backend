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

@Controller('users')
export class TalentsController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() user: Prisma.UserCreateInput) {
    return this.usersService.create(user);
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
}
