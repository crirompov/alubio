import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3,
  message: 'Desde Alub.io te invitamos a unas alubias campeón', 
  headers: true,
});