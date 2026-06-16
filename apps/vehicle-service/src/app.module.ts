import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from '@vsp/backend-shared/filters';
import { createPinoConfig, LoggingModule } from '@vsp/backend-shared/logger';

import { env } from './config/env.js';
import { PrismaModule } from './infrastructure/prisma/prisma.module.js';
import { SessionModule } from './infrastructure/session/session.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { VehiclesModule } from './modules/vehicles/vehicles.module.js';

@Module({
  imports: [
    LoggingModule.register(
      createPinoConfig({
        serviceName: 'vehicle-service',
        level: env.LOG_LEVEL,
        nodeEnv: env.NODE_ENV,
        redactPaths: [
          'req.headers.authorization',
          'req.headers.cookie',
          'res.headers["set-cookie"]',
        ],
      }),
    ),
    HealthModule,
    PrismaModule,
    SessionModule,
    VehiclesModule,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: GlobalExceptionFilter,
  //   },
  // ],
})
export class AppModule {}
