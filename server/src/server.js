import app from './app.js'
import { config } from './config/env.js'
import { connectDB } from './config/db.js'

async function start() {
  await connectDB()

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port} [${config.nodeEnv}]`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
