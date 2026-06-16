import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { MicroserviceOptions } from '@nestjs/microservices';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module.js';
import { RMQ_QUEUES } from './common/constants/rabbitmq.constants.js';
import { env } from './config/env.js';
import { SessionService } from './infrastructure/session/session.service.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  app.enableShutdownHooks();

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  app.enableCors({
    origin: env.ALLOWED_ORIGIN,
    credentials: true,
  });

  const sessionService = app.get(SessionService);

  const port = Number(env.PORT ?? 4203);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [env.RABBITMQ_URL!],
      queue: RMQ_QUEUES.USERS,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(await sessionService.createMiddleware());

  await app.startAllMicroservices();
  await app.listen(port);
  app.get(Logger).log(`Vehicle service listening on port ${port}`, 'Bootstrap');
}
await bootstrap();
