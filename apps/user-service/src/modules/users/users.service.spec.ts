import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { PaginateService } from '@vsp/backend-shared/paginate';

import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { UsersEventsPublisher } from './users.producer.js';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;
  const prismaServiceMock = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  const usersEventsPublisherMock = {
    publishUserCreated: jest.fn(),
  };
  const paginateServiceMock = {
    resolve: jest.fn(),
    buildPaginatedResult: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: UsersEventsPublisher,
          useValue: usersEventsPublisherMock,
        },
        {
          provide: PaginateService,
          useValue: paginateServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
