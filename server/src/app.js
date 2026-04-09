import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import { apiRouter } from './routes/index.js'

const app = express()

// Security
app.use(helmet())
app.use(cors({ origin: config.corsOrigin, credentials: true }))
app.use(apiLimiter)

// Parsing
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'))
}

// API routes
app.use('/api', apiRouter)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handler
app.use(errorHandler)

export default app
