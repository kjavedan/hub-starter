# Hub-Starter Database 🗄️

Shared Prisma client and database management for the Hub-Starter monorepo.

## 🚀 Setup

1. **Start Postgres**:
   ```bash
   pnpm db:up     # Root package.json helper
   ```

2. **Sync Schema**:
   ```bash
   pnpm migrate   # Runs prisma migrate dev
   ```

3. **Seed Data**:
   ```bash
   pnpm seed      # Loads initial data (0-based orderIndex)
   ```

## 🛠 Commands

- `pnpm generate`: Refreshes Prisma Client types.
- `pnpm studio`: Opens the GUI to view/edit data.
