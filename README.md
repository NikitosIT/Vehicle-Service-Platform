# Vehicle Service Platform

Monorepo for the frontend, backend services, and shared packages.

## What you need

- Node.js >= 22
- npm 11.x
- Docker Desktop

## Root env files

- `.env.dev` is already committed and is used for local Docker infrastructure.
- You do not need to create a root `.env` file for local startup.
- Production secrets live in `.env.prod`, which is not committed.

`docker-compose.dev.yml` reads local infrastructure settings from `.env.dev`.

## First local startup

1. Install dependencies:

```bash
npm i
```

This also runs `postinstall` and regenerates Prisma clients for both backend services.

2. Create the frontend env file:

```bash
cp apps/frontend/.env.example apps/frontend/.env.local
```

`apps/user-service/.env.dev` and `apps/vehicle-service/.env.dev` are already committed for local development, so no extra backend env setup is needed.

3. Start local infrastructure:

```bash
npm run docker:dev:up
```

4. Apply database migrations:

```bash
npm run db:migrate:deploy
```

5. Start the apps:

```bash
npm run dev
```

## What starts locally

| Service | Host port | Notes |
|---------|-----------|-------|
| PostgreSQL | 5433 | Databases for `user_service` and `vehicle_service` |
| Redis | 6379 | Sessions for `user-service` |
| RabbitMQ | 5672 / 15672 | AMQP and management UI |
| pgAdmin | 5050 | PostgreSQL admin UI |
| RedisInsight | 5540 | Redis admin UI |

App ports:
- frontend: `3000`
- user-service: `4200`
- vehicle-service: `4203`

## Daily commands

| Command | Description |
|---------|-------------|
| `npm run docker:dev:up` | Start local infrastructure |
| `npm run docker:dev:down` | Stop local infrastructure |
| `npm run docker:dev:logs` | Tail local infrastructure logs |
| `npm run dev` | Start all apps in dev mode |
| `npm run build` | Build all packages and apps |
| `npm run lint` | Lint all workspaces |
| `npm run test` | Run tests |
| `npm run db:generate` | Regenerate Prisma clients |
| `npm run db:migrate:deploy` | Apply existing Prisma migrations for both backend services |

## Notes

- Prisma migrations are intentionally not auto-run during `build`, `dev`, or `docker compose up`.
- If Postgres was initialized long ago and required databases are missing, recreate the Postgres volume and run migrations again:

```bash
npm run docker:dev:down
docker volume rm vehicle-service-platform_postgres_data
npm run docker:dev:up
npm run db:migrate:deploy
```
