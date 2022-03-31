import { Module } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { TalentsController } from './talents.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TalentsController],
  providers: [TalentsService, PrismaService],
})
export class TalentsModule {}
