# syntax=docker/dockerfile:1.7

########################
# Build stage
########################
FROM node:20.15.0-bookworm-slim AS builder

WORKDIR /app

ENV CI=true

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

########################
# Production stage
########################
FROM node:20.15.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Needed by some native deps when building on Debian and running on Alpine
RUN apk add --no-cache libc6-compat \
 && addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
