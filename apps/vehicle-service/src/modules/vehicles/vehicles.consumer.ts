import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import type { Channel, ConsumeMessage } from 'amqplib';
import { PinoLogger } from 'nestjs-pino';

import { RMQ_PATTERNS } from '../../common/constants/rabbitmq.constants.js';
import { VehiclesService } from './vehicles.service.js';
import type { UserCreatedPayload } from './vehicles.types.js';

@Controller()
export class VehiclesConsumer {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly logger: PinoLogger,
  ) {}

  @EventPattern(RMQ_PATTERNS.USER_CREATED)
  async handleVehicleCreated(
    @Payload() data: UserCreatedPayload,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef() as Channel;
    const message = context.getMessage() as ConsumeMessage;

    try {
      await this.vehiclesService.createDefaultUserVehicle(data);
      channel.ack(message);
    } catch (error) {
      this.logger.error(
        {
          err: error,
          event: RMQ_PATTERNS.USER_CREATED,
          userId: data.id,
          accountId: data.createdByAccountId,
        },
        'Failed to process user created event',
      );
      channel.nack(message, false, false);
    }
  }
}
