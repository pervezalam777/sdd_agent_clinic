import { Test, TestingModule } from '@nestjs/testing'
import { ProfileEngagementController, AggregateMetricsController } from './profile-engagement.controller'
import { ProfileEngagementService } from './profile-engagement.service'
import { HttpException, HttpStatus } from '@nestjs/common'
import { EngagementAction } from '@agent-clinic/shared'

describe('ProfileEngagementController', () => {
  let controller: ProfileEngagementController
  let service: ProfileEngagementService

  const mockService = {
    logEngagement: jest.fn(),
    getProfileMetrics: jest.fn(),
    getAggregateMetrics: jest.fn(),
    getDailyTrends: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileEngagementController],
      providers: [
        {
          provide: ProfileEngagementService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get<ProfileEngagementController>(ProfileEngagementController)
    service = module.get<ProfileEngagementService>(ProfileEngagementService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('logEngagement', () => {
    const profileId = 'profile-123'
    const req = { user: { id: 'user-456' } }

    it('should log an engagement event', async () => {
      // Service returns the full engagement object
      const mockEngagement = { id: 'engagement-123', profileId, viewerId: req.user.id, action: 'view', timestamp: new Date() }
      // Controller returns { success: true, engagementId: <id> }
      mockService.logEngagement.mockResolvedValue(mockEngagement)

      const body = { action: 'view' as EngagementAction, metadata: { ipAddress: '127.0.0.1' } }
      const result = await controller.logEngagement(profileId, req, body)

      expect(result).toEqual({ success: true, engagementId: 'engagement-123' })
      expect(service.logEngagement).toHaveBeenCalledWith(
        profileId,
        'view',
        req.user.id,
        body.metadata
      )
    })

    it('should reject invalid action types', async () => {
      const body = { action: 'invalid-action' as EngagementAction }

      try {
        await controller.logEngagement(profileId, req, body)
        fail('Should have thrown an exception')
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException)
        expect(err.getStatus()).toBe(HttpStatus.BAD_REQUEST)
        expect(err.getResponse()).toBe('Invalid action type. Must be "view" or "edit"')
      }
    })

    it('should accept valid action types', async () => {
      const validActions: EngagementAction[] = ['view', 'edit']

      for (const action of validActions) {
        const body = { action: action as EngagementAction }
        const mockEngagement = { id: 'engagement-123', profileId, viewerId: req.user.id, action, timestamp: new Date() }
        mockService.logEngagement.mockResolvedValue(mockEngagement)

        const result = await controller.logEngagement(profileId, req, body)
        expect(result).toEqual({ success: true, engagementId: 'engagement-123' })
        expect(service.logEngagement).toHaveBeenCalledWith(
          profileId,
          action,
          req.user.id,
          undefined
        )
        jest.clearAllMocks()
      }
    })
  })

  describe('getProfileMetrics', () => {
    const profileId = 'profile-123'

    const mockMetrics = {
      profileId,
      totalViews: 100,
      uniqueViewers: 50,
      totalEdits: 20,
      avgTimeBetweenEdits: 3600,
      fieldChanges: {},
      lastActivity: new Date().toISOString(),
      timeRange: { start: new Date().toISOString(), end: new Date().toISOString() },
    }

    it('should return metrics for a profile (admin access)', async () => {
      const req = { user: { id: 'user-456', roles: ['admin'] } }
      mockService.getProfileMetrics.mockResolvedValue(mockMetrics)

      const result = await controller.getProfileMetrics(profileId, req)

      expect(result).toEqual(mockMetrics)
      expect(service.getProfileMetrics).toHaveBeenCalled()
    })

    it('should return metrics for a profile (owner access)', async () => {
      const req = { user: { id: profileId } }
      mockService.getProfileMetrics.mockResolvedValue(mockMetrics)

      const result = await controller.getProfileMetrics(profileId, req)

      expect(result).toEqual(mockMetrics)
      expect(service.getProfileMetrics).toHaveBeenCalled()
    })

    it('should handle time range query parameters', async () => {
      const req = { user: { id: 'user-456', roles: ['admin'] } }
      mockService.getProfileMetrics.mockResolvedValue(mockMetrics)

      const startTimeParam = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      const endTimeParam = new Date().toISOString()

      await controller.getProfileMetrics(profileId, req, {
        startTime: startTimeParam,
        endTime: endTimeParam,
      })

      expect(service.getProfileMetrics).toHaveBeenCalled()
    })

    it('should handle timeRange convenience parameter', async () => {
      const req = { user: { id: 'user-456', roles: ['admin'] } }
      mockService.getProfileMetrics.mockResolvedValue(mockMetrics)

      await controller.getProfileMetrics(profileId, req, { timeRange: '30d' })

      expect(service.getProfileMetrics).toHaveBeenCalled()
    })
  })
})

describe('AggregateMetricsController', () => {
  let controller: AggregateMetricsController
  let service: ProfileEngagementService

  const mockService = {
    logEngagement: jest.fn(),
    getProfileMetrics: jest.fn(),
    getAggregateMetrics: jest.fn(),
    getDailyTrends: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AggregateMetricsController],
      providers: [
        {
          provide: ProfileEngagementService,
          useValue: mockService,
        },
      ],
    }).compile()

    controller = module.get<AggregateMetricsController>(AggregateMetricsController)
    service = module.get<ProfileEngagementService>(ProfileEngagementService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAggregateMetrics', () => {
    it('should return aggregate metrics (admin only)', async () => {
      const req = { user: { id: 'user-456', roles: ['admin'] } }
      const mockMetrics = {
        totalProfiles: 10,
        totalViews: 500,
        totalEdits: 100,
        avgEngagementPerProfile: 60,
        topViewedProfiles: [],
        topEditedProfiles: [],
        timeRange: { start: new Date().toISOString(), end: new Date().toISOString() },
      }
      mockService.getAggregateMetrics.mockResolvedValue(mockMetrics)

      const result = await controller.getAggregateMetrics({ timeRange: '7d' })

      expect(result).toEqual(mockMetrics)
      expect(service.getAggregateMetrics).toHaveBeenCalled()
    })
  })

  describe('getDailyTrends', () => {
    const profileId = 'profile-123'

    it('should return daily trends for a profile (admin access)', async () => {
      const req = { user: { id: 'user-456', roles: ['admin'] } }
      const mockTrends = [
        { date: '2024-01-01', views: 10, edits: 2 },
        { date: '2024-01-02', views: 15, edits: 3 },
      ]
      mockService.getDailyTrends.mockResolvedValue(mockTrends)

      const result = await controller.getDailyTrends(profileId, req)

      expect(result).toEqual(mockTrends)
      expect(service.getDailyTrends).toHaveBeenCalled()
    })

    it('should return daily trends for a profile (owner access)', async () => {
      const req = { user: { id: profileId } }
      const mockTrends = [
        { date: '2024-01-01', views: 10, edits: 2 },
      ]
      mockService.getDailyTrends.mockResolvedValue(mockTrends)

      const result = await controller.getDailyTrends(profileId, req)

      expect(result).toEqual(mockTrends)
      expect(service.getDailyTrends).toHaveBeenCalled()
    })

    it('should return 403 for non-admin/non-owner', async () => {
      const req = { user: { id: 'user-999' } }
      const profileId = 'profile-123'

      try {
        await controller.getDailyTrends(profileId, req)
        fail('Should have thrown an exception')
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException)
        expect(err.getStatus()).toBe(HttpStatus.FORBIDDEN)
        expect(err.getResponse()).toBe('Forbidden: You do not have access to this profile metrics')
      }
    })
  })
})
