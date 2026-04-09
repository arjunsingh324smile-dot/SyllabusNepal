import { Chapter } from './model.js'
import { ApiError } from '../../utils/ApiError.js'

export const chapterService = {
  async getAll(filter = {}) {
    const query = { isActive: true }
    if (filter.subjectId) query.subjectId = filter.subjectId
    if (filter.programId) query.programId = filter.programId
    return Chapter.find(query).sort({ number: 1 }).lean()
  },

  async getById(chapterId) {
    const chapter = await Chapter.findOne({ chapterId, isActive: true }).lean()
    if (!chapter) throw ApiError.notFound(`Chapter '${chapterId}' not found`)
    return chapter
  },

  async getBySubject(subjectId) {
    return Chapter.find({ subjectId, isActive: true }).sort({ number: 1 }).lean()
  },
}
