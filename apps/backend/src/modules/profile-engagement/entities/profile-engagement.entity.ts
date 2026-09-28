import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm'
import { EngagementAction, EngagementMetadata } from '@agent-clinic/shared'

@Entity('profile_engagement')
@Index('idx_profile_engagement_profile_id', ['profileId'])
@Index('idx_profile_engagement_timestamp', ['timestamp'])
@Index('idx_profile_engagement_profile_time', ['profileId', 'timestamp'])
export class ProfileEngagement {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  profileId: string

  @Column({ type: 'uuid', nullable: true })
  viewerId: string | null

  @Column({ type: 'enum', enum: ['view', 'edit'] })
  action: EngagementAction

  @Column({ type: 'jsonb', nullable: true })
  metadata: EngagementMetadata | null

  @CreateDateColumn({ type: 'timestamp with time zone' })
  timestamp: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date
}
