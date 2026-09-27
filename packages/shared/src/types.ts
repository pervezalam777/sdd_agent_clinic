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
