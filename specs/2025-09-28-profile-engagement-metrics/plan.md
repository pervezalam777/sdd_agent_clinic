# Profile Engagement Metrics - Implementation Plan

## Task Groups

### 1. Database Schema & Migrations
- [x] 1.1 Create `profile_engagement` entity with TypeORM
  - [x] Fields: id, profileId, viewerId, action (view/edit), timestamp, metadata (JSONB)
- [x] 1.2 Create TypeORM migration for `profile_engagement` table
- [x] 1.3 Add indexes on profileId, timestamp, and composite (profileId, timestamp)
- [x] 1.4 Add foreign key constraints for referential integrity

### 2. Backend API Endpoints (NestJS)
- [x] 2.1 Create `ProfileEngagement` module with service/controller
- [x] 2.2 Implement `logEngagement` endpoint (POST /profiles/:id/engagement)
  - [x] Validate action type (view/edit)
  - [x] Record engagement event
  - [x] Return success confirmation
- [x] 2.3 Implement `getProfileMetrics` endpoint (GET /profiles/:id/metrics)
  - [x] Accept query params: `startTime`, `endTime`, `timeRange`
  - [x] Return aggregated metrics (views, edits, frequency)
- [x] 2.4 Implement `getAggregateMetrics` endpoint (GET /metrics/aggregate)
  - [x] Admin-only endpoint
  - [x] Return metrics across all profiles
- [x] 2.5 Add authentication/authorization guards

### 3. Frontend React Components
- [x] 3.1 Create `ProfileEngagementService` for API calls
- [x] 3.2 Create `MetricsDashboard` component
  - [x] Time range selector (7/14/30 days, custom)
  - [x] View metrics section (total views, unique viewers)
  - [x] Edit metrics section (edit count, field change heatmap)
  - [x] Update frequency section (avg time between edits)
- [x] 3.3 Implement trend chart visualization
  - [x] Use Chart.js for line/bar charts
  - [x] Daily trend for views and edits
  - [x] Chart interaction (hover tooltips, date range selection)
- [x] 3.4 Create `ProfileAnalyticsPage` route component
  - [x] Layout with sidebar navigation
  - [x] Integrate MetricsDashboard
  - [x] Handle loading/error states

### 4. Routing & Navigation
- [x] 4.1 Add `/analytics/profiles` route in AppRouter
- [x] 4.2 Add navigation link from profile view
- [x] 4.3 Implement protected routes for admin metrics

### 5. Testing
- [x] 5.1 Unit tests for engagement logging service
- [x] 5.2 Unit tests for metrics aggregation logic
- [x] 5.3 Component tests for MetricsDashboard
- [x] 5.4 Integration tests for API endpoints
- [x] 5.5 E2E tests for complete workflow (view, log, display)

### 6. Documentation & Polish
- [x] 6.1 Update API documentation
- [x] 6.2 Add inline code comments for complex logic
- [x] 6.3 Create user-facing documentation for metrics
- [x] 6.4 Code review and cleanup
- [x] 6.5 Achieve 85% coverage threshold

## Timeline Estimate
- Days 1-2: Database schema & migrations
- Days 3-4: Backend API endpoints
- Days 5-7: Frontend components & charts
- Days 8-9: Testing & debugging
- Days 10: Documentation & review
