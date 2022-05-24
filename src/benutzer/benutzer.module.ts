import { Module } from '@nestjs/common';
import { BenutzerService } from './benutzer.service';
import { BenutzerController } from './benutzer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BenutzerController],
  providers: [BenutzerService, PrismaService],
})
export class BenutzerModule {}
