# AgentClinic Tech Stack

## Monorepo & Build Tools

- **Monorepo Management**: Turborepo for high-performance build orchestration
- **Build System**: Vite for frontend (ESM, HMR), TypeScript for type safety
- **Package Manager**: pnpm with workspaces for efficient dependency management
- **Development Server**: Turborepo dev for parallel local development

## Frontend

- **Framework**: React 19 (latest) with TypeScript, powered by Vite bundler
- **UI Library**: React components with Tailwind CSS for styling
- **State Management**: Redux Toolkit (RTK) with Redux DevTools integration
- **Routing**: React Router DOM v6+ for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design tokens
- **Testing**: Jest with React Testing Library for unit and integration tests
- **Bundle Output**: Static assets optimized for production deployment

## Backend

- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: NestJS with modular architecture
- **Database**: PostgreSQL for production (managed service: Supabase/Neon/AWS RDS)
- **Caching**: Redis (ioredis) for session caching and real-time features
- **ORM**: TypeORM for database abstraction with PostgreSQL support
- **API**: RESTful endpoints for agent check-ins and support requests

## Agent Integration

- **Webhook support**: Receive agent health metrics and status updates
- **API endpoints**: RESTful endpoints for agent check-ins and support requests
- **Event system**: Agent-initiated requests for help, breaks, or reflection sessions

## Infrastructure

- **Containerization**: Docker Compose for local development with multi-stage builds
- **Production Deployment**: Docker containers on cloud platform (Render/Heroku/AWS)
- **Database deployment**: PostgreSQL on managed service with automated backups
- **Caching**: Redis for distributed session management
- **Monitoring**: Application performance monitoring with Sentry
- **Authentication**: JWT-based authentication with refresh tokens

## Development Tools

- **Language**: TypeScript throughout (frontend and backend)
- **Testing Strategy**:
  - Minimum 85% code coverage required
  - 100% coverage for business logic modules
  - Jest for unit tests, React Testing Library for components
  - Playwright for E2E testing
- **CI/CD**: GitHub Actions for automated testing and deployment
- **Pre-commit Hooks**: Husky with lint-staged for code quality

## Database

- **Production**: PostgreSQL 16+ with connection pooling and RLS
- **Local Development**: Can use Docker Compose to run PostgreSQL instance
- **Migration**: TypeORM migrations for schema versioning
- **Schema**: Custom schema (agent_clinic) with proper indexing

## Deployment

- **Local**: `docker-compose up -d` for full stack with PostgreSQL + Redis
- **Production**: Multi-stage Docker builds for optimized images
- **Build**: `docker-compose build` for production-ready images
- **Volume Management**: Named volumes for persistent data (PostgreSQL, Redis)

## Version Control

- **Monorepo Structure**: Root package.json with workspaces configuration
- **Turbo Pipeline**: Cached builds across packages with incremental updates
- **Engines**: Node.js >=20.0.0, pnpm >=8.0.0
