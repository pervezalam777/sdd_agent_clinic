# Plan: Phase 1 - Foundation

## Task Group 1: Repository Structure

1. Create monorepo directory structure
   - `/apps/frontend` - React 19 application
   - `/apps/backend` - NestJS application
   - `/packages/shared` - Shared types and utilities

2. Initialize Git repository with proper .gitignore
   - Node modules, build artifacts, environment files
   - IDE-specific files
   - Coverage reports and logs

3. Configure package.json for monorepo
   - Root package.json with workspace configuration
   - Individual package.json files for each app

## Task Group 2: Frontend Setup

1. Initialize React 19 + TypeScript project with Vite
   - Configure tsconfig.json with strict mode
   - Set up Vite configuration
   - Configure Tailwind CSS

2. Set up state management
   - Configure Redux store with Redux Toolkit
   - Add Redux DevTools integration
   - Create initial slices (auth, ui, agent)

3. Set up routing
   - Configure React Router DOM v6+
   - Define initial routes (home, about, agent, check-in)
   - Create navigation structure

4. Configure testing
   - Install Jest + React Testing Library
   - Configure coverage thresholds (85% minimum)
   - Set up test utilities and mocks

## Task Group 3: Backend Setup

1. Initialize NestJS project with TypeScript
   - Configure tsconfig.json
   - Set up module structure

2. Configure TypeORM
   - SQLite adapter for development
   - PostgreSQL adapter for production (migration path)
   - Create data source configuration

3. Set up Redis caching
   - Configure connection settings
   - Implement caching utilities

4. Configure testing
   - Install Jest for NestJS
   - Set up unit test fixtures
   - Configure coverage for business logic (100%)

## Task Group 4: CI/CD Setup

1. Configure GitHub Actions workflow
   - Run tests on push and PR
   - Report coverage metrics
   - Fail if coverage thresholds not met

2. Set up pre-commit hooks
   - Run linting
   - Run tests
   - Check formatting

## Task Group 5: Validation

1. Verify frontend can start without errors
   - `npm run dev` succeeds
   - Initial route loads

2. Verify backend can start without errors
   - `npm run start` succeeds
   - Health check endpoint returns 200

3. Verify testing infrastructure
   - Tests run successfully
   - Coverage reports generate correctly
