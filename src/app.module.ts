import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TalentModule } from './talent/talent.module';
import { FirmaModule } from './firma/firma.module';
import { BenutzerModule } from './benutzer/benutzer.module';
import { Auth0Service } from './auth0.service';
import { RolleService } from './rolle/rolle.service';
import { RolleModule } from './rolle/rolle.module';
import { LehrstelleModule } from './lehrstelle/lehrstelle.module';
import { LehrberufModule } from './lehrberuf/lehrberuf.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TalentModule,
    FirmaModule,
    BenutzerModule,
    RolleModule,
    LehrstelleModule,
    LehrberufModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, Auth0Service, RolleService],
})
export class AppModule {}
