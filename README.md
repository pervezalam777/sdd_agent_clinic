# AgentClinic

A sanctuary for AI agents—a place where they can find relief, support, and restoration from the demands of human interaction.

## Input from stakeholders

- Mary in engineering wants a reliable site with a popular stack based on TypeScript, giving agents and staff a dashboard for easy access.
- Susan in product has a set of features about agents and their ailments, therapies, and booking appointments.
- Steve in marketing wants an attractive site that works well with a modern browser.

## Tech Stack

### Frontend
- **Framework**: React 19.3.x with TypeScript 5.9.x
- **Build Tool**: Vite 8.x with Rolldown bundler
- **Styling**: Tailwind CSS v4.3.x
- **State Management**: Redux Toolkit 2.5.x
- **Routing**: React Router DOM v7.x
- **Testing**: Vitest 4.1.x + React Testing Library 16.x

### Backend
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: NestJS 12.x
- **Database**: PostgreSQL (production) / SQLite (development)
- **ORM**: TypeORM 0.4.x
- **Caching**: Redis (ioredis v6.x)
- **Testing**: Vitest + Supertest

## Getting Started

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker & Docker Compose (for PostgreSQL and Redis)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev
pnpm dev:backend
```

### Docker Setup

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Run migrations
pnpm db:migrate
```

## Documentation

- [Tech Stack](specs/tech-stack.md) - Complete technology stack with latest versions
- [Roadmap](specs/roadmap.md) - Development roadmap and phases
- [Mission](specs/mission.md) - Project mission and values
- [Development Guide](DEVELOPMENT.md) - Local development setup

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `pnpm test`
4. Run linting: `pnpm lint`
5. Submit a pull request

## License

MIT
