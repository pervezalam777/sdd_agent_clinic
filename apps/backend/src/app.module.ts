import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
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
      useFactory: (config: ConfigService) => {
        const dbType = config.get('DB_TYPE', 'sqlite')

        if (dbType === 'postgres') {
          return {
            type: 'postgres',
            host: config.get('POSTGRES_HOST', 'localhost'),
            port: parseInt(config.get('POSTGRES_PORT', '5432')) || 5432,
            username: config.get('POSTGRES_USER', 'agent_clinic'),
            password: config.get('POSTGRES_PASSWORD', 'agent_clinic'),
            database: config.get('POSTGRES_DB', 'agent_clinic'),
            autoLoadEntities: true,
            logging: false,
            ssl: config.get('DATABASE_SSL') === 'true',
          }
        }

        // Default to SQLite for development
        return {
          type: 'sqlite',
          database: config.get('DATABASE_FILE', 'agentclinic.db'),
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
