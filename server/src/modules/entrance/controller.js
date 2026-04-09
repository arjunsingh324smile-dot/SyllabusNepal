import { entranceService } from './service.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiResponse } from '../../utils/ApiResponse.js'

export const entranceController = {
  getAll: asyncHandler(async (_req, res) => {
    const exams = await entranceService.getAll()
    res.json(ApiResponse.ok(exams))
  }),

  getById: asyncHandler(async (req, res) => {
    const exam = await entranceService.getById(req.params.id)
    res.json(ApiResponse.ok(exam))
  }),
}
