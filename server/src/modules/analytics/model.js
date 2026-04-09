import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true, index: true },
  resourceType: { type: String, enum: ['program', 'subject', 'chapter', 'topic'] },
  resourceId: { type: String },
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed },
  userAgent: { type: String },
  ip: { type: String },
}, { timestamps: true })

analyticsSchema.index({ createdAt: -1 })
analyticsSchema.index({ event: 1, resourceType: 1 })

export const Analytics = mongoose.model('Analytics', analyticsSchema)
