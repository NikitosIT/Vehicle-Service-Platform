import { defineConfig } from 'prisma/config';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config as loadEnv } from 'dotenv';

const envFilePath = resolve(
  process.cwd(),
  process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
);

if (existsSync(envFilePath)) {
  loadEnv({ path: envFilePath });
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
