# Profile Engagement Metrics - Validation Plan

## Success Criteria

### Functional Validation

#### Database
- [x] `profile_engagement` table created with correct schema
- [x] Indexes on `profileId`, `timestamp`, and composite keys exist
- [x] Foreign key constraints properly enforced
- [x] Migration runs without errors on fresh database

#### API Endpoints
- [x] `POST /profiles/:id/engagement` accepts valid engagement data
- [x] `POST /profiles/:id/engagement` rejects invalid action types
- [x] `GET /profiles/:id/metrics` returns correct aggregation for time range
- [x] `GET /profiles/:id/metrics` respects permission model (agents see only their data)
- [x] `GET /metrics/aggregate` returns admin-only aggregate metrics
- [x] `GET /metrics/aggregate` returns 403 for non-admin users
- [x] Metrics query supports `startTime` and `endTime` parameters
- [x] Metrics query supports `timeRange` convenience parameter (7d, 14d, 30d)

#### Frontend
- [x] MetricsDashboard renders with valid data
- [x] Time range selector updates displayed metrics correctly
- [x] Trend charts render with Chart.js and show expected data
- [x] Loading states display while fetching metrics
- [x] Error states display when API calls fail
- [x] Route `/analytics/profiles` loads the dashboard
- [x] Navigation from profile view to analytics page works

### Data Validation

#### Engagement Tracking
- [x] View events are logged when profile is displayed
- [x] Edit events are logged when profile fields change
- [x] Timestamps are recorded in UTC
- [x] Unique viewer counting works correctly (based on userId)

#### Metrics Aggregation
- [x] View count matches number of view events in time range
- [x] Edit count matches number of edit events in time range
- [x] Average time between edits calculated correctly
- [x] Field change frequency tracked and displayable

### Quality Validation

#### Coverage
- [x] Backend service: 100% coverage (business logic)
- [x] Frontend components: 85% coverage overall
- [x] API integration tests for all endpoints

#### Performance
- [x] Metrics query returns within 500ms for 30-day range
- [x] Dashboard loads within 2 seconds with initial data
- [x] No memory leaks in chart rendering

#### Security
- [x] Authentication required for all engagement logging
- [x] Authorization prevents unauthorized metric access
- [x] No SQL injection in custom queries
- [x] No XSS in displayed data

### User Acceptance Validation

#### Agent Perspective
- [x] Profile metrics reflect actual viewing/editing activity
- [x] Metrics are accurate for the selected time range
- [x] Visualizations are clear and interpretable

#### Admin Perspective
- [x] Aggregate metrics show correct totals across all profiles
- [x] Data isolation maintained (can't view individual profiles without permission)

## Failure Scenarios

### Test Cases for Failure Detection

1. **No engagement data logged**
   - Action: View profile without logging
   - Expected: Metrics show zero events
   - Failure: Events appear without viewing

2. **Time range filtering incorrect**
   - Action: Select 7-day range, create event 10 days ago
   - Expected: Event not included in metrics
   - Failure: Event appears in current metrics

3. **Permission bypass**
   - Action: Agent attempts to access `/metrics/aggregate`
   - Expected: 403 Forbidden response
   - Failure: Data returned or 200 OK

4. **Chart rendering fails**
   - Action: Open dashboard with valid data
   - Expected: Charts render without errors
   - Failure: Chart not displayed, console errors

## Validation Commands

```bash
# Run backend tests
cd apps/backend && npm test

# Run frontend tests
cd apps/frontend && npm test

# Run E2E tests
cd apps/frontend && npm run test:e2e

# Check coverage
cd apps/backend && npm run test:coverage
cd apps/frontend && npm run test:coverage
```

## Sign-off Checklist

- [x] All functional validation tests pass
- [x] All data validation criteria met
- [x] Quality metrics (coverage, performance) achieved
- [x] Security review completed
- [x] User acceptance validation passed
- [x] Documentation updated
- [x] Code reviewed and merged to `main`
