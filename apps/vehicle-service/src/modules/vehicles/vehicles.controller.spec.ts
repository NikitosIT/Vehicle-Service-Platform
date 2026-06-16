import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { VehiclesController } from './vehicles.controller.js';
import { VehiclesService } from './vehicles.service.js';

describe('VehiclesController', () => {
  let controller: VehiclesController;
  const vehiclesServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: vehiclesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
