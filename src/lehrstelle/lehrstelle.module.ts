import { Module } from '@nestjs/common';
import { LehrstelleService } from './lehrstelle.service';
import { LehrstelleController } from './lehrstelle.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LehrstelleController],
  providers: [LehrstelleService, PrismaService]
})
export class LehrstelleModule {}
