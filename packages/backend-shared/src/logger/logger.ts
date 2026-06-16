import type { Params } from 'nestjs-pino';

export type CreatePinoConfigOptions = {
  level: string;
  nodeEnv: string;
  redactPaths?: string[];
  serviceName: string;
};

export function createPinoConfig({
  level,
  nodeEnv,
  redactPaths = [],
  serviceName,
}: CreatePinoConfigOptions): Params {
  const isProduction = nodeEnv === 'production';
  const isDev = !isProduction;

  return {
    pinoHttp: {
      level,
      transport: isDev
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
              errorLikeObjectKeys: [],
              translateTime: 'SYS:standard',
            },
          }
        : undefined,
      redact: {
        paths: redactPaths,
        remove: true,
      },
      customProps: () => ({
        service: serviceName,
      }),
      customLogLevel: (_req, res) =>
        res.statusCode >= 400 ? 'silent' : 'info',
    },
  };
}
