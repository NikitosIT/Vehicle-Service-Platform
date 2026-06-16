import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicles.dto.js';
import { UserCreatedPayload } from './vehicles.types.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

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

  findAll(accountId: string, userId?: string) {
    return this.prisma.vehicle.findMany({
      where: {
        accountId,
        isDraft: false,
        ...(userId ? { userId } : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
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
