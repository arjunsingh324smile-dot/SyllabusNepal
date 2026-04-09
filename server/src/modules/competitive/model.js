import mongoose from 'mongoose'

const competitiveExamSchema = new mongoose.Schema({
  examId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  shortName: { type: String },
  category: { type: String, default: 'competitive' },
  description: { type: String },
  organization: { type: String },
  color: { type: String },
  icon: { type: String },
  path: { type: String },
  totalMarks: { type: Number },
  duration: { type: String },
  subjects: [{ type: String }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const CompetitiveExam = mongoose.model('CompetitiveExam', competitiveExamSchema)
