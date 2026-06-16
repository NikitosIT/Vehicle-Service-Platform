FROM node:24-slim AS deps

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm ci --ignore-scripts

FROM node:24-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/frontend/node_modules ./apps/frontend/node_modules
COPY --from=deps /app/apps/frontend/package.json ./apps/frontend/package.json
COPY package.json package-lock.json ./
COPY apps/frontend ./apps/frontend

RUN npm run build -w frontend

FROM node:24-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package.json package-lock.json ./
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm ci --omit=dev --ignore-scripts --workspace frontend --include-workspace-root=false

COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/next.config.ts ./apps/frontend/next.config.ts

WORKDIR /app/apps/frontend

EXPOSE 3000

CMD ["npm", "run", "start"]
