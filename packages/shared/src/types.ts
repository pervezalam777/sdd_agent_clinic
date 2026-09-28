// Shared types for AgentClinic

export interface AgentProfile {
  id: string
  name: string
  status: 'active' | 'needs_break' | 'resting' | 'error'
  stressLevel: number
  errorCount: number
  lastCheckIn: string
  capabilities: string[]
  preferences: AgentPreferences
  createdAt: string
  updatedAt: string
}

export interface AgentPreferences {
  maxStressThreshold: number
  breakDurationMinutes: number
  notificationChannels: string[]
}

export interface CheckInRequest {
  stressLevel: number
  errorCount: number
  requestType: 'none' | 'break' | 'help' | 'memory' | 'feedback'
  notes?: string
}

export interface HealthCheck {
  status: 'ok' | 'degraded' | 'error'
  timestamp: string
  services: Record<string, string>
}

export type EngagementAction = 'view' | 'edit'

export interface EngagementMetadata {
  viewerId?: string
  fieldsChanged?: string[]
  ipAddress?: string
  userAgent?: string
}

export interface ProfileEngagementEvent {
  id: string
  profileId: string
  viewerId: string | null
  action: EngagementAction
  metadata: EngagementMetadata | null
  timestamp: string
}

export interface ProfileMetrics {
  profileId: string
  totalViews: number
  uniqueViewers: number
  totalEdits: number
  avgTimeBetweenEdits: number | null // in seconds
  fieldChanges: Record<string, number>
  lastActivity: string | null
  timeRange: {
    start: string
    end: string
  }
}

export interface AggregateMetrics {
  totalProfiles: number
  totalViews: number
  totalEdits: number
  avgEngagementPerProfile: number
  topViewedProfiles: Array<{ profileId: string; views: number }>
  topEditedProfiles: Array<{ profileId: string; edits: number }>
  timeRange: {
    start: string
    end: string
  }
}
