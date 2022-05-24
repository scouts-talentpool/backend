import { Module } from '@nestjs/common';
import { BenutzerService } from './benutzer.service';
import { BenutzerController } from './benutzer.controller';
import { PrismaService } from 'src/prisma.service';
import { Auth0Service } from 'src/auth0.service';

@Module({
  controllers: [BenutzerController],
  providers: [BenutzerService, PrismaService, Auth0Service],
})
export class BenutzerModule {}
