# Vehicle Service

NestJS service for vehicle-related APIs and RabbitMQ integration.

## Env files

- `.env.dev` is committed and used for local development.
- `.env.prod` is not committed and should be provided by the production environment.

The service loads `.env.dev` when `NODE_ENV` is not `production`. In production it looks for `.env.prod`, but deployed containers can also inject environment variables directly.

## Local values

The committed `.env.dev` assumes:

- PostgreSQL from local Docker on `localhost:5433`
- RabbitMQ from local Docker on `localhost:5672`
- Frontend on `http://localhost:3000`

## Local run

From the repository root:

```bash
npm run docker:dev:up
npm run db:migrate:deploy:vehicle
npm run dev
```
