import { Topic } from './model.js'
import { ApiError } from '../../utils/ApiError.js'

export const topicService = {
  async getAll(filter = {}) {
    const query = { isActive: true }
    if (filter.chapterId) query.chapterId = filter.chapterId
    if (filter.subjectId) query.subjectId = filter.subjectId
    return Topic.find(query).sort({ name: 1 }).lean()
  },

  async getById(topicId) {
    const topic = await Topic.findOne({ topicId, isActive: true }).lean()
    if (!topic) throw ApiError.notFound(`Topic '${topicId}' not found`)
    return topic
  },

  async getByChapter(chapterId) {
    return Topic.find({ chapterId, isActive: true }).sort({ name: 1 }).lean()
  },
}
