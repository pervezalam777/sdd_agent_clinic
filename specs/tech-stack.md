# AgentClinic Tech Stack

## Monorepo & Build Tools

- **Monorepo Management**: Turborepo for high-performance build orchestration
- **Build System**: Vite 8.x for frontend (ESM, HMR), TypeScript 5.9.x for type safety
- **Package Manager**: pnpm 9.x with workspaces for efficient dependency management
- **Development Server**: Turborepo dev for parallel local development

## Frontend

- **Framework**: React 19.3.x with TypeScript, powered by Vite bundler
- **UI Library**: React components with Tailwind CSS v4.3.x for styling
- **State Management**: Redux Toolkit 2.13.x with Redux DevTools integration
- **Routing**: React Router DOM v7.x for client-side routing
- **Forms**: React Hook Form with Zod v4.x validation
- **Styling**: Tailwind CSS v4.3.x with custom design tokens
- **Testing**: Vitest 4.1.x with React Testing Library 16.x for unit and integration tests
- **Bundle Output**: Static assets optimized for production deployment

### Frontend Dependencies (Latest Versions)

| Package | Latest Version | Notes |
|---------|---------------|-------|
| react | ^19.3.0 | Latest with new APIs (Activity, useEffectEvent, ViewTransition) |
| react-dom | ^19.3.0 | Concurrent rendering, improved SSR |
| vite | ^8.0.0 | Unified Rolldown bundler, 10-30x faster builds |
| typescript | ^5.9.3 | Required for React 19.3 and NestJS 12 compatibility |
| @reduxjs/toolkit | ^2.13.0 | Latest with improved performance |
| react-router-dom | ^7.0.0 | React 19 compatible routing |
| tailwindcss | ^4.3.0 | Latest with scrollbar utilities, logical properties |
| chart.js | ^4.4.0 | Chart visualization |
| react-chartjs-2 | ^5.2.0 | Chart.js React integration |
| axios | ^1.7.9 | HTTP client with security fixes |
| vitest | ^4.1.0 | Vite-native testing framework with Jest compatibility |
| @testing-library/react | ^16.2.0 | Component testing with React 19 support |
| zod | ^4.0.1 | Schema validation |

## Backend

- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: NestJS 12.x with modular architecture
- **Database**: PostgreSQL 16+ for production (managed service: Supabase/Neon/AWS RDS)
- **Database (Local)**: SQLite for local development without dependencies
- **Caching**: Redis (ioredis v6.x) for session caching and real-time features
- **ORM**: TypeORM 0.3.x for database abstraction with PostgreSQL and SQLite support
- **API**: RESTful endpoints for agent check-ins and support requests

### Backend Dependencies (Latest Versions)

| Package | Latest Version | Notes |
|---------|---------------|-------|
| @nestjs/common | ^12.1.1 | Latest stable with improved performance |
| @nestjs/core | ^12.1.1 | Core NestJS framework |
| @nestjs/platform-express | ^12.1.1 | Express adapter |
| @nestjs/config | ^3.3.0 | Configuration management |
| @nestjs/typeorm | ^10.0.2 | TypeORM integration |
| typeorm | ^0.3.20 | ORM with SQLite support (0.3.x for better compatibility) |
| ioredis | ^6.0.0 | Redis client with RESP3 support (Node.js 20+ required) |
| @types/ioredis | Removed | Deprecated - ioredis v6+ includes its own TypeScript definitions |
| redis | ^4.7.0 | Redis client alternative |
| sqlite3 | ^5.1.7 | SQLite database driver |
| reflect-metadata | ^0.2.2 | Metadata reflection API |
| rxjs | ^7.8.2 | Reactive extensions |

## Agent Integration

- **Webhook support**: Receive agent health metrics and status updates
- **API endpoints**: RESTful endpoints for agent check-ins and support requests
- **Event system**: Agent-initiated requests for help, breaks, or reflection sessions

## Infrastructure

- **Containerization**: Docker Compose for local development with multi-stage builds
- **Production Deployment**: Docker containers on cloud platform (Render/Heroku/AWS)
- **Database deployment**: PostgreSQL 16+ on managed service with automated backups
- **Caching**: Redis v7+ for distributed session management
- **Monitoring**: Application performance monitoring with Sentry
- **Authentication**: JWT-based authentication with refresh tokens

## Development Tools

- **Language**: TypeScript throughout (frontend and backend)
- **Testing Strategy**:
  - Minimum 85% code coverage required
  - 100% coverage for business logic modules
  - Vitest for unit tests (Vite-native, faster than Jest)
  - React Testing Library for components
  - Playwright for E2E testing
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Pre-commit Hooks**: Husky with lint-staged for code quality

## Database

- **Production**: PostgreSQL 16+ with connection pooling and RLS
- **Local Development**: SQLite for simple setup without external dependencies
- **Migration**: TypeORM migrations for schema versioning
- **Schema**: Custom schema (agent_clinic) with proper indexing

### Local Development Notes

- For local development without PostgreSQL, SQLite can be used by updating the TypeORM configuration
- Entity enums use `varchar` with explicit enum values for SQLite compatibility
- Timestamp types use `datetime` for SQLite compatibility
- ioredis v6 requires Node.js >= 20 and uses RESP3 by default
- TypeORM 0.3.x is used for better SQLite compatibility (TypeORM 1.1.x type definitions don't include `sqlite`)

## Deployment

- **Local**: `docker-compose up -d` for full stack with PostgreSQL + Redis
- **Local (SQLite)**: `npm run dev:backend` for simple backend testing
- **Production**: Multi-stage Docker builds for optimized images
- **Build**: `docker-compose build` for production-ready images
- **Volume Management**: Named volumes for persistent data (PostgreSQL, Redis)

## Version Control

- **Monorepo Structure**: Root package.json with workspaces configuration
- **Turbo Pipeline**: Cached builds across packages with incremental updates
- **Engines**: Node.js >=20.0.0, pnpm >=9.0.0

## Migration Notes

### From v5 to v6 (ioredis)
- ioredis v6 requires Node.js >= 20
- RESP3 is now the default wire protocol
- Set `protocol: 2` to retain v5 behavior if needed
- Remove `@types/ioredis` from dependencies - ioredis v6+ includes its own TypeScript definitions

### From v3 to v4 (Zod)
- Zod 4 is a ground-up rewrite with performance improvements
- Some internal APIs have changed
- Library authors should use `"zod": "^3.25.0 || ^4.0.0"` for dual support

### From Jest to Vitest
- Vitest offers Jest-compatible APIs (expect, describe, it, etc.)
- Faster test execution with native ESM support
- Configuration migration needed:
  - Replace `jest.config.js` with `vitest.config.ts`
  - Update test commands from `npm test` to `pnpm test` (Vitest default)
  - Replace `jest.fn()` with `vi.fn()` in tests

### From TypeORM 1.1.x to 0.3.x
- TypeORM 1.1.x type definitions don't include `sqlite` as a valid database type
- Downgraded to TypeORM 0.3.20 for full SQLite support
- Migration commands remain the same
