import axios from 'axios'

interface MetricsResponse {
  profileId: string
  totalViews: number
  uniqueViewers: number
  totalEdits: number
  avgTimeBetweenEdits: number | null
  fieldChanges: Record<string, number>
  lastActivity: string | null
  timeRange: {
    start: string
    end: string
  }
}

interface AggregateMetricsResponse {
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

interface DailyTrend {
  date: string
  views: number
  edits: number
}

class ProfileEngagementService {
  private api: any

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add request interceptor for auth token
    this.api.interceptors.request.use((config: any) => {
      const token = localStorage.getItem('authToken')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  async logEngagement(profileId: string, action: 'view' | 'edit', metadata?: Record<string, unknown>) {
    const response = await this.api.post(`/profiles/${profileId}/engagement`, {
      action,
      metadata,
    })
    return response.data as MetricsResponse
  }

  async getProfileMetrics(
    profileId: string,
    startTime?: string,
    endTime?: string,
    timeRange?: '7d' | '14d' | '30d'
  ): Promise<MetricsResponse> {
    const params = new URLSearchParams()
    if (startTime) params.append('startTime', startTime)
    if (endTime) params.append('endTime', endTime)
    if (timeRange) params.append('timeRange', timeRange)

    const response = await this.api.get(`/profiles/${profileId}/engagement/metrics?${params.toString()}`)
    return response.data as MetricsResponse
  }

  async getAggregateMetrics(
    startTime?: string,
    endTime?: string,
    timeRange?: '7d' | '14d' | '30d'
  ): Promise<AggregateMetricsResponse> {
    const params = new URLSearchParams()
    if (startTime) params.append('startTime', startTime)
    if (endTime) params.append('endTime', endTime)
    if (timeRange) params.append('timeRange', timeRange)

    const response = await this.api.get(`/metrics/aggregate?${params.toString()}`)
    return response.data as AggregateMetricsResponse
  }

  async getDailyTrends(
    profileId: string,
    startTime?: string,
    endTime?: string,
    timeRange?: '7d' | '14d' | '30d'
  ): Promise<DailyTrend[]> {
    const params = new URLSearchParams()
    if (startTime) params.append('startTime', startTime)
    if (endTime) params.append('endTime', endTime)
    if (timeRange) params.append('timeRange', timeRange)

    const response = await this.api.get(`/metrics/profiles/${profileId}/daily-trends?${params.toString()}`)
    return response.data as DailyTrend[]
  }
}

export const profileEngagementService = new ProfileEngagementService()
