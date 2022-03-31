import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';
import { TalentsModule } from './talents/talents.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CompanyModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TalentsModule,
    CompaniesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
