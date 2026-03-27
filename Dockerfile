FROM node:24-alpine AS builder
WORKDIR /app

ENV ASTRO_TELEMETRY_DISABLED=1
ENV ASTRO_BUNDLE_NODE_MODULES=1
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm rebuild --pending --reporter append-only && pnpm run build

FROM node:24-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

ENV NODE_ENV=production
ENV HOST="0.0.0.0"
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

COPY --from=builder --chown=astro:nodejs /app/dist ./dist
USER astro

CMD ["node", "dist/server/entry.mjs"]
