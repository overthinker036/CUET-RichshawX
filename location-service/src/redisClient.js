import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  showFriendlyErrorStack: true
});

export const checkRedisConnection = async () => {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    return false;
  }
};

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redis;