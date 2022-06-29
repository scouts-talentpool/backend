import { Module } from '@nestjs/common';
import { LehrberufService } from './lehrberuf.service';
import { LehrberufController } from './lehrberuf.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LehrberufController],
  providers: [LehrberufService, PrismaService]
})
export class LehrberufModule {}
