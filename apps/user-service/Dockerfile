FROM node:24-slim AS base

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/user-service/package.json apps/user-service/package.json
COPY packages/backend-shared/package.json packages/backend-shared/package.json

RUN npm ci --ignore-scripts

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/user-service/node_modules ./apps/user-service/node_modules
COPY package.json package-lock.json ./
COPY tsconfig.base.json ./
COPY apps/user-service ./apps/user-service
COPY packages/backend-shared ./packages/backend-shared

RUN npm run db:generate -w user-service
RUN npm run build -w user-service

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4200
RUN mkdir -p /app/certs \
    && curl -fsSL https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -o /app/certs/rds-global-bundle.pem
ENV NODE_EXTRA_CA_CERTS=/app/certs/rds-global-bundle.pem

COPY package.json package-lock.json ./
COPY apps/user-service/package.json apps/user-service/package.json
COPY packages/backend-shared/package.json packages/backend-shared/package.json

RUN npm ci --omit=dev --ignore-scripts --workspace user-service --workspace @vsp/backend-shared --include-workspace-root=false

COPY --from=builder /app/apps/user-service/package.json ./apps/user-service/package.json
COPY --from=builder /app/apps/user-service/prisma.config.ts ./apps/user-service/prisma.config.ts
COPY --from=builder /app/apps/user-service/dist ./apps/user-service/dist
COPY --from=builder /app/apps/user-service/generated ./apps/user-service/generated
COPY --from=builder /app/apps/user-service/prisma ./apps/user-service/prisma
COPY --from=builder /app/packages/backend-shared/package.json ./packages/backend-shared/package.json
COPY --from=builder /app/packages/backend-shared/dist ./packages/backend-shared/dist
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

WORKDIR /app/apps/user-service

EXPOSE 4200

CMD ["node", "dist/src/main.js"]
