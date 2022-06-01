import { Module } from '@nestjs/common';
import { BenutzerService } from './benutzer.service';
import { PrismaService } from 'src/prisma.service';
import { Auth0Service } from 'src/auth0.service';
import { BenutzerController } from './benutzer.controller';
import { RolleService } from 'src/rolle/rolle.service';

@Module({
  controllers: [BenutzerController],
  providers: [BenutzerService, PrismaService, Auth0Service, RolleService],
})
export class BenutzerModule {}
