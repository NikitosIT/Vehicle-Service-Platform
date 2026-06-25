import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PaginateService } from '@vsp/backend-shared/paginate';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { VehiclesService } from './vehicles.service.js';

describe('VehiclesService', () => {
  let service: VehiclesService;
  const prismaServiceMock = {
    vehicle: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const paginateServiceMock = {
    resolve: jest.fn(),
    buildPaginatedResult: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: PaginateService,
          useValue: paginateServiceMock,
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
