import { CompetitiveExam } from './model.js'
import { ApiError } from '../../utils/ApiError.js'

export const competitiveService = {
  async getAll() {
    return CompetitiveExam.find({ isActive: true }).sort({ name: 1 }).lean()
  },

  async getById(examId) {
    const exam = await CompetitiveExam.findOne({ examId, isActive: true }).lean()
    if (!exam) throw ApiError.notFound(`Competitive exam '${examId}' not found`)
    return exam
  },
}
