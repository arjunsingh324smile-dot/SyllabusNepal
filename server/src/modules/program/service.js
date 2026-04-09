import { Program } from './model.js'
import { ApiError } from '../../utils/ApiError.js'

export const programService = {
  async getAll(filter = {}) {
    const query = { isActive: true }
    if (filter.category) query.category = filter.category
    return Program.find(query).sort({ category: 1, name: 1 }).lean()
  },

  async getById(programId) {
    const program = await Program.findOne({ programId, isActive: true }).lean()
    if (!program) throw ApiError.notFound(`Program '${programId}' not found`)
    return program
  },

  async getByCategory(category) {
    return Program.find({ category, isActive: true }).sort({ name: 1 }).lean()
  },
}
