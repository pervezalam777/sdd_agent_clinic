# Profile Engagement Metrics - Feature Requirements (Updated for Latest Libraries)

## Scope

This feature adds metrics and analytics to the Agent Profile System (Phase 2) to help agents and administrators understand profile engagement patterns. It tracks how profiles are viewed and edited over time, presenting data through trend charts.

### In Scope
- Profile view tracking (count, unique viewers)
- Profile edit tracking (frequency, field changes)
- Update frequency metrics (time between edits)
- Time range filtering (7, 14, 30 days, custom range)
- Trend chart visualization using Chart.js or similar
- Admin dashboard for aggregate metrics
- Agent view for personal profile metrics

### Out of Scope
- Real-time metrics (delayed by at least 5 minutes)
- Export functionality (CSV/JSON) - covered in Phase 5
- Predictive analytics or insights
- Social features (viewing others' engagement history)

## Decisions

### Data Storage Approach
**Decision:** Store engagement events in a new `profile_engagement` table in PostgreSQL

**Rationale:** 
- Requires historical data for trend analysis
- TypeORM provides clean abstraction for PostgreSQL
- Event-based storage enables flexible aggregation

### Chart Visualization Library
**Decision:** Use Chart.js via react-chartjs-2

**Rationale:**
- Lightweight and well-maintained
- Good TypeScript support
- Compatible with existing Tailwind CSS
- Phase 2 constraint: avoid heavy dependencies

### Aggregation Strategy
**Decision:** Store raw events, compute aggregates on-demand

**Rationale:**
- Simpler implementation for Phase 2
- Profile engagement volume expected to be low
- Can optimize later if performance becomes an issue

### Permission Model
**Decision:** 
- Agents: view only their own profile metrics
- Administrators: view all profiles' metrics

**Rationale:**
- Privacy-first per mission values
- Administrative oversight for support workflow

## Context

### Related Components
- `agent_profiles` table (existing): stores profile data
- `users` table: for viewer identification
- `auth` module: for authentication/authorization

### Assumptions
- Users are authenticated via existing JWT system
- Profile views require an authenticated viewer
- Agents can only view their own metrics
- Administrators are identified by role claim in JWT

### Dependencies
- Existing authentication system (JWT)
- Existing profile CRUD endpoints
- PostgreSQL database with TypeORM
- Vitest for testing (replaces Jest)

### Constraints
- Must work within Phase 2 timeline (Weeks 3-4)
- 85% code coverage target
- No external analytics services (keep self-contained)

## Library Versions

This feature uses the following updated library versions:

| Library | Version | Notes |
|---------|---------|-------|
| React | ^19.3.0 | Latest with new APIs |
| TypeScript | ^5.9.3 | Required for React 19.3 compatibility |
| NestJS | ^12.0.1 | Latest stable |
| TypeORM | ^1.1.1 | Improved type safety |
| Vitest | ^4.1.0 | Vite-native testing |
| Chart.js | ^4.4.0 | Chart visualization |
| Zod | ^4.0.1 | Schema validation |

## Migration Notes

### Testing Framework
- Vitest is now used instead of Jest
- Jest-compatible APIs (expect, describe, it) are available
- Faster test execution with native ESM support

### Backend Dependencies
- ioredis v6 requires Node.js >= 20
- RESP3 is now the default wire protocol
- Set `protocol: 2` to retain v5 behavior if needed
