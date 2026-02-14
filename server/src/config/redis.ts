import Redis from 'ioredis';

export const redis = new Redis(process.env.REDIS_URI || '');

redis.on('connect', () => console.log('✅ Redis (TCP) Connected'));
redis.on('error', (err) => console.error('❌ Redis Error:', err));
