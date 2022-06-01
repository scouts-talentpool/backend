import { Injectable } from '@nestjs/common';
import { Prisma, Rolle } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolleService {
  constructor(private readonly prismaService: PrismaService) {}
  async getRolle(params: Prisma.RolleFindUniqueArgs): Promise<Rolle> {
    return this.prismaService.rolle.findUnique({
      ...params,
      include: {
        berechtigungen: true,
      },
    });
  }
}
