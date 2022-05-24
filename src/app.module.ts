import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TalentModule } from './talent/talent.module';
import { FirmaModule } from './firma/firma.module';
import { BenutzerModule } from './benutzer/benutzer.module';
import { Auth0Service } from './auth0.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TalentModule,
    FirmaModule,
    BenutzerModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, Auth0Service],
})
export class AppModule {}
