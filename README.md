# My App

A full-stack monorepo with a React frontend, Express backend, PostgreSQL database, and Redis-backed job queues via BullMQ.

## Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | React + Vite         |
| Backend  | Express (TypeScript) |
| Database | PostgreSQL (Docker)  |
| Queue    | Redis + BullMQ       |
| Monorepo | npm workspaces       |

---

## Project Structure

```text
case_management/
├── docker-compose.yml # Postgres + Redis for local dev
├── .env.example       # Template for required env vars
├── lefthook.yml       # Git hooks (lint, typecheck)
├── package.json       # Root workspaces + dev scripts
│
├── apps/
│ ├── web/             # React frontend
│ │ └── src/
│ │ ├── api/           # HTTP client + endpoint wrappers
│ │ ├── components/    # Reusable UI components
│ │ ├── features/      # Feature-scoped code (auth, orders…)
│ │ ├── hooks/         # Custom React hooks
│ │ ├── pages/         # Route-level components
│ │ ├── store/         # Global state (zustand/redux)
│ │ └── styles/
│ │
│ └── api/             # Express backend
│ └── src/
│ ├── app.ts           # Express app (middleware, routes)
│ ├── index.ts         # Bootstrap / server entrypoint
│ ├── config/          # Env parsing & constants
│ ├── routes/          # Route definitions
│ ├── controllers/     # Request handlers
│ ├── services/        # Business logic
│ ├── repositories/    # Data access (SQL queries)
│ ├── db/
│ │ ├── index.ts       # pg pool
│ │ ├── migrations/    # SQL migrations
│ │ └── seed/
│ ├── queues/
│ │ ├── index.ts       # BullMQ Queue instances
│ │ ├── connection.ts  # Redis (ioredis) config
│ │ ├── producers/     # Code that enqueues jobs
│ │ └── workers/       # Job processors
│ ├── middleware/      # Auth, validation, errors
│ ├── lib/             # Helpers (logger, errors)
│ └── types/
│
├── packages/
│ ├── shared/          # Shared TS types & Zod schemas
│ │ └── src/
│ └── config/          # Shared eslint / tsconfig presets
│
└── scripts/           # Dev helpers (db reset, etc.)
```

---

## Why This Layout?

- **Monorepo (`apps/` + `packages/`)** — Frontend, backend, and shared types live in one repo, so an API contract change and its UI update ship together.
- **`packages/shared`** — Zod schemas and DTO types imported by both web and api, eliminating client/server drift.
- **Feature folders in the frontend** — Colocating components, hooks, and API calls per feature scales better than a flat `components/` dump.
- **Layered backend** — `routes → controllers → services → repositories` keeps HTTP concerns, business rules, and SQL cleanly separated.
- **Split producers/workers** — Web requests enqueue jobs; workers process them in a separate process. They scale and deploy independently.
- **Plain SQL migrations** — Auditable, ORM-agnostic, works with `node-pg-migrate` or `dbmate`.
- **Infra in Docker, apps natively** — `docker compose up` starts Postgres + Redis only; apps run with `npm run dev` for fast HMR.
