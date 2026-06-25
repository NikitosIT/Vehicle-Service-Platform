import { Module } from '@nestjs/common';
import { PaginateService } from '@vsp/backend-shared/paginate';

import { RabbitMQModule } from '../../infrastructure/rabbitmq/rabbitmq.module.js';
import { UsersController } from './users.controller.js';
import { UsersEventsPublisher } from './users.producer.js';
import { UsersService } from './users.service.js';

@Module({
  imports: [RabbitMQModule],
  controllers: [UsersController],
  providers: [UsersService, UsersEventsPublisher, PaginateService],
  exports: [UsersService],
})
export class UsersModule {}
