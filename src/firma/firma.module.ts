import { Module } from '@nestjs/common';
import { FirmaService } from './firma.service';
import { FirmaController } from './firma.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FirmaController],
  providers: [FirmaService, PrismaService],
})
export class FirmaModule {}
