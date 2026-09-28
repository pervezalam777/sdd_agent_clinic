import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class CreateProfileEngagementTable1727568000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile_engagement',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'profileId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'viewerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'action',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'metadata',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            isNullable: false,
            default: 'NOW()',
          },
        ],
      }),
      true
    )

    // Create indexes
    await queryRunner.createIndex(
      'profile_engagement',
      new TableIndex({
        name: 'idx_profile_engagement_profile_id',
        columnNames: ['profileId'],
      })
    )

    await queryRunner.createIndex(
      'profile_engagement',
      new TableIndex({
        name: 'idx_profile_engagement_timestamp',
        columnNames: ['timestamp'],
      })
    )

    await queryRunner.createIndex(
      'profile_engagement',
      new TableIndex({
        name: 'idx_profile_engagement_profile_time',
        columnNames: ['profileId', 'timestamp'],
      })
    )

    // Add foreign key constraint for profileId
    // Note: This assumes agent_profiles table exists with uuid id column
    // Commented out as it may not exist yet in fresh database
    // await queryRunner.query(
    //   `ALTER TABLE "profile_engagement" ADD CONSTRAINT "fk_profile_engagement_profile" FOREIGN KEY ("profileId") REFERENCES "agent_profiles"("id") ON DELETE CASCADE`
    // )

    // Add foreign key constraint for viewerId
    // Note: This assumes users table exists with uuid id column
    // Commented out as it may not exist yet in fresh database
    // await queryRunner.query(
    //   `ALTER TABLE "profile_engagement" ADD CONSTRAINT "fk_profile_engagement_viewer" FOREIGN KEY ("viewerId") REFERENCES "users"("id") ON DELETE SET NULL`
    // )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('profile_engagement', 'idx_profile_engagement_profile_time')
    await queryRunner.dropIndex('profile_engagement', 'idx_profile_engagement_timestamp')
    await queryRunner.dropIndex('profile_engagement', 'idx_profile_engagement_profile_id')
    await queryRunner.dropTable('profile_engagement')
  }
}
