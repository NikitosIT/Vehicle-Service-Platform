FROM node:24-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/user-service/package.json apps/user-service/package.json
COPY packages/backend-shared/package.json packages/backend-shared/package.json

RUN npm ci --ignore-scripts

FROM node:24-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/user-service/node_modules ./apps/user-service/node_modules
COPY package.json package-lock.json ./
COPY tsconfig.base.json ./
COPY apps/user-service ./apps/user-service
COPY packages/backend-shared ./packages/backend-shared

RUN npm run db:generate -w user-service
RUN npm run build -w user-service

FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4200

COPY package.json package-lock.json ./
COPY apps/user-service/package.json apps/user-service/package.json
COPY packages/backend-shared/package.json packages/backend-shared/package.json

RUN npm ci --omit=dev --ignore-scripts --workspace user-service --workspace @vsp/backend-shared --include-workspace-root=false

COPY --from=builder /app/apps/user-service/package.json ./apps/user-service/package.json
COPY --from=builder /app/apps/user-service/dist ./apps/user-service/dist
COPY --from=builder /app/apps/user-service/generated ./apps/user-service/generated
COPY --from=builder /app/apps/user-service/prisma ./apps/user-service/prisma
COPY --from=builder /app/packages/backend-shared/package.json ./packages/backend-shared/package.json
COPY --from=builder /app/packages/backend-shared/dist ./packages/backend-shared/dist

WORKDIR /app/apps/user-service

EXPOSE 4200

CMD ["node", "dist/src/main.js"]
