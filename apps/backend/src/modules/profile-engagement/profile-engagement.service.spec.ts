import { Test, TestingModule } from '@nestjs/testing'
import { ProfileEngagementService } from './profile-engagement.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileEngagement } from './entities/profile-engagement.entity'
import { EngagementAction } from '@agent-clinic/shared'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('ProfileEngagementService', () => {
  let service: ProfileEngagementService
  let repository: Repository<ProfileEngagement>

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findAndCount: vi.fn(),
    query: vi.fn(),
    createQueryBuilder: vi.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileEngagementService,
        {
          provide: getRepositoryToken(ProfileEngagement),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<ProfileEngagementService>(ProfileEngagementService)
    repository = module.get<Repository<ProfileEngagement>>(getRepositoryToken(ProfileEngagement))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('logEngagement', () => {
    const profileId = 'profile-123'
    const viewerId = 'user-456'
    const action: EngagementAction = 'view'
    const metadata = { ipAddress: '127.0.0.1' }

    it('should create and save an engagement record', async () => {
      const mockEngagement = {
        id: 'engagement-123',
        profileId,
        viewerId,
        action,
        metadata,
        timestamp: new Date(),
        updatedAt: new Date(),
      }

      mockRepository.create.mockReturnValue(mockEngagement)
      mockRepository.save.mockResolvedValue(mockEngagement)

      const result = await service.logEngagement(profileId, action, viewerId, metadata)

      expect(result).toEqual(mockEngagement)
      expect(repository.create).toHaveBeenCalledWith({
        profileId,
        action,
        viewerId,
        metadata: metadata,
      })
      expect(repository.save).toHaveBeenCalledWith(mockEngagement)
    })

    it('should handle null viewerId', async () => {
      const mockEngagement = {
        id: 'engagement-123',
        profileId,
        viewerId: null,
        action,
        metadata: null,
        timestamp: new Date(),
        updatedAt: new Date(),
      }

      mockRepository.create.mockReturnValue(mockEngagement)
      mockRepository.save.mockResolvedValue(mockEngagement)

      const result = await service.logEngagement(profileId, action, null)

      expect(result).toEqual(mockEngagement)
      expect(repository.create).toHaveBeenCalledWith({
        profileId,
        action,
        viewerId: null,
        metadata: undefined,
      })
    })
  })

  describe('getProfileMetrics', () => {
    const profileId = 'profile-123'
    const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const endTime = new Date()

    it('should return metrics for a profile', async () => {
      const mockStats: Array<{ action: string; count: string; uniqueViewers?: string }> = [
        { action: 'view', count: '10', uniqueViewers: '5' },
        { action: 'edit', count: '3', uniqueViewers: '0' },
      ]

      const mockEditEvents: Array<{ timestamp: Date; metadata: { fieldsChanged: string[] } }> = [
        {
          timestamp: new Date(),
          metadata: { fieldsChanged: ['name', 'status'] },
        },
        {
          timestamp: new Date(Date.now() - 3600000),
          metadata: { fieldsChanged: ['status'] },
        },
      ]

      const mockLastActivity = {
        id: 'engagement-123',
        profileId,
        timestamp: new Date(),
      }

      // Mock query builder
      const queryBuilder = {
        where: vi.fn().mockReturnThis(),
        andWhere: vi.fn().mockReturnThis(),
        groupBy: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        addSelect: vi.fn().mockReturnThis(),
        getRawMany: vi.fn().mockResolvedValue(mockStats),
        getMany: vi.fn().mockResolvedValue(mockEditEvents),
        orderBy: vi.fn().mockReturnThis(),
        getOne: vi.fn().mockResolvedValue(mockLastActivity),
      }

      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder as any)

      const result = await service.getProfileMetrics(profileId, startTime, endTime)

      expect(result).toEqual(
        expect.objectContaining({
          profileId,
          totalViews: 10,
          uniqueViewers: 5,
          totalEdits: 3,
          avgTimeBetweenEdits: expect.any(Number),
          fieldChanges: expect.any(Object),
          lastActivity: expect.anything(),
        })
      )
    })

    it('should handle no engagement data', async () => {
      const mockStats: Array<{ action: string; count: string; uniqueViewers?: string }> = []

      const queryBuilder = {
        where: vi.fn().mockReturnThis(),
        andWhere: vi.fn().mockReturnThis(),
        groupBy: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        addSelect: vi.fn().mockReturnThis(),
        getRawMany: vi.fn().mockResolvedValue(mockStats),
        getMany: vi.fn().mockResolvedValue([]),
        orderBy: vi.fn().mockReturnThis(),
        getOne: vi.fn().mockResolvedValue(null),
      }

      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder as any)

      const result = await service.getProfileMetrics(profileId, startTime, endTime)

      expect(result).toEqual(
        expect.objectContaining({
          totalViews: 0,
          uniqueViewers: 0,
          totalEdits: 0,
          avgTimeBetweenEdits: null,
          fieldChanges: {},
        })
      )
    })
  })

  describe('getAggregateMetrics', () => {
    const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const endTime = new Date()

    it('should return aggregate metrics across all profiles', async () => {
      const mockTotalStats = [
        { action: 'view', count: '100' },
        { action: 'edit', count: '30' },
      ]

      const mockProfileStats = { totalProfiles: '5' }

      const mockTopViewed = [
        { profileId: 'profile-1', views: '50' },
        { profileId: 'profile-2', views: '30' },
      ]

      const mockTopEdited = [
        { profileId: 'profile-3', edits: '15' },
        { profileId: 'profile-4', edits: '10' },
      ]

      // Create a chainable query builder mock
      const queryBuilder = {
        where: vi.fn().mockReturnThis(),
        andWhere: vi.fn().mockReturnThis(),
        groupBy: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        addSelect: vi.fn().mockReturnThis(),
        orderBy: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        getRawMany: vi.fn(),
        getRawOne: vi.fn(),
      }

      // Configure getRawMany to return different values based on the query
      queryBuilder.getRawMany
        .mockResolvedValueOnce(mockTotalStats) // total stats (views/edits)
        .mockResolvedValueOnce(mockTopViewed)   // top viewed profiles
        .mockResolvedValueOnce(mockTopEdited)   // top edited profiles

      queryBuilder.getRawOne.mockResolvedValueOnce(mockProfileStats) // profile stats

      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder as any)

      const result = await service.getAggregateMetrics(startTime, endTime)

      expect(result).toEqual({
        totalProfiles: 5,
        totalViews: 100,
        totalEdits: 30,
        avgEngagementPerProfile: 26,
        topViewedProfiles: [
          { profileId: 'profile-1', views: 50 },
          { profileId: 'profile-2', views: 30 },
        ],
        topEditedProfiles: [
          { profileId: 'profile-3', edits: 15 },
          { profileId: 'profile-4', edits: 10 },
        ],
        timeRange: {
          start: startTime.toISOString(),
          end: endTime.toISOString(),
        },
      })
    })
  })

  describe('getDailyTrends', () => {
    const profileId = 'profile-123'
    const startTime = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    const endTime = new Date()

    it('should return daily trend data', async () => {
      const mockStats = [
        { action: 'view', count: '10' },
        { action: 'edit', count: '3' },
      ]

      const queryBuilder = {
        where: vi.fn().mockReturnThis(),
        andWhere: vi.fn().mockReturnThis(),
        groupBy: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        addSelect: vi.fn().mockReturnThis(),
        getRawMany: vi.fn().mockResolvedValue(mockStats),
      }

      mockRepository.createQueryBuilder.mockReturnValue(queryBuilder as any)

      const result = await service.getDailyTrends(profileId, startTime, endTime)

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            date: expect.any(String),
            views: expect.any(Number),
            edits: expect.any(Number),
          }),
        ])
      )
    })
  })
})
