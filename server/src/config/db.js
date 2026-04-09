import mongoose from 'mongoose'
import { config } from './env.js'

export async function connectDB() {
  try {
    const conn = await mongoose.connect(config.mongoUri)
    console.log(`MongoDB connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}
