# Requirements: Phase 1 - Foundation

## Scope

Establish the core infrastructure for AgentClinic including project structure, development environment, and basic framework setup.

## Context

This is the initial setup phase required before any feature development can begin. The foundation must support both frontend (React 19 + Vite) and backend (NestJS) development with proper TypeScript configuration and testing infrastructure.

## Decisions

### Frontend Stack
- **React 19** with TypeScript for type-safe components
- **Vite** as the build tool for fast development and optimized production builds
- **Redux Toolkit** for state management with DevTools integration
- **React Router DOM v6+** for client-side routing
- **Tailwind CSS** for styling with custom design tokens
- **Jest + React Testing Library** for unit and integration tests

### Backend Stack
- **NestJS** with TypeScript for modular architecture
- **TypeORM** for database abstraction supporting SQLite (dev) and PostgreSQL (production)
- **Redis** for session caching and real-time features
- **JWT-based authentication** with refresh tokens

### Testing Strategy
- **85% minimum code coverage** across all modules
- **100% coverage for business logic** (core domain logic, not components)
- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests

### Database
- **SQLite** for local development (file-based, no server required)
- **PostgreSQL** for production deployment (managed service)
- TypeORM migration system for database portability

## Non-Goals

- Authentication provider integration (will be added in Phase 2)
- Full CI/CD pipeline (basic testing setup only)
- Production deployment infrastructure

## Success Criteria

- Repository structure follows monorepo pattern
- Frontend and backend can be developed independently
- Tests run successfully with coverage reports
- Development environment starts without errors
