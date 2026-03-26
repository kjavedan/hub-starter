# Hub-Starter — Complete Technical Specification (Updated)

## Project Overview

**Name**: Hub-Starter (pronounced "Chick-rice")  
**Type**: B2C ordering software for healthy restaurant
**Goal**: Launch MVP  
**Approach**: AI-assisted development with simple, scalable architecture

---

## Technology Stack 

### Repository Structure
- **Architecture**: PNPM Workspaces Monorepo
- **Build Tool**: Turborepo (for parallel builds and caching)
- **Package Manager**: PNPM (not npm/yarn)

### Backend (`apps/api`)
- **Framework**: Express 5+
- **Runtime**: Node.js 20+
- **Database**: PostgreSQL 15+ with Prisma ORM (managed by Railway)
- **Authentication**: Supabase
- **Validation**: Zod (via fastify-type-provider-zod)
- **File Storage**: Supabase
- **Email**: Resend
- **Deployment**: Railway

### Frontend Customer (`apps/web`)
- **Framework**: Next.js 16 (App Router, Canary/RC)
- **Authentication**: Supabase
- **Styling**: Tailwind CSS
- **UI Components**: Shared from `packages/ui`
- **State Management**: Zustand + React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Deployment**: Railway

### Admin Panel (`apps/admin`)
- **Framework**: Next.js 16 (App Router, Canary/RC)
- **Authentication**: Supabase
- **UI Components**: Shared from `packages/ui`
- **State Management**: Zustand + React Query
- **Deployment**: Railway

### Shared Packages (Mandatory)
```
packages/
├── contracts/    # TypeScript types, Zod schemas, API contracts
├── db/          # Prisma schema and client
└── ui/          # Shared shadcn/ui components (MANDATORY)
```

**Critical**: Both `apps/web` and `apps/admin` consume the SAME UI components from `packages/ui`. No component duplication allowed.

---

