FROM node:18-alpine AS base


FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune peng-self-service-portal --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN npm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo build --filter=peng-self-service-portal...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER nextjs

COPY --from=installer /app/apps/peng-self-service-portal/next.config.js .
COPY --from=installer /app/apps/peng-self-service-portal/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/peng-self-service-portal/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/peng-self-service-portal/.next/static ./apps/peng-self-service-portal/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/peng-self-service-portal/public ./apps/peng-self-service-portal/public

CMD ["node", "server.js"]
