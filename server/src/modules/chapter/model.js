import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
  chapterId: { type: String, required: true, unique: true, index: true },
  subjectId: { type: String, required: true, index: true },
  programId: { type: String, required: true, index: true },
  number: { type: Number },
  name: { type: String, required: true },
  unitName: { type: String },
  weightage: { type: String },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  introduction: { type: String },
  whyItMatters: { type: String },
  prerequisites: [{ type: String }],
  yearlyTrend: { type: Map, of: Number },
  topicCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

chapterSchema.index({ subjectId: 1, number: 1 })

export const Chapter = mongoose.model('Chapter', chapterSchema)
