import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { CreateUserDto, UpdateUserDto } from './users.dto.js';
import { UsersEventsPublisher } from './users.producer.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersEventsPublisher: UsersEventsPublisher,
  ) {}

  async create(dto: CreateUserDto, accountId: string) {
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        createdByAccountId: accountId,
      },
    });

    await this.usersEventsPublisher.publishUserCreated(user);
    return user;
  }

  findAll(accountId: string) {
    return this.prisma.user.findMany({
      where: {
        createdByAccountId: accountId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOneById(id: string, accountId: string) {
    return this.findOwnedByIdOrThrow(id, accountId);
  }

  async updateById(id: string, dto: UpdateUserDto, accountId: string) {
    await this.findOwnedByIdOrThrow(id, accountId);

    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async deleteById(id: string, accountId: string) {
    await this.findOwnedByIdOrThrow(id, accountId);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  private async findOwnedByIdOrThrow(id: string, accountId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        createdByAccountId: accountId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
