import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PaginateQueryDto,
  PaginateService,
} from '@vsp/backend-shared/paginate';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { CreateUserDto, UpdateUserDto } from './users.dto.js';
import { UsersEventsPublisher } from './users.producer.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersEventsPublisher: UsersEventsPublisher,
    private readonly paginateService: PaginateService,
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

  async findAll(query: PaginateQueryDto, accountId: string) {
    const pagination = this.paginateService.resolve({
      page: query.page,
      pageSize: query.pageSize,
    });

    const where = {
      createdByAccountId: accountId,
    };

    const [users, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.user.count({
        where,
      }),
    ]);

    return this.paginateService.buildPaginatedResult({
      items: users,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalItems,
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
