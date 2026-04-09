import mongoose from 'mongoose'

const entranceExamSchema = new mongoose.Schema({
  examId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  shortName: { type: String },
  category: { type: String, default: 'entrance' },
  description: { type: String },
  board: { type: String },
  color: { type: String },
  icon: { type: String },
  path: { type: String },
  totalMarks: { type: Number },
  duration: { type: String },
  subjects: [{ type: String }], // subject IDs
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const EntranceExam = mongoose.model('EntranceExam', entranceExamSchema)
