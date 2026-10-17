FROM oven/bun:1.4-debian AS base
WORKDIR /app
ENV NODE_ENV=development

FROM base AS deps
COPY package.json bun.lock ./
COPY packages/prettier-config ./packages/prettier-config
COPY apps/api/package.json ./apps/api/package.json
RUN bun install

FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app .
WORKDIR /app/apps/api
EXPOSE 3000
CMD ["bun", "run", "dev"]
