import { Injectable } from '@nestjs/common';
import { Lehrberuf } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LehrberufService {
  constructor(readonly prismaService: PrismaService) {}

  async create(lehrberuf: Lehrberuf) {
    return await this.prismaService.lehrberuf.create({
      data: lehrberuf,
    });
  }

  async findAll() {
    return await this.prismaService.lehrberuf.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.lehrberuf.findUnique({ where: { id } });
  }

  // update(id: number, updateLehrberufDto: UpdateLehrberufDto) {
  //   return `This action updates a #${id} lehrberuf`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} lehrberuf`;
  // }
}
