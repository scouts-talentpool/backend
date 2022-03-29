import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  providers: [CompanyService, PrismaService],
  exports: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
