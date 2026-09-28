import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProfileEngagement } from './entities/profile-engagement.entity'
import { EngagementAction, EngagementMetadata } from '@agent-clinic/shared'
import { ProfileMetrics, AggregateMetrics } from '@agent-clinic/shared'

@Injectable()
export class ProfileEngagementService {
  constructor(
    @InjectRepository(ProfileEngagement)
    private readonly engagementRepository: Repository<ProfileEngagement>
  ) {}

  async logEngagement(
    profileId: string,
    action: EngagementAction,
    viewerId: string | null,
    metadata?: Partial<EngagementMetadata>
  ): Promise<ProfileEngagement> {
    const engagement = this.engagementRepository.create({
      profileId,
      action,
      viewerId,
      metadata: metadata as EngagementMetadata | null,
    })
    return await this.engagementRepository.save(engagement)
  }

  async getProfileMetrics(
    profileId: string,
    startTime: Date,
    endTime: Date
  ): Promise<ProfileMetrics> {
    // Get basic counts
    const stats = await this.engagementRepository
      .createQueryBuilder('pe')
      .select('pe.action', 'action')
      .addSelect('COUNT(*)', 'count')
      .addSelect('COUNT(DISTINCT pe.viewerId)', 'uniqueViewers')
      .where('pe.profileId = :profileId', { profileId })
      .andWhere('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .groupBy('pe.action')
      .getRawMany()

    const viewStats = stats.find((s) => s.action === 'view')
    const editStats = stats.find((s) => s.action === 'edit')

    // Get field changes from edit events
    const editEvents = await this.engagementRepository
      .createQueryBuilder('pe')
      .where('pe.profileId = :profileId', { profileId })
      .andWhere('pe.action = :action', { action: 'edit' })
      .andWhere('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .getMany()

    const fieldChanges: Record<string, number> = {}
    editEvents.forEach((event) => {
      if (event.metadata?.fieldsChanged) {
        event.metadata.fieldsChanged.forEach((field: string) => {
          fieldChanges[field] = (fieldChanges[field] || 0) + 1
        })
      }
    })

    // Calculate average time between edits
    const editTimestamps = editEvents
      .map((e) => e.timestamp.getTime())
      .sort((a, b) => a - b)

    let avgTimeBetweenEdits: number | null = null
    if (editTimestamps.length > 1) {
      const timeDiffs: number[] = []
      for (let i = 1; i < editTimestamps.length; i++) {
        timeDiffs.push((editTimestamps[i] - editTimestamps[i - 1]) / 1000) // convert to seconds
      }
      avgTimeBetweenEdits =
        timeDiffs.reduce((sum, t) => sum + t, 0) / timeDiffs.length || null
    }

    // Get last activity
    const lastActivity = await this.engagementRepository
      .createQueryBuilder('pe')
      .where('pe.profileId = :profileId', { profileId })
      .andWhere('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .orderBy('pe.timestamp', 'DESC')
      .getOne()

    return {
      profileId,
      totalViews: parseInt(viewStats?.count || '0'),
      uniqueViewers: parseInt(viewStats?.uniqueViewers || '0'),
      totalEdits: parseInt(editStats?.count || '0'),
      avgTimeBetweenEdits,
      fieldChanges,
      lastActivity: lastActivity?.timestamp ? lastActivity.timestamp.toISOString() : null,
      timeRange: {
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      },
    }
  }

  async getAggregateMetrics(
    startTime: Date,
    endTime: Date
  ): Promise<AggregateMetrics> {
    // Get total views and edits
    const totalStats = await this.engagementRepository
      .createQueryBuilder('pe')
      .select('pe.action', 'action')
      .addSelect('COUNT(*)', 'count')
      .where('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .groupBy('pe.action')
      .getRawMany()

    const totalViews = parseInt(totalStats.find((s) => s.action === 'view')?.count || '0')
    const totalEdits = parseInt(totalStats.find((s) => s.action === 'edit')?.count || '0')

    // Get unique profiles
    const profileStats = await this.engagementRepository
      .createQueryBuilder('pe')
      .select('COUNT(DISTINCT pe.profileId)', 'totalProfiles')
      .where('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .getRawOne()

    const totalProfiles = parseInt(profileStats?.totalProfiles || '0')

    // Calculate average engagement per profile
    const totalEngagements = totalViews + totalEdits
    const avgEngagementPerProfile =
      totalProfiles > 0 ? Math.round((totalEngagements / totalProfiles) * 100) / 100 : 0

    // Get top viewed profiles
    const topViewedProfiles = await this.engagementRepository
      .createQueryBuilder('pe')
      .select('pe.profileId', 'profileId')
      .addSelect('COUNT(*)', 'views')
      .where('pe.action = :action', { action: 'view' })
      .andWhere('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .groupBy('pe.profileId')
      .orderBy('views', 'DESC')
      .limit(10)
      .getRawMany()

    // Get top edited profiles
    const topEditedProfiles = await this.engagementRepository
      .createQueryBuilder('pe')
      .select('pe.profileId', 'profileId')
      .addSelect('COUNT(*)', 'edits')
      .where('pe.action = :action', { action: 'edit' })
      .andWhere('pe.timestamp BETWEEN :startTime AND :endTime', { startTime, endTime })
      .groupBy('pe.profileId')
      .orderBy('edits', 'DESC')
      .limit(10)
      .getRawMany()

    return {
      totalProfiles,
      totalViews,
      totalEdits,
      avgEngagementPerProfile,
      topViewedProfiles: topViewedProfiles.map((p) => ({
        profileId: p.profileId,
        views: parseInt(p.views),
      })),
      topEditedProfiles: topEditedProfiles.map((p) => ({
        profileId: p.profileId,
        edits: parseInt(p.edits),
      })),
      timeRange: {
        start: startTime.toISOString(),
        end: endTime.toISOString(),
      },
    }
  }

  async getDailyTrends(
    profileId: string,
    startTime: Date,
    endTime: Date
  ): Promise<Array<{ date: string; views: number; edits: number }>> {
    const days: Array<{ date: string; views: number; edits: number }> = []
    const currentDate = new Date(startTime)

    while (currentDate <= endTime) {
      const nextDate = new Date(currentDate)
      nextDate.setHours(nextDate.getHours() + 24)

      const dayMetrics = await this.engagementRepository
        .createQueryBuilder('pe')
        .select('pe.action', 'action')
        .addSelect('COUNT(*)', 'count')
        .where('pe.profileId = :profileId', { profileId })
        .andWhere('pe.timestamp >= :startTime', { startTime: currentDate })
        .andWhere('pe.timestamp < :endTime', { endTime: nextDate })
        .groupBy('pe.action')
        .getRawMany()

      const viewCount = parseInt(dayMetrics.find((m) => m.action === 'view')?.count || '0')
      const editCount = parseInt(dayMetrics.find((m) => m.action === 'edit')?.count || '0')

      days.push({
        date: currentDate.toISOString().split('T')[0],
        views: viewCount,
        edits: editCount,
      })

      currentDate.setHours(currentDate.getHours() + 24)
    }

    return days
  }
}
