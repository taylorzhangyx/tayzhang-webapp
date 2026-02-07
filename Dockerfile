# syntax=docker/dockerfile:1.7

########################
# Build stage
########################
FROM node:20.15.0-bookworm-slim AS builder

WORKDIR /app

# Keep installs deterministic + less noisy + less memory-hungry in CI
ENV CI=true \
    NODE_ENV=development \
    npm_config_update_notifier=false \
    npm_config_fund=false \
    npm_config_audit=false \
    npm_config_progress=false \
    npm_config_fetch_retries=5 \
    npm_config_fetch_retry_mintimeout=20000 \
    npm_config_fetch_retry_maxtimeout=120000 \
    npm_config_jobs=1

# npm 11 still hit the same issue for you, so pin to a known-stable npm 10 line
RUN npm i -g npm@10.9.2

COPY package.json package-lock.json* ./

# npm ci with retries + log dump on failure
RUN --mount=type=cache,target=/root/.npm \
    set -eux; \
    tries=0; \
    until [ "$tries" -ge 3 ]; do \
      tries=$((tries+1)); \
      echo "npm ci attempt ${tries}/3"; \
      if npm ci --include=dev; then \
        break; \
      fi; \
      echo "---- npm ci failed; dumping npm debug log (if present) ----"; \
      ls -la /root/.npm/_logs || true; \
      tail -n +1 /root/.npm/_logs/*-debug-0.log 2>/dev/null || true; \
      echo "---- cleaning cache and retrying ----"; \
      npm cache clean --force || true; \
      rm -rf node_modules; \
      sleep $((tries*5)); \
    done; \
    # If npm ci is still busted, do a last-resort fallback so builds can proceed
    if [ ! -x node_modules/.bin/next ]; then \
      echo "next is missing after npm ci; falling back to npm install"; \
      npm install --include=dev --no-audit --no-fund; \
    fi; \
    test -x node_modules/.bin/next

COPY . .

ENV NODE_ENV=production
RUN npm run build

########################
# Production stage
########################
FROM node:20-alpine AS runner

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
