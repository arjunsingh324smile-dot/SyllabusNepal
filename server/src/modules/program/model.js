import mongoose from 'mongoose'

const programSchema = new mongoose.Schema({
  programId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  shortName: { type: String },
  category: {
    type: String,
    required: true,
    enum: ['school', 'bachelor', 'entrance', 'competitive'],
    index: true,
  },
  description: { type: String },
  board: { type: String },
  color: { type: String },
  icon: { type: String },
  path: { type: String },
  subjectCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

programSchema.index({ category: 1, isActive: 1 })

export const Program = mongoose.model('Program', programSchema)
