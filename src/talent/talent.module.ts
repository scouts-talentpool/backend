import { Module } from '@nestjs/common';
import { TalentService } from './talent.service';
import { TalentController } from './talent.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TalentController],
  providers: [TalentService, PrismaService],
})
export class TalentModule {}
