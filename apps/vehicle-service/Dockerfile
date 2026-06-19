FROM node:24-slim AS base

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/vehicle-service/package.json apps/vehicle-service/package.json
COPY packages/backend-shared/package.json packages/backend-shared/package.json

RUN npm ci --ignore-scripts

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/vehicle-service/node_modules ./apps/vehicle-service/node_modules
COPY package.json package-lock.json ./
COPY tsconfig.base.json ./
COPY apps/vehicle-service ./apps/vehicle-service
COPY packages/backend-shared ./packages/backend-shared

RUN npm run db:generate -w vehicle-service
RUN npm run build -w vehicle-service

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4203

COPY package.json package-lock.json ./
COPY apps/vehicle-service/package.json apps/vehicle-service/package.json
COPY packages/backend-shared/package.json packages/backend-shared/package.json

RUN npm ci --omit=dev --ignore-scripts --workspace vehicle-service --workspace @vsp/backend-shared --include-workspace-root=false

COPY --from=builder /app/apps/vehicle-service/package.json ./apps/vehicle-service/package.json
COPY --from=builder /app/apps/vehicle-service/dist ./apps/vehicle-service/dist
COPY --from=builder /app/apps/vehicle-service/generated ./apps/vehicle-service/generated
COPY --from=builder /app/apps/vehicle-service/prisma ./apps/vehicle-service/prisma
COPY --from=builder /app/packages/backend-shared/package.json ./packages/backend-shared/package.json
COPY --from=builder /app/packages/backend-shared/dist ./packages/backend-shared/dist
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

WORKDIR /app/apps/vehicle-service

EXPOSE 4203

CMD ["node", "dist/src/main.js"]
