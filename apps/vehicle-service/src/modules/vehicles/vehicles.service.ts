import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateService } from '@vsp/backend-shared/paginate';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import {
  CreateVehicleDto,
  ListVehiclesQueryDto,
  UpdateVehicleDto,
} from './vehicles.dto.js';
import { UserCreatedPayload } from './vehicles.types.js';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly paginateService: PaginateService,
  ) {}

  async createDefaultUserVehicle(payload: UserCreatedPayload) {
    return this.prisma.vehicle.create({
      data: {
        accountId: payload.createdByAccountId,
        userId: payload.id,
        isDraft: true,
        make: 'Unknown',
        model: 'Unknown',
        year: null,
      },
    });
  }

  async create(dto: CreateVehicleDto, accountId: string) {
    const draftVehicle = await this.prisma.vehicle.findFirst({
      where: {
        accountId,
        userId: dto.userId,
        isDraft: true,
      },
    });

    if (draftVehicle) {
      const vehicle = await this.prisma.vehicle.update({
        where: { id: draftVehicle.id },
        data: {
          make: dto.make,
          model: dto.model,
          year: dto.year ?? null,
          isDraft: false,
        },
      });

      return vehicle;
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        accountId,
        userId: dto.userId,
        make: dto.make,
        model: dto.model,
        year: dto.year ?? null,
      },
    });

    return vehicle;
  }

  async findAll(accountId: string, query: ListVehiclesQueryDto) {
    const pagination = this.paginateService.resolve({
      page: query.page,
      pageSize: query.pageSize,
    });

    const where = {
      accountId,
      isDraft: false,
      ...(query.userId ? { userId: query.userId } : {}),
    };

    const [vehicles, totalItems] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.vehicle.count({
        where,
      }),
    ]);

    return this.paginateService.buildPaginatedResult({
      items: vehicles,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalItems,
    });
  }

  findOneById(id: number, accountId: string) {
    return this.findOwnedByIdOrThrow(id, accountId);
  }

  async updateById(id: number, dto: UpdateVehicleDto, accountId: string) {
    await this.findOwnedByIdOrThrow(id, accountId);

    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
    });
  }

  async deleteById(id: number, accountId: string) {
    await this.findOwnedByIdOrThrow(id, accountId);

    return this.prisma.vehicle.delete({
      where: { id },
    });
  }

  private async findOwnedByIdOrThrow(id: number, accountId: string) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        id,
        accountId,
      },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }
}
