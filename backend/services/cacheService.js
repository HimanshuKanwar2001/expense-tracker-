import redisClient from '../config/redis.js';

const buildKey = (prefix, user_id) => `${prefix}:${user_id}`;

export const getCachedAnalytics = async (user_id) => {
  const key = buildKey('analytics', user_id);
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export const setCachedAnalytics = async (user_id, data) => {
  const key = buildKey('analytics', user_id);
  await redisClient.setEx(key, 60 * 15, JSON.stringify(data)); // 15 min
};

export const invalidateAnalyticsCache = async (user_id) => {
  const key = buildKey('analytics', user_id);
  await redisClient.del(key);
};
