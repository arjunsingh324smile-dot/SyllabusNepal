import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  topicId: { type: String, required: true, unique: true, index: true },
  chapterId: { type: String, required: true, index: true },
  subjectId: { type: String, required: true, index: true },
  programId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  explanation: { type: String },
  keyPoints: [{ type: String }],
  examTip: { type: String },
  formula: { type: String },
  relatedTopics: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

topicSchema.index({ chapterId: 1 })
topicSchema.index({ subjectId: 1 })
topicSchema.index({ name: 'text', explanation: 'text' })

export const Topic = mongoose.model('Topic', topicSchema)
