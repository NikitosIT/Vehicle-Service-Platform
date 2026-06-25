import { Module } from '@nestjs/common';
import { PaginateService } from '@vsp/backend-shared/paginate';

import { PrismaModule } from '../../infrastructure/prisma/prisma.module.js';
import { VehiclesConsumer } from './vehicles.consumer.js';
import { VehiclesController } from './vehicles.controller.js';
import { VehiclesService } from './vehicles.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [VehiclesController, VehiclesConsumer],
  providers: [VehiclesService, PaginateService],
})
export class VehiclesModule {}
