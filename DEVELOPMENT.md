# AgentClinic Development Guide

## Quick Start

### Prerequisites

- Node.js >=20.0.0
- pnpm >=8.0.0
- Docker Desktop (for local development with PostgreSQL)

### Development Setup

#### Option 1: Docker Compose (Recommended)

1. Start the full stack:
```bash
docker-compose up -d
```

2. Verify services are healthy:
```bash
docker-compose ps
```

3. Access the applications:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

4. View logs:
```bash
docker-compose logs -f
```

5. Stop services:
```bash
docker-compose down
```

#### Option 2: Local Development

1. Install dependencies:
```bash
pnpm install
```

2. Start the backend:
```bash
cd apps/backend
cp .env.local.example .env.local
npm run start:dev
```

3. Start the frontend (in a new terminal):
```bash
cd apps/frontend
npm run dev
```

4. Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Environment Variables

### Root (.env.example)

| Variable | Description |
|----------|-------------|
| NODE_ENV | Environment (development, production) |
| PORT | Backend port (default: 3000) |

### Database (PostgreSQL)

| Variable | Description |
|----------|-------------|
| POSTGRES_HOST | Database host |
| POSTGRES_PORT | Database port (default: 5432) |
| POSTGRES_USER | Database user |
| POSTGRES_PASSWORD | Database password |
| POSTGRES_DB | Database name |

### Redis

| Variable | Description |
|----------|-------------|
| REDIS_HOST | Redis host |
| REDIS_PORT | Redis port (default: 6379) |

### JWT

| Variable | Description |
|----------|-------------|
| JWT_SECRET | Secret key for JWT signing |

## Turborepo Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all services in dev mode |
| `pnpm build` | Build all packages |
| `pnpm test` | Run tests across all packages |
| `pnpm lint` | Run linting across all packages |
| `pnpm clean` | Clean all packages and node_modules |

## Docker Commands

| Command | Description |
|---------|-------------|
| `pnpm docker:build` | Build all Docker images |
| `pnpm docker:up` | Start services in detached mode |
| `pnpm docker:down` | Stop services |
| `pnpm docker:logs` | View container logs |
| `pnpm docker:push` | Push images to registry |

## Database Migrations

```bash
# Generate a new migration
pnpm db:generate

# Run pending migrations
pnpm db:migrate
```

## Testing

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test -- --coverage

# Run tests in watch mode
pnpm test -- --watch
```

## Linting and Formatting

```bash
# Run linting
pnpm lint

# Format all files
pnpm format
```
