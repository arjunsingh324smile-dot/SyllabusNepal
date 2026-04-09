import { competitiveService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const competitiveController = {
  getAll: asyncHandler(async (_req, res) => {
    const exams = await competitiveService.getAll()
    res.json(ApiResponse.ok(exams))
  }),

  getById: asyncHandler(async (req, res) => {
    const exam = await competitiveService.getById(req.params.id)
    res.json(ApiResponse.ok(exam))
  }),
}
