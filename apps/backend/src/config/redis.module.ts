import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Redis as RedisClient } from 'ioredis'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: (config: ConfigService) => {
        const host = config.get('REDIS_HOST', 'localhost')
        const port = config.get('REDIS_PORT', 6379)
        return new RedisClient({ host, port, retryStrategy: (times: number) => Math.min(times * 50, 2000) })
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
