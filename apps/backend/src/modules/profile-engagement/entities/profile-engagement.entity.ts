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

  @Column({ type: 'varchar', enum: ['view', 'edit'], default: 'view' })
  action: EngagementAction

  @Column({ type: 'text', nullable: true })
  metadata: EngagementMetadata | null

  @CreateDateColumn({ type: 'datetime', nullable: true })
  timestamp: Date

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date
}
