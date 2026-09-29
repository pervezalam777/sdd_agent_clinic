import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RedisModule } from './config/redis.module'
import { HealthController } from './modules/health/health.controller'
import { ProfileEngagementModule } from './modules/profile-engagement/profile-engagement.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const dbType = config.get('DB_TYPE') ?? 'sqlite'
        const host = config.get('POSTGRES_HOST') ?? 'localhost'
        const port = parseInt(config.get('POSTGRES_PORT') ?? '5432') || 5432
        const username = config.get('POSTGRES_USER') ?? 'agent_clinic'
        const password = config.get('POSTGRES_PASSWORD') ?? 'agent_clinic'
        const database = config.get('POSTGRES_DB') ?? 'agent_clinic'
        const databaseFile = config.get('DATABASE_FILE') ?? 'agentclinic.db'
        const ssl = config.get('DATABASE_SSL') === 'true'

        if (dbType === 'postgres') {
          return {
            type: 'postgres' as const,
            host,
            port,
            username,
            password,
            database,
            autoLoadEntities: true,
            logging: false,
            ssl,
          }
        }

        // Default to SQLite for development
        return {
          type: 'sqlite' as const,
          database: databaseFile,
          autoLoadEntities: true,
          logging: false,
        }
      },
    }),
    RedisModule,
    ProfileEngagementModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
