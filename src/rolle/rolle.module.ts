import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RolleService } from './rolle.service';

@Module({
  providers: [RolleService, PrismaService],
})
export class RolleModule {}
