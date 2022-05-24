import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaModel } from 'src/_gen/entities';
import { UpdateTalentDto } from './dto/update-talent.dto';

@Injectable()
export class TalentService {
  constructor(private prisma: PrismaService) {}

  async createTalent(talent: PrismaModel.Talent): Promise<PrismaModel.Talent> {
    return await this.prisma.talent.create({ data: talent });
  }

  async findTalente(
    take: number,
    cursor: number,
  ): Promise<PrismaModel.Talent[]> {
    return await this.prisma.talent.findMany({
      take,
      cursor: {
        id: cursor,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findTalent(id: number): Promise<PrismaModel.Talent | null> {
    return await this.prisma.talent.findUnique({
      where: {
        id,
      },
    });
  }

  async updateTalent(
    id: number,
    benutzer: UpdateTalentDto,
  ): Promise<PrismaModel.Talent> {
    return await this.prisma.talent.update({ where: { id }, data: benutzer });
  }

  async removeTalent(id: number): Promise<PrismaModel.Talent> {
    return await this.prisma.talent.delete({ where: { id } });
  }
}
