import { EntranceExam } from './model.js'
import { ApiError } from '../../utils/ApiError.js'

export const entranceService = {
  async getAll() {
    return EntranceExam.find({ isActive: true }).sort({ name: 1 }).lean()
  },

  async getById(examId) {
    const exam = await EntranceExam.findOne({ examId, isActive: true }).lean()
    if (!exam) throw ApiError.notFound(`Entrance exam '${examId}' not found`)
    return exam
  },
}
