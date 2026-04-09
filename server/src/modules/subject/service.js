import { Subject } from './model.js'
import { ApiError } from '../../utils/ApiError.js'

export const subjectService = {
  async getAll(filter = {}) {
    const query = { isActive: true }
    if (filter.programId) query.programId = filter.programId
    return Subject.find(query).sort({ name: 1 }).lean()
  },

  async getById(subjectId) {
    const subject = await Subject.findOne({ subjectId, isActive: true }).lean()
    if (!subject) throw ApiError.notFound(`Subject '${subjectId}' not found`)
    return subject
  },

  async getByProgram(programId) {
    return Subject.find({ programId, isActive: true }).sort({ name: 1 }).lean()
  },
}
