import rateLimit from 'express-rate-limit';

// Global limiter (optional fallback)
export const global = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth limiter: 5 requests per 15 mins
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login/register attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Transactions: 100 per hour
export const transactionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many transaction requests. Limit is 100 per hour.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Analytics: 50 per hour
export const analyticsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: 'Too many analytics requests. Limit is 50 per hour.',
  standardHeaders: true,
  legacyHeaders: false,
});
