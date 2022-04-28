import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async getUsers(params: {
    take: number;
    cursor: Prisma.UserWhereUniqueInput;
    where: Prisma.UserWhereInput;
  }) {
    return await this.prisma.user.findMany({ ...params, skip: 1 });
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prisma.user.findUnique({ where });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    return await this.prisma.user.update({ ...params });
  }

  async removeUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({ where });
  }
}
