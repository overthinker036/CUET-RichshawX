/**
 * Centralized error handler middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const errorHandler = (err, req, res, next) => {
  // Log the complete error stack in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ERROR:`, err.stack);
  } else {
    console.error(`[${new Date().toISOString()}] ERROR:`, err.message);
  }

  // Handle specific error types
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message;
  } else if (err.name === 'RedisConnectionError') {
    statusCode = 503;
    message = 'Service temporarily unavailable';
  }

  // Special handling for Supabase errors
  if (err.message.includes('Supabase')) {
    statusCode = 502; // Bad Gateway
    message = 'Database service error';
  }

  // Client-friendly response
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Custom error classes for specific scenarios
 */
export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Invalid input data') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class RedisConnectionError extends Error {
  constructor(message = 'Redis connection failed') {
    super(message);
    this.name = 'RedisConnectionError';
  }
}