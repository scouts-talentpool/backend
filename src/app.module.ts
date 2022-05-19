import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TalentModule } from './talent/talent.module';
import { FirmaModule } from './firma/firma.module';
import { BenutzerModule } from './benutzer/benutzer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TalentModule,
    FirmaModule,
    BenutzerModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
