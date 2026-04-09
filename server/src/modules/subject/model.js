import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
  subjectId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  programId: { type: String, required: true, index: true },
  totalMarks: { type: Number },
  chapterCount: { type: Number, default: 0 },
  topicCount: { type: Number, default: 0 },
  icon: { type: String },
  color: { type: String },
  path: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

subjectSchema.index({ programId: 1, isActive: 1 })

export const Subject = mongoose.model('Subject', subjectSchema)
