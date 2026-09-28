import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { ProfileEngagementService } from './profile-engagement.service'
import { AuthGuard, RolesGuard, AdminGuard } from '../auth/guards'
import { Roles } from '../auth/guards'
import { EngagementAction } from '@agent-clinic/shared'

interface LogEngagementBody {
  action: EngagementAction
  metadata?: Record<string, unknown>
}

interface MetricsQueryParams {
  startTime?: string
  endTime?: string
  timeRange?: string
}

@Controller('profiles/:profileId/engagement')
@UseGuards(AuthGuard)
export class ProfileEngagementController {
  constructor(private readonly engagementService: ProfileEngagementService) {}

  @Post()
  async logEngagement(
    @Param('profileId') profileId: string,
    @Request() req: any,
    @Body() body: LogEngagementBody
  ): Promise<{ success: boolean; engagementId: string }> {
    const viewerId = req.user?.id || null

    if (!body.action || !['view', 'edit'].includes(body.action)) {
      throw new HttpException('Invalid action type. Must be "view" or "edit"', HttpStatus.BAD_REQUEST)
    }

    const engagement = await this.engagementService.logEngagement(
      profileId,
      body.action as EngagementAction,
      viewerId,
      body.metadata
    )

    return { success: true, engagementId: engagement.id }
  }

  @Get('/metrics')
  async getProfileMetrics(
    @Param('profileId') profileId: string,
    @Request() req: any,
    @Query() query?: MetricsQueryParams
  ) {
    const viewerId = req.user?.id

    // Determine time range
    let start = new Date()
    let end = new Date()

    if (query?.timeRange) {
      switch (query.timeRange) {
        case '7d':
          start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case '14d':
          start = new Date(end.getTime() - 14 * 24 * 60 * 60 * 1000)
          break
        case '30d':
          start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
      }
    } else {
      if (query?.startTime) start = new Date(query.startTime)
      if (query?.endTime) end = new Date(query.endTime)
    }

    // Check if user can access this profile
    // For now, allow viewing if viewerId matches profileId or user has admin role
    // In production, this would use proper ownership/permission checks
    const hasAccess = req.user?.roles?.includes('admin') || req.user?.id === profileId

    if (!hasAccess) {
      throw new HttpException('Forbidden: You do not have access to this profile metrics', HttpStatus.FORBIDDEN)
    }

    const metrics = await this.engagementService.getProfileMetrics(profileId, start, end)
    return metrics
  }
}

@Controller('metrics')
export class AggregateMetricsController {
  constructor(private readonly engagementService: ProfileEngagementService) {}

  @Get('/aggregate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async getAggregateMetrics(@Query() query?: MetricsQueryParams) {
    // Determine time range
    let start = new Date()
    let end = new Date()

    if (query?.timeRange) {
      switch (query.timeRange) {
        case '7d':
          start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case '14d':
          start = new Date(end.getTime() - 14 * 24 * 60 * 60 * 1000)
          break
        case '30d':
          start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
      }
    } else {
      if (query?.startTime) start = new Date(query.startTime)
      if (query?.endTime) end = new Date(query.endTime)
    }

    const metrics = await this.engagementService.getAggregateMetrics(start, end)
    return metrics
  }

  @Get('/profiles/:profileId/daily-trends')
  @UseGuards(AuthGuard)
  async getDailyTrends(
    @Param('profileId') profileId: string,
    @Request() req: any,
    @Query() query?: MetricsQueryParams
  ) {
    let start = new Date()
    let end = new Date()

    if (query?.timeRange) {
      switch (query.timeRange) {
        case '7d':
          start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case '14d':
          start = new Date(end.getTime() - 14 * 24 * 60 * 60 * 1000)
          break
        case '30d':
          start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        default:
          start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000)
      }
    } else {
      if (query?.startTime) start = new Date(query.startTime)
      if (query?.endTime) end = new Date(query.endTime)
    }

    const hasAccess = req.user?.roles?.includes('admin') || req.user?.id === profileId

    if (!hasAccess) {
      throw new HttpException('Forbidden: You do not have access to this profile metrics', HttpStatus.FORBIDDEN)
    }

    const trends = await this.engagementService.getDailyTrends(profileId, start, end)
    return trends
  }
}
