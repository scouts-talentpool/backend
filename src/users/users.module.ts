import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { Auth0Service } from 'src/auth0.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Auth0Service],
})
export class UsersModule {}
