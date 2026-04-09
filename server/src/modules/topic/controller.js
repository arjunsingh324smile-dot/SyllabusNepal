import { topicService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const topicController = {
  getAll: asyncHandler(async (req, res) => {
    const { chapterId, subjectId } = req.query
    const topics = await topicService.getAll({ chapterId, subjectId })
    res.json(ApiResponse.ok(topics))
  }),

  getById: asyncHandler(async (req, res) => {
    const topic = await topicService.getById(req.params.id)
    res.json(ApiResponse.ok(topic))
  }),

  getByChapter: asyncHandler(async (req, res) => {
    const topics = await topicService.getByChapter(req.params.chapterId)
    res.json(ApiResponse.ok(topics))
  }),
}
