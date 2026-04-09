import { ApiError } from '../utils/ApiError.js'
import { config } from '../config/env.js'

// Centralized error handling middleware
export function errorHandler(err, req, res, _next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    })
  }

  console.error('Unhandled error:', err)

  const statusCode = err.statusCode || 500
  const message = config.nodeEnv === 'production'
    ? 'Internal server error'
    : err.message || 'Internal server error'

  res.status(statusCode).json({
    success: false,
    message,
  })
}
