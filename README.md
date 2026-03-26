# Hub-Starter Monorepo 🚀

A modern full-stack monorepo boilerplate built with logic, type-safety, and performance in mind.

## 🏗 Structure

- `apps/web`: Next.js frontend (Tailwind CSS, TanStack Query).
- `apps/api`: Express backend (TS-Rest, Prisma).
- `packages/contracts`: Shared API contracts (TS-Rest).
- `packages/db`: Database schema and Prisma client.
- `packages/config`: Centralized environment variable validation (Zod).
- `packages/ui`: Shared design tokens and CSS-in-TS.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Setup Database**:
   ```bash
   pnpm db:up     # Starts Postgres via Docker
   pnpm db:push   # syncs schema (from packages/db)
   pnpm db:seed   # loads initial seed data
   ```

3. **Run in development**:
   ```bash
   pnpm dev
   ```
   - Web: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:3001](http://localhost:3001)
   - Swagger: [http://localhost:3001/docs](http://localhost:3001/docs)

## 🛠 Tech Stack

- **Monorepo**: Turborepo + pnpm.
- **Backend**: Node.js, Express, TS-Rest, Prisma.
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4.
- **Linter/Formatter**: Biome.

## 📦 Deployment (Railway)

The app is optimized for Railway. Each app (`web`, `api`) has its own `railway.toml`.
**Note:** Ensure `SKIP_ENV_VALIDATION=true` is used during the build phase to allow Prisma generation without runtime secrets.
