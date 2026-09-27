# Phase 1 Updates: Implementation Plan

## Task Group 1: Monorepo Infrastructure (4 tasks)

1.1. Update root package.json with Turborepo scripts and pnpm configuration
     - Add Turborepo pipeline scripts (dev, build, test, lint, clean)
     - Configure workspaces for apps/* and packages/*
     - Add engine constraints (Node.js 20+, pnpm 8+)

1.2. Create turbo.json with pipeline configuration
     - Define build, dev, test, lint, clean tasks
     - Set dependencies between tasks
     - Configure cache behavior

1.3. Create packages/shared/package.json
     - Set up type-only package for shared types
     - Configure build script with TypeScript
     - Add test placeholder

1.4. Add .gitignore entries
     - Exclude node_modules in apps/packages
     - Exclude Turborepo cache
     - Exclude Docker volumes and logs

## Task Group 2: Docker Infrastructure (6 tasks)

2.1. Create docker-compose.yml
     - Define PostgreSQL service with health check
     - Define Redis service with health check
     - Define backend service with build context
     - Define frontend service with build context
     - Configure named volumes for persistent data

2.2. Create backend Dockerfile (multi-stage)
     - Development stage with ts-node
     - Production stage with optimized image
     - Proper user permissions

2.3. Create frontend Dockerfile (multi-stage)
     - Development stage with Vite
     - Production stage with nginx
     - Static asset optimization

2.4. Add nginx.conf for frontend
     - Configure Gzip compression
     - Set up React Router client-side routing
     - Add cache headers for static assets
     - Create health check endpoint

2.5. Create database initialization script
     - Enable PostgreSQL extensions
     - Create agent_clinic schema
     - Define tables with proper indexes
     - Set up RLS policies

2.6. Add Docker environment files
     - .env.example with all variables
     - .env.local.example for development
     - Document required variables

## Task Group 3: Environment Configuration (3 tasks)

3.1. Update apps/frontend to use environment variables
     - Configure Vite to use DOTENV
     - Set API URL from environment

3.2. Update apps/backend to use environment variables
     - Configure TypeORM with environment
     - Configure Redis connection from environment

3.3. Add environment variable loading
     - Use dotenv for local development
     - Document variable precedence

## Task Group 4: Development Experience (3 tasks)

4.1. Add docker-compose scripts to root package.json
     - docker:up, docker:down, docker:build, docker:push

4.2. Create DEVELOPMENT.md
     - Setup instructions for local development
     - Docker Compose usage
     - Environment variable setup

4.3. Add health check endpoints
     - Backend: /health endpoint
     - Frontend: /health endpoint via nginx

## Task Group 5: Validation & Testing (3 tasks)

5.1. Validate Docker setup
     - docker-compose build succeeds
     - docker-compose up starts all services
     - Services are healthy and responding

5.2. Validate Turborepo setup
     - turbo run dev starts all services
     - turbo run build succeeds
     - Cache works across packages

5.3. Update tasks.md
     - Add new tasks for Phase 1 updates
     - Update status for original Phase 1 tasks
     - Update Validation.md with new criteria