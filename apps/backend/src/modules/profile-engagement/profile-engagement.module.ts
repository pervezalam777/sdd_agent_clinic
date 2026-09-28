import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProfileEngagement } from './entities/profile-engagement.entity'
import { ProfileEngagementService } from './profile-engagement.service'
import { ProfileEngagementController, AggregateMetricsController } from './profile-engagement.controller'
import { AuthGuard, RolesGuard, AdminGuard } from '../auth/guards'

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEngagement])],
  controllers: [ProfileEngagementController, AggregateMetricsController],
  providers: [ProfileEngagementService, AuthGuard, RolesGuard, AdminGuard],
  exports: [ProfileEngagementService, TypeOrmModule],
})
export class ProfileEngagementModule {}
