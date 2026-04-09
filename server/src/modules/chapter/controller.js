import { chapterService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const chapterController = {
  getAll: asyncHandler(async (req, res) => {
    const { subjectId, programId } = req.query
    const chapters = await chapterService.getAll({ subjectId, programId })
    res.json(ApiResponse.ok(chapters))
  }),

  getById: asyncHandler(async (req, res) => {
    const chapter = await chapterService.getById(req.params.id)
    res.json(ApiResponse.ok(chapter))
  }),

  getBySubject: asyncHandler(async (req, res) => {
    const chapters = await chapterService.getBySubject(req.params.subjectId)
    res.json(ApiResponse.ok(chapters))
  }),
}
